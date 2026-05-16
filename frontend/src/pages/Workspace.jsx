import { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import EditorCanvas from '../components/EditorCanvas';
import useStore from '../store/useStore';
import { Menu, Search as SearchIcon, Settings as SettingsIcon, Trash2, X } from 'lucide-react';
import axios from 'axios';

function SearchModal() {
  const { searchModalOpen, setSearchModalOpen, setCurrentDocument } = useStore();
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);

  useEffect(() => {
    if (query.trim().length > 0) {
      axios.get(`/api/documents/search?q=${query}`).then(res => setResults(res.data));
    } else {
      setResults([]);
    }
  }, [query]);

  if (!searchModalOpen) return null;
  return (
    <div className="absolute inset-0 bg-black/20 z-50 flex items-start justify-center pt-[15vh]">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl flex flex-col border border-[#e9e9e7] overflow-hidden">
        <div className="flex items-center p-4 border-b border-[#e9e9e7]">
          <SearchIcon size={20} className="text-[#37352f]/40 mr-3" />
          <input 
            autoFocus 
            value={query} 
            onChange={e => setQuery(e.target.value)} 
            placeholder="Search your workspace..." 
            className="flex-1 outline-none text-[18px] text-[#37352f] placeholder-[#37352f]/30" 
          />
          <button onClick={() => setSearchModalOpen(false)} className="text-[#37352f]/40 hover:text-[#37352f]"><X size={20}/></button>
        </div>
        <div className="max-h-[50vh] overflow-y-auto">
          {results.map(doc => (
            <button 
              key={doc._id} 
              onClick={() => { setCurrentDocument(doc._id); setSearchModalOpen(false); }} 
              className="w-full text-left px-6 py-3 hover:bg-[#efefed] border-b border-[#e9e9e7]/30 flex items-center"
            >
              <div className="font-medium text-[#37352f] text-[15px]">{doc.title || 'Untitled'}</div>
            </button>
          ))}
          {query && results.length === 0 && <div className="p-6 text-center text-[#37352f]/50 text-sm">No results found for "{query}".</div>}
          {!query && <div className="p-6 text-center text-[#37352f]/40 text-sm">Type to search for pages.</div>}
        </div>
      </div>
    </div>
  );
}

function TrashModal() {
  const { trashModalOpen, setTrashModalOpen, fetchDocuments } = useStore();
  const [trashed, setTrashed] = useState([]);

  useEffect(() => {
    if (trashModalOpen) {
      axios.get('/api/documents/trash').then(res => setTrashed(res.data));
    }
  }, [trashModalOpen]);

  const handleRestore = async (id) => {
    await axios.put(`/api/documents/${id}/restore`);
    setTrashed(trashed.filter(t => t._id !== id));
    fetchDocuments();
  };

  if (!trashModalOpen) return null;
  return (
    <div className="absolute inset-0 bg-black/20 z-50 flex items-start justify-center pt-[15vh]">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl flex flex-col border border-[#e9e9e7] overflow-hidden">
        <div className="flex items-center justify-between p-4 border-b border-[#e9e9e7] bg-[#f7f7f5]">
          <div className="flex items-center font-semibold text-[#37352f]">
            <Trash2 size={18} className="mr-2 text-[#37352f]/60" /> Trash
          </div>
          <button onClick={() => setTrashModalOpen(false)} className="text-[#37352f]/40 hover:text-[#37352f]"><X size={20}/></button>
        </div>
        <div className="max-h-[50vh] overflow-y-auto">
          {trashed.length === 0 ? (
            <div className="p-8 text-center text-[#37352f]/50 text-[15px]">No pages in Trash.</div>
          ) : (
            trashed.map(doc => (
              <div key={doc._id} className="w-full flex items-center justify-between px-6 py-3 hover:bg-[#efefed] border-b border-[#e9e9e7]/30">
                <div className="font-medium text-[#37352f] text-[15px]">{doc.title || 'Untitled'}</div>
                <button 
                  onClick={() => handleRestore(doc._id)}
                  className="px-3 py-1 bg-white border border-[#e9e9e7] rounded-md text-xs font-medium hover:bg-black hover:text-white transition-colors"
                >
                  Restore
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

function SettingsModal() {
  const { settingsModalOpen, setSettingsModalOpen, user } = useStore();
  if (!settingsModalOpen) return null;
  return (
    <div className="absolute inset-0 bg-black/20 z-50 flex items-start justify-center pt-[15vh]">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-xl flex flex-col border border-[#e9e9e7] overflow-hidden">
        <div className="flex items-center justify-between p-4 border-b border-[#e9e9e7] bg-[#f7f7f5]">
          <div className="flex items-center font-semibold text-[#37352f]">
            <SettingsIcon size={18} className="mr-2 text-[#37352f]/60" /> Settings
          </div>
          <button onClick={() => setSettingsModalOpen(false)} className="text-[#37352f]/40 hover:text-[#37352f]"><X size={20}/></button>
        </div>
        <div className="p-8">
          <div className="flex items-center mb-8">
             <div className="w-16 h-16 bg-[#eb5757] rounded-xl text-white flex items-center justify-center text-3xl font-bold shadow-sm mr-6">
                {user?.name?.[0] || 'U'}
             </div>
             <div>
               <div className="text-xl font-bold text-[#37352f]">{user?.name}</div>
               <div className="text-[#37352f]/60 text-sm">{user?.email}</div>
             </div>
          </div>
          <div className="space-y-4">
             <div className="flex justify-between items-center py-3 border-b border-[#e9e9e7]/50">
               <span className="text-[14px] font-medium text-[#37352f]">Theme</span>
               <span className="text-[13px] text-[#37352f]/50">Minimal Light</span>
             </div>
             <div className="flex justify-between items-center py-3 border-b border-[#e9e9e7]/50">
               <span className="text-[14px] font-medium text-[#37352f]">Workspace Engine</span>
               <span className="text-[13px] text-[#37352f]/50">BlockNote v0.13</span>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Workspace() {
  const { setSidebarOpen, sidebarOpen, currentDocument } = useStore();

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-white text-[#37352f] font-['Inter']">
      <Sidebar />
      <main className="flex-1 flex flex-col relative w-full">
        {!sidebarOpen && (
          <button 
            className="absolute top-4 left-4 p-2 hover:bg-[#efefed] text-[#37352f]/60 hover:text-[#37352f] rounded-md z-10 transition-colors"
            onClick={() => setSidebarOpen(true)}
            title="Open sidebar"
          >
            <Menu size={20} />
          </button>
        )}
        
        {currentDocument ? (
          <EditorCanvas key={currentDocument._id} />
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center text-[#37352f]/40 font-medium bg-white">
            <div className="w-24 h-24 mb-6 rounded-2xl bg-[#f7f7f5] border border-[#e9e9e7] flex items-center justify-center shadow-sm">
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="opacity-50">
                <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/>
                <polyline points="14 2 14 8 20 8"/>
                <line x1="16" y1="13" x2="8" y2="13"/>
                <line x1="16" y1="17" x2="8" y2="17"/>
                <line x1="10" y1="9" x2="8" y2="9"/>
              </svg>
            </div>
            <div className="text-lg text-[#37352f]/80">Welcome to your workspace</div>
            <div className="text-sm mt-2 text-[#37352f]/50">Select a page from the sidebar to start writing</div>
          </div>
        )}

        <SearchModal />
        <TrashModal />
        <SettingsModal />
      </main>
    </div>
  );
}
