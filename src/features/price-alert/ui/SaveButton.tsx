import React from 'react';
import { Button } from '@/src/shared/ui/Button';

interface SaveButtonProps {
  disabled: boolean;
  onSave: () => void;
  loading?: boolean;
}

export const SaveButton: React.FC<SaveButtonProps> = ({ disabled, onSave, loading = false }) => {
  return (
    <Button
      onPress={onSave}
      disabled={disabled}
      loading={loading}
      variant="primary">
      Save
    </Button>
  );
};
