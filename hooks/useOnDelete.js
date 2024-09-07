import {create} from 'zustand';

const useOnDeleteStore = create((set) => ({
    onDelete: null, // Initialize onDelete as null
    setOnDelete: (onDelete) => set({ onDelete }), // Action to set onDelete function
  }));
  
  export default useOnDeleteStore;