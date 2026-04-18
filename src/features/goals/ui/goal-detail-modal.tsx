import React, { useState, useEffect } from "react";
import {
    Modal,
    View,
    Text,
    TextInput,
    TouchableOpacity,
    ScrollView,
    Alert
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { GoalAPI, Task } from '../../../types/goal';
import { TaskItem } from './task-item';
import { TaskModal } from './task-modal';
import { fetchTasksRequest, createTaskRequest, updateTaskRequest, deleteTaskRequest, clearTasksError } from '../tasks.slice';
import { RootState } from '../../../app/store';
import { styles } from './goal-detail-modal.styles';


interface GoalDetailModalProps {
    visible: boolean;
    mode: 'goal' | 'task';  
    item: GoalAPI | Task | null;
    onClose: () => void;
    onSave: (updatedItem: GoalAPI | Task) => void;
    onAddTask?: () => void;
    onTaskPress?: (task: Task) => void;
}

export const GoalDetailModal = ({ 
    visible, 
    item, 
    onClose, 
    onSave,
}: GoalDetailModalProps) => {
    const dispatch = useDispatch();
    
    // Состояния формы
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('');
    const [deadline, setDeadline] = useState('');
    // Статус в API-формате
const [status, setStatus] = useState<'IN_PROGRESS' | 'COMPLETED' | 'FROZEN' | 'ARCHIVED'>('IN_PROGRESS');

// Приоритет в API-формате
const [priority, setPriority] = useState<'HIGH' | 'MEDIUM' | 'LOW'>('MEDIUM');
   
    
    // Результаты
    const [resultModalVisible, setResultModalVisible] = useState(false);
    const [resultText, setResultText] = useState('');
    const [results, setResults] = useState<string[]>([]);
    
    // Задачи
    const tasks = useSelector((state: RootState) => state.tasks?.items || []);
    const tasksLoading = useSelector((state: RootState) => state.tasks?.isLoading || false);
    const tasksError = useSelector((state: RootState) => state.tasks?.error || null);
    const [taskModalVisible, setTaskModalVisible] = useState(false);
    const [editingTask, setEditingTask] = useState<Task | null>(null);
    const [startDate, setStartDate] = useState('');
    


    // Загрузка задач при открытии цели
    useEffect(() => {
        if (visible && item) {
            dispatch(fetchTasksRequest(Number(item.id)));
        }
    }, [visible, item, dispatch]);

    // Обработка ошибок задач
    useEffect(() => {
        if (tasksError) {
            Alert.alert('Ошибка', tasksError);
            dispatch(clearTasksError());
        }
    }, [tasksError, dispatch]);

    // Заполнение формы данными цели
    useEffect(() => {
    if (item && 'category' in item) {  
        setTitle(item.title || '');
        setDescription(item.description || '');
        setStartDate(item.startdate || item.start_date || '');
        setPriority(item.priority);
        setDeadline(item.deadline || '');
        setCategory(item.category || '');
        setStatus(item.status);
        setResults(item.results || []);
    }
    }, [item]);

    
    const handleAddTextResult = () => {
        if (resultText.trim()) {
            setResults([...results, resultText.trim()]);
            setResultText('');
            setResultModalVisible(false);
        }
    };

    const handleAddPhotoResult = () => {
        Alert.alert('Функция в разработке', 'Загрузка фото будет доступна позже');
    };

    const handleSave = () => {
        if (!title.trim()) {
            Alert.alert('Ошибка', 'Введите название');
            return;
        }
        if (!item) return;

        const updatedItem: GoalAPI = {
            id: Number(item.id),
            title: title.trim(),
            description: description.trim(),
            priority,
            deadline: deadline || null,
            category: category.trim() || 'Без категории',
            status,
            results,
            progress: 0, 
        };
        
        onSave(updatedItem);
        onClose();
    };

    // Обработчики задач
    const handleAddTask = () => {
        if (!item) return;
        setEditingTask(null);
        setTaskModalVisible(true);
    };

    const handleEditTask = (task: Task) => {
        setEditingTask(task);
        setTaskModalVisible(true);
    };

    const handleSaveTask = (goalId: number, taskData: Partial<Task>, taskId?: number) => {
        if (taskId) {
            dispatch(updateTaskRequest({ goalId, taskId, data: taskData }));
        } else {
            dispatch(createTaskRequest({ goalId, data: taskData }));
        }
        // Обновляем список задач после создания/обновления
        setTimeout(() => {
            dispatch(fetchTasksRequest(goalId));
        }, 300);
    };

    const [dateError, setDateError] = useState('');

    const validateDates = (start: string, end: string) => {
    if (start && end && new Date(end) < new Date(start)) {
        setDateError('Дедлайн не может быть раньше даты начала');
        return false;
    }
    setDateError('');
    return true;
    };
    


    const handleDeleteTask = (taskId: number) => {
        if (!item) return;
        
        Alert.alert('Удалить задачу', 'Вы уверены?', [
            { text: 'Отмена', style: 'cancel' },
            { text: 'Удалить', onPress: () => {
                dispatch(deleteTaskRequest({ goalId: Number(item.id), taskId }));
                setTimeout(() => {
                    dispatch(fetchTasksRequest(Number(item.id)));
                }, 300);
            }}
        ]);
    };
    const suggestedCategories = ['Работа', 'Учеба', 'Здоровье', 'Личное', 'Финансы'];
    if (!item) return null;

    
    return (
        <>
            <Modal
                visible={visible}
                animationType="slide"
                transparent={true}
                onRequestClose={onClose}
            >
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalTitle}>Редактировать цель</Text>

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

                            {/* Приоритет */}
                            <View style={styles.inputGroup}>
                                <Text style={styles.label}>Приоритет</Text>
                                <View style={styles.priorityContainer}>
                                    <TouchableOpacity
                                        style={[styles.priorityButton, priority === 'HIGH' && styles.priorityButtonActive]}
                                        onPress={() => setPriority('HIGH')}
                                    >
                                        <Text style={[styles.priorityButtonText, priority === 'HIGH' && styles.priorityButtonTextActive]}>🔥 Высокий</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        style={[styles.priorityButton, priority === 'MEDIUM' && styles.priorityButtonActive]}
                                        onPress={() => setPriority('MEDIUM')}
                                    >
                                        <Text style={[styles.priorityButtonText, priority === 'MEDIUM' && styles.priorityButtonTextActive]}>⚪ Средний</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        style={[styles.priorityButton, priority === 'LOW' && styles.priorityButtonActive]}
                                        onPress={() => setPriority('LOW')}
                                    >
                                        <Text style={[styles.priorityButtonText, priority === 'LOW' && styles.priorityButtonTextActive]}>💤 Низкий</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>

                            {/* Дедлайн */}
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
                                            style={[styles.categoryChip, category === cat && styles.categoryChipSelected]}
                                            onPress={() => setCategory(cat)}
                                        >
                                            <Text style={[styles.categoryChipText, category === cat && styles.categoryChipTextSelected]}>
                                                {cat}
                                            </Text>
                                        </TouchableOpacity>
                                    ))}
                                </View>
                            </View>

                            {/* Статус */}
                            <View style={styles.inputGroup}>
                                <Text style={styles.label}>Статус</Text>
                                <View style={styles.statusContainer}>
                                    <TouchableOpacity
                                        style={[styles.statusButton, status === 'IN_PROGRESS' && styles.statusButtonActive]}
                                        onPress={() => setStatus('IN_PROGRESS')}
                                    >
                                        <Text style={[styles.statusButtonText, status === 'IN_PROGRESS' && styles.statusButtonTextActive]}>▶️ В процессе</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity   
                                        style={[styles.statusButton, status === 'COMPLETED' && styles.statusButtonActive]}
                                        onPress={() => setStatus('COMPLETED')}
                                    >
                                        <Text style={[styles.statusButtonText, status === 'COMPLETED' && styles.statusButtonTextActive]}>✅ Завершено</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        style={[styles.statusButton, status === 'FROZEN' && styles.statusButtonActive]}
                                        onPress={() => setStatus('FROZEN')}
                                    >
                                        <Text style={[styles.statusButtonText, status === 'FROZEN' && styles.statusButtonTextActive]}>❄️ Заморожено</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>

                            {/* Задачи */}
                            <View style={styles.inputGroup}>
                                <View style={styles.tasksHeader}>
                                    <Text style={styles.label}>Задачи</Text>
                                    <TouchableOpacity onPress={handleAddTask}>
                                        <Text style={styles.addButton}>+ Добавить</Text>
                                    </TouchableOpacity>
                                </View>
                                {tasksLoading ? (
                                    <Text style={styles.emptyText}>Загрузка...</Text>
                                ) : tasks.length === 0 ? (
                                    <Text style={styles.emptyText}>Нет задач</Text>
                                ) : (
                                    tasks.map((task) => (
                                        <TaskItem key={task.id} task={task} onPress={() => handleEditTask(task)} />
                                    ))
                                )}
                            </View>

                            {/* Результаты */}
                            <View style={styles.inputGroup}>
                                <Text style={styles.label}>Результаты</Text>
                                {results.map((res, idx) => (
                                    <Text key={idx} style={styles.resultItem}>• {res}</Text>
                                ))}
                                <View style={styles.resultButtons}>
                                    <TouchableOpacity style={styles.resultButton} onPress={() => setResultModalVisible(true)}>
                                        <Text style={styles.resultButtonText}>➕ Текст</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={styles.resultButton} onPress={handleAddPhotoResult}>
                                        <Text style={styles.resultButtonText}>📷 Фото</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </ScrollView>

                        {/* Кнопки */}
                        <View style={styles.buttonsContainer}>
                            <TouchableOpacity style={[styles.button, styles.cancelButton]} onPress={onClose}>
                                <Text style={styles.cancelButtonText}>Отмена</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={[styles.button, styles.saveButton]} onPress={handleSave}>
                                <Text style={styles.saveButtonText}>Сохранить</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>

            {/* Модалка результата */}
            <Modal visible={resultModalVisible} transparent animationType="slide">
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalTitle}>Добавить результат</Text>
                        <TextInput
                            style={[styles.input, styles.textArea]}
                            multiline
                            placeholder="Введите текст..."
                            value={resultText}
                            onChangeText={setResultText}
                        />
                        <View style={styles.row}>
                            <TouchableOpacity style={[styles.button, styles.cancelButton]} onPress={() => setResultModalVisible(false)}>
                                <Text style={styles.cancelButtonText}>Отмена</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={[styles.button, styles.saveButton]} onPress={handleAddTextResult}>
                                <Text style={styles.saveButtonText}>Сохранить</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>

            {/* Модалка задачи */}
            <TaskModal
                visible={taskModalVisible}
                mode={editingTask ? 'edit' : 'create'}
                task={editingTask}
                goalId={Number(item.id)}
                onClose={() => {
                    setTaskModalVisible(false);
                    setEditingTask(null);
                }}
                onSave={handleSaveTask}
            />
            {/*для ошибки */}
        <TextInput
            style={styles.input}
            value={deadline}
            onChangeText={(text) => {
            setDeadline(text);
            validateDates(startDate, text);
            {dateError ? <Text style={styles.errorText}>{dateError}</Text> : null}
        }}
            placeholder="ГГГГ-ММ-ДД"
            
        />

        </>
        

    );
};