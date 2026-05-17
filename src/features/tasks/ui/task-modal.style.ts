import { StyleSheet, Platform } from 'react-native';
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
        padding: spacing.l,
        minHeight: '60%',
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
    priorityContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        gap: spacing.s,
        marginTop: spacing.xs,
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
});