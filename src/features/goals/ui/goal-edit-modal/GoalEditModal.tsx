// features/goals/ui/goal-edit-modal/GoalEditModal.tsx
import React, { useEffect } from "react";
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
import { Task } from '../../../../types/goal';
import { TaskItem } from '../../../tasks/ui/task-item';
import { TaskModal } from '../../../tasks/ui/task-modal';
import { 
    fetchTasksRequest, 
    createTaskRequest, 
    updateTaskRequest, 
    deleteTaskRequest, 
    clearTasksError 
} from '../../../tasks/tasks.slice';
import { styles } from './styles';

// 👇 Импортируем селекторы из правильного места
import { 
    selectTasksItems, 
    selectTasksIsLoading, 
    selectTasksError 
} from '../../../tasks/tasks.selectors';

// 👇 Импортируем селекторы и экшены модалки
import {
    selectGoalEditModalVisible,
    selectGoalEditModalTitle,
    selectGoalEditModalDescription,
    selectGoalEditModalCategory,
    selectGoalEditModalDeadline,
    selectGoalEditModalStartDate,
    selectGoalEditModalStatus,
    selectGoalEditModalPriority,
    selectGoalEditModalResults,
    selectGoalEditModalCurrentGoalId,
    selectGoalEditModalIsSaving,
    selectGoalEditModalError,
    selectGoalEditModalResultModalVisible,
    selectGoalEditModalResultText,
    closeModal,
    setTitle,
    setDescription,
    setCategory,
    setDeadline,
    setStartDate,
    setStatus,
    setPriority,
    addResult,
    openResultModal,
    closeResultModal,
    setResultText,
    setSaving,
    setError,
    clearError,
    resetForm,
} from './index';

// Импортируем экшен обновления цели
import { updateGoalRequest } from '../../slice';

export const GoalEditModal: React.FC = () => {
    const dispatch = useDispatch();
    
    // ✅ Используем импортированные селекторы
    const visible = useSelector(selectGoalEditModalVisible);
    const title = useSelector(selectGoalEditModalTitle);
    const description = useSelector(selectGoalEditModalDescription);
    const category = useSelector(selectGoalEditModalCategory);
    const deadline = useSelector(selectGoalEditModalDeadline);
    const startDate = useSelector(selectGoalEditModalStartDate);
    const status = useSelector(selectGoalEditModalStatus);
    const priority = useSelector(selectGoalEditModalPriority);
    const results = useSelector(selectGoalEditModalResults);
    const currentGoalId = useSelector(selectGoalEditModalCurrentGoalId);
    const isSaving = useSelector(selectGoalEditModalIsSaving);
    const error = useSelector(selectGoalEditModalError);
    const resultModalVisible = useSelector(selectGoalEditModalResultModalVisible);
    const resultText = useSelector(selectGoalEditModalResultText);
    
    // ✅ Используем импортированные селекторы задач
    const tasks = useSelector(selectTasksItems);
    const tasksLoading = useSelector(selectTasksIsLoading);
    const tasksError = useSelector(selectTasksError);
    
    // Локальное состояние только для модалки задачи
    const [taskModalVisible, setTaskModalVisible] = React.useState(false);
    const [editingTask, setEditingTask] = React.useState<Task | null>(null);
    const [dateError, setDateError] = React.useState('');

    // Загрузка задач при открытии
    useEffect(() => {
        if (visible && currentGoalId) {
            dispatch(fetchTasksRequest(currentGoalId));
        }
    }, [visible, currentGoalId, dispatch]);

    // Обработка ошибок задач
    useEffect(() => {
        if (tasksError) {
            Alert.alert('Ошибка', tasksError);
            dispatch(clearTasksError());
        }
    }, [tasksError, dispatch]);

    const validateDates = (start: string, end: string) => {
        if (start && end && new Date(end) < new Date(start)) {
            setDateError('Дедлайн не может быть раньше даты начала');
            return false;
        }
        setDateError('');
        return true;
    };

    const handleAddTextResult = () => {
        if (resultText.trim()) {
            dispatch(addResult(resultText.trim()));
            dispatch(closeResultModal());
        }
    };

    const handleSave = async () => {
        if (!currentGoalId) {
            Alert.alert('Ошибка', 'Цель не найдена');
            return;
        }

        if (!title.trim()) {
            Alert.alert('Ошибка', 'Введите название');
            return;
        }
        
        if (!validateDates(startDate, deadline)) {
            Alert.alert('Ошибка', 'Дедлайн не может быть раньше даты начала');
            return;
        }

        dispatch(setSaving(true));
        dispatch(clearError());

        const updatedItem = {
            id: currentGoalId,
            title: title.trim(),
            description: description.trim(),
            priority,
            deadline: deadline || null,
            startdate: startDate || undefined,
            category: category.trim() || 'Без категории',
            status,
            results,
            progress: 0,
        };

        try {
            await dispatch(updateGoalRequest(updatedItem));
            dispatch(closeModal());
        } catch (err: any) {
            if (err?.response?.status === 400) {
                dispatch(setError(err?.response?.data?.error?.message || 'Ошибка валидации'));
            } else {
                dispatch(setError('Не удалось сохранить. Проверьте соединение.'));
            }
        } finally {
            dispatch(setSaving(false));
        }
    };

    const handleAddTask = () => {
        if (!currentGoalId) return;
        setEditingTask(null);
        setTaskModalVisible(true);
    };

    const handleEditTask = (task: Task) => {
        setEditingTask(task);
        setTaskModalVisible(true);
    };

    const handleSaveTask = async (goalId: number, taskData: Partial<Task>, taskId?: number) => {
        try {
            if (taskId) {
                await dispatch(updateTaskRequest({ goalId, taskId, data: taskData }));
            } else {
                await dispatch(createTaskRequest({ goalId, data: taskData }));
            }
            dispatch(fetchTasksRequest(goalId));
            setTaskModalVisible(false);
            setEditingTask(null);
        } catch (err: any) {
            Alert.alert('Ошибка', err?.message || 'Не удалось сохранить задачу');
        }
    };

    const handleDeleteTask = (taskId: number) => {
        if (!currentGoalId) return;

        Alert.alert('Удалить задачу', 'Вы уверены?', [
            { text: 'Отмена', style: 'cancel' },
            {
                text: 'Удалить', onPress: () => {
                    dispatch(deleteTaskRequest({ goalId: currentGoalId, taskId }));
                    setTimeout(() => {
                        dispatch(fetchTasksRequest(currentGoalId));
                    }, 300);
                }
            }
        ]);
    };

    const suggestedCategories = ['Работа', 'Учеба', 'Здоровье', 'Личное', 'Финансы'];

    return (
        <>
            <Modal
                visible={visible}
                animationType="slide"
                transparent={true}
                onRequestClose={() => dispatch(closeModal())}
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
                                    onChangeText={(text) => dispatch(setTitle(text))}
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
                                    onChangeText={(text) => dispatch(setDescription(text))}
                                    placeholder="Опишите"
                                    multiline
                                    numberOfLines={3}
                                    maxLength={200}
                                />
                            </View>

                            {/* Дата начала */}
                            <View style={styles.inputGroup}>
                                <Text style={styles.label}>Дата начала</Text>
                                <TextInput
                                    style={styles.input}
                                    value={startDate}
                                    onChangeText={(text) => {
                                        dispatch(setStartDate(text));
                                        validateDates(text, deadline);
                                    }}
                                    placeholder="ГГГГ-ММ-ДД"
                                />
                                <Text style={styles.hint}>Формат: 2026-01-01</Text>
                            </View>

                            {/* Дедлайн */}
                            <View style={styles.inputGroup}>
                                <Text style={styles.label}>Дедлайн</Text>
                                <TextInput
                                    style={styles.input}
                                    value={deadline}
                                    onChangeText={(text) => {
                                        dispatch(setDeadline(text));
                                        validateDates(startDate, text);
                                    }}
                                    placeholder="ГГГГ-ММ-ДД"
                                />
                                <Text style={styles.hint}>Формат: 2026-12-31</Text>
                            </View>

                            {/* Приоритет */}
                            <View style={styles.inputGroup}>
                                <Text style={styles.label}>Приоритет</Text>
                                <View style={styles.priorityContainer}>
                                    <TouchableOpacity
                                        style={[styles.priorityButton, priority === 'HIGH' && styles.priorityButtonActive]}
                                        onPress={() => dispatch(setPriority('HIGH'))}
                                    >
                                        <Text style={[styles.priorityButtonText, priority === 'HIGH' && styles.priorityButtonTextActive]}>🔥 Высокий</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        style={[styles.priorityButton, priority === 'MEDIUM' && styles.priorityButtonActive]}
                                        onPress={() => dispatch(setPriority('MEDIUM'))}
                                    >
                                        <Text style={[styles.priorityButtonText, priority === 'MEDIUM' && styles.priorityButtonTextActive]}>⚪ Средний</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        style={[styles.priorityButton, priority === 'LOW' && styles.priorityButtonActive]}
                                        onPress={() => dispatch(setPriority('LOW'))}
                                    >
                                        <Text style={[styles.priorityButtonText, priority === 'LOW' && styles.priorityButtonTextActive]}>💤 Низкий</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>

                            {/* Категория */}
                            <View style={styles.inputGroup}>
                                <Text style={styles.label}>Категория</Text>
                                <TextInput
                                    style={styles.input}
                                    value={category}
                                    onChangeText={(text) => dispatch(setCategory(text))}
                                    placeholder="Выберите или введите категорию"
                                />
                                <View style={styles.categoriesContainer}>
                                    {suggestedCategories.map((cat) => (
                                        <TouchableOpacity
                                            key={cat}
                                            style={[styles.categoryChip, category === cat && styles.categoryChipSelected]}
                                            onPress={() => dispatch(setCategory(cat))}
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
                                        onPress={() => dispatch(setStatus('IN_PROGRESS'))}
                                    >
                                        <Text style={[styles.statusButtonText, status === 'IN_PROGRESS' && styles.statusButtonTextActive]}>▶️ В процессе</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        style={[styles.statusButton, status === 'COMPLETED' && styles.statusButtonActive]}
                                        onPress={() => dispatch(setStatus('COMPLETED'))}
                                    >
                                        <Text style={[styles.statusButtonText, status === 'COMPLETED' && styles.statusButtonTextActive]}>✅ Завершено</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        style={[styles.statusButton, status === 'FROZEN' && styles.statusButtonActive]}
                                        onPress={() => dispatch(setStatus('FROZEN'))}
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
                                    <TouchableOpacity style={styles.resultButton} onPress={() => dispatch(openResultModal())}>
                                        <Text style={styles.resultButtonText}>➕ Текст</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={styles.resultButton} onPress={() => Alert.alert('Функция в разработке', 'Загрузка фото будет доступна позже')}>
                                        <Text style={styles.resultButtonText}>📷 Фото</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </ScrollView>

                        {/* Отображение ошибок */}
                        {dateError ? <Text style={styles.errorText}>{dateError}</Text> : null}
                        {error ? <Text style={styles.serverErrorText}>{error}</Text> : null}

                        {/* Кнопки */}
                        <View style={styles.buttonsContainer}>
                            <TouchableOpacity style={[styles.button, styles.cancelButton]} onPress={() => dispatch(closeModal())}>
                                <Text style={styles.cancelButtonText}>Отмена</Text>
                            </TouchableOpacity>
                            <TouchableOpacity 
                                style={[styles.button, styles.saveButton, isSaving && styles.disabledButton]} 
                                onPress={handleSave}
                                disabled={isSaving}
                            >
                                <Text style={styles.saveButtonText}>{isSaving ? 'Сохранение...' : 'Сохранить'}</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>

            {/* Модалка добавления текстового результата */}
            <Modal visible={resultModalVisible} transparent animationType="slide">
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalTitle}>Добавить результат</Text>
                        <TextInput
                            style={[styles.input, styles.textArea]}
                            multiline
                            placeholder="Введите текст..."
                            value={resultText}
                            onChangeText={(text) => dispatch(setResultText(text))}
                        />
                        <View style={styles.row}>
                            <TouchableOpacity style={[styles.button, styles.cancelButton]} onPress={() => dispatch(closeResultModal())}>
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
                goalId={currentGoalId || 0}
                onClose={() => {
                    setTaskModalVisible(false);
                    setEditingTask(null);
                }}
                onSave={handleSaveTask}
            />
        </>
    );
};