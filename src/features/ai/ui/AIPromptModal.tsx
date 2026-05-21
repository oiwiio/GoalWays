import React, { useState } from 'react';
import {
  Modal,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
  Platform,
} from 'react-native';
import { colors, spacing, borderRadius, typography } from '../../../shared/styles/theme';

interface AIPromptModalProps {
  visible: boolean;
  isLoading: boolean;
  onSubmit: (prompt: string) => void;
  onClose: () => void;
}

export const AIPromptModal = ({ visible, isLoading, onSubmit, onClose }: AIPromptModalProps) => {
  const [prompt, setPrompt] = useState('');

  const handleSubmit = () => {
    if (!prompt.trim()) return;
    onSubmit(prompt.trim());
    setPrompt('');
  };

  console.log('AIPromptModal рендер, visible:', visible);

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      onRequestClose={onClose}
      statusBarTranslucent={true}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <View style={styles.header}>
            <Text style={styles.title}>AI помощник</Text>
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
              <Text style={styles.closeButtonText}>✕</Text>
            </TouchableOpacity>
          </View>
          
          <Text style={styles.subtitle}>
            Опишите, что вы хотите сделать или улучшить в этой цели
          </Text>

          <TextInput
            style={[styles.input, styles.textArea]}
            value={prompt}
            onChangeText={setPrompt}
            placeholder="Например: помоги мне сварить пельмени..."
            placeholderTextColor={colors.textSecondary}
            multiline
            numberOfLines={4}
            textAlignVertical="top"
            autoFocus={true}
          />

          <View style={styles.buttonsContainer}>
            <TouchableOpacity
              style={[styles.button, styles.cancelButton]}
              onPress={onClose}
              disabled={isLoading}
            >
              <Text style={styles.cancelButtonText}>Отмена</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.button,
                styles.submitButton,
                (!prompt.trim() || isLoading) && styles.disabledButton,
              ]}
              onPress={handleSubmit}
              disabled={!prompt.trim() || isLoading}
            >
              {isLoading ? (
                <ActivityIndicator size="small" color={colors.text} />
              ) : (
                <Text style={styles.submitButtonText}>Отправить</Text>
              )}
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: colors.surface,
    borderRadius: borderRadius.l,
    padding: spacing.l,
    width: '90%',
    maxWidth: 400,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
      },
      android: {
        elevation: 5,
      },
    }),
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.m,
  },
  closeButton: {
    width: 32,
    height: 32,
    borderRadius: borderRadius.round,
    backgroundColor: colors.surfaceLight,
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeButtonText: {
    fontSize: 18,
    color: colors.textSecondary,
  },
  title: {
    ...typography.h3,
    fontSize: 20,
    color: colors.text,
  },
  subtitle: {
    ...typography.bodySecondary,
    fontSize: 14,
    marginBottom: spacing.l,
    color: colors.textSecondary,
  },
  input: {
    ...typography.body,
    backgroundColor: colors.surfaceLight,
    color: colors.text,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: borderRadius.s,
    padding: spacing.s,
    minHeight: 100,
  },
  textArea: {
    textAlignVertical: 'top',
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: spacing.l,
    gap: spacing.s,
  },
  button: {
    flex: 1,
    paddingVertical: spacing.m,
    borderRadius: borderRadius.m,
    alignItems: 'center',
  },
  cancelButton: {
    backgroundColor: colors.surfaceLight,
  },
  cancelButtonText: {
    ...typography.body,
    color: colors.textSecondary,
    fontWeight: '600',
  },
  submitButton: {
    backgroundColor: colors.primary,
  },
  submitButtonText: {
    ...typography.body,
    color: colors.text,
    fontWeight: '600',
  },
  disabledButton: {
    opacity: 0.6,
  },
});