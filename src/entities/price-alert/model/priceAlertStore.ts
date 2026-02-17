import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { createPersistConfig } from '@/src/shared/lib/store';
import { PriceAlert } from '../types';

interface PriceAlertState {
  alerts: PriceAlert[];
  isLoading: boolean;
  error: string | null;
  addAlert: (alert: Omit<PriceAlert, 'id' | 'createdAt'>) => Promise<void>;
  removeAlert: (id: string) => Promise<void>;
  updateAlert: (id: string, updates: Partial<PriceAlert>) => Promise<void>;
  loadAlerts: () => Promise<void>;
  clearAlerts: () => Promise<void>;
}

export const usePriceAlertStore = create<PriceAlertState>()(
  persist(
    (set, get) => ({
      alerts: [],
      isLoading: false,
      error: null,

      addAlert: async (alert) => {
        try {
          set({ isLoading: true, error: null });
          
          const newAlert: PriceAlert = {
            ...alert,
            id: `alert-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
            createdAt: new Date(),
          };

          set((state) => ({
            alerts: [...state.alerts, newAlert],
            isLoading: false,
          }));
        } catch (error) {
          const errorMessage = error instanceof Error ? error.message : 'Failed to add alert';
          set({ error: errorMessage, isLoading: false });
          throw error;
        }
      },

      removeAlert: async (id) => {
        try {
          set({ isLoading: true, error: null });
          
          set((state) => ({
            alerts: state.alerts.filter((alert) => alert.id !== id),
            isLoading: false,
          }));
        } catch (error) {
          const errorMessage = error instanceof Error ? error.message : 'Failed to remove alert';
          set({ error: errorMessage, isLoading: false });
          throw error;
        }
      },

      updateAlert: async (id, updates) => {
        try {
          set({ isLoading: true, error: null });
          
          set((state) => ({
            alerts: state.alerts.map((alert) =>
              alert.id === id ? { ...alert, ...updates } : alert
            ),
            isLoading: false,
          }));
        } catch (error) {
          const errorMessage = error instanceof Error ? error.message : 'Failed to update alert';
          set({ error: errorMessage, isLoading: false });
          throw error;
        }
      },

      loadAlerts: async () => {
        try {
          set({ isLoading: true, error: null });
          set({ isLoading: false });
        } catch (error) {
          const errorMessage = error instanceof Error ? error.message : 'Failed to load alerts';
          set({ error: errorMessage, isLoading: false });
          throw error;
        }
      },

      clearAlerts: async () => {
        try {
          set({ isLoading: true, error: null });
          set({ alerts: [], isLoading: false });
        } catch (error) {
          const errorMessage = error instanceof Error ? error.message : 'Failed to clear alerts';
          set({ error: errorMessage, isLoading: false });
          throw error;
        }
      },
    }),
    {
      ...createPersistConfig('price-alert-storage'),
      partialize: (state) => ({
        alerts: state.alerts.map((alert) => ({
          ...alert,
          createdAt: alert.createdAt instanceof Date 
            ? alert.createdAt.toISOString() 
            : alert.createdAt,
        })),
      }),
      onRehydrateStorage: () => (state) => {
        if (state) {
          state.alerts = state.alerts.map((alert) => ({
            ...alert,
            createdAt: new Date(alert.createdAt),
          }));
        }
      },
    }
  )
);
