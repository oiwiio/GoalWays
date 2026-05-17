import { StyleSheet } from "react-native";
import { colors, spacing, borderRadius, typography } from '../../../../shared/styles/theme';

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
        padding: spacing.l,
        minHeight: '80%',
        maxHeight: '90%',
    },
    modalTitle: {
        ...typography.h2,
        fontSize: 24,
        color: colors.text,
        marginBottom: spacing.m,
        textAlign: 'center',
    },
    inputGroup: {
        marginBottom: spacing.m,
    },
    label: {
        ...typography.caption,
        color: colors.textSecondary,
        marginBottom: spacing.xs,
    },
    input: {
        ...typography.body,
        backgroundColor: colors.surfaceLight,
        color: colors.text,
        borderWidth: 1,
        borderColor: colors.border,
        borderRadius: borderRadius.s,
        padding: spacing.s,
    },
    textArea: {
        minHeight: 80,
        textAlignVertical: 'top',
    },
    hint: {
        ...typography.caption,
        color: colors.textSecondary,
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
        paddingVertical: spacing.xs,
        borderRadius: borderRadius.round,
    },
    categoryChipSelected: {
        backgroundColor: colors.primary,
    },
    categoryChipText: {
        ...typography.caption,
        color: colors.textSecondary,
    },
    categoryChipTextSelected: {
        color: colors.text,
        fontWeight: '600',
    },
    priorityContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: spacing.xs,
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
        ...typography.body,
        fontSize: 14,
        color: colors.textSecondary,
    },
    priorityButtonTextActive: {
        color: colors.text,
        fontWeight: '600',
    },
    statusContainer: {
        marginTop: spacing.xs,
        gap: spacing.s,
    },
    statusButton: {
        paddingVertical: spacing.s,
        backgroundColor: colors.surfaceLight,
        borderRadius: borderRadius.s,
        alignItems: 'center',
    },
    statusButtonActive: {
        backgroundColor: colors.primary,
    },
    statusButtonText: {
        ...typography.body,
        fontSize: 14,
        color: colors.textSecondary,
    },
    statusButtonTextActive: {
        color: colors.text,
        fontWeight: '600',
    },
    tasksHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: spacing.s,
    },
    addButton: {
        color: colors.primary,
        fontSize: 14,
        fontWeight: '600',
    },
    emptyText: {
        ...typography.caption,
        color: colors.textSecondary,
        textAlign: 'center',
        paddingVertical: spacing.l,
    },
    resultItem: {
        ...typography.body,
        fontSize: 14,
        color: colors.text,
        paddingVertical: spacing.xs,
        paddingHorizontal: spacing.s,
        backgroundColor: colors.surfaceLight,
        borderRadius: borderRadius.xs,
        marginBottom: spacing.xs,
    },
    resultButtons: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: spacing.s,
        gap: spacing.s,
    },
    resultButton: {
        flex: 1,
        paddingVertical: spacing.s,
        backgroundColor: colors.surfaceLight,
        borderRadius: borderRadius.s,
        alignItems: 'center',
    },
    resultButtonText: {
        ...typography.body,
        fontSize: 14,
        color: colors.textSecondary,
        fontWeight: '500',
    },
    buttonsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: spacing.l,
        paddingTop: spacing.l,
        borderTopWidth: 1,
        borderTopColor: colors.border,
        gap: spacing.s,
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
    saveButton: {
        backgroundColor: colors.primary,
    },
    cancelButtonText: {
        ...typography.body,
        color: colors.textSecondary,
        fontWeight: '600',
    },
    saveButtonText: {
        ...typography.body,
        color: colors.text,
        fontWeight: '600',
    },
    errorText: {
        ...typography.caption,
        color: colors.danger,
        marginTop: spacing.xs,
    },
    serverErrorText: {
        ...typography.caption,
        color: colors.danger,
        textAlign: 'center',
        marginVertical: spacing.s,
    },
    disabledButton: {
        opacity: 0.6,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: spacing.m,
        gap: spacing.s,
    },
});