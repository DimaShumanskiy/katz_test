import React from 'react';
import { TouchableOpacity, Text, StyleSheet, View, ViewStyle } from 'react-native';

export interface ToggleOption {
  value: string;
  label: string;
}

export interface ToggleProps {
  options: ToggleOption[];
  value: string;
  onChange: (value: string) => void;
  containerStyle?: ViewStyle;
}

export const Toggle: React.FC<ToggleProps> = ({ options, value, onChange, containerStyle }) => {
  return (
    <View style={[styles.container, containerStyle]}>
      {options.map((option, index) => {
        const isSelected = option.value === value;
        const isFirst = index === 0;
        const isLast = index === options.length - 1;

        return (
          <TouchableOpacity
            key={option.value}
            style={[
              styles.option,
              isSelected && styles.optionSelected,
              isFirst && styles.optionFirst,
              isLast && styles.optionLast,
            ]}
            onPress={() => onChange(option.value)}
            activeOpacity={0.7}>
            <Text style={[styles.optionText, isSelected && styles.optionTextSelected]}>
              {option.label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    borderRadius: 8,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#D1D1D6',
  },
  option: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    borderRightWidth: 1,
    borderRightColor: '#D1D1D6',
  },
  optionFirst: {
    borderTopLeftRadius: 8,
    borderBottomLeftRadius: 8,
  },
  optionLast: {
    borderTopRightRadius: 8,
    borderBottomRightRadius: 8,
    borderRightWidth: 0,
  },
  optionSelected: {
    backgroundColor: '#007AFF',
  },
  optionText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#000',
  },
  optionTextSelected: {
    color: '#FFFFFF',
  },
});
