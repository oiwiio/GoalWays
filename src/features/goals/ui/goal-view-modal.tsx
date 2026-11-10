import React, { useEffect } from 'react';
import { Modal, View, Text, TouchableOpacity, ScrollView } from 'react-native';
import {
  ArrowLeft,
  Pencil,
  Flame,
  Circle,
  Moon,
  Play,
  Check,
  Snowflake,
  Archive,
} from 'lucide-react-native';
import type { LucideIcon } from 'lucide-react-native';
import { useDispatch, useSelector } from 'react-redux';
import { GoalAPI } from '../../../types/goal';
import { TaskItem } from '../../tasks/ui/task-item';
import { fetchTasksRequest } from '../../tasks/index';
import { RootState } from '../../../app/store';
import { ui } from '../../../shared/styles/ui';
import { styles } from './goal-view.styles';

interface GoalViewModalProps {
  visible: boolean;
  goal: GoalAPI | null;
  onClose: () => void;
  onEdit: () => void;
}

type IconText = { icon: LucideIcon; text: string };

const getPriority = (priority: string): IconText => {
  switch (priority) {
    case 'HIGH':
      return { icon: Flame, text: 'Высокий' };
    case 'LOW':
      return { icon: Moon, text: 'Низкий' };
    case 'MEDIUM':
    default:
      return { icon: Circle, text: 'Средний' };
  }
};

const getStatus = (status: string): IconText => {
  switch (status) {
    case 'COMPLETED':
      return { icon: Check, text: 'Завершено' };
    case 'FROZEN':
    case 'PAUSED':
      return { icon: Snowflake, text: 'Заморожено' };
    case 'ARCHIVED':
      return { icon: Archive, text: 'Архив' };
    case 'IN_PROGRESS':
    default:
      return { icon: Play, text: 'В процессе' };
  }
};

// Значение с иконкой слева
const IconValue = ({ icon: Icon, text }: IconText) => (
  <View style={styles.valueRow}>
    <Icon size={16} strokeWidth={1.75} color={ui.text} />
    <Text style={styles.valueText}>{text}</Text>
  </View>
);

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

  return (
    <Modal visible={visible} animationType="slide" transparent={true} onRequestClose={onClose}>
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          {/* Шапка: ← Название ✎ */}
          <View style={styles.headerRow}>
            <TouchableOpacity
              onPress={onClose}
              style={styles.headerButton}
              hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
            >
              <ArrowLeft size={24} strokeWidth={1.75} color={ui.text} />
            </TouchableOpacity>
            <Text style={styles.modalTitle} numberOfLines={1}>
              {goal.title}
            </Text>
            <TouchableOpacity
              onPress={onEdit}
              style={styles.headerButton}
              hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
            >
              <Pencil size={22} strokeWidth={1.75} color={ui.text} />
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
                <IconValue {...getPriority(goal.priority)} />
              </View>
              <View style={styles.halfColumn}>
                <Text style={styles.label}>Статус</Text>
                <IconValue {...getStatus(goal.status)} />
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
                tasks.map((task) => <TaskItem key={task.id} task={task} onPress={() => {}} />)
              )}
            </View>

            {/* Результаты */}
            {goal.results && goal.results.length > 0 && (
              <View style={styles.inputGroup}>
                <Text style={styles.label}>Результаты</Text>
                {goal.results.map((res, idx) => (
                  <Text key={idx} style={styles.resultItem}>
                    • {res}
                  </Text>
                ))}
              </View>
            )}
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
};