import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  StyleSheet,
  Platform,
} from 'react-native';
import { colors, spacing, borderRadius, typography } from '../../../shared/styles/theme';

interface Props {
  visible: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export const DeleteAccountModal = ({ visible, onClose, onConfirm }: Props) => {
  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
      <View style={styles.overlay}>
        <View style={styles.modal}>
          <View style={styles.iconContainer}>
            <Text style={styles.icon}>⚠️</Text>
          </View>
          
          <Text style={styles.title}>Удалить аккаунт?</Text>
          
          <Text style={styles.message}>
            Это действие нельзя отменить. Все ваши данные будут безвозвратно удалены.
          </Text>
          
          <View style={styles.buttons}>
            <TouchableOpacity style={styles.cancelButton} onPress={onClose}>
              <Text style={styles.cancelButtonText}>Отмена</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.deleteButton} onPress={onConfirm}>
              <Text style={styles.deleteButtonText}>Удалить</Text>
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
    width: '80%',
    maxWidth: 400,
    alignItems: 'center',
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
  iconContainer: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: colors.surfaceLight,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing.m,
  },
  icon: {
    fontSize: 32,
  },
  title: {
    ...typography.h3,
    fontSize: 20,
    color: colors.text,
    marginBottom: spacing.s,
    textAlign: 'center',
  },
  message: {
    ...typography.bodySecondary,
    fontSize: 14,
    color: colors.textSecondary,
    marginBottom: spacing.l,
    textAlign: 'center',
    lineHeight: 20,
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: spacing.s,
    width: '100%',
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
  deleteButton: {
    flex: 1,
    paddingVertical: spacing.m,
    borderRadius: borderRadius.m,
    alignItems: 'center',
    backgroundColor: colors.danger,
    ...Platform.select({
      ios: {
        shadowColor: colors.danger,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  deleteButtonText: {
    ...typography.body,
    color: colors.text,
    fontWeight: '600',
  },
});