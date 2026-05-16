import { useState, useCallback, useMemo } from 'react';
import { useCreateBlockNote } from '@blocknote/react';
import { BlockNoteView } from '@blocknote/mantine';
import '@blocknote/core/fonts/inter.css';
import '@blocknote/mantine/style.css';
import debounce from 'lodash/debounce';
import axios from 'axios';
import useStore from '../store/useStore';
import AIAssistantMenu from './AIAssistantMenu';

export default function EditorCanvas() {
  const { currentDocument, fetchDocuments } = useStore();
  const [title, setTitle] = useState(currentDocument?.title || '');
  const [aiMenuOpen, setAiMenuOpen] = useState(false);
  const [aiMenuPos, setAiMenuPos] = useState(null);

  const debouncedSave = useCallback(
    debounce(async (id, newTitle, newContent) => {
      if (!id) return;
      try {
        await axios.put(`/api/documents/${id}`, { title: newTitle, content: newContent });
        fetchDocuments();
      } catch (err) {
        console.error('Auto-save failed', err);
      }
    }, 1500),
    [fetchDocuments]
  );

  const editorOptions = useMemo(() => ({
    initialContent: (currentDocument?.content && currentDocument.content.length > 0) 
      ? currentDocument.content 
      : [{ type: "paragraph", content: "" }]
  }), []); // Empty dependency array is safe because the component remounts fully when currentDocument changes (via key prop)

  const editor = useCreateBlockNote(editorOptions);

  const handleTitleChange = (e) => {
    const newTitle = e.target.value;
    setTitle(newTitle);
    debouncedSave(currentDocument._id, newTitle, editor.document);
  };

  const handleEditorChange = () => {
    debouncedSave(currentDocument._id, title, editor.document);

    try {
      const cursor = editor.getTextCursorPosition();
      if (cursor && cursor.block.content && cursor.block.content.length > 0) {
        const text = cursor.block.content.map(c => c.text).join('');
        if (text.endsWith('/ai')) {
          const domElement = document.querySelector(`[data-id="${cursor.block.id}"]`);
          if (domElement) {
              const rect = domElement.getBoundingClientRect();
              setAiMenuPos({ x: rect.left, y: rect.bottom + window.scrollY });
              setAiMenuOpen(true);
              const newContent = text.slice(0, -3);
              editor.updateBlock(cursor.block, { content: newContent });
          }
        }
      }
    } catch (e) {
      // Ignore cursor errors if editor is not focused
    }
  };

  return (
    <div className="flex-1 overflow-y-auto relative bg-white group/editor">
      {/* Cover Image Placeholder */}
      <div className="h-48 w-full bg-gradient-to-r from-[#e3e2e0] to-[#f0f0f0] relative group/cover border-b border-[#f0f0f0]">
        <button className="absolute bottom-4 right-4 bg-white/80 hover:bg-white px-3 py-1.5 rounded text-xs font-medium text-[#37352f] shadow-sm transition opacity-0 group-hover/cover:opacity-100 border border-[#e9e9e7]">
          Change cover
        </button>
      </div>

      <div className="max-w-[900px] mx-auto px-[96px] pb-[80px] relative">
        
        {/* Page Icon */}
        <div className="text-[78px] leading-none mt-[-42px] mb-4 relative z-10 w-max group/icon cursor-pointer">
          <span className="opacity-100 transition-opacity">📄</span>
          <div className="absolute inset-0 bg-black/5 rounded-lg opacity-0 group-hover/icon:opacity-100 transition-opacity flex items-center justify-center">
             <span className="text-xs font-medium text-[#37352f]">Edit</span>
          </div>
        </div>

        {/* Hover Controls */}
        <div className="opacity-0 group-hover/editor:opacity-100 flex gap-2 mb-4 transition-opacity px-[52px]">
          <button className="text-[#37352f]/50 hover:text-[#37352f] hover:bg-black/5 px-2 py-1 rounded text-sm font-medium flex items-center transition-colors">
            <span className="mr-1.5">😀</span> Add icon
          </button>
          <button className="text-[#37352f]/50 hover:text-[#37352f] hover:bg-black/5 px-2 py-1 rounded text-sm font-medium flex items-center transition-colors">
            <span className="mr-1.5">🖼️</span> Add cover
          </button>
          <button 
            onClick={() => {
              let pos;
              try {
                pos = editor.getTextCursorPosition();
              } catch (e) {
                // Ignore focus error
              }
              
              if (pos && pos.block) {
                editor.insertBlocks([{ type: "checkListItem", content: "" }], pos.block, "after");
              } else {
                const lastBlock = editor.document[editor.document.length - 1];
                editor.insertBlocks([{ type: "checkListItem", content: "" }], lastBlock, "after");
              }
              editor.focus();
            }}
            className="text-[#37352f]/50 hover:text-[#37352f] hover:bg-black/5 px-2 py-1 rounded text-sm font-medium flex items-center transition-colors"
          >
            <span className="mr-1.5">☑️</span> Add checklist
          </button>
        </div>
        
        <input 
          type="text"
          value={title}
          onChange={handleTitleChange}
          placeholder="Untitled"
          className="w-full text-[40px] font-bold text-[#37352f] placeholder-[#37352f]/20 border-none outline-none mb-6 px-[52px] bg-transparent tracking-tight font-sans"
        />
        
        <BlockNoteView 
          editor={editor} 
          onChange={handleEditorChange}
          theme="light"
          className="font-sans text-[#37352f]"
        />
      </div>

      {aiMenuOpen && (
        <AIAssistantMenu 
          editor={editor}
          position={aiMenuPos}
          onClose={() => setAiMenuOpen(false)}
        />
      )}
    </div>
  );
}
