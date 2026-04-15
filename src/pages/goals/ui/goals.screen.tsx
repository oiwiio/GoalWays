import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    FlatList,
    TouchableOpacity,
    StyleSheet,
    SafeAreaView,
    Alert
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../../app/navigation';
import { GoalCard } from '../../../features/goals/ui/goal-card';
import { CreateGoalModal } from '../../../features/goals/ui/create-goal-modal';
import { Goal } from '../../../types/goal';
import {
    fetchGoalsRequest,
    createGoalRequest,
    archiveGoalRequest,
    setActiveTab,
    clearError,
    updateGoalRequest,
    restoreGoalRequest,
    deleteGoalRequest,
} from '../../../features/goals/slice';
import {
    selectSortedGoals,
    selectInProgressCount,
    selectCompletedCount,
    selectFrozenCount,
    selectArchivedCount,
    selectActiveTab,
    selectGoalsIsLoading,
    selectGoalsError,
    
} from '../../../features/goals/selectors';
import { colors, spacing, borderRadius, typography, shadows } from '../../../shared/styles/theme';
import { GoalDetailModal } from '../../../features/goals/ui/goal-detail-modal';
import {  Task } from '../../../types/goal';
import { RootState } from '../../../app/store';
import { ScrollView } from 'react-native'; 

type GoalsScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Goals'>;

export const GoalsScreen = () => {
    const navigation = useNavigation<GoalsScreenNavigationProp>();
    const dispatch = useDispatch();
    const [modalVisible, setModalVisible] = useState(false);
    const goals = useSelector((state: RootState) => state.goals.items);
    const activeTab = useSelector(selectActiveTab);
    const inProgressCount = useSelector(selectInProgressCount);
    const completedCount = useSelector(selectCompletedCount);
    const frozenCount = useSelector(selectFrozenCount);
    const archivedCount = useSelector(selectArchivedCount);
    const isLoading = useSelector(selectGoalsIsLoading);
    const error = useSelector(selectGoalsError);
    const [editingGoal, setEditingGoal] = useState<Goal | null>(null);
    const [editModalVisible, setEditModalVisible] = useState(false);

    useEffect(() => {
        dispatch(fetchGoalsRequest());
    }, [dispatch]);

    useEffect(() => {
        if (error) {
            Alert.alert('Ошибка', error);
            dispatch(clearError());
        }
    }, [error, dispatch]);

    const handleCreateGoal = (newGoal: Omit<Goal, 'id' | 'createdAt'>) => {
    dispatch(createGoalRequest(newGoal));
    setModalVisible(false);
 
    setTimeout(() => {
    dispatch(fetchGoalsRequest());
  }, 500); 
  console.log('Обновление списка целей..');
};

    const handleEditGoal = (goal: Goal) => {
    setEditingGoal(goal);
    setEditModalVisible(true);
};

    const handleSaveGoal = (updatedGoal: Goal) => {
    dispatch(updateGoalRequest(updatedGoal));
    };
    
    const handleArchiveGoal = (goal: Goal) => {
        Alert.alert(
            'Архивировать цель',
            `Переместить "${goal.title}" в архив?`,
            [
                { text: 'Отмена', style: 'cancel' },
                {
                    text: 'Архивировать',
                    onPress: () => dispatch(archiveGoalRequest(goal.id)),
                },
            ]
        );
    };

    const handleRestoreGoal = (goal: Goal) => {
    Alert.alert(
        'Восстановить цель',
        `Вернуть "${goal.title}" из архива?`,
    [
      { text: 'Отмена', style: 'cancel' },
      {
        text: 'Восстановить',
        onPress: () => dispatch(restoreGoalRequest(goal.id)),
                },
            ]
        );
    };

    const handleDeleteGoal = (goal: Goal) => { //удаление
    dispatch(deleteGoalRequest(goal.id));   // диспатчим экшн
    };

    const handleGoalPress = (goal: Goal) => {
    console.log('Нажали на цель:', goal.title);
    
    setEditingGoal(goal);
    setEditModalVisible(true);
};


    const handleSaveItem = (updatedItem: Goal | Task) => {
    dispatch(updateGoalRequest(updatedItem as Goal));
    };
    // const handleSaveItem = (updatedItem: Goal | Task) => {
    // if ('tasks' in updatedItem) {
    //     // это Goal
    //     dispatch(updateGoalRequest(updatedItem as Goal));
    // } else {
    //     // это Task
    //     // dispatch(updateTaskRequest(updatedItem as Task));
    //     console.log('Сохраняем задачу:', updatedItem);
    // }
    // };

    return (
        <SafeAreaView style={styles.container}>
            {/* заголовок */}
            <View style={styles.header}>
                <Text style={styles.title}>Мои цели</Text>
                <TouchableOpacity
                    style={styles.addButton}
                    onPress={() => setModalVisible(true)}
                >
                    <Text style={styles.addButtonText}>+</Text>
                </TouchableOpacity>
            </View>

    {/* табы */}
        <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.tabScrollContainer}
        >
        <TouchableOpacity
          style={[styles.tab, activeTab === 'in_progress' && styles.activeTab]}
          onPress={() => dispatch(setActiveTab('in_progress'))}
        >
            <Text style={[styles.tabText, activeTab === 'in_progress' && styles.activeTabText]} numberOfLines={1}>
              В работе ({inProgressCount})
            </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.tab, activeTab === 'completed' && styles.activeTab]}
          onPress={() => dispatch(setActiveTab('completed'))}
        >
          <Text style={[styles.tabText, activeTab === 'completed' && styles.activeTabText]} numberOfLines={1}>
            Готово ({completedCount})
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.tab, activeTab === 'frozen' && styles.activeTab]}
          onPress={() => dispatch(setActiveTab('frozen'))}
        >
          <Text style={[styles.tabText, activeTab === 'frozen' && styles.activeTabText]} numberOfLines={1}>
            Заморож. ({frozenCount})
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.tab, activeTab === 'archived' && styles.activeTab]}
          onPress={() => dispatch(setActiveTab('archived'))}
        >
        <Text style={[styles.tabText, activeTab === 'archived' && styles.activeTabText]} numberOfLines={1}>
          Архив ({archivedCount})
        </Text>
        </TouchableOpacity>
        </ScrollView>

        {/* список целей */}
            {isLoading && goals.length === 0 ? (
                <View style={styles.emptyContainer}>
                    <Text style={styles.emptyText}>Загрузка..</Text>
                </View>
            ) : goals.length > 0 ? (
                <FlatList
                    data={goals}
                    keyExtractor={(item) => item.id}
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
                        <TouchableOpacity
                            style={styles.emptyButton}
                            onPress={() => setModalVisible(true)}
                        >
                            <Text style={styles.emptyButtonText}>Создать первую цель</Text>
                        </TouchableOpacity>
                    )}
                </View>
            )}

            <CreateGoalModal
                visible={modalVisible}
                onClose={() => setModalVisible(false)}
                onCreateGoal={handleCreateGoal}
            />

            
            <GoalDetailModal
                visible={editModalVisible}
                mode="goal"                  
                item={editingGoal}            
                onClose={() => {
                setEditModalVisible(false);
                setEditingGoal(null);
                }}
                onSave={handleSaveItem}
            />
            
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: spacing.l,
        paddingVertical: spacing.m,
        backgroundColor: colors.surface,
        borderBottomWidth: 1,
        borderBottomColor: colors.borderLight,
    },
    title: {
        ...typography.h1,
    },
    addButton: {
        width: 44,
        height: 44,
        borderRadius: borderRadius.round,
        backgroundColor: colors.primary,
        justifyContent: 'center',
        alignItems: 'center',
    },
    addButtonText: {
        fontSize: 28,
        color: colors.surface,
        fontWeight: '600',
        lineHeight: 32,
    },
    listContent: {
        paddingVertical: spacing.s,
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
        backgroundColor: colors.primary,
        paddingHorizontal: spacing.xl,
        paddingVertical: spacing.m,
        borderRadius: borderRadius.round,
    },
    emptyButtonText: {
        ...typography.button,
        color: colors.surface,
    },
    
    tabScrollContainer: {
    flexGrow: 1,
    paddingHorizontal: spacing.m,
    paddingVertical: spacing.s,
    gap: spacing.s,
    },
    tab: {
      paddingHorizontal: spacing.m,
      paddingVertical: spacing.xs,
      borderRadius: borderRadius.round,  
      backgroundColor: colors.borderLight,
      alignItems: 'center',
      justifyContent: 'center',
      minWidth: 60,
      height: 36,
    },
    activeTab: {
      backgroundColor: colors.primary,
    },
    tabText: {
      fontSize: 12,
      color: colors.textSecondary,
      fontWeight: '500',
    },
    activeTabText: {
      color: colors.surface,
      fontWeight: '600',
    },
    

});