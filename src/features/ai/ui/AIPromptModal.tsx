import React, { useState } from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { X } from 'lucide-react-native';
import { Input } from '../../../shared/ui/input';
import { Button } from '../../../shared/ui/button';
import { ui } from '../../../shared/styles/ui';

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
      statusBarTranslucent={true}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <View style={styles.header}>
            <Text style={styles.title}>AI помощник</Text>
            <TouchableOpacity
              onPress={onClose}
              style={styles.closeButton}
              hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
            >
              <X size={18} strokeWidth={1.75} color={ui.text} />
            </TouchableOpacity>
          </View>

          <Text style={styles.subtitle}>
            Опишите, что вы хотите сделать или улучшить в этой цели
          </Text>

          <Input
            value={prompt}
            onChangeText={setPrompt}
            placeholder="Например: помоги мне сварить пельмени..."
            multiline
            numberOfLines={4}
            autoFocus={true}
          />

          <View style={styles.buttonsContainer}>
            <Button
              title="Отмена"
              variant="secondary"
              onPress={onClose}
              disabled={isLoading}
              style={styles.buttonFlex}
            />
            <Button
              title="Отправить"
              onPress={handleSubmit}
              loading={isLoading}
              disabled={!prompt.trim()}
              style={styles.buttonFlex}
            />
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.6)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: '90%',
    maxWidth: 400,
    padding: 24,
    borderRadius: 24,
    backgroundColor: ui.background,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    color: ui.text,
  },
  closeButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: ui.card,
    justifyContent: 'center',
    alignItems: 'center',
  },
  subtitle: {
    fontSize: 12,
    lineHeight: 18,
    color: ui.textMuted,
    marginBottom: 20,
  },
  buttonsContainer: {
    flexDirection: 'row',
    gap: 12,
  },
  buttonFlex: {
    flex: 1,
  },
});