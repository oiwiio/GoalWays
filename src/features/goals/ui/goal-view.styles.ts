import { StyleSheet } from 'react-native';
import { ui } from '../../../shared/styles/ui';

export const styles = StyleSheet.create({
  // Шторка
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.6)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: ui.background,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingHorizontal: 24,
    paddingTop: 24,
    paddingBottom: 24,
    minHeight: '80%',
    maxHeight: '90%',
  },

  // Шапка: ← Название ✎
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  headerButton: {
    width: 32,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalTitle: {
    flex: 1,
    marginHorizontal: 12,
    fontSize: 20,
    fontWeight: '600',
    color: ui.text,
  },

  // Блоки
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 10,
    color: ui.text,
    marginBottom: 8,
  },
  row: {
    flexDirection: 'row',
    gap: 16,
    marginBottom: 20,
  },
  halfColumn: {
    flex: 1,
  },
  descriptionText: {
    fontSize: 14,
    lineHeight: 20,
    color: ui.textMuted,
  },
  valueRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  valueText: {
    fontSize: 14,
    fontWeight: '600',
    color: ui.text,
  },

  // Задачи / результаты
  emptyText: {
    fontSize: 12,
    textAlign: 'center',
    color: ui.textMuted,
    paddingVertical: 16,
  },
  resultItem: {
    fontSize: 12,
    color: ui.text,
    paddingVertical: 12,
    paddingHorizontal: 12,
    borderRadius: 8,
    backgroundColor: ui.card,
    marginBottom: 8,
    overflow: 'hidden',
  },
});