import React, { useState } from 'react';
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
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../../types/navigation';
import { GoalCard } from '../../tasks/GoalCard';
import { CreateGoalModal }  from '../../tasks/CreateGoalModal';
import { Goal } from '../../../types/goal';


type GoalsScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Goals'>;

export const GoalsScreen = () => {
    const navigation = useNavigation<GoalsScreenNavigationProp>();
    const [modalVisible, setModalVisible] = useState(false);
    const [activeTab, setActiveTab] = useState<'active' | 'archived'>('active');
    const [goals, setGoals] = useState<Goal[]>([
        
        {
            id: '1',
            title: 'Выучить React Native',
            description: 'Освоить основы и создать несколько проектов',
            category: 'Учеба',
            deadline: '2025-06-01',
            progress: 45,
            status: 'active'
        },
        {
            id: '2',
            title: 'Сдать курсовую',
            description: 'Закончить проект и подготовить отчет',
            category: 'Учеба',
            deadline: '2025-05-15',
            progress: 70,
            status: 'active'
        },
        {
            id: '3',
            title: 'Пробежать марафон',
            description: 'Подготовка к забегу на 10 км',
            category: 'Здоровье',
            deadline: '2025-08-20',
            progress: 25,
            status: 'active'
        }

    ]);

    const handleCreateGoal = (newGoal: Goal) => {
        setGoals([newGoal, ...goals]);
    };
    
    const handleArchiveGoal = (goal: Goal) => {
        Alert.alert(
            'Архивировать цель',
            `Переместить "${goal.title}" в архив?`,
            [
                { text: 'Отмена', style: 'cancel' },
                {
                    text: 'Архивировать',
                    onPress: () => {
                        setGoals(goals.map(g => 
                            g.id === goal.id 
                                ? { ...g, status: 'archived' as const } 
                                : g
                        ));
                    }
                }
            ]
        );
    };

    const handleGoalPress = (goal: Goal) => {
        Alert.alert('Цель', `Выбрана цель: ${goal.title}`);
    };

    // Фильтруем цели по статусу
    const filteredGoals = goals.filter(goal => 
        activeTab === 'active' 
            ? goal.status === 'active' 
            : goal.status === 'archived'
    );

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

            {/* Табы: Активные / Архив */}
            <View style={styles.tabContainer}>
                <TouchableOpacity
                    style={[styles.tab, activeTab === 'active' && styles.activeTab]}
                    onPress={() => setActiveTab('active')}
                >
                    <Text style={[styles.tabText, activeTab === 'active' && styles.activeTabText]}>
                        Активные ({goals.filter(g => g.status === 'active').length})
                    </Text>
                </TouchableOpacity>
                
                <TouchableOpacity
                    style={[styles.tab, activeTab === 'archived' && styles.activeTab]}
                    onPress={() => setActiveTab('archived')}
                >
                    <Text style={[styles.tabText, activeTab === 'archived' && styles.activeTabText]}>
                        Архив ({goals.filter(g => g.status === 'archived').length})
                    </Text>
                </TouchableOpacity>
            </View>

            {/* Список целей */}
            {filteredGoals.length > 0 ? (
                <FlatList
                    data={filteredGoals}
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

            {/* Модальное окно создания цели */}
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

