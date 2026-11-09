import { Platform, StyleSheet } from "react-native";
import { colors, spacing, borderRadius, typography } from '../../../shared/styles/theme';

export const styles = StyleSheet.create({
    modalOverlay: {
        flex: 1,
        backgroundColor: colors.overlay,
        justifyContent: 'flex-end',
    },
    modalContent: {
        backgroundColor: colors.surface,
        borderTopLeftRadius: borderRadius.xl,
        borderTopRightRadius: borderRadius.xl,
        paddingHorizontal: spacing.l,
        paddingBottom: spacing.xl,
        minHeight: '70%',
        maxHeight: '90%',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: spacing.l,
        borderBottomWidth: 1,
        borderBottomColor: colors.border,
    },
    modalTitle: {
        ...typography.h2,
    },
    closeButton: {
        width: 32,
        height: 32,
        borderRadius: borderRadius.round,
        backgroundColor: colors.surfaceLight,
        justifyContent: 'center',
        alignItems: 'center',
    },
    closeButtonText: {
        fontSize: 18,
        color: colors.textSecondary,
    },
    scrollContent: {
        paddingVertical: spacing.m,
    },
    inputGroup: {
        marginBottom: spacing.l,
    },
    label: {
        ...typography.caption,
        marginBottom: spacing.xs,
    },
    required: {
        color: colors.danger,
    },
    input: {
        ...typography.body,
        backgroundColor: colors.surfaceLight,
        paddingHorizontal: spacing.m,
        paddingVertical: spacing.s,
        borderRadius: borderRadius.s,
        borderWidth: 1,
        borderColor: colors.border,
    },
    textArea: {
        minHeight: 80,
        textAlignVertical: 'top',
    },
    hint: {
        ...typography.caption,
        marginTop: spacing.xs,
    },
    categoriesContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginTop: spacing.s,
        gap: spacing.s,
    },
    categoryChip: {
        backgroundColor: colors.surfaceLight,
        paddingHorizontal: spacing.m,
        paddingVertical: spacing.s,
        borderRadius: borderRadius.round,
    },
    categoryChipSelected: {
        backgroundColor: colors.primary,
    },
    categoryChipText: {
        ...typography.caption,
    },
    categoryChipTextSelected: {
        color: colors.text,
        fontWeight: '600',
    },
    priorityContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        gap: spacing.s,
    },
    priorityButton: {
        flex: 1,
        paddingVertical: spacing.s,
        backgroundColor: colors.surfaceLight,
        borderRadius: borderRadius.s,
        alignItems: 'center',
    },
    priorityButtonActive: {
        backgroundColor: colors.primary,
    },
    priorityButtonText: {
        ...typography.bodySecondary,
        fontSize: 14,
    },
    priorityButtonTextActive: {
        color: colors.text,
        fontWeight: '600',
    },
    buttonsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        gap: spacing.m,
        paddingTop: spacing.m,
        borderTopWidth: 1,
        borderTopColor: colors.border,
    },
    button: {
        flex: 1,
        paddingVertical: spacing.m,
        borderRadius: borderRadius.m,
        alignItems: 'center',
    },
    cancelButton: {
        backgroundColor: colors.surfaceLight,
    },
    cancelButtonText: {
        ...typography.button,
        color: colors.textSecondary,
    },
    createButton: {
        backgroundColor: colors.primary,
        ...Platform.select({
            ios: {
                shadowColor: colors.primary,
                shadowOffset: { width: 0, height: 4 },
                shadowOpacity: 0.3,
                shadowRadius: 8,
            },
            android: {
                elevation: 4,
            },
        }),
    },
    createButtonText: {
        ...typography.button,
    },
});