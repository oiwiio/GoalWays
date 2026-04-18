import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'flex-end',
    },
    modalContent: {
        backgroundColor: '#fff',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        padding: 20,
        minHeight: '80%',
        maxHeight: '90%',
    },
    modalTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#1a1a1a',
        marginBottom: 20,
        textAlign: 'center',
    },
    inputGroup: {
        marginBottom: 20,
    },
    label: {
        fontSize: 16,
        fontWeight: '600',
        color: '#333',
        marginBottom: 8,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 10,
        padding: 12,
        fontSize: 16,
        backgroundColor: '#f9f9f9',
    },
    textArea: {
        minHeight: 80,
        textAlignVertical: 'top',
    },
    hint: {
        fontSize: 12,
        color: '#999',
        marginTop: 4,
    },
    categoriesContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginTop: 10,
    },
    categoryChip: {
        backgroundColor: '#f0f0f0',
        paddingHorizontal: 15,
        paddingVertical: 8,
        borderRadius: 20,
        marginRight: 10,
        marginBottom: 10,
    },
    categoryChipSelected: {
        backgroundColor: '#007AFF',
    },
    categoryChipText: {
        color: '#666',
        fontSize: 14,
    },
    categoryChipTextSelected: {
        color: '#fff',
    },
    priorityContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 8,
    },
    priorityButton: {
        flex: 1,
        paddingVertical: 12,
        backgroundColor: '#f0f0f0',
        borderRadius: 8,
        marginHorizontal: 4,
        alignItems: 'center',
    },
    priorityButtonActive: {
        backgroundColor: '#007AFF',
    },
    priorityButtonText: {
        fontSize: 14,
        color: '#333',
    },
    priorityButtonTextActive: {
        color: '#fff',
    },
    statusContainer: {
        marginTop: 8,
    },
    statusButton: {
        paddingVertical: 12,
        paddingHorizontal: 16,
        backgroundColor: '#f0f0f0',
        borderRadius: 8,
        marginBottom: 8,
        alignItems: 'center',
    },
    statusButtonActive: {
        backgroundColor: '#007AFF',
    },
    statusButtonText: {
        fontSize: 14,
        color: '#333',
    },
    statusButtonTextActive: {
        color: '#fff',
    },
    buttonsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 20,
        paddingTop: 20,
        borderTopWidth: 1,
        borderTopColor: '#eee',
    },
    button: {
        flex: 1,
        paddingVertical: 15,
        borderRadius: 10,
        alignItems: 'center',
        marginHorizontal: 5,
    },
    cancelButton: {
        backgroundColor: '#f0f0f0',
    },
    saveButton: {
        backgroundColor: '#007AFF',
    },
    cancelButtonText: {
        color: '#666',
        fontSize: 16,
        fontWeight: '600',
    },
    saveButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
    },

    tasksHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 12,
    },
    addButton: {
        color: '#007AFF',
        fontSize: 14,
        fontWeight: '600',
    },
    emptyText: {
        color: '#999',
        fontSize: 14,
        textAlign: 'center',
        paddingVertical: 20,
    },
    taskItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 12,
        paddingHorizontal: 16,
        backgroundColor: '#f9f9f9',
        borderRadius: 8,
        marginBottom: 8,
    },
    taskTitle: {
        fontSize: 16,
        color: '#333',
        flex: 1,
    },
    taskProgress: {
        fontSize: 14,
        color: '#666',
        marginLeft: 8,
    },

    resultItem: {
     fontSize: 14,
     color: '#333',
     paddingVertical: 4,
     paddingHorizontal: 8,
     backgroundColor: '#f0f0f0',
     borderRadius: 4,
     marginBottom: 4,
    },
    resultButtons: {
     flexDirection: 'row',
     justifyContent: 'space-around',
    marginTop: 12,
    },
    resultButton: {
      paddingVertical: 10,
      paddingHorizontal: 20,
      backgroundColor: '#f0f0f0',
      borderRadius: 8,
      alignItems: 'center',
      flex: 1,
      marginHorizontal: 4,
    },
    resultButtonText: {
      fontSize: 14,
      color: '#333',
      fontWeight: '500',
    },
    row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
    },

    headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
    },
    backButton: {
        fontSize: 28,
        color: '#007AFF',
        padding: 4,
    },
    editButton: {
        fontSize: 24,
        color: '#007AFF',
        padding: 4,
    },
    
    halfColumn: {
        flex: 1,
    },
    descriptionText: {
        fontSize: 16,
        color: '#333',
        lineHeight: 22,
    },
    valueText: {
        fontSize: 16,
        color: '#000',
        fontWeight: '500',
        marginTop: 4,
    },
    errorText: {
    color: '#ff3b30',
    fontSize: 12,
    marginTop: 4,
    marginLeft: 12,
    },

    }); 