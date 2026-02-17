import { create } from 'zustand';
import { ValidationState } from '@/src/entities/price-alert/types';
import { validatePrice } from '../lib/validation';

interface FormState {
  condition: 'above' | 'below';
  targetPrice: string;
  validation: ValidationState;
  setCondition: (condition: 'above' | 'below') => void;
  setTargetPrice: (value: string, currentPrice: number) => void;
  reset: () => void;
}

const initialValidation: ValidationState = {
  isValid: false,
  normalizedValue: '',
};

export const useFormModel = create<FormState>()((set) => ({
  condition: 'below',
  targetPrice: '',
  validation: initialValidation,

  setCondition: (condition) => {
    set({ condition });
  },

  setTargetPrice: (value, currentPrice) => {
    const validation = validatePrice(value, currentPrice);
    set({
      targetPrice: validation.normalizedValue,
      validation,
    });
  },

  reset: () => {
    set({
      condition: 'below',
      targetPrice: '',
      validation: initialValidation,
    });
  },
}));
