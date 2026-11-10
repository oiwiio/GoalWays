import { StyleSheet } from 'react-native';
import { ui } from '../../../../shared/styles/ui';

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
  modalContentCompact: {
    minHeight: undefined,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: ui.text,
    marginBottom: 24,
  },

  // Группы без Input (подпись как у Input)
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 10,
    color: ui.text,
    marginBottom: 8,
  },
  inputTight: {
    marginBottom: 8,
  },

  // Выбор приоритета / статуса
  optionsRow: {
    flexDirection: 'row',
    gap: 8,
  },
  optionsColumn: {
    gap: 8,
  },
  option: {
    height: 44,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    paddingHorizontal: 8,
    borderRadius: 8,
    backgroundColor: ui.card,
  },
  optionFlex: {
    flex: 1,
  },
  optionActive: {
    backgroundColor: ui.accent,
  },
  optionText: {
    fontSize: 12,
    fontWeight: '500',
    color: ui.textMuted,
  },
  optionTextActive: {
    fontWeight: '700',
    color: ui.text,
  },

  // Категории
  categoriesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  categoryChip: {
    height: 32,
    paddingHorizontal: 14,
    borderRadius: 16,
    justifyContent: 'center',
    backgroundColor: ui.card,
  },
  categoryChipSelected: {
    backgroundColor: ui.accent,
  },
  categoryChipText: {
    fontSize: 12,
    color: ui.textMuted,
  },
  categoryChipTextSelected: {
    fontWeight: '700',
    color: ui.text,
  },

  // Задачи
  tasksHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  tasksHeaderLabel: {
    fontSize: 10,
    color: ui.text,
  },
  addLink: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  addLinkText: {
    fontSize: 12,
    fontWeight: '700',
    color: ui.text,
  },
  emptyText: {
    fontSize: 12,
    textAlign: 'center',
    color: ui.textMuted,
    paddingVertical: 16,
  },

  // Результаты
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
  resultButtons: {
    flexDirection: 'row',
    gap: 8,
    marginTop: 4,
  },

  // Нижние кнопки
  buttonsContainer: {
    flexDirection: 'row',
    gap: 12,
    paddingTop: 16,
  },
  buttonFlex: {
    flex: 1,
  },
  serverErrorText: {
    fontSize: 10,
    textAlign: 'center',
    color: ui.danger,
    marginTop: 8,
  },
});