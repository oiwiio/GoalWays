// features/goals/ui/goal-detail-screen/GoalDetailScreen.tsx
import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation, useRoute } from '@react-navigation/native';
import { GoalAPI, Task } from '../../../../types/goal';
import { TaskItem } from '../../../tasks/ui/task-item';
import { TaskModal } from '../../../tasks/ui/task-modal';
import { 
  fetchTasksRequest, 
  createTaskRequest,
  updateTaskRequest,
  deleteTaskRequest,
} from '../../../tasks/tasks.slice';
import { selectTasksItems, selectTasksIsLoading } from '../../../tasks/tasks.selectors';
import { AIPlanButton } from '../../../ai/ui/AIPlanButton';
import { ClarificationModal } from '../../../ai/ui/ClarificationModal';
import { PlanResultModal } from '../../../ai/ui/PlanResultModal';
import { AIGeneratedTask } from '../../../ai/slice';  
import { styles } from './goal-detail-screen.styles';

interface RouteParams {
  goalId: string;
  goal: GoalAPI;
}

export const GoalDetailScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const dispatch = useDispatch();
  
  const { goalId, goal: goalProp } = route.params as RouteParams;
  const [goal, setGoal] = useState<GoalAPI | null>(goalProp || null);
  
  // Состояния для модалки задач
  const [taskModalVisible, setTaskModalVisible] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  
  const tasks = useSelector(selectTasksItems);
  const tasksLoading = useSelector(selectTasksIsLoading);
  
  useEffect(() => {
    if (goalId) {
      dispatch(fetchTasksRequest(Number(goalId)));
    }
  }, [goalId, dispatch]);
  
  const handleAddTask = () => {
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
    Alert.alert('Удалить задачу', 'Вы уверены?', [
      { text: 'Отмена', style: 'cancel' },
      {
        text: 'Удалить',
        onPress: () => {
          dispatch(deleteTaskRequest({ goalId: Number(goalId), taskId }));
          setTimeout(() => {
            dispatch(fetchTasksRequest(Number(goalId)));
          }, 300);
        }
      }
    ]);
  };
  
  const handleEditGoal = () => {
    // TODO: открыть модалку редактирования цели
  };
  
  const handleAddSelectedTasks = (selectedTasks: AIGeneratedTask[]) => {
    selectedTasks.forEach(task => {
      dispatch(createTaskRequest({
        goalId: Number(goalId),
        data: {
          title: task.title,
          description: task.description || '',
          priority: task.priority || 'MEDIUM',
          estimated_minutes: task.estimated_minutes || 60,
          status: 'IN_PROGRESS',
          progress: 0,
        }
      }));
    });
    setTimeout(() => {
      dispatch(fetchTasksRequest(Number(goalId)));
    }, 500);
  };
  
  const handleAddAllTasks = () => {
    // TODO: добавить все задачи из ai.generatedTasks
    Alert.alert('В разработке', 'Функция добавления всех задач');
  };
  
  if (!goal) {
    return (
      <SafeAreaView style={styles.centered}>
        <ActivityIndicator size="large" color="#007AFF" />
      </SafeAreaView>
    );
  }
  
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        {/* Заголовок */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Text style={styles.backButton}>←</Text>
          </TouchableOpacity>
          <Text style={styles.title}>{goal.title}</Text>
          <TouchableOpacity onPress={handleEditGoal}>
            <Text style={styles.editButton}>✏️</Text>
          </TouchableOpacity>
        </View>
        
        {/* Описание */}
        {goal.description && (
          <Text style={styles.description}>{goal.description}</Text>
        )}
        
        {/* Прогресс */}
        <View style={styles.progressContainer}>
          <View style={styles.progressBar}>
            <View style={[styles.progressFill, { width: `${goal.progress}%` }]} />
          </View>
          <Text style={styles.progressText}>{goal.progress}%</Text>
        </View>
        
        {/* Кнопки действий */}
        <View style={styles.actionsContainer}>
          <TouchableOpacity style={styles.actionButton} onPress={handleAddTask}>
            <Text style={styles.actionButtonText}>+ Добавить задачу</Text>
          </TouchableOpacity>
          
          <AIPlanButton goalId={Number(goalId)} />
        </View>
        
        {/* Список задач */}
        <View style={styles.tasksContainer}>
          <Text style={styles.tasksTitle}>Задачи:</Text>
          {tasksLoading ? (
            <ActivityIndicator size="small" color="#007AFF" />
          ) : tasks.length === 0 ? (
            <Text style={styles.emptyText}>Нет задач</Text>
          ) : (
            tasks.map((task) => (
              <TaskItem 
                key={task.id} 
                task={task} 
                onPress={() => handleEditTask(task)}
                
              />
            ))
          )}
        </View>
      </ScrollView>
      
      {/* Модалка задачи */}
      <TaskModal
        visible={taskModalVisible}
        mode={editingTask ? 'edit' : 'create'}
        task={editingTask}
        goalId={Number(goalId)}
        onClose={() => {
          setTaskModalVisible(false);
          setEditingTask(null);
        }}
        onSave={handleSaveTask}
      />
      
      {/* Модалки AI */}
      <ClarificationModal />
      <PlanResultModal 
        onAddSelected={handleAddSelectedTasks}
        onAddAll={handleAddAllTasks}
      />
    </SafeAreaView>
  );
};