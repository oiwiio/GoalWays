import { StyleSheet } from 'react-native';
import { colors, spacing, borderRadius, typography, shadows } from '../../../shared/styles/theme';

export const taskItemStyles = StyleSheet.create({
  container: {
    backgroundColor: colors.surface,
    padding: spacing.m,
    marginHorizontal: spacing.m,
    marginVertical: spacing.xs,
    borderRadius: borderRadius.m,
    borderWidth: 1,
    borderColor: colors.borderLight,
    ...shadows.small,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.xs,
  },
  priorityIcon: {
    fontSize: 16,
    marginRight: spacing.s,
  },
  title: {
    ...typography.body,
    fontWeight: '600',
    flex: 1,
  },
  description: {
    ...typography.bodySecondary,
    fontSize: 13,
    lineHeight: 18,
    marginBottom: spacing.s,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: spacing.xs,
  },
  date: {
    ...typography.caption,
  },
  time: {
    ...typography.caption,
  },
  progress: {
    ...typography.buttonSmall,
    fontSize: 12,
    color: colors.primary,
  },
});