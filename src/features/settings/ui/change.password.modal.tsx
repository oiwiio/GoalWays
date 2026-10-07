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
  onSave: (oldPassword: string, newPassword: string) => void;
}

export const ChangePasswordModal = ({ visible, onClose, onSave }: Props) => {
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // Сбрасываем поля при открытии/закрытии
  useEffect(() => {
    if (!visible) {
      setOldPassword('');
      setNewPassword('');
      setConfirmPassword('');
    }
  }, [visible]);

  const handleSave = () => {
    if (!oldPassword || !newPassword || !confirmPassword) {
      Alert.alert('Ошибка', 'Заполните все поля');
      return;
    }
    if (newPassword !== confirmPassword) {
      Alert.alert('Ошибка', 'Новые пароли не совпадают');
      return;
    }
    if (newPassword.length < 6) {
      Alert.alert('Ошибка', 'Новый пароль должен содержать минимум 6 символов');
      return;
    }
    if (oldPassword === newPassword) {
      Alert.alert('Ошибка', 'Новый пароль должен отличаться от старого');
      return;
    }
    onSave(oldPassword, newPassword);
  };

  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
      <View style={styles.overlay}>
        <View style={styles.modal}>
          <View style={styles.header}>
            <Text style={styles.title}>Сменить пароль</Text>
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
              <Text style={styles.closeButtonText}>✕</Text>
            </TouchableOpacity>
          </View>

          <TextInput
            style={styles.input}
            placeholder="Старый пароль"
            placeholderTextColor={colors.textSecondary}
            value={oldPassword}
            onChangeText={setOldPassword}
            secureTextEntry
          />
          
          <TextInput
            style={styles.input}
            placeholder="Новый пароль"
            placeholderTextColor={colors.textSecondary}
            value={newPassword}
            onChangeText={setNewPassword}
            secureTextEntry
          />
          
          <TextInput
            style={styles.input}
            placeholder="Подтвердите новый пароль"
            placeholderTextColor={colors.textSecondary}
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            secureTextEntry
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