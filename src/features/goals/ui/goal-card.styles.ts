import { StyleSheet } from "react-native";
import { colors, spacing, borderRadius, typography, shadows } from '../../../shared/styles/theme';

export const styles = StyleSheet.create({
    card: {
        backgroundColor: colors.surface,
        borderRadius: borderRadius.m,
        borderWidth: 1,
        borderColor: colors.borderLight,
        padding: spacing.m,
        marginHorizontal: spacing.m,
        marginVertical: spacing.s,
        ...shadows.small,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: spacing.s,
    },
    titleContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
    },
    priorityIcon: {
        fontSize: 16,
        marginRight: spacing.s,
    },
    title: {
        ...typography.h3,
        flex: 1,
    },
    menuButton: {
        fontSize: 24,
        paddingHorizontal: spacing.s,
        color: colors.textSecondary,
    },
    description: {
        ...typography.bodySecondary,
        fontSize: 14,
        lineHeight: 20,
        marginBottom: spacing.m,
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    leftFooter: {
        flexDirection: 'row',
        gap: spacing.s,
    },
    date: {
        ...typography.caption,
        fontSize: 13,
    },
    rightFooter: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: spacing.s,
    },
    statusBadge: {
        ...typography.caption,
        fontWeight: '600',
        paddingHorizontal: 10,
        paddingVertical: spacing.xs,
        borderRadius: borderRadius.round,
        overflow: 'hidden',
    },
    progress: {
        ...typography.buttonSmall,
    },
    modalOverlay: {
        flex: 1,
        backgroundColor: colors.overlay,
        justifyContent: 'center',
        alignItems: 'center',
    },
    menuContainer: {
        backgroundColor: colors.surface,
        borderRadius: borderRadius.m,
        borderWidth: 1,
        borderColor: colors.border,
        padding: spacing.s,
        minWidth: 220,
        ...shadows.large,
    },
    menuItem: {
        paddingVertical: spacing.m - 4,
        paddingHorizontal: spacing.m,
        borderRadius: borderRadius.xs,
    },
    menuItemText: {
        ...typography.body,
    },
    deleteItem: {
        borderTopWidth: 1,
        borderTopColor: colors.border,
    },
    deleteText: {
        color: colors.danger,
    },
});