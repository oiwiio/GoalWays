import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Modal, Alert } from 'react-native';
import { Goal } from '../../../types/goal';
import { styles } from './goal.card.styles';

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

                <View style={styles.progressContainer}>
                    <View style={styles.progressBar}>
                        <View 
                            style={[
                            styles.progressFill, 
                            { width: `${goal.progress}%` }
                            ]} 
                         />
                </View>
                    <Text style={styles.progressText}>{goal.progress}%</Text>
                </View>

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

