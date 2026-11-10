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
    minHeight: '70%',
    maxHeight: '90%',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  modalTitle: {
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
  scrollContent: {
    paddingBottom: 8,
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

  // Приоритет
  priorityContainer: {
    flexDirection: 'row',
    gap: 8,
  },
  priorityButton: {
    flex: 1,
    height: 44,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    paddingHorizontal: 8,
    borderRadius: 8,
    backgroundColor: ui.card,
  },
  priorityButtonActive: {
    backgroundColor: ui.accent,
  },
  priorityButtonText: {
    fontSize: 12,
    fontWeight: '500',
    color: ui.textMuted,
  },
  priorityButtonTextActive: {
    fontWeight: '700',
    color: ui.text,
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
});