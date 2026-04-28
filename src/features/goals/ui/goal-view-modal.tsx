import React, { useEffect } from 'react';
import { Modal, View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { GoalAPI, Task } from '../../../types/goal';
import { TaskItem } from '../../tasks/ui/task-item';
import { fetchTasksRequest } from '../../tasks/index';
import { RootState } from '../../../app/store';
import { styles } from './goal-view.styles';

interface GoalViewModalProps {
    visible: boolean;
    goal: GoalAPI | null;
    onClose: () => void;
    onEdit: () => void;
}

export const GoalViewModal = ({ visible, goal, onClose, onEdit }: GoalViewModalProps) => {
    const dispatch = useDispatch();
    const tasks = useSelector((state: RootState) => state.tasks?.items || []);
    const tasksLoading = useSelector((state: RootState) => state.tasks?.isLoading || false);

    useEffect(() => {
        if (visible && goal) {
            dispatch(fetchTasksRequest(Number(goal.id)));
        }
    }, [visible, goal, dispatch]);

    if (!goal) return null;

    const getPriorityText = (priority: string) => {
        switch (priority) {
            case 'HIGH': return '🔥 Высокий';
            case 'MEDIUM': return '⚪ Средний';
            case 'LOW': return '💤 Низкий';
            default: return '⚪ Средний';
        }
    };

    const getStatusText = (status: string) => {
        switch (status) {
            case 'IN_PROGRESS': return '▶️ В процессе';
            case 'COMPLETED': return '✅ Завершено';
            case 'PAUSED': return '❄️ Заморожено';
            case 'ARCHIVED': return '📦 Архив';
            default: return '▶️ В процессе';
        }
    };

    return (
        <Modal
            visible={visible}
            animationType="slide"
            transparent={true}
            onRequestClose={onClose}
        >
            <View style={styles.modalOverlay}>
                <View style={styles.modalContent}>
                    {/* Шапка с кнопками */}
                    <View style={styles.headerRow}>
                        <TouchableOpacity onPress={onClose}>
                            <Text style={styles.backButton}>←</Text>
                        </TouchableOpacity>
                        <Text style={styles.modalTitle}>{goal.title}</Text>
                        <TouchableOpacity onPress={onEdit}>
                            <Text style={styles.editButton}>✏️</Text>
                        </TouchableOpacity>
                    </View>

                    <ScrollView showsVerticalScrollIndicator={false}>
                        {/* Описание */}
                        {goal.description ? (
                            <View style={styles.inputGroup}>
                                <Text style={styles.label}>Описание</Text>
                                <Text style={styles.descriptionText}>{goal.description}</Text>
                            </View>
                        ) : null}

                        {/* Информация */}
                        <View style={styles.row}>
                            <View style={styles.halfColumn}>
                                <Text style={styles.label}>Приоритет</Text>
                                <Text style={styles.valueText}>{getPriorityText(goal.priority)}</Text>
                            </View>
                            <View style={styles.halfColumn}>
                                <Text style={styles.label}>Статус</Text>
                                <Text style={styles.valueText}>{getStatusText(goal.status)}</Text>
                            </View>
                        </View>

                        <View style={styles.row}>
                            {goal.deadline && (
                                <View style={styles.halfColumn}>
                                    <Text style={styles.label}>Дедлайн</Text>
                                    <Text style={styles.valueText}>
                                        {new Date(goal.deadline).toLocaleDateString('ru-RU')}
                                    </Text>
                                </View>
                            )}
                            <View style={styles.halfColumn}>
                                <Text style={styles.label}>Прогресс</Text>
                                <Text style={styles.valueText}>{goal.progress}%</Text>
                            </View>
                        </View>

                        {goal.category && (
                            <View style={styles.inputGroup}>
                                <Text style={styles.label}>Категория</Text>
                                <Text style={styles.valueText}>{goal.category}</Text>
                            </View>
                        )}

                        {/* Задачи */}
                        <View style={styles.inputGroup}>
                            <Text style={styles.label}>Задачи</Text>
                            {tasksLoading ? (
                                <Text style={styles.emptyText}>Загрузка...</Text>
                            ) : tasks.length === 0 ? (
                                <Text style={styles.emptyText}>Нет задач</Text>
                            ) : (
                                tasks.map((task) => (
                                    <TaskItem key={task.id} task={task} onPress={() => {}} />
                                ))
                            )}
                        </View>

                        {/* Результаты */}
                        {goal.results && goal.results.length > 0 && (
                            <View style={styles.inputGroup}>
                                <Text style={styles.label}>Результаты</Text>
                                {goal.results.map((res, idx) => (
                                    <Text key={idx} style={styles.resultItem}>• {res}</Text>
                                ))}
                            </View> 
                        )}

                        
                    </ScrollView>
                </View>
            </View>
        </Modal>
    );
};