import { useState, useEffect } from 'react';
import { ChevronRight, ChevronDown, FileText, Plus, Trash2, Settings, Search, Clock } from 'lucide-react';
import useStore from '../store/useStore';
import axios from 'axios';

function DocumentItem({ doc, level = 0 }) {
  const [expanded, setExpanded] = useState(false);
  const [children, setChildren] = useState([]);
  const { currentDocument, setCurrentDocument, createDocument } = useStore();

  useEffect(() => {
    if (expanded && children.length === 0) {
      axios.get(`/api/documents/${doc._id}/children`).then(res => {
        if (Array.isArray(res.data)) setChildren(res.data);
      }).catch(err => console.error("Failed to load children", err));
    }
  }, [expanded, doc._id]);

  const handleAddChild = async (e) => {
    e.stopPropagation();
    const newDoc = await createDocument(doc._id);
    if (newDoc) {
      setChildren([...children, newDoc]);
      setExpanded(true);
      setCurrentDocument(newDoc._id);
    }
  };

  const isSelected = currentDocument?._id === doc._id;

  return (
    <div>
      <div 
        className={`group flex items-center py-[6px] pr-2 text-[14px] cursor-pointer rounded-md mx-2 transition-colors ${isSelected ? 'bg-[#efefed] font-medium text-[#37352f]' : 'text-[#37352f]/80 hover:bg-[#efefed]'}`}
        style={{ paddingLeft: `${level * 16 + 8}px` }}
        onClick={() => setCurrentDocument(doc._id)}
      >
        <div 
          className="w-5 h-5 flex items-center justify-center mr-1 text-[#37352f]/40 hover:bg-black/5 rounded-sm" 
          onClick={(e) => { e.stopPropagation(); setExpanded(!expanded); }}
        >
          {expanded ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
        </div>
        <FileText size={16} className="mr-2 text-[#37352f]/40" />
        <span className="flex-1 truncate tracking-tight">{doc.title || 'Untitled'}</span>
        <button onClick={handleAddChild} className="opacity-0 group-hover:opacity-100 p-[2px] text-[#37352f]/40 hover:bg-black/10 rounded-sm">
          <Plus size={16} />
        </button>
      </div>
      {expanded && children.map(child => (
        <DocumentItem key={child._id} doc={child} level={level + 1} />
      ))}
    </div>
  );
}

export default function Sidebar() {
  const { documents, fetchDocuments, createDocument, sidebarOpen, user, logout, setSearchModalOpen, setSettingsModalOpen, setTrashModalOpen } = useStore();

  useEffect(() => {
    fetchDocuments();
  }, [fetchDocuments]);

  if (!sidebarOpen) return null;

  const docsList = Array.isArray(documents) ? documents : [];

  return (
    <div className="w-64 h-screen bg-[#f7f7f5] flex flex-col border-r border-[#e9e9e7] text-[#37352f] shrink-0 font-['Inter']">
      <div className="p-4 flex items-center justify-between hover:bg-[#efefed] cursor-pointer transition-colors m-2 rounded-md">
        <div className="flex items-center gap-2 overflow-hidden">
          <div className="w-6 h-6 bg-red-500 rounded-sm text-white flex items-center justify-center text-xs font-bold shadow-sm">
            {user?.name ? user.name[0].toUpperCase() : 'N'}
          </div>
          <span className="truncate font-medium text-sm tracking-tight">{user?.name ? `${user.name}'s Notion` : "Loading..."}</span>
        </div>
      </div>
      
      <div className="flex-1 overflow-y-auto pb-4">
        <div className="px-2 mb-4 space-y-1">
          <button onClick={() => setSearchModalOpen(true)} className="flex items-center w-full px-2 py-[6px] text-[14px] text-[#37352f]/80 hover:bg-[#efefed] rounded-md transition-colors">
            <Search size={16} className="mr-2 text-[#37352f]/40" /> Search
          </button>
          <button onClick={() => alert("Updates coming soon!")} className="flex items-center w-full px-2 py-[6px] text-[14px] text-[#37352f]/80 hover:bg-[#efefed] rounded-md transition-colors">
            <Clock size={16} className="mr-2 text-[#37352f]/40" /> Updates
          </button>
          <button onClick={() => setSettingsModalOpen(true)} className="flex items-center w-full px-2 py-[6px] text-[14px] text-[#37352f]/80 hover:bg-[#efefed] rounded-md transition-colors">
            <Settings size={16} className="mr-2 text-[#37352f]/40" /> Settings
          </button>
        </div>

        <div className="text-[11px] font-bold text-[#37352f]/50 mb-1 px-4 tracking-wider mt-4">PRIVATE</div>
        {docsList.map(doc => (
          <DocumentItem key={doc._id} doc={doc} />
        ))}
        
        <div className="px-2 mt-1">
          <button 
            onClick={() => createDocument()}
            className="flex items-center w-full px-2 py-[6px] text-[14px] text-[#37352f]/80 hover:bg-[#efefed] rounded-md transition-colors group"
          >
            <Plus size={16} className="mr-2 text-[#37352f]/40 group-hover:text-[#37352f]" /> Add a page
          </button>
        </div>
      </div>

      <div className="p-2 border-t border-[#e9e9e7]">
        <button onClick={() => setTrashModalOpen(true)} className="flex items-center w-full px-2 py-[6px] text-[14px] text-[#37352f]/80 hover:bg-[#efefed] rounded-md transition-colors">
          <Trash2 size={16} className="mr-2 text-[#37352f]/40" /> Trash
        </button>
        <button onClick={logout} className="flex items-center w-full px-2 py-[6px] text-[14px] text-red-600/80 hover:bg-red-50 rounded-md transition-colors mt-1">
           Log out
        </button>
      </div>
    </div>
  );
}
