import { useState, useEffect, useRef } from 'react';
import axios from 'axios';

export default function AIAssistantMenu({ editor, position, onClose }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const menuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        onClose();
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [onClose]);

  const handleCommand = async (command) => {
    if (!editor) return;
    
    // Get the current block
    const currentBlock = editor.getTextCursorPosition().block;
    const textContent = currentBlock.content.map(c => c.text).join('');

    if (!textContent.trim() && command !== 'continue_writing') {
        setError('Please write some text first.');
        return;
    }

    setLoading(true);
    setError(null);
    try {
      const res = await axios.post('/api/ai/generate', {
        command,
        contextText: textContent
      });
      
      const newText = res.data.result;
      
      // Insert result below current block
      editor.insertBlocks([{ content: newText }], currentBlock, 'after');
      onClose();
    } catch (err) {
      setError(err.response?.data?.message || 'AI generation failed');
    } finally {
      setLoading(false);
    }
  };

  if (!position) return null;

  return (
    <div 
      ref={menuRef}
      className="absolute z-50 w-64 bg-white border rounded-lg shadow-xl py-2 text-sm"
      style={{ top: position.y, left: position.x }}
    >
      <div className="px-3 pb-2 mb-2 border-b text-xs font-semibold text-gray-500">
        AI Assistant
      </div>
      
      {error && <div className="px-3 py-1 mb-2 text-xs text-red-500 bg-red-50">{error}</div>}
      
      {loading ? (
        <div className="px-3 py-2 text-gray-500 flex items-center">
          <div className="animate-spin h-4 w-4 border-2 border-blue-500 border-t-transparent rounded-full mr-2"></div>
          Generating...
        </div>
      ) : (
        <>
          <button className="w-full text-left px-3 py-1.5 hover:bg-gray-100" onClick={() => handleCommand('summarize')}>Summarize Text</button>
          <button className="w-full text-left px-3 py-1.5 hover:bg-gray-100" onClick={() => handleCommand('improve_writing')}>Improve Writing & Grammar</button>
          <button className="w-full text-left px-3 py-1.5 hover:bg-gray-100" onClick={() => handleCommand('continue_writing')}>Continue Writing</button>
        </>
      )}
    </div>
  );
}
