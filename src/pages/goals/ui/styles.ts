import { StyleSheet } from "react-native";
import { colors, spacing, borderRadius, typography, shadows } from '../../../shared/styles/theme';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: spacing.l,
        paddingVertical: spacing.m,
        backgroundColor: colors.surface,
        borderBottomWidth: 1,
        borderBottomColor: colors.borderLight,
    },
    title: {
        ...typography.h1,
    },
    addButton: {
        width: 44,
        height: 44,
        borderRadius: borderRadius.round,
        backgroundColor: colors.primary,
        justifyContent: 'center',
        alignItems: 'center',
    },
    addButtonText: {
        fontSize: 28,
        color: colors.surface,
        fontWeight: '600',
        lineHeight: 32,
    },
    listContent: {
        paddingVertical: spacing.s,
    },
    emptyContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: spacing.xl,
    },
    emptyText: {
        ...typography.body,
        color: colors.textSecondary,
        textAlign: 'center',
        marginBottom: spacing.l,
    },
    emptyButton: {
        backgroundColor: colors.primary,
        paddingHorizontal: spacing.xl,
        paddingVertical: spacing.m,
        borderRadius: borderRadius.round,
    },
    emptyButtonText: {
        ...typography.button,
        color: colors.surface,
    },
    
    tabScrollContainer: {
    flexGrow: 1,
    paddingHorizontal: spacing.m,
    paddingVertical: spacing.s,
    gap: spacing.s,
    },
    tab: {
      paddingHorizontal: spacing.m,
      paddingVertical: spacing.xs,
      borderRadius: borderRadius.round,  
      backgroundColor: colors.borderLight,
      alignItems: 'center',
      justifyContent: 'center',
      minWidth: 60,
      height: 36,
    },
    activeTab: {
      backgroundColor: colors.primary,
    },
    tabText: {
      fontSize: 12,
      color: colors.textSecondary,
      fontWeight: '500',
    },
    activeTabText: {
      color: colors.surface,
      fontWeight: '600',
    },
    
    errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: spacing.xl,
    },
    errorText: {
        ...typography.body,
        color: colors.danger,
        textAlign: 'center',
        marginBottom: spacing.m,
    },
    retryButton: {
        backgroundColor: colors.primary,
        paddingHorizontal: spacing.l,
        paddingVertical: spacing.m,
        borderRadius: borderRadius.round,
    },
    retryButtonText: {
        ...typography.button,
        color: colors.surface,
    },

});