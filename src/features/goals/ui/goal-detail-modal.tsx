import React, { useState, useEffect } from "react";
import {
    Modal,
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    ScrollView,
    Alert
} from 'react-native';
import { Goal, Task } from '../../../types/goal';

interface GoalDetailModalProps {
    visible: boolean;
    mode: 'goal' | 'task';              
    item: Goal | Task | null;            
    onClose: () => void;
    onSave: (updatedItem: Goal | Task) => void;
    onAddTask?: () => void;              
    onTaskPress?: (task: Task) => void; 
}



export const GoalDetailModal = ({ 
    visible, 
    mode,
    item, 
    onClose, 
    onSave,
    onAddTask,
    onTaskPress 
}: GoalDetailModalProps) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('');
    const [deadline, setDeadline] = useState('');
    const [priority, setPriority] = useState<'high' | 'medium' | 'low'>('medium');
    const [progress, setProgress] = useState('0');
    const [status, setStatus] = useState<'in_progress' | 'completed' | 'frozen' | 'archived'>('in_progress');

        
    
    // для цели — список задач
    const [tasks, setTasks] = useState<Task[]>([]);

    

    useEffect(() => {
        if (item) {
            setTitle(item.title || '');
            setDescription(item.description || '');
            
            // Общие поля для цели и задачи
            if ('priority' in item) setPriority(item.priority);
            if ('progress' in item) setProgress(item.progress?.toString() || '0');
            if ('deadline' in item) setDeadline(item.deadline || '');
            
            // Поля только для цели
            if (mode === 'goal') {
                const goal = item as Goal;
                setCategory(goal.category || '');
                setStatus(goal.status);
                setTasks(goal.tasks || []);
            }
        }
    }, [item, mode]);

    

    const handleSave = () => {
        if (!title.trim()) {
            Alert.alert('Ошибка', 'Введите название');
            return;
        }

        if (!item) return;

        const progressNum = parseInt(progress, 10);
        if (isNaN(progressNum) || progressNum < 0 || progressNum > 100) {
            Alert.alert('Ошибка', 'Прогресс должен быть числом от 0 до 100');
            return;
        }

        const baseFields = {
            ...item,
            title: title.trim(),
            description: description.trim(),
            priority,
            progress: progressNum,
            deadline: deadline || null,
        };

        let updatedItem: Goal | Task;

        if (mode === 'goal') {
            updatedItem = {
                ...baseFields,
                category: category.trim() || 'Без категории',
                status,
                tasks,
            } as Goal;
        } else {
            updatedItem = baseFields as Task;
        }

        onSave(updatedItem);
        onClose();
    };

    const suggestedCategories = ['Работа', 'Учеба', 'Здоровье', 'Личное', 'Финансы'];

    if (!item) return null;

    return (
        <Modal
            visible={visible}
            animationType="slide"
            transparent={true}
            onRequestClose={onClose}
        >
            <View style={styles.modalOverlay}>
                <View style={styles.modalContent}>
                    <Text style={styles.modalTitle}>
                        {mode === 'goal' ? 'Редактировать цель' : 'Редактировать задачу'}
                    </Text>

                    <ScrollView showsVerticalScrollIndicator={false}>
                        {/* Название */}
                        <View style={styles.inputGroup}>
                            <Text style={styles.label}>Название *</Text>
                            <TextInput
                                style={styles.input}
                                value={title}
                                onChangeText={setTitle}
                                placeholder="Введите название"
                                maxLength={50}
                            />
                        </View>

                        {/* Описание */}
                        <View style={styles.inputGroup}>
                            <Text style={styles.label}>Описание</Text>
                            <TextInput
                                style={[styles.input, styles.textArea]}
                                value={description}
                                onChangeText={setDescription}
                                placeholder="Опишите"
                                multiline
                                numberOfLines={3}
                                maxLength={200}
                            />
                        </View>

                        {/* Приоритет (общее поле) */}
                        <View style={styles.inputGroup}>
                            <Text style={styles.label}>Приоритет</Text>
                            <View style={styles.priorityContainer}>
                                <TouchableOpacity
                                    style={[
                                        styles.priorityButton,
                                        priority === 'high' && styles.priorityButtonActive
                                    ]}
                                    onPress={() => setPriority('high')}
                                >
                                    <Text style={[
                                        styles.priorityButtonText,
                                        priority === 'high' && styles.priorityButtonTextActive
                                    ]}>🔥 Высокий</Text>
                                </TouchableOpacity>

                                <TouchableOpacity
                                    style={[
                                        styles.priorityButton,
                                        priority === 'medium' && styles.priorityButtonActive
                                    ]}
                                    onPress={() => setPriority('medium')}
                                >
                                    <Text style={[
                                        styles.priorityButtonText,
                                        priority === 'medium' && styles.priorityButtonTextActive
                                    ]}>⚪ Средний</Text>
                                </TouchableOpacity>

                                <TouchableOpacity
                                    style={[
                                        styles.priorityButton,
                                        priority === 'low' && styles.priorityButtonActive
                                    ]}
                                    onPress={() => setPriority('low')}
                                >
                                    <Text style={[
                                        styles.priorityButtonText,
                                        priority === 'low' && styles.priorityButtonTextActive
                                    ]}>💤 Низкий</Text>
                                </TouchableOpacity>
                            </View>
                        </View>

                        {/* Прогресс (общее поле) */}
                        <View style={styles.inputGroup}>
                            <Text style={styles.label}>Прогресс (0-100%)</Text>
                            <TextInput
                                style={styles.input}
                                value={progress}
                                onChangeText={setProgress}
                                placeholder="0-100"
                                keyboardType="numeric"
                                maxLength={3}
                            />
                        </View>

                        {/* Дедлайн (общее поле) */}
                        <View style={styles.inputGroup}>
                            <Text style={styles.label}>Дедлайн</Text>
                            <TextInput
                                style={styles.input}
                                value={deadline}
                                onChangeText={setDeadline}
                                placeholder="ГГГГ-ММ-ДД"
                            />
                            <Text style={styles.hint}>Формат: 2025-12-31</Text>
                        </View>

                        {/* Поля только для цели */}
                        {mode === 'goal' && (
                            <>
                                {/* Категория */}
                                <View style={styles.inputGroup}>
                                    <Text style={styles.label}>Категория</Text>
                                    <TextInput
                                        style={styles.input}
                                        value={category}
                                        onChangeText={setCategory}
                                        placeholder="Выберите или введите категорию"
                                    />

                                    <View style={styles.categoriesContainer}>
                                        {suggestedCategories.map((cat) => (
                                            <TouchableOpacity
                                                key={cat}
                                                style={[
                                                    styles.categoryChip,
                                                    category === cat && styles.categoryChipSelected
                                                ]}
                                                onPress={() => setCategory(cat)}
                                            >
                                                <Text style={[
                                                    styles.categoryChipText,
                                                    category === cat && styles.categoryChipTextSelected
                                                ]}>
                                                    {cat}
                                                </Text>
                                            </TouchableOpacity>
                                        ))}
                                    </View>
                                </View>

                                {/* Статус цели */}
                                <View style={styles.inputGroup}>
                                    <Text style={styles.label}>Статус</Text>
                                    <View style={styles.statusContainer}>
                                        <TouchableOpacity
                                            style={[
                                                styles.statusButton,
                                                status === 'in_progress' && styles.statusButtonActive
                                            ]}
                                            onPress={() => setStatus('in_progress')}
                                        >
                                            <Text style={[
                                                styles.statusButtonText,
                                                status === 'in_progress' && styles.statusButtonTextActive
                                            ]}>▶️ В процессе</Text>
                                        </TouchableOpacity>

                                        <TouchableOpacity
                                            style={[
                                                styles.statusButton,
                                                status === 'completed' && styles.statusButtonActive
                                            ]}
                                            onPress={() => setStatus('completed')}
                                        >
                                            <Text style={[
                                                styles.statusButtonText,
                                                status === 'completed' && styles.statusButtonTextActive
                                            ]}>✅ Завершено</Text>
                                        </TouchableOpacity>

                                        <TouchableOpacity
                                            style={[
                                                styles.statusButton,
                                                status === 'frozen' && styles.statusButtonActive
                                            ]}
                                            onPress={() => setStatus('frozen')}
                                        >
                                            <Text style={[
                                                styles.statusButtonText,
                                                status === 'frozen' && styles.statusButtonTextActive
                                            ]}>❄️ Заморожено</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>

                                {/* Список задач */}
                                <View style={styles.inputGroup}>
                                    <View style={styles.tasksHeader}>
                                        <Text style={styles.label}>Задачи</Text>
                                        {onAddTask && (
                                            <TouchableOpacity onPress={onAddTask}>
                                                <Text style={styles.addButton}>+ Добавить</Text>
                                            </TouchableOpacity>
                                        )}
                                    </View>
                                    
                                    {tasks.length === 0 ? (
                                        <Text style={styles.emptyText}>Нет задач</Text>
                                    ) : (
                                        tasks.map((task) => (
                                            <TouchableOpacity
                                                key={task.id}
                                                style={styles.taskItem}
                                                onPress={() => onTaskPress?.(task)}
                                            >
                                                <Text style={styles.taskTitle}>{task.title}</Text>
                                                <Text style={styles.taskProgress}>{task.progress}%</Text>
                                            </TouchableOpacity>
                                        ))
                                    )}
                                </View>
                            </>
                        )}
                    </ScrollView>

                    {/* Кнопки */}
                    <View style={styles.buttonsContainer}>
                        <TouchableOpacity
                            style={[styles.button, styles.cancelButton]}
                            onPress={onClose}
                        >
                            <Text style={styles.cancelButtonText}>Отмена</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={[styles.button, styles.saveButton]}
                            onPress={handleSave}
                        >
                            <Text style={styles.saveButtonText}>Сохранить</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
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
});