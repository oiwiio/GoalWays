import { StyleSheet } from 'react-native';
import { colors, spacing, borderRadius, typography } from '../../../../shared/styles/theme';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors?.background || '#f5f5f5',
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors?.background || '#f5f5f5',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: spacing?.l || 16,
    paddingVertical: spacing?.m || 12,
    backgroundColor: colors?.surface || '#fff',
    borderBottomWidth: 1,
    borderBottomColor: colors?.borderLight || '#eee',
  },
  backButton: {
    fontSize: 28,
    color: colors?.primary || '#007AFF',
    padding: 4,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors?.text || '#1a1a1a',
    flex: 1,
    textAlign: 'center',
  },
  editButton: {
    fontSize: 24,
    color: colors?.primary || '#007AFF',
    padding: 4,
  },
  description: {
    fontSize: 16,
    color: colors?.textSecondary || '#666',
    paddingHorizontal: spacing?.l || 16,
    paddingVertical: spacing?.m || 12,
    lineHeight: 22,
  },
  progressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing?.l || 16,
    paddingVertical: spacing?.s || 8,
  },
  progressBar: {
    flex: 1,
    height: 8,
    backgroundColor: colors?.borderLight || '#e0e0e0',
    borderRadius: 4,
    overflow: 'hidden',
    marginRight: spacing?.s || 8,
  },
  progressFill: {
    height: '100%',
    backgroundColor: colors?.primary || '#007AFF',
    borderRadius: 4,
  },
  progressText: {
    fontSize: 14,
    fontWeight: '600',
    color: colors?.text || '#1a1a1a',
    minWidth: 45,
  },
  actionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: spacing?.l || 16,
    paddingVertical: spacing?.m || 12,
    gap: 12,
  },
  actionButton: {
    flex: 1,
    backgroundColor: colors?.primary || '#007AFF',
    paddingVertical: spacing?.s || 10,
    borderRadius: borderRadius?.m || 8,
    alignItems: 'center',
  },
  actionButtonText: {
    color: colors?.surface || '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  tasksContainer: {
    paddingHorizontal: spacing?.l || 16,
    paddingVertical: spacing?.s || 8,
  },
  tasksTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors?.text || '#1a1a1a',
    marginBottom: spacing?.s || 12,
  },
  emptyText: {
    fontSize: 14,
    color: colors?.textSecondary || '#999',
    textAlign: 'center',
    paddingVertical: spacing?.xl || 32,
  },
});