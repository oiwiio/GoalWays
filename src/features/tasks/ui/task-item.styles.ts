import { StyleSheet } from 'react-native';
import { colors, spacing, borderRadius, typography } from '../../../shared/styles/theme';
import { Platform } from 'react-native';

export const taskItemStyles = StyleSheet.create({
  container: {
    backgroundColor: colors.surface,
    padding: spacing.m,
    marginHorizontal: spacing.m,
    marginVertical: spacing.xs,
    borderRadius: borderRadius.m,
    borderWidth: 1,
    borderColor: colors.border,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: {
        elevation: 2,
      },
    }),
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.xs,
  },
  priorityIcon: {
    fontSize: 16,
    marginRight: spacing.xs,
  },
  title: {
    ...typography.body,
    fontWeight: '600',
    color: colors.text,
    flex: 1,
  },
  description: {
    ...typography.caption,
    fontSize: 13,
    color: colors.textSecondary,
    marginBottom: spacing.xs,
    lineHeight: 18,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: spacing.xs,
  },
  date: {
    ...typography.caption,
    fontSize: 11,
    color: colors.textSecondary,
  },
  time: {
    ...typography.caption,
    fontSize: 11,
    color: colors.textSecondary,
  },
  progress: {
    ...typography.caption,
    fontSize: 12,
    fontWeight: '600',
    color: colors.primary,
  },
});