import { StyleSheet } from 'react-native';
import { ui } from '../../../../shared/styles/ui';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: ui.background,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: ui.background,
  },
  content: {
    paddingBottom: 24,
  },

  // Шапка: ← Название ✎
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingTop: 24,
    height: 80,
  },
  headerButton: {
    width: 32,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    flex: 1,
    marginHorizontal: 20,
    fontSize: 20,
    fontWeight: '600',
    color: ui.text,
  },

  description: {
    paddingHorizontal: 24,
    marginTop: 16,
    fontSize: 14,
    lineHeight: 20,
    color: ui.textMuted,
  },

  // Прогресс
  progressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 24,
    marginTop: 24,
  },
  progressBar: {
    flex: 1,
    height: 6,
    marginRight: 12,
    borderRadius: 3,
    overflow: 'hidden',
    backgroundColor: ui.border,
  },
  progressFill: {
    height: '100%',
    borderRadius: 3,
    backgroundColor: ui.text,
  },
  progressText: {
    minWidth: 36,
    textAlign: 'right',
    fontSize: 10,
    fontWeight: '700',
    color: ui.text,
  },

  // Кнопки действий
  actionsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingHorizontal: 24,
    marginTop: 24,
  },
  actionButton: {
    flex: 1,
  },

  // Задачи
  tasksContainer: {
    paddingHorizontal: 24,
    marginTop: 32,
  },
  tasksTitle: {
    fontSize: 10,
    color: ui.text,
    marginBottom: 8,
  },
  emptyText: {
    fontSize: 12,
    textAlign: 'center',
    color: ui.textMuted,
    paddingVertical: 32,
  },
});