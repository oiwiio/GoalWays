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
import { RootStackParamList } from '../../../types/navigation';
import { GoalCard } from '../../tasks/goal-card';
import { CreateGoalModal } from '../../../features/goals/ui/create-goal-modal';
import { Goal } from '../../../types/goal';
import {
    fetchGoalsRequest,
    createGoalRequest,
    archiveGoalRequest,
    setActiveTab,
    clearError,
} from '../../../features/goals/goals.slice';
import {
    selectFilteredGoals,
    selectActiveCount,
    selectArchivedCount,
    selectActiveTab,
    selectGoalsIsLoading,
    selectGoalsError,
} from '../../../features/goals/goals.selectors';

type GoalsScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Goals'>;

export const GoalsScreen = () => {
    const navigation = useNavigation<GoalsScreenNavigationProp>();
    const dispatch = useDispatch();

    const [modalVisible, setModalVisible] = useState(false);

    const goals = useSelector(selectFilteredGoals);
    const activeTab = useSelector(selectActiveTab);
    const activeCount = useSelector(selectActiveCount);
    const archivedCount = useSelector(selectArchivedCount);
    const isLoading = useSelector(selectGoalsIsLoading);
    const error = useSelector(selectGoalsError);

    // Загрузка целей при монтировании
    useEffect(() => {
        dispatch(fetchGoalsRequest());
    }, [dispatch]);

    // Обработка ошибок
    useEffect(() => {
        if (error) {
            Alert.alert('Ошибка', error);
            dispatch(clearError());
        }
    }, [error, dispatch]);

    const handleCreateGoal = (newGoal: Omit<Goal, 'id' | 'createdAt'>) => {
        dispatch(createGoalRequest(newGoal));
        setModalVisible(false);
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

    const handleGoalPress = (goal: Goal) => {
        Alert.alert('Цель', `Выбрана цель: ${goal.title}`);
    };

    return (
        <SafeAreaView style={styles.container}>
            {/* Заголовок */}
            <View style={styles.header}>
                <Text style={styles.title}>Мои цели</Text>
                <TouchableOpacity
                    style={styles.addButton}
                    onPress={() => setModalVisible(true)}
                >
                    <Text style={styles.addButtonText}>+</Text>
                </TouchableOpacity>
            </View>

            {/* Табы */}
            <View style={styles.tabContainer}>
                <TouchableOpacity
                    style={[styles.tab, activeTab === 'active' && styles.activeTab]}
                    onPress={() => dispatch(setActiveTab('active'))}
                >
                    <Text style={[styles.tabText, activeTab === 'active' && styles.activeTabText]}>
                        Активные ({activeCount})
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={[styles.tab, activeTab === 'archived' && styles.activeTab]}
                    onPress={() => dispatch(setActiveTab('archived'))}
                >
                    <Text style={[styles.tabText, activeTab === 'archived' && styles.activeTabText]}>
                        Архив ({archivedCount})
                    </Text>
                </TouchableOpacity>
            </View>

            {/* Индикатор загрузки */}
            {isLoading && goals.length === 0 ? (
                <View style={styles.emptyContainer}>
                    <Text style={styles.emptyText}>Загрузка...</Text>
                </View>
            ) : goals.length > 0 ? (
                <FlatList
                    data={goals}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => (
                        <GoalCard
                            goal={item}
                            onPress={handleGoalPress}
                            onArchive={handleArchiveGoal}
                        />
                    )}
                    contentContainerStyle={styles.listContent}
                />
            ) : (
                <View style={styles.emptyContainer}>
                    <Text style={styles.emptyText}>
                        {activeTab === 'active'
                            ? 'У вас пока нет активных целей'
                            : 'В архиве пока нет целей'}
                    </Text>
                    {activeTab === 'active' && (
                        <TouchableOpacity
                            style={styles.emptyButton}
                            onPress={() => setModalVisible(true)}
                        >
                            <Text style={styles.emptyButtonText}>Создать первую цель</Text>
                        </TouchableOpacity>
                    )}
                </View>
            )}

            {/* Модалка */}
            <CreateGoalModal
                visible={modalVisible}
                onClose={() => setModalVisible(false)}
                onCreateGoal={handleCreateGoal}
            />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingVertical: 16,
        backgroundColor: '#fff',
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#1a1a1a',
    },
    addButton: {
        width: 44,
        height: 44,
        borderRadius: 22,
        backgroundColor: '#007AFF',
        justifyContent: 'center',
        alignItems: 'center',
    },
    addButtonText: {
        fontSize: 28,
        color: '#fff',
        fontWeight: '600',
        lineHeight: 32,
    },
    tabContainer: {
        flexDirection: 'row',
        backgroundColor: '#fff',
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    tab: {
        flex: 1,
        paddingVertical: 10,
        alignItems: 'center',
        borderBottomWidth: 2,
        borderBottomColor: 'transparent',
    },
    activeTab: {
        borderBottomColor: '#007AFF',
    },
    tabText: {
        fontSize: 16,
        color: '#999',
        fontWeight: '500',
    },
    activeTabText: {
        color: '#007AFF',
    },
    listContent: {
        paddingVertical: 8,
    },
    emptyContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 40,
    },
    emptyText: {
        fontSize: 16,
        color: '#999',
        textAlign: 'center',
        marginBottom: 20,
    },
    emptyButton: {
        backgroundColor: '#007AFF',
        paddingHorizontal: 30,
        paddingVertical: 12,
        borderRadius: 25,
    },
    emptyButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
    },
});