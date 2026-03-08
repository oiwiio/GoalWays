import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Modal, Alert } from 'react-native';
import { Goal } from '../../../types/goal';

interface GoalCardProps {
    goal: Goal;
    onPress: (goal: Goal) => void;
    onEdit: (goal: Goal) => void;        
    onArchive: (goal: Goal) => void;
    onRestore?: (goal: Goal) => void;    
    onDelete: (goal: Goal) => void;      
}

export const GoalCard = ({ 
    goal, 
    onPress, 
    onEdit, 
    onArchive, 
    onRestore, 
    onDelete 
}: GoalCardProps) => {
    const [menuVisible, setMenuVisible] = useState(false);

    const getPriorityIcon = (priority: string) => {
        switch (priority) {
            case 'high': return '🔥';
            case 'medium': return '⚪';
            case 'low': return '💤';
            default: return '⚪';
        }
    };

    const getStatusText = (status: string) => {
        switch (status) {
            case 'in_progress': return 'В процессе';
            case 'completed': return 'Завершено';
            case 'frozen': return 'Заморожено';
            case 'archived': return 'В архиве';
            default: return '';
        }
    };

    const handleMenuPress = () => {
        setMenuVisible(true);
    };

    const handleEdit = () => {
        setMenuVisible(false);
        onEdit(goal);
    };

    const handleArchive = () => {
        setMenuVisible(false);
        onArchive(goal);
    };

    const handleRestore = () => {
        setMenuVisible(false);
        if (onRestore) onRestore(goal);
    };

    const handleDelete = () => {
        setMenuVisible(false);
        Alert.alert(
            'Удалить цель',
            `Вы уверены, что хотите удалить "${goal.title}"?`,
            [
                { text: 'Отмена', style: 'cancel' },
                { 
                    text: 'Удалить', 
                    onPress: () => onDelete(goal),
                    style: 'destructive'
                },
            ]
        );
    };

    return (
        <>
            <TouchableOpacity style={styles.card} onPress={() => onPress(goal)}>
                <View style={styles.header}>
                    <View style={styles.titleContainer}>
                        <Text style={styles.priorityIcon}>{getPriorityIcon(goal.priority)}</Text>
                        <Text style={styles.title} numberOfLines={1}>{goal.title}</Text>
                    </View>
                    <TouchableOpacity onPress={handleMenuPress}>
                        <Text style={styles.menuButton}>⋯</Text>
                    </TouchableOpacity>
                </View>

                {goal.description && (
                    <Text style={styles.description} numberOfLines={2}>
                        {goal.description}
                    </Text>
                )}

                <View style={styles.footer}>
                    {goal.deadline && (
                        <Text style={styles.date}>
                            {new Date(goal.deadline).toLocaleDateString('ru-RU')}
                        </Text>
                    )}
                    <View style={styles.rightFooter}>
                        {goal.status !== 'in_progress' && (
                            <Text style={styles.statusBadge}>{getStatusText(goal.status)}</Text>
                        )}
                        <Text style={styles.progress}>{goal.progress}%</Text>
                    </View>
                </View>
            </TouchableOpacity>

            {/* Меню действий */}
            <Modal
                visible={menuVisible}
                transparent={true}
                animationType="fade"
                onRequestClose={() => setMenuVisible(false)}
            >
                <TouchableOpacity 
                    style={styles.modalOverlay} 
                    activeOpacity={1} 
                    onPress={() => setMenuVisible(false)}
                >
                    <View style={styles.menuContainer}>
                        {goal.status === 'archived' ? (
                            // Для архивных целей — восстановление
                            <TouchableOpacity style={styles.menuItem} onPress={handleRestore}>
                                <Text style={styles.menuItemText}>↩️ Восстановить</Text>
                            </TouchableOpacity>
                        ) : (
                            // Для активных целей — редактирование и архивация
                            <>
                                <TouchableOpacity style={styles.menuItem} onPress={handleEdit}>
                                    <Text style={styles.menuItemText}>✏️ Редактировать</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.menuItem} onPress={handleArchive}>
                                    <Text style={styles.menuItemText}>📦 В архив</Text>
                                </TouchableOpacity>
                            </>
                        )}
                        <TouchableOpacity style={[styles.menuItem, styles.deleteItem]} onPress={handleDelete}>
                            <Text style={[styles.menuItemText, styles.deleteText]}>🗑️ Удалить</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.menuItem} onPress={() => setMenuVisible(false)}>
                            <Text style={styles.menuItemText}>❌ Отмена</Text>
                        </TouchableOpacity>
                    </View>
                </TouchableOpacity>
            </Modal>
        </>
    );
};

const styles = StyleSheet.create({
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
});