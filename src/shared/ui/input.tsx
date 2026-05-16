import React from 'react';
import { View, Text, TextInput, StyleSheet, ViewStyle, TextStyle, KeyboardTypeOptions} from 'react-native';
import { colors, spacing, borderRadius, typography } from '../styles/theme';

interface InputProps {
  label?: string;
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  secureTextEntry?: boolean;
  error?: string;
  style?: ViewStyle;
  inputStyle?: TextStyle;
  multiline?: boolean;
  numberOfLines?: number;
  keyboardType?: KeyboardTypeOptions;  
  autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters';  
  onBlur?: () => void;  
  onFocus?: () => void; 
}

export const Input = ({
  label,
  value,
  onChangeText,
  placeholder,
  secureTextEntry,
  error,
  style,
  inputStyle,
  multiline,
  numberOfLines,
}: InputProps) => {
  return (
    <View style={[styles.container, style]}>
      {label && <Text style={styles.label}>{label}</Text>}
      <TextInput
        style={[
          styles.input,
          multiline && styles.textArea,
          error && styles.inputError,
          inputStyle,
        ]}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={colors.textSecondary}
        secureTextEntry={secureTextEntry}
        multiline={multiline}
        numberOfLines={numberOfLines}
      />
      {error && <Text style={styles.error}>{error}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: spacing.m,
  },
  label: {
    ...typography.caption,
    color: colors.textSecondary,
    marginBottom: spacing.xs,
  },
  input: {
    ...typography.body,
    backgroundColor: colors.surface,
    color: colors.text,
    paddingHorizontal: spacing.m,
    paddingVertical: spacing.s,
    borderRadius: borderRadius.s,
    borderWidth: 1,
    borderColor: colors.border,
  },
  textArea: {
    minHeight: 80,
    textAlignVertical: 'top',
  },
  inputError: {
    borderColor: colors.danger,
  },
  error: {
    ...typography.caption,
    color: colors.danger,
    marginTop: spacing.xs,
  },
});