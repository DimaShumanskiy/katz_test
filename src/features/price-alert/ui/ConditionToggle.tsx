import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Toggle } from '@/src/shared/ui/Toggle';

interface ConditionToggleProps {
  condition: 'above' | 'below';
  onChange: (condition: 'above' | 'below') => void;
}

export const ConditionToggle: React.FC<ConditionToggleProps> = ({ condition, onChange }) => {
  const options = [
    { value: 'above', label: 'Price Above' },
    { value: 'below', label: 'Price Below' },
  ];

  return (
    <View style={styles.container}>
      <Toggle
        options={options}
        value={condition}
        onChange={(value) => onChange(value as 'above' | 'below')}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
});
