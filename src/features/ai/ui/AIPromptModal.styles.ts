import { StyleSheet } from "react-native";
import { colors, spacing, borderRadius } from '../../../shared/styles/theme';

export const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: colors?.surface || '#fff',
    borderRadius: borderRadius?.l || 20,
    padding: spacing?.l || 20,
    width: '90%',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors?.text || '#1a1a1a',
    marginBottom: spacing?.xs || 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 14,
    color: colors?.textSecondary || '#666',
    marginBottom: spacing?.l || 20,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: colors?.borderLight || '#ddd',
    borderRadius: borderRadius?.m || 10,
    padding: spacing?.s || 12,
    fontSize: 16,
    backgroundColor: colors?.background || '#f9f9f9',
    minHeight: 100,
  },
  textArea: {
    textAlignVertical: 'top',
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: spacing?.l || 20,
    gap: spacing?.s || 12,
  },
  button: {
    flex: 1,
    paddingVertical: spacing?.m || 12,
    borderRadius: borderRadius?.m || 10,
    alignItems: 'center',
  },
  cancelButton: {
    backgroundColor: colors?.borderLight || '#f0f0f0',
  },
  cancelButtonText: {
    color: colors?.textSecondary || '#666',
    fontSize: 16,
    fontWeight: '600',
  },
  submitButton: {
    backgroundColor: colors?.primary || '#007AFF',
  },
  submitButtonText: {
    color: colors?.surface || '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  disabledButton: {
    opacity: 0.6,
  },
});