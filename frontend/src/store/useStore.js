import { create } from 'zustand';
import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:5000';
axios.defaults.withCredentials = true;

const useStore = create((set, get) => ({
  user: null,
  isAuthenticated: false,
  documents: [],
  currentDocument: null,
  sidebarOpen: true,
  searchModalOpen: false,
  settingsModalOpen: false,
  trashModalOpen: false,

  setSidebarOpen: (isOpen) => set({ sidebarOpen: isOpen }),
  setSearchModalOpen: (isOpen) => set({ searchModalOpen: isOpen }),
  setSettingsModalOpen: (isOpen) => set({ settingsModalOpen: isOpen }),
  setTrashModalOpen: (isOpen) => set({ trashModalOpen: isOpen }),

  login: async (email, password) => {
    try {
      const res = await axios.post('/api/auth/login', { email, password });
      set({ user: res.data, isAuthenticated: true });
      return { success: true };
    } catch (error) {
      console.error(error);
      return { success: false, message: error.response?.data?.message || error.message };
    }
  },

  register: async (name, email, password) => {
    try {
      const res = await axios.post('/api/auth/register', { name, email, password });
      set({ user: res.data, isAuthenticated: true });
      return { success: true };
    } catch (error) {
      console.error(error);
      return { success: false, message: error.response?.data?.message || error.message };
    }
  },

  logout: async () => {
    await axios.post('/api/auth/logout');
    set({ user: null, isAuthenticated: false, documents: [], currentDocument: null });
  },

  checkAuth: async () => {
    try {
      const res = await axios.get('/api/auth/me');
      set({ user: res.data, isAuthenticated: true });
    } catch (error) {
      set({ user: null, isAuthenticated: false });
    }
  },

  fetchDocuments: async () => {
    try {
      const res = await axios.get('/api/documents');
      set({ documents: res.data });
    } catch (error) {
      console.error('Failed to fetch docs', error);
    }
  },

  createDocument: async (parentId = null) => {
    try {
      const res = await axios.post('/api/documents', { title: 'Untitled', parentId });
      if (!parentId) {
        set((state) => ({ 
          documents: [res.data, ...(Array.isArray(state.documents) ? state.documents : [])],
          currentDocument: res.data
        }));
      }
      return res.data;
    } catch (error) {
      console.error(error);
    }
  },

  setCurrentDocument: async (id) => {
    try {
      const res = await axios.get(`/api/documents/${id}`);
      set({ currentDocument: res.data });
    } catch (error) {
      console.error(error);
    }
  },
}));

export default useStore;
