import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  StyleProp,
  ViewStyle,
  TextStyle,
  TextInputProps,
} from 'react-native';
import { ui } from '../styles/ui';

interface InputProps extends Omit<TextInputProps, 'style'> {
  label?: string;
  value: string;
  onChangeText: (text: string) => void;
  error?: string;
  style?: StyleProp<ViewStyle>; // стиль контейнера
  inputStyle?: StyleProp<TextStyle>; // стиль самого поля
}

// Поле как на экране «Аккаунт»: подпись сверху, тёмная карточка.
// Все остальные props TextInput (keyboardType, autoCapitalize, onBlur, onFocus, ...)
// пробрасываются в TextInput.
export const Input = ({
  label,
  error,
  style,
  inputStyle,
  multiline,
  onFocus,
  onBlur,
  ...rest
}: InputProps) => {
  const [focused, setFocused] = useState(false);

  return (
    <View style={[styles.container, style]}>
      {label ? <Text style={styles.label}>{label}</Text> : null}
      <TextInput
        {...rest}
        multiline={multiline}
        style={[
          styles.input,
          multiline && styles.textArea,
          focused && styles.inputFocused,
          !!error && styles.inputError,
          inputStyle,
        ]}
        placeholderTextColor={ui.textMuted}
        selectionColor={ui.text}
        onFocus={(e) => {
          setFocused(true);
          onFocus?.(e);
        }}
        onBlur={(e) => {
          setFocused(false);
          onBlur?.(e);
        }}
      />
      {error ? <Text style={styles.error}>{error}</Text> : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
  label: {
    fontSize: 10,
    color: ui.text,
    marginBottom: 8,
  },
  input: {
    minHeight: 56,
    paddingHorizontal: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'transparent',
    backgroundColor: ui.card,
    fontSize: 14,
    fontWeight: '600',
    color: ui.text,
  },
  textArea: {
    minHeight: 96,
    paddingTop: 16,
    textAlignVertical: 'top',
  },
  inputFocused: {
    borderColor: ui.border,
  },
  inputError: {
    borderColor: ui.danger,
  },
  error: {
    marginTop: 6,
    fontSize: 10,
    color: ui.danger,
  },
});