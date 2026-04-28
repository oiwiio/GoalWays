import { StyleSheet } from "react-native";
import { colors, spacing, borderRadius, typography } from '../../../../shared/styles/theme';

export const styles = StyleSheet.create({
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'flex-end',
    },
    modalContent: {
        backgroundColor: colors?.surface || '#fff',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        padding: spacing?.l || 20,
        minHeight: '80%',
        maxHeight: '90%',
    },
    modalTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        color: colors?.text || '#1a1a1a',
        marginBottom: spacing?.m || 20,
        textAlign: 'center',
    },
    inputGroup: {
        marginBottom: spacing?.m || 20,
    },
    label: {
        fontSize: 16,
        fontWeight: '600',
        color: colors?.textSecondary || '#333',
        marginBottom: spacing?.xs || 8,
    },
    input: {
        borderWidth: 1,
        borderColor: colors?.borderLight || '#ddd',
        borderRadius: borderRadius?.m || 10,
        padding: spacing?.s || 12,
        fontSize: 16,
        backgroundColor: colors?.background || '#f9f9f9',
    },
    textArea: {
        minHeight: 80,
        textAlignVertical: 'top',
    },
    hint: {
        fontSize: 12,
        color: colors?.textSecondary || '#999',
        marginTop: 4,
    },
    categoriesContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginTop: 10,
    },
    categoryChip: {
        backgroundColor: colors?.borderLight || '#f0f0f0',
        paddingHorizontal: spacing?.m || 15,
        paddingVertical: spacing?.xs || 8,
        borderRadius: borderRadius?.round || 20,
        marginRight: 10,
        marginBottom: 10,
    },
    categoryChipSelected: {
        backgroundColor: colors?.primary || '#007AFF',
    },
    categoryChipText: {
        color: colors?.textSecondary || '#666',
        fontSize: 14,
    },
    categoryChipTextSelected: {
        color: colors?.surface || '#fff',
    },
    priorityContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 8,
    },
    priorityButton: {
        flex: 1,
        paddingVertical: spacing?.s || 12,
        backgroundColor: colors?.borderLight || '#f0f0f0',
        borderRadius: borderRadius?.s || 8,
        marginHorizontal: 4,
        alignItems: 'center',
    },
    priorityButtonActive: {
        backgroundColor: colors?.primary || '#007AFF',
    },
    priorityButtonText: {
        fontSize: 14,
        color: colors?.textSecondary || '#333',
    },
    priorityButtonTextActive: {
        color: colors?.surface || '#fff',
    },
    statusContainer: {
        marginTop: 8,
    },
    statusButton: {
        paddingVertical: spacing?.s || 12,
        paddingHorizontal: spacing?.m || 16,
        backgroundColor: colors?.borderLight || '#f0f0f0',
        borderRadius: borderRadius?.s || 8,
        marginBottom: 8,
        alignItems: 'center',
    },
    statusButtonActive: {
        backgroundColor: colors?.primary || '#007AFF',
    },
    statusButtonText: {
        fontSize: 14,
        color: colors?.textSecondary || '#333',
    },
    statusButtonTextActive: {
        color: colors?.surface || '#fff',
    },
    tasksHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: spacing?.s || 12,
    },
    addButton: {
        color: colors?.primary || '#007AFF',
        fontSize: 14,
        fontWeight: '600',
    },
    emptyText: {
        color: colors?.textSecondary || '#999',
        fontSize: 14,
        textAlign: 'center',
        paddingVertical: spacing?.m || 20,
    },
    resultItem: {
        fontSize: 14,
        color: colors?.text || '#333',
        paddingVertical: 4,
        paddingHorizontal: spacing?.xs || 8,
        backgroundColor: colors?.borderLight || '#f0f0f0',
        borderRadius: borderRadius?.s || 4,
        marginBottom: 4,
    },
    resultButtons: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: spacing?.s || 12,
    },
    resultButton: {
        paddingVertical: spacing?.xs || 10,
        paddingHorizontal: spacing?.m || 20,
        backgroundColor: colors?.borderLight || '#f0f0f0',
        borderRadius: borderRadius?.s || 8,
        alignItems: 'center',
        flex: 1,
        marginHorizontal: 4,
    },
    resultButtonText: {
        fontSize: 14,
        color: colors?.textSecondary || '#333',
        fontWeight: '500',
    },
    buttonsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: spacing?.l || 20,
        paddingTop: spacing?.l || 20,
        borderTopWidth: 1,
        borderTopColor: colors?.borderLight || '#eee',
    },
    button: {
        flex: 1,
        paddingVertical: spacing?.m || 15,
        borderRadius: borderRadius?.m || 10,
        alignItems: 'center',
        marginHorizontal: 5,
    },
    cancelButton: {
        backgroundColor: colors?.borderLight || '#f0f0f0',
    },
    saveButton: {
        backgroundColor: colors?.primary || '#007AFF',
    },
    cancelButtonText: {
        color: colors?.textSecondary || '#666',
        fontSize: 16,
        fontWeight: '600',
    },
    saveButtonText: {
        color: colors?.surface || '#fff',
        fontSize: 16,
        fontWeight: '600',
    },
    errorText: {
        color: colors?.danger || '#ff3b30',
        fontSize: 12,
        marginTop: 4,
        marginLeft: 12,
    },
    serverErrorText: {
        color: colors?.danger || '#ff3b30',
        fontSize: 14,
        textAlign: 'center',
        marginBottom: spacing?.m || 16,
        paddingHorizontal: spacing?.m || 16,
    },
    disabledButton: {
        opacity: 0.6,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: spacing?.m || 16,
    },
});