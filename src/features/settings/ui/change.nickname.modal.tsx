import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Modal,
  Alert,
  StyleSheet,
  Platform,
} from 'react-native';
import { colors, spacing, borderRadius, typography } from '../../../shared/styles/theme';

interface Props {
  visible: boolean;
  onClose: () => void;
  onSave: (newNickname: string) => void;
  currentNickname: string;
}

export const ChangeNicknameModal = ({ visible, onClose, onSave, currentNickname }: Props) => {
  const [nickname, setNickname] = useState(currentNickname);
  const [confirmNickname, setConfirmNickname] = useState('');

  // Сбрасываем поля при открытии/закрытии
  useEffect(() => {
    if (visible) {
      setNickname(currentNickname);
      setConfirmNickname('');
    }
  }, [visible, currentNickname]);

  const handleSave = () => {
    if (!nickname || !confirmNickname) {
      Alert.alert('Ошибка', 'Заполните все поля');
      return;
    }
    if (nickname !== confirmNickname) {
      Alert.alert('Ошибка', 'Никнеймы не совпадают');
      return;
    }
    if (nickname === currentNickname) {
      Alert.alert('Ошибка', 'Никнейм не изменён');
      return;
    }
    if (nickname.length < 3) {
      Alert.alert('Ошибка', 'Никнейм должен содержать минимум 3 символа');
      return;
    }
    onSave(nickname);
  };

  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
      <View style={styles.overlay}>
        <View style={styles.modal}>
          <View style={styles.header}>
            <Text style={styles.title}>Сменить никнейм</Text>
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
              <Text style={styles.closeButtonText}>✕</Text>
            </TouchableOpacity>
          </View>

          <TextInput
            style={styles.input}
            placeholder="Новый никнейм"
            placeholderTextColor={colors.textSecondary}
            value={nickname}
            onChangeText={setNickname}
            autoCapitalize="none"
          />
          
          <TextInput
            style={styles.input}
            placeholder="Подтвердите никнейм"
            placeholderTextColor={colors.textSecondary}
            value={confirmNickname}
            onChangeText={setConfirmNickname}
            autoCapitalize="none"
          />
          
          <View style={styles.buttons}>
            <TouchableOpacity style={styles.cancelButton} onPress={onClose}>
              <Text style={styles.cancelButtonText}>Отмена</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
              <Text style={styles.saveButtonText}>Сохранить</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: colors.overlay,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modal: {
    backgroundColor: colors.surface,
    borderRadius: borderRadius.l,
    padding: spacing.l,
    width: '85%',
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
    marginBottom: spacing.l,
  },
  title: {
    ...typography.h3,
    fontSize: 20,
    color: colors.text,
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
  input: {
    ...typography.body,
    backgroundColor: colors.surfaceLight,
    color: colors.text,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: borderRadius.s,
    padding: spacing.s,
    marginBottom: spacing.m,
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: spacing.s,
    marginTop: spacing.s,
  },
  cancelButton: {
    flex: 1,
    paddingVertical: spacing.m,
    borderRadius: borderRadius.m,
    alignItems: 'center',
    backgroundColor: colors.surfaceLight,
  },
  cancelButtonText: {
    ...typography.body,
    color: colors.textSecondary,
    fontWeight: '600',
  },
  saveButton: {
    flex: 1,
    paddingVertical: spacing.m,
    borderRadius: borderRadius.m,
    alignItems: 'center',
    backgroundColor: colors.primary,
    ...Platform.select({
      ios: {
        shadowColor: colors.primary,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  saveButtonText: {
    ...typography.body,
    color: colors.text,
    fontWeight: '600',
  },
});