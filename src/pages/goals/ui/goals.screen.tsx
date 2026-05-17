import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Alert,
  Platform,
  StyleSheet,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../../app/navigation';
import { RootState } from '../../../app/store';
import { GoalCard } from './goal.card';
import { CreateGoalModal } from '../../../features/goals/ui/create-goal-modal';
import { GoalAPI, Task } from '../../../types/goal';
import { setStatusFilter } from '../../../features/goals/ui.slice';
import { ScreenContainer } from '../../../shared/ui/screen.container';
import { Button } from '../../../shared/ui/button';

// Redux actions & selectors
import {
  fetchGoalsRequest,
  createGoalRequest,
  archiveGoalRequest,
  setActiveTab,
  clearError,
  updateGoalRequest,
  restoreGoalRequest,
  deleteGoalRequest,
} from '../../../features/goals';
import {
  selectInProgressCount,
  selectCompletedCount,
  selectFrozenCount,
  selectArchivedCount,
  selectActiveTab,
  selectGoalsIsLoading,
  selectGoalsError,
} from '../../../features/goals';

// Модалки
import { GoalEditModal, openModal as openEditModal } from '../../../features/goals/ui/goal-edit-modal';
import { colors, spacing, typography, borderRadius } from '../../../shared/styles/theme';
import { ConfirmModal } from '../../../shared/ui/confir.modal';

type GoalsScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Goals'>;

