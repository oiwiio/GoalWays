import React, { useState } from "react";
import { View, Text, TouchableOpacity, Modal, Alert } from 'react-native';
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

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'in_progress': return '#007AFF';
            case 'completed': return '#34C759';
            case 'frozen': return '#FF9500';
            case 'archived': return '#8E8E93';
            default: return '#666';
        }
    };

    return (
        <>
            <TouchableOpacity style={styles.card} onPress={() => onPress(goal)}>
                <View style={styles.header}>
                    <View style={styles.titleContainer}>
                        <Text style={styles.priorityIcon}>{getPriorityIcon(goal.priority)}</Text>
                        <Text style={styles.title} numberOfLines={1}>{goal.title}</Text>
                    </View>
                    <TouchableOpacity onPress={() => setMenuVisible(true)}>
                        <Text style={styles.menuButton}>⋯</Text>
                    </TouchableOpacity>
                </View>

                {goal.description && (
                    <Text style={styles.description} numberOfLines={2}>
                        {goal.description}
                    </Text>
                )}

                <View style={styles.footer}>
                     <View style={styles.leftFooter}>
                        {goal.startdate && (
                        <Text style={styles.date}>📅 {new Date(goal.startdate).toLocaleDateString('ru-RU')}</Text>
                        )}
                            {goal.deadline && (
                        <Text style={styles.date}>→ {new Date(goal.deadline).toLocaleDateString('ru-RU')}</Text>
                        )}
                </View>
                    <View style={styles.rightFooter}>
                        <Text style={[styles.statusBadge, { backgroundColor: getStatusColor(goal.status) + '20' }]}>
                            {getStatusText(goal.status)}
                        </Text>
                        <Text style={styles.progress}>{goal.progress}%</Text>
                    </View>
                </View>
            </TouchableOpacity>

            {/* Меню действий */}
            <Modal visible={menuVisible} transparent animationType="fade" onRequestClose={() => setMenuVisible(false)}>
                <TouchableOpacity style={styles.modalOverlay} activeOpacity={1} onPress={() => setMenuVisible(false)}>
                    <View style={styles.menuContainer}>
                        {goal.status === 'archived' ? (
                            <TouchableOpacity style={styles.menuItem} onPress={() => { setMenuVisible(false); onRestore?.(goal); }}>
                                <Text style={styles.menuItemText}>Восстановить</Text>
                            </TouchableOpacity>
                        ) : (
                            <>
                                <TouchableOpacity style={styles.menuItem} onPress={() => { setMenuVisible(false); onEdit(goal); }}>
                                    <Text style={styles.menuItemText}>Редактировать</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.menuItem} onPress={() => { setMenuVisible(false); onArchive(goal); }}>
                                    <Text style={styles.menuItemText}>В архив</Text>
                                </TouchableOpacity>
                            </>
                        )}
                        <TouchableOpacity style={[styles.menuItem, styles.deleteItem]} onPress={() => { setMenuVisible(false); onDelete(goal); }}>
                            <Text style={[styles.menuItemText, styles.deleteText]}>Удалить</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.menuItem} onPress={() => setMenuVisible(false)}>
                            <Text style={styles.menuItemText}>Отмена</Text>
                        </TouchableOpacity>
                    </View>
                </TouchableOpacity>
            </Modal>
        </>
    );
};