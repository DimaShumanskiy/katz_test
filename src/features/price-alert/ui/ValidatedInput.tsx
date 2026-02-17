import React from 'react';
import { Input } from '@/src/shared/ui/Input';
import { ValidationState } from '@/src/entities/price-alert/types';

interface ValidatedInputProps {
  value: string;
  validation: ValidationState;
  onChange: (value: string) => void;
  onBlur?: () => void;
  placeholder?: string;
  label?: string;
}

export const ValidatedInput: React.FC<ValidatedInputProps> = ({
  value,
  validation,
  onChange,
  onBlur,
  placeholder = 'Enter target price',
  label = 'Target Price',
}) => {
  return (
    <Input
      label={label}
      value={value}
      onChangeText={onChange}
      onBlur={onBlur}
      placeholder={placeholder}
      keyboardType="decimal-pad"
      error={validation.error}
      warning={validation.warning}
    />
  );
};
