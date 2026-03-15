import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    card: {
        backgroundColor: '#ffffff',
        padding: 16,
        marginHorizontal: 16,
        marginVertical: 8,
        borderBottomWidth: 1,
        borderBottomColor: '#e0e0e0',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 8,
    },
    titleContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
    },
    priorityIcon: {
        fontSize: 16,
        marginRight: 8,
    },
    title: {
        fontSize: 18,
        fontWeight: '600',
        color: '#000000',
        flex: 1,
    },
    menuButton: {
        fontSize: 24,
        padding: 4,
        color: '#666666',
    },
    description: {
        fontSize: 14,
        color: '#666666',
        marginBottom: 12,
        lineHeight: 20,
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    date: {
        fontSize: 13,
        color: '#666666',
    },
    rightFooter: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    statusBadge: {
        fontSize: 12,
        color: '#666666',
        marginRight: 8,
        backgroundColor: '#f0f0f0',
        paddingHorizontal: 8,
        paddingVertical: 2,
        borderRadius: 4,
    },
    progress: {
        fontSize: 14,
        fontWeight: '500',
        color: '#000000',
    },
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    menuContainer: {
        backgroundColor: '#ffffff',
        borderRadius: 12,
        padding: 8,
        minWidth: 200,
    },
    menuItem: {
        paddingVertical: 12,
        paddingHorizontal: 16,
        borderRadius: 8,
    },
    menuItemText: {
        fontSize: 16,
        color: '#333',
    },
    deleteItem: {
        borderTopWidth: 1,
        borderTopColor: '#f0f0f0',
    },
    deleteText: {
        color: '#ff3b30',
    },

    progressContainer: {
  flexDirection: 'row',
  alignItems: 'center',
  marginBottom: 12,
  marginTop: 8,
},
progressBar: {
  flex: 1,
  height: 6,
  backgroundColor: '#e0e0e0',
  borderRadius: 3,
  marginRight: 8,
  overflow: 'hidden',
},
progressFill: {
  height: '100%',
  backgroundColor: '#007AFF',
  borderRadius: 3,
},
progressText: {
  fontSize: 14,
  fontWeight: '500',
  color: '#000000',
  minWidth: 40,
  textAlign: 'right',
},
});