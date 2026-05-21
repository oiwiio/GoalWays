import { colors, spacing, borderRadius, typography } from '../../../shared/styles/theme';
import { StyleSheet } from 'react-native';

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
    maxHeight: '85%',
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
  taskItem: {
    flexDirection: 'row',
    paddingVertical: spacing?.s || 12,
    paddingHorizontal: spacing?.s || 12,
    borderBottomWidth: 1,
    borderBottomColor: colors?.borderLight || '#eee',
  },
  checkboxContainer: {
    marginRight: spacing?.s || 12,
    justifyContent: 'center',
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: colors?.primary || '#007AFF',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  checkboxSelected: {
    backgroundColor: colors?.primary || '#007AFF',
  },
  checkmark: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  taskContent: {
    flex: 1,
  },
  taskTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors?.text || '#1a1a1a',
    marginBottom: spacing?.xs || 4,
  },
  taskDescription: {
    fontSize: 14,
    color: colors?.textSecondary || '#666',
    marginBottom: spacing?.xs || 4,
  },
  taskMeta: {
    flexDirection: 'row',
    gap: spacing?.s || 12,
  },
  priority: {
    fontSize: 12,
    paddingHorizontal: spacing?.xs || 8,
    paddingVertical: 2,
    borderRadius: borderRadius?.s || 4,
    overflow: 'hidden',
  },
  priorityHigh: {
    backgroundColor: '#FFE5E5',
    color: '#FF3B30',
  },
  priorityMedium: {
    backgroundColor: '#FFF0E5',
    color: '#FF9500',
  },
  priorityLow: {
    backgroundColor: '#E5F5E5',
    color: '#34C759',
  },
  estimated: {
    fontSize: 12,
    color: '#666',
  },
  statsContainer: {
    paddingVertical: spacing?.s || 12,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: colors?.borderLight || '#eee',
    marginVertical: spacing?.s || 12,
  },
  statsText: {
    fontSize: 14,
    color: colors?.textSecondary || '#666',
    textAlign: 'center',
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: spacing?.s || 8,
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
    fontSize: 14,
    fontWeight: '600',
  },
  addAllButton: {
    backgroundColor: colors?.borderLight || '#f0f0f0',
  },
  addAllButtonText: {
    color: colors?.textSecondary || '#666',
    fontSize: 14,
    fontWeight: '600',
  },
  addButton: {
    backgroundColor: colors?.primary || '#007AFF',
  },
  addButtonText: {
    color: colors?.surface || '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  disabledButton: {
    opacity: 0.5,
  },
});