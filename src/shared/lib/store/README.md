# Store Utilities

Shared utilities for creating persisted Zustand stores.

## Usage

### Basic persist store

```typescript
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { createPersistConfig } from '@/src/shared/lib/store';

interface UserState {
  user: User | null;
  setUser: (user: User) => void;
}

export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      user: null,
      setUser: (user) => set({ user }),
    }),
    createPersistConfig('user-storage')
  )
);
```

### Persist store with custom serialization

```typescript
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { createPersistConfig } from '@/src/shared/lib/store';

interface SettingsState {
  theme: 'light' | 'dark';
  language: string;
  setTheme: (theme: 'light' | 'dark') => void;
}

export const useSettingsStore = create<SettingsState>()(
  persist(
    (set) => ({
      theme: 'light',
      language: 'en',
      setTheme: (theme) => set({ theme }),
    }),
    {
      ...createPersistConfig('settings-storage'),
      partialize: (state) => ({
        theme: state.theme,
        language: state.language,
      }),
    }
  )
);
```

### Persist store with Date serialization

```typescript
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { createPersistConfig } from '@/src/shared/lib/store';

interface TaskState {
  tasks: Task[];
  addTask: (task: Omit<Task, 'id' | 'createdAt'>) => void;
}

export const useTaskStore = create<TaskState>()(
  persist(
    (set) => ({
      tasks: [],
      addTask: (task) => set((state) => ({
        tasks: [...state.tasks, {
          ...task,
          id: Date.now().toString(),
          createdAt: new Date(),
        }],
      })),
    }),
    {
      ...createPersistConfig('task-storage'),
      partialize: (state) => ({
        tasks: state.tasks.map((task) => ({
          ...task,
          createdAt: task.createdAt instanceof Date 
            ? task.createdAt.toISOString() 
            : task.createdAt,
        })),
      }),
      onRehydrateStorage: () => (state) => {
        if (state) {
          state.tasks = state.tasks.map((task) => ({
            ...task,
            createdAt: new Date(task.createdAt),
          }));
        }
      },
    }
  )
);
```

## API

### `createPersistConfig(name: string)`

Creates a persist configuration object with AsyncStorage.

**Parameters:**
- `name` - Storage key name for AsyncStorage

**Returns:**
```typescript
{
  name: string;
  storage: StateStorage;
}
```

### `persistStorage`

Pre-configured JSON storage using AsyncStorage.

### `asyncStorage`

AsyncStorage wrapper implementing StateStorage interface.

## Benefits

- ✅ No duplication of storage configuration
- ✅ Consistent persist setup across all stores
- ✅ Easy to switch storage implementation
- ✅ Type-safe
- ✅ Follows FSD architecture (shared layer)
