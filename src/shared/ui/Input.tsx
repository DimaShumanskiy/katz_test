import React from 'react';
import {
  TextInput,
  View,
  Text,
  StyleSheet,
  TextInputProps,
  ViewStyle,
} from 'react-native';

export interface InputProps extends TextInputProps {
  label?: string;
  error?: string;
  warning?: string;
  containerStyle?: ViewStyle;
}

export const Input: React.FC<InputProps> = ({
  label,
  error,
  warning,
  containerStyle,
  style,
  ...textInputProps
}) => {
  const hasError = !!error;
  const hasWarning = !!warning && !hasError;

  return (
    <View style={[styles.container, containerStyle]}>
      {label && <Text style={styles.label}>{label}</Text>}
      <TextInput
        style={[
          styles.input,
          hasError && styles.inputError,
          hasWarning && styles.inputWarning,
          style,
        ]}
        placeholderTextColor="#8E8E93"
        {...textInputProps}
      />
      {hasError && <Text style={styles.errorText}>{error}</Text>}
      {hasWarning && <Text style={styles.warningText}>{warning}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#000',
    marginBottom: 8,
  },
  input: {
    height: 48,
    borderWidth: 1,
    borderColor: '#D1D1D6',
    borderRadius: 8,
    paddingHorizontal: 12,
    fontSize: 16,
    backgroundColor: '#FFFFFF',
    color: '#000',
  },
  inputError: {
    borderColor: '#FF3B30',
  },
  inputWarning: {
    borderColor: '#FF9500',
  },
  errorText: {
    fontSize: 12,
    color: '#FF3B30',
    marginTop: 4,
  },
  warningText: {
    fontSize: 12,
    color: '#FF9500',
    marginTop: 4,
  },
});