export const GoalsScreen = () => {
  const navigation = useNavigation<GoalsScreenNavigationProp>();
  const dispatch = useDispatch();
  
  const [modalVisible, setModalVisible] = useState(false);
  const [confirmModal, setConfirmModal] = useState({
    visible: false,
    goal: null as GoalAPI | null,
    action: null as 'archive' | 'restore' | 'delete' | null,
  });
  
  const goals = useSelector((state: RootState) => state.goals.items);
  const activeTab = useSelector(selectActiveTab);
  const inProgressCount = useSelector(selectInProgressCount);
  const completedCount = useSelector(selectCompletedCount);
  const frozenCount = useSelector(selectFrozenCount);
  const archivedCount = useSelector(selectArchivedCount);
  const isLoading = useSelector(selectGoalsIsLoading);
  const error = useSelector(selectGoalsError);
  
  useEffect(() => {
    dispatch(fetchGoalsRequest());
  }, [dispatch]);

  useEffect(() => {
    if (error) {
      Alert.alert('Ошибка', error);
      dispatch(clearError());
    }
  }, [error, dispatch]);

  const handleCreateGoal = (newGoal: Omit<GoalAPI, 'id' | 'createdAt'>) => {
    dispatch(createGoalRequest(newGoal));
    setModalVisible(false);
    setTimeout(() => {
      dispatch(fetchGoalsRequest());
    }, 1000);
  };

  const handleEditGoal = (goal: GoalAPI) => {
    dispatch(openEditModal(goal));
  };

  // ✅ Новые обработчики с модалкой
  const handleArchiveGoal = (goal: GoalAPI) => {
    setConfirmModal({
      visible: true,
      goal,
      action: 'archive',
    });
  };

  const handleRestoreGoal = (goal: GoalAPI) => {
    setConfirmModal({
      visible: true,
      goal,
      action: 'restore',
    });
  };

  const handleDeleteGoal = (goal: GoalAPI) => {
    setConfirmModal({
      visible: true,
      goal,
      action: 'delete',
    });
  };

  const handleConfirmAction = () => {
    const { goal, action } = confirmModal;
    if (!goal || !action) return;
    
    switch (action) {
      case 'archive':
        dispatch(archiveGoalRequest(goal.id));
        break;
      case 'restore':
        dispatch(restoreGoalRequest(goal.id));
        break;
      case 'delete':
        dispatch(deleteGoalRequest(goal.id));
        break;
    }
    setConfirmModal({ visible: false, goal: null, action: null });
  };

  const handleGoalPress = (goal: GoalAPI) => {
    navigation.navigate('GoalDetail', { 
      goalId: String(goal.id), 
      goal: goal 
    });
  };

  const handleTabPress = (tab: string, status: string[]) => {
    dispatch(setStatusFilter(status));
    dispatch(setActiveTab(tab as any));
    dispatch(fetchGoalsRequest());
  };

  const tabs = [
    { key: 'in_progress', label: 'В работе', count: inProgressCount, status: ['IN_PROGRESS'] },
    { key: 'completed', label: 'Готово', count: completedCount, status: ['COMPLETED'] },
    { key: 'frozen', label: 'Заморож.', count: frozenCount, status: ['FROZEN'] },
    { key: 'archived', label: 'Архив', count: archivedCount, status: ['ARCHIVED'] },
  ];

  const getModalConfig = () => {
    const { action, goal } = confirmModal;
    
    switch (action) {
      case 'archive':
        return {
          title: 'Архивировать цель',
          message: `Переместить "${goal?.title}" в архив?`,
          confirmText: 'Архивировать',
          confirmVariant: 'primary' as const,
          icon: '📦',
        };
      case 'restore':
        return {
          title: 'Восстановить цель',
          message: `Вернуть "${goal?.title}" из архива?`,
          confirmText: 'Восстановить',
          confirmVariant: 'primary' as const,
          icon: '↩️',
        };
      case 'delete':
        return {
          title: 'Удалить цель',
          message: `Удалить "${goal?.title}" навсегда? Это действие нельзя отменить.`,
          confirmText: 'Удалить',
          confirmVariant: 'danger' as const,
          icon: '🗑️',
        };
      default:
        return null;
    }
  };

  const modalConfig = getModalConfig();

  return (
    <ScreenContainer>
      {/* Заголовок */}
      <View style={styles.header}>
        <Text style={styles.title}>Мои цели</Text>
        <TouchableOpacity style={styles.addButton} onPress={() => setModalVisible(true)}>
          <Text style={styles.addButtonText}>+</Text>
        </TouchableOpacity>
      </View>

      {/* Табы */}
      <View style={styles.tabsWrapper}>
        <FlatList
          horizontal
          data={tabs}
          keyExtractor={(item) => item.key}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.tabsContainer}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={[styles.tab, activeTab === item.key && styles.activeTab]}
              onPress={() => handleTabPress(item.key, item.status)}
            >
              <Text style={[styles.tabText, activeTab === item.key && styles.activeTabText]}>
                {item.label} ({item.count})
              </Text>
            </TouchableOpacity>
          )}
        />
      </View>

      {/* Список целей */}
      {isLoading && goals.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>Загрузка...</Text>
        </View>
      ) : goals.length > 0 ? (
        <FlatList
          data={goals}
          keyExtractor={(item) => String(item.id)}
          renderItem={({ item }) => (
            <GoalCard
              goal={item}
              onPress={handleGoalPress}
              onEdit={handleEditGoal}
              onArchive={handleArchiveGoal}
              onRestore={handleRestoreGoal}
              onDelete={handleDeleteGoal}
            />
          )}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
        />
      ) : (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>
            {activeTab === 'in_progress'
              ? 'У вас пока нет активных целей'
              : activeTab === 'completed'
              ? 'Нет завершённых целей'
              : activeTab === 'frozen'
              ? 'Нет замороженных целей'
              : 'В архиве пока нет целей'}
          </Text>
          {activeTab === 'in_progress' && (
            <Button
              title="Создать первую цель"
              onPress={() => setModalVisible(true)}
              style={styles.emptyButton}
            />
          )}
        </View>
      )}

      {/* Модалки */}
      <CreateGoalModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onCreateGoal={handleCreateGoal}
      />
      <GoalEditModal />

      <ConfirmModal
        visible={confirmModal.visible}
        title={modalConfig?.title || ''}
        message={modalConfig?.message || ''}
        onConfirm={handleConfirmAction}
        onCancel={() => setConfirmModal({ visible: false, goal: null, action: null })}
        confirmText={modalConfig?.confirmText || 'Подтвердить'}
        confirmVariant={modalConfig?.confirmVariant || 'primary'}
        icon={modalConfig?.icon}
      />
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: spacing.l,
    paddingVertical: spacing.m,
    paddingTop: spacing.xl,
  },
  title: {
    ...typography.h1,
    fontSize: 28,
    color: colors.text,
  },
  addButton: {
    width: 44,
    height: 44,
    borderRadius: borderRadius.round,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    ...Platform.select({
      ios: {
        shadowColor: colors.primary,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  addButtonText: {
    fontSize: 28,
    color: colors.text,
    fontWeight: '600',
    lineHeight: 32,
  },
  tabsWrapper: {
    marginTop: spacing.s,
    marginBottom: spacing.s,
  },
  tabsContainer: {
    paddingHorizontal: spacing.m,
    gap: spacing.s,
  },
  tab: {
    paddingHorizontal: spacing.m,
    paddingVertical: spacing.s,
    borderRadius: borderRadius.round,
    backgroundColor: colors.surface,
  },
  activeTab: {
    backgroundColor: colors.primary,
  },
  tabText: {
    ...typography.body,
    fontSize: 14,
    color: colors.textSecondary,
  },
  activeTabText: {
    color: colors.text,
    fontWeight: '600',
  },
  listContent: {
    paddingBottom: spacing.xl,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: spacing.xl,
  },
  emptyText: {
    ...typography.body,
    color: colors.textSecondary,
    textAlign: 'center',
    marginBottom: spacing.l,
  },
  emptyButton: {
    marginTop: spacing.s,
  },
});