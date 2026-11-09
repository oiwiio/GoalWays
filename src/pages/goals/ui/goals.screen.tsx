import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Alert,
  SafeAreaView,
  StatusBar,
  StyleSheet,
} from 'react-native';
import { Plus } from 'lucide-react-native';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../../app/navigation/navigation';
import { RootState } from '../../../app/store';
import { GoalCard } from './goal.card';
import { CreateGoalModal } from '../../../features/goals/ui/create-goal-modal';
import { GoalAPI } from '../../../types/goal';
import { setStatusFilter } from '../../../features/goals/ui.slice';
import { Button } from '../../../shared/ui/button';
import { ui } from '../../../shared/styles/ui';

// Redux actions & selectors
import {
  fetchGoalsRequest,
  createGoalRequest,
  archiveGoalRequest,
  setActiveTab,
  clearError,
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
    // При загрузке синхронизируем фильтр с активным табом
    const getStatusFromTab = () => {
      switch (activeTab) {
        case 'in_progress':
          return ['IN_PROGRESS'];
        case 'completed':
          return ['COMPLETED'];
        case 'frozen':
          return ['FROZEN'];
        case 'archived':
          return ['ARCHIVED'];
        default:
          return ['IN_PROGRESS'];
      }
    };

    dispatch(setStatusFilter(getStatusFromTab()));
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

  const handleArchiveGoal = (goal: GoalAPI) => {
    setConfirmModal({ visible: true, goal, action: 'archive' });
  };

  const handleRestoreGoal = (goal: GoalAPI) => {
    setConfirmModal({ visible: true, goal, action: 'restore' });
  };

  const handleDeleteGoal = (goal: GoalAPI) => {
    setConfirmModal({ visible: true, goal, action: 'delete' });
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
      goal: goal,
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
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={ui.background} />

      {/* Заголовок */}
      <View style={styles.header}>
        <Text style={styles.title}>Мои цели</Text>
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => setModalVisible(true)}
          activeOpacity={0.8}
        >
          <Plus size={22} strokeWidth={2} color={ui.text} />
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
              activeOpacity={0.8}
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
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: ui.background,
  },

  // Шапка
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingTop: 24,
    height: 80,
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    color: ui.text,
  },
  addButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: ui.accent,
    justifyContent: 'center',
    alignItems: 'center',
  },

  // Табы
  tabsWrapper: {
    marginTop: 8,
    marginBottom: 16,
  },
  tabsContainer: {
    paddingHorizontal: 24,
    gap: 8,
  },
  tab: {
    height: 36,
    paddingHorizontal: 16,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: ui.card,
  },
  activeTab: {
    backgroundColor: ui.accent,
  },
  tabText: {
    fontSize: 12,
    fontWeight: '500',
    color: ui.textMuted,
  },
  activeTabText: {
    fontWeight: '700',
    color: ui.text,
  },

  // Список
  listContent: {
    paddingHorizontal: 24,
    paddingBottom: 24,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  emptyText: {
    fontSize: 12,
    textAlign: 'center',
    color: ui.textMuted,
    marginBottom: 24,
  },
  emptyButton: {
    alignSelf: 'stretch',
  },
});