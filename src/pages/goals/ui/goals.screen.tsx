import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    FlatList,
    TouchableOpacity,
    SafeAreaView,
    Alert
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { ScrollView } from 'react-native';

import { RootStackParamList } from '../../../app/navigation';
import { RootState } from '../../../app/store';
import { GoalCard } from '../../../features/goals/ui/goal-card';
import { CreateGoalModal } from '../../../features/goals/ui/create-goal-modal';
import { GoalAPI, Task } from '../../../types/goal';
import { setStatusFilter } from '../../../features/goals/ui.slice';
import { styles } from './styles';

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
} from '../../../features/goals/slice';
import {
    selectInProgressCount,
    selectCompletedCount,
    selectFrozenCount,
    selectArchivedCount,
    selectActiveTab,
    selectGoalsIsLoading,
    selectGoalsError,
} from '../../../features/goals/selectors';

// Модалки
import { GoalEditModal, openModal as openEditModal } from '../../../features/goals/ui/goal-edit-modal';

type GoalsScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Goals'>;

export const GoalsScreen = () => {
    const navigation = useNavigation<GoalsScreenNavigationProp>();
    const dispatch = useDispatch();
    
    // Состояния
    const [modalVisible, setModalVisible] = useState(false);
    
    // Redux данные
    const goals = useSelector((state: RootState) => state.goals.items);
    const activeTab = useSelector(selectActiveTab);
    const inProgressCount = useSelector(selectInProgressCount);
    const completedCount = useSelector(selectCompletedCount);
    const frozenCount = useSelector(selectFrozenCount);
    const archivedCount = useSelector(selectArchivedCount);
    const isLoading = useSelector(selectGoalsIsLoading);
    const error = useSelector(selectGoalsError);
    
    // Эффекты
    useEffect(() => {
        console.log('Запрос на загрузку целей');
        dispatch(fetchGoalsRequest());
    }, [dispatch]);

    useEffect(() => {
        if (error) {
            Alert.alert('Ошибка', error);
            dispatch(clearError());
        }
    }, [error, dispatch]);

    // Обработчики
    const handleCreateGoal = (newGoal: Omit<GoalAPI, 'id' | 'createdAt'>) => {
        console.log('handleCreateGoal ВЫЗВАН в GoalsScreen');
        console.log('newGoal:', JSON.stringify(newGoal, null, 2));
  
        dispatch(createGoalRequest(newGoal));
        console.log('dispatch createGoalRequest отправлен');
  
        setModalVisible(false);
  
        setTimeout(() => {
          console.log('Вызов fetchGoalsRequest');
          dispatch(fetchGoalsRequest());
        }, 1000);
    };
    const handleEditGoal = (goal: GoalAPI) => {
        dispatch(openEditModal(goal));
    };

    const handleArchiveGoal = (goal: GoalAPI) => {
        Alert.alert(
            'Архивировать цель',
            `Переместить "${goal.title}" в архив?`,
            [
                { text: 'Отмена', style: 'cancel' },
                {
                    text: 'Архивировать',
                    onPress: () => dispatch(archiveGoalRequest(String(goal.id)))
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
                { text: 'Восстановить', onPress: () => dispatch(restoreGoalRequest(String(goal.id))) }
            ]
        );
    };

    const handleDeleteGoal = (goal: GoalAPI) => {
        Alert.alert(
            'Удалить цель',
            `Удалить "${goal.title}" навсегда?`,
            [
                { text: 'Отмена', style: 'cancel' },
                { text: 'Удалить', onPress: () => dispatch(deleteGoalRequest(String(goal.id))) }
            ]
        );
    };

    // TODO: Создать GoalDetailScreen или вернуть модальный просмотр
    const handleGoalPress = (goal: GoalAPI) => {
        // Вариант 1: Открыть экран деталей (нужно создать GoalDetailScreen)
        navigation.navigate('GoalDetail', { 
            goalId: String(goal.id), 
            goal: goal 
        });
        
        // Вариант 2: Пока использовать модальный просмотр (если есть GoalViewModal)
        // dispatch(openViewModal(goal));
        
        console.log('Нажали на цель:', goal.title);
    };

    const handleSaveItem = (updatedItem: GoalAPI | Task) => {
        dispatch(updateGoalRequest(updatedItem as GoalAPI));
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
                    onPress={() => {
                        console.log('Нажат таб IN_PROGRESS');
                        dispatch(setStatusFilter(['IN_PROGRESS']));
                        dispatch(setActiveTab('in_progress'));
                        dispatch(fetchGoalsRequest());
                    }}
                >
                    <Text>В работе ({inProgressCount})</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={[styles.tab, activeTab === 'completed' && styles.activeTab]}
                    onPress={() => {
                        console.log('Нажат таб COMPLETED');
                        dispatch(setStatusFilter(['COMPLETED']));
                        dispatch(setActiveTab('completed'));
                        dispatch(fetchGoalsRequest());
                    }}
                >
                    <Text>Готово ({completedCount})</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={[styles.tab, activeTab === 'frozen' && styles.activeTab]}
                    onPress={() => {
                        console.log('Нажат таб FROZEN');
                        dispatch(setStatusFilter(['FROZEN']));
                        dispatch(setActiveTab('frozen'));
                        dispatch(fetchGoalsRequest());
                    }}
                >
                    <Text>Заморож. ({frozenCount})</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={[styles.tab, activeTab === 'archived' && styles.activeTab]}
                    onPress={() => {
                        console.log('Нажат таб ARCHIVED');
                        dispatch(setStatusFilter(['ARCHIVED']));
                        dispatch(setActiveTab('archived'));
                        dispatch(fetchGoalsRequest());
                    }}
                >
                    <Text>Архив ({archivedCount})</Text>
                </TouchableOpacity>
            </ScrollView>

            {/* Ошибка */}
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
                    keyExtractor={(item) => item.id.toString()}
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

            {/* Модалка создания цели */}
            <CreateGoalModal
                visible={modalVisible}
                onClose={() => setModalVisible(false)}
                onCreateGoal={handleCreateGoal}
            />

            {/* Модалка редактирования цели */}
            <GoalEditModal />
        </SafeAreaView>
    );
};