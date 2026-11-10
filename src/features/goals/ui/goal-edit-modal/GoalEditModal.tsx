import React, { useEffect } from 'react';
import { Modal, View, Text, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { Flame, Circle, Moon, Play, Check, Snowflake, Plus, Camera } from 'lucide-react-native';
import type { LucideIcon } from 'lucide-react-native';
import { useDispatch, useSelector } from 'react-redux';
import { Task } from '../../../../types/goal';
import { TaskItem } from '../../../tasks/ui/task-item';
import { TaskModal } from '../../../tasks/ui/task-modal';
import {
  fetchTasksRequest,
  createTaskRequest,
  updateTaskRequest,
  deleteTaskRequest,
  clearTasksError,
} from '../../../tasks/tasks.slice';
import { Input } from '../../../../shared/ui/input';
import { Button } from '../../../../shared/ui/button';
import { ui } from '../../../../shared/styles/ui';
import { styles } from './styles';

// Импортируем селекторы из правильного места
import {
  selectTasksItems,
  selectTasksIsLoading,
  selectTasksError,
} from '../../../tasks/tasks.selectors';

// Импортируем селекторы и экшены модалки
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
} from './index';

// Импортируем экшен обновления цели
import { updateGoalRequest } from '../../slice';

// Кнопка выбора (приоритет / статус)
const OptionButton = ({
  label,
  icon: Icon,
  active,
  onPress,
  flex,
}: {
  label: string;
  icon: LucideIcon;
  active: boolean;
  onPress: () => void;
  flex?: boolean;
}) => (
  <TouchableOpacity
    style={[styles.option, flex && styles.optionFlex, active && styles.optionActive]}
    onPress={onPress}
    activeOpacity={0.8}
  >
    <Icon size={16} strokeWidth={1.75} color={active ? ui.text : ui.textMuted} />
    <Text style={[styles.optionText, active && styles.optionTextActive]}>{label}</Text>
  </TouchableOpacity>
);

export const GoalEditModal: React.FC = () => {
  const dispatch = useDispatch();

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
        text: 'Удалить',
        onPress: () => {
          dispatch(deleteTaskRequest({ goalId: currentGoalId, taskId }));
          setTimeout(() => {
            dispatch(fetchTasksRequest(currentGoalId));
          }, 300);
        },
      },
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

            <ScrollView showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="handled">
              {/* Название */}
              <Input
                label="Название *"
                value={title}
                onChangeText={(text) => dispatch(setTitle(text))}
                placeholder="Введите название"
                maxLength={50}
              />

              {/* Описание */}
              <Input
                label="Описание"
                value={description}
                onChangeText={(text) => dispatch(setDescription(text))}
                placeholder="Опишите"
                multiline
                numberOfLines={3}
                maxLength={200}
              />

              {/* Дата начала */}
              <Input
                label="Дата начала (ГГГГ-ММ-ДД)"
                value={startDate}
                onChangeText={(text) => {
                  dispatch(setStartDate(text));
                  validateDates(text, deadline);
                }}
                placeholder="2026-01-01"
              />

              {/* Дедлайн */}
              <Input
                label="Дедлайн (ГГГГ-ММ-ДД)"
                value={deadline}
                onChangeText={(text) => {
                  dispatch(setDeadline(text));
                  validateDates(startDate, text);
                }}
                placeholder="2026-12-31"
                error={dateError}
              />

              {/* Приоритет */}
              <View style={styles.inputGroup}>
                <Text style={styles.label}>Приоритет</Text>
                <View style={styles.optionsRow}>
                  <OptionButton
                    flex
                    icon={Flame}
                    label="Высокий"
                    active={priority === 'HIGH'}
                    onPress={() => dispatch(setPriority('HIGH'))}
                  />
                  <OptionButton
                    flex
                    icon={Circle}
                    label="Средний"
                    active={priority === 'MEDIUM'}
                    onPress={() => dispatch(setPriority('MEDIUM'))}
                  />
                  <OptionButton
                    flex
                    icon={Moon}
                    label="Низкий"
                    active={priority === 'LOW'}
                    onPress={() => dispatch(setPriority('LOW'))}
                  />
                </View>
              </View>

              {/* Категория */}
              <Input
                label="Категория"
                value={category}
                onChangeText={(text) => dispatch(setCategory(text))}
                placeholder="Выберите или введите категорию"
                style={styles.inputTight}
              />
              <View style={[styles.categoriesContainer, styles.inputGroup]}>
                {suggestedCategories.map((cat) => (
                  <TouchableOpacity
                    key={cat}
                    style={[styles.categoryChip, category === cat && styles.categoryChipSelected]}
                    onPress={() => dispatch(setCategory(cat))}
                    activeOpacity={0.8}
                  >
                    <Text
                      style={[
                        styles.categoryChipText,
                        category === cat && styles.categoryChipTextSelected,
                      ]}
                    >
                      {cat}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>

              {/* Статус */}
              <View style={styles.inputGroup}>
                <Text style={styles.label}>Статус</Text>
                <View style={styles.optionsColumn}>
                  <OptionButton
                    icon={Play}
                    label="В процессе"
                    active={status === 'IN_PROGRESS'}
                    onPress={() => dispatch(setStatus('IN_PROGRESS'))}
                  />
                  <OptionButton
                    icon={Check}
                    label="Завершено"
                    active={status === 'COMPLETED'}
                    onPress={() => dispatch(setStatus('COMPLETED'))}
                  />
                  <OptionButton
                    icon={Snowflake}
                    label="Заморожено"
                    active={status === 'FROZEN'}
                    onPress={() => dispatch(setStatus('FROZEN'))}
                  />
                </View>
              </View>

              {/* Задачи */}
              <View style={styles.inputGroup}>
                <View style={styles.tasksHeader}>
                  <Text style={styles.tasksHeaderLabel}>Задачи</Text>
                  <TouchableOpacity
                    style={styles.addLink}
                    onPress={handleAddTask}
                    hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
                  >
                    <Plus size={14} strokeWidth={2} color={ui.text} />
                    <Text style={styles.addLinkText}>Добавить</Text>
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
                  <Text key={idx} style={styles.resultItem}>
                    • {res}
                  </Text>
                ))}
                <View style={styles.resultButtons}>
                  <OptionButton
                    flex
                    icon={Plus}
                    label="Текст"
                    active={false}
                    onPress={() => dispatch(openResultModal())}
                  />
                  <OptionButton
                    flex
                    icon={Camera}
                    label="Фото"
                    active={false}
                    onPress={() =>
                      Alert.alert('Функция в разработке', 'Загрузка фото будет доступна позже')
                    }
                  />
                </View>
              </View>
            </ScrollView>

            {/* Ошибка сервера */}
            {error ? <Text style={styles.serverErrorText}>{error}</Text> : null}

            {/* Кнопки */}
            <View style={styles.buttonsContainer}>
              <Button
                title="Отмена"
                variant="secondary"
                onPress={() => dispatch(closeModal())}
                style={styles.buttonFlex}
              />
              <Button
                title="Сохранить"
                onPress={handleSave}
                loading={isSaving}
                style={styles.buttonFlex}
              />
            </View>
          </View>
        </View>
      </Modal>

      {/* Модалка добавления текстового результата */}
      <Modal visible={resultModalVisible} transparent animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={[styles.modalContent, styles.modalContentCompact]}>
            <Text style={styles.modalTitle}>Добавить результат</Text>
            <Input
              label="Результат"
              value={resultText}
              onChangeText={(text) => dispatch(setResultText(text))}
              placeholder="Введите текст..."
              multiline
            />
            <View style={styles.buttonsContainer}>
              <Button
                title="Отмена"
                variant="secondary"
                onPress={() => dispatch(closeResultModal())}
                style={styles.buttonFlex}
              />
              <Button
                title="Сохранить"
                onPress={handleAddTextResult}
                style={styles.buttonFlex}
              />
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