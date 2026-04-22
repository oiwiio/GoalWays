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
import { GoalAPI } from '../../../types/goal';
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
import { GoalViewModal } from '../../../features/goals/ui/goal-view-modal';
import { styles } from './styles';

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
    const [editingGoal, setEditingGoal] = useState<GoalAPI | null>(null);
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

    const handleCreateGoal = (newGoal: Omit<GoalAPI, 'id' | 'createdAt'>) => {
    dispatch(createGoalRequest(newGoal));
    setModalVisible(false);
 
    setTimeout(() => {
    dispatch(fetchGoalsRequest());
  }, 500); 
  console.log('Обновление списка целей..');
};

    const handleEditGoal = (goal: GoalAPI) => {
    setEditingGoal(goal);
    setEditModalVisible(true);
};

    const handleSaveGoal = (updatedGoal: GoalAPI) => {
    dispatch(updateGoalRequest(updatedGoal));
    };
    
    const handleArchiveGoal = (goal: GoalAPI) => {
        Alert.alert(
            'Архивировать цель',
            `Переместить "${goal.title}" в архив?`,
            [
                { text: 'Отмена', style: 'cancel' },
                {
                    text: 'Архивировать',
                    onPress: () => dispatch(restoreGoalRequest(String(goal.id)))
                },
            ]
        );
    };

    const handleRestoreGoal = (goal: GoalAPI) => {
    Alert.alert(
        'Восстановить цель',
        `Вернуть "${goal.title}" из архива?`,
    [
      { text: 'Отмена', style: 'cancel' },
      {
        text: 'Восстановить',
        onPress: () => () => dispatch(restoreGoalRequest(String(goal.id))),
                },
            ]
        );
    };

    const handleDeleteGoal = (goal: GoalAPI) => { //удаление
    () => dispatch(restoreGoalRequest(String(goal.id)))   // диспатчим экшн
    };

    

    const handleGoalPress = (goal: GoalAPI) => {
    setViewingGoal(goal);
    setViewModalVisible(true);
    console.log('Нажали на цель:', goal.title)
    };

    const [viewModalVisible, setViewModalVisible] = useState(false);
    const [viewingGoal, setViewingGoal] = useState<GoalAPI | null>(null);

    const handleSaveItem = (updatedItem: GoalAPI | Task) => {
    dispatch(updateGoalRequest(updatedItem as GoalAPI));
    };
    
    const handleEditFromView = () => {
    setViewModalVisible(false);
    setEditingGoal(viewingGoal);
    setEditModalVisible(true);
    };
    

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

        {error && (
                <View style={styles.errorContainer}>
                    <Text style={styles.errorText}>Не удалось загрузить цели</Text>
                    <TouchableOpacity style={styles.retryButton} onPress={() => dispatch(fetchGoalsRequest())}>
                        <Text style={styles.retryButtonText}>Повторить</Text>
                    </TouchableOpacity>
                </View>
            )}

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
            <GoalViewModal
                visible={viewModalVisible}
                goal={viewingGoal}
                onClose={() => setViewModalVisible(false)}
                onEdit={handleEditFromView}
            />
                
            
                
        </SafeAreaView>
    );
};

