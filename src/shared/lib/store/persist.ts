import { StateStorage, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const asyncStorage: StateStorage = {
  getItem: async (name: string) => {
    return await AsyncStorage.getItem(name);
  },
  setItem: async (name: string, value: string) => {
    await AsyncStorage.setItem(name, value);
  },
  removeItem: async (name: string) => {
    await AsyncStorage.removeItem(name);
  },
};

export const persistStorage = createJSONStorage(() => asyncStorage);

export const createPersistConfig = (name: string) => ({
  name,
  storage: persistStorage,
});
