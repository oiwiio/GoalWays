import React, { useState } from "react";
import { View, Text, TouchableOpacity, Modal } from 'react-native';
import { GoalAPI } from '../../../types/goal';
import { colors } from '../../../shared/styles/theme';
import { styles } from './goal-card.styles';

interface GoalCardProps {
    goal: GoalAPI;
    onPress: (goal: GoalAPI) => void;
    onEdit: (goal: GoalAPI) => void;        
    onArchive: (goal: GoalAPI) => void;
    onRestore?: (goal: GoalAPI) => void;    
    onDelete: (goal: GoalAPI) => void;      
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

    console.log('goal debug:', goal.status, goal.priority);

    const getPriorityIcon = (priority: string) => {
        switch (priority) {
            case 'HIGH': return '🔥';
            case 'MEDIUM': return '⚪';
            case 'LOW': return '💤';
            default: return '❓';
        }
    };

    const getStatusText = (status: string) => {
        switch (status) {
            case 'IN_PROGRESS': return 'В процессе';
            case 'COMPLETED': return 'Завершено';
            case 'FROZEN': return 'Заморожено';
            case 'ARCHIVED': return 'В архиве';
            default: return '';
        }
    };

    const getStatusColor = (status: string): string => {
        switch (status) {
            case 'IN_PROGRESS': return colors.primary;
            case 'COMPLETED': return colors.success;
            case 'FROZEN': return colors.warning;
            case 'ARCHIVED': return colors.textSecondary;
            default: return colors.textSecondary;
        }
    };

    const statusColor = getStatusColor(goal.status);

    return (
        <>
            <TouchableOpacity style={styles.card} activeOpacity={0.8} onPress={() => onPress(goal)}>
                <View style={styles.header}>
                    <View style={styles.titleContainer}>
                        <Text style={styles.priorityIcon}>{getPriorityIcon(goal.priority)}</Text>
                        <Text style={styles.title} numberOfLines={1}>{goal.title}</Text>
                    </View>
                    <TouchableOpacity
                        onPress={() => setMenuVisible(true)}
                        hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
                    >
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
                        <Text style={[styles.statusBadge, { backgroundColor: statusColor + '26', color: statusColor }]}>
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
                        {goal.status === 'ARCHIVED' ? (
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