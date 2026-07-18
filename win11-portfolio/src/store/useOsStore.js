import { create } from 'zustand';

let nextId = 1;

const useOsStore = create((set, get) => ({
  windows: [],
  maxZIndex: 10,
  wallpaper: 'bloom',        // bloom | mountains | ocean | forest | city | abstract
  theme: 'dark',             // dark | light
  isShuttingDown: false,
  isLocked: true,

  setWallpaper: (wp) => set({ wallpaper: wp }),
  setTheme: (t) => set({ theme: t }),

  unlock: () => set({ isLocked: false }),
  lock: () => set({ isLocked: true }),

  shutdown: () => set({ isShuttingDown: true }),
  restart: () => set({ isShuttingDown: false, isLocked: true }),

  openWindow: (title, component, props = {}) => {
    const { windows, maxZIndex } = get();
    const existing = windows.find((w) => w.title === title);
    if (existing) {
      set((state) => ({
        windows: state.windows.map((w) =>
          w.id === existing.id
            ? { ...w, isMinimized: false, zIndex: state.maxZIndex + 1 }
            : w
        ),
        maxZIndex: state.maxZIndex + 1,
      }));
      return;
    }
    const newZIndex = maxZIndex + 1;
    set((state) => ({
      windows: [
        ...state.windows,
        {
          id: nextId++,
          title,
          component,
          props,
          isOpen: true,
          isMinimized: false,
          isMaximized: false,
          zIndex: newZIndex,
        },
      ],
      maxZIndex: newZIndex,
    }));
  },

  closeWindow: (id) => {
    set((state) => ({
      windows: state.windows.filter((w) => w.id !== id),
    }));
  },

  minimizeWindow: (id) => {
    set((state) => ({
      windows: state.windows.map((w) =>
        w.id === id ? { ...w, isMinimized: !w.isMinimized } : w
      ),
    }));
  },

  maximizeWindow: (id) => {
    set((state) => ({
      windows: state.windows.map((w) =>
        w.id === id ? { ...w, isMaximized: !w.isMaximized } : w
      ),
    }));
  },

  focusWindow: (id) => {
    set((state) => {
      const newZIndex = state.maxZIndex + 1;
      return {
        windows: state.windows.map((w) =>
          w.id === id ? { ...w, zIndex: newZIndex, isMinimized: false } : w
        ),
        maxZIndex: newZIndex,
      };
    });
  },
}));

export default useOsStore;
