import { StyleSheet } from 'react-native';
import { ui } from '../../../shared/styles/ui';

export const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.6)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: '90%',
    maxWidth: 400,
    maxHeight: '85%',
    padding: 24,
    borderRadius: 24,
    backgroundColor: ui.background,
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    color: ui.text,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 12,
    lineHeight: 18,
    color: ui.textMuted,
    marginBottom: 20,
  },

  // Строка задачи
  taskItem: {
    flexDirection: 'row',
    padding: 12,
    marginBottom: 8,
    borderRadius: 12,
    backgroundColor: ui.card,
  },
  checkboxContainer: {
    marginRight: 12,
    justifyContent: 'center',
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 6,
    borderWidth: 1.5,
    borderColor: ui.border,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxSelected: {
    borderColor: ui.accent,
    backgroundColor: ui.accent,
  },
  taskContent: {
    flex: 1,
  },
  taskTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: ui.text,
    marginBottom: 4,
  },
  taskDescription: {
    fontSize: 12,
    lineHeight: 18,
    color: ui.textMuted,
    marginBottom: 8,
  },
  taskMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  priority: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 10,
  },
  priorityText: {
    fontSize: 10,
    fontWeight: '600',
  },
  estimated: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  estimatedText: {
    fontSize: 10,
    color: ui.textMuted,
  },

  statsContainer: {
    marginVertical: 12,
  },
  statsText: {
    fontSize: 12,
    textAlign: 'center',
    color: ui.textMuted,
  },

  // Кнопки: «Добавить выбранные» сверху, «Отмена» и «Добавить все» под ней
  buttonsContainer: {
    gap: 12,
  },
  buttonsRow: {
    flexDirection: 'row',
    gap: 12,
  },
  buttonFlex: {
    flex: 1,
  },
});