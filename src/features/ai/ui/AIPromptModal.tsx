import React, { useState } from 'react';
import {
  Modal,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
} from 'react-native';
import { styles } from './AIPromptModal.styles'

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

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <Text style={styles.title}>AI помощник</Text>
          <Text style={styles.subtitle}>
            Опишите, что вы хотите сделать или улучшить в этой цели
          </Text>

          <TextInput
            style={[styles.input, styles.textArea]}
            value={prompt}
            onChangeText={setPrompt}
            placeholder="Например: помоги мне сварить пельмени..."
            multiline
            numberOfLines={4}
            textAlignVertical="top"
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
                <ActivityIndicator size="small" color="#fff" />
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

