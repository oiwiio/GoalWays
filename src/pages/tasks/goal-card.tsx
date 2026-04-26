import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { GoalAPI } from '../../types/goal';

type GoalCardProps = {
    goal: GoalAPI;
    onPress: (goal: GoalAPI) => void;
    onArchive: (goal: GoalAPI) => void;
};

export const GoalCard = ({ goal, onPress, onArchive }: GoalCardProps) => {
    const getProgressColor = (progress: number): string => {
        if (progress < 30) return '#FF3B30';
        if (progress < 70) return '#FF9500'; 
        return '#34C759'; 
    };

    return (
        <TouchableOpacity style={styles.card} onPress={() => onPress(goal)}>
            {/* Заголовок и статус */}
            <View style={styles.header}>
                <Text style={styles.title}>{goal.title}</Text>
                <TouchableOpacity onPress={() => onArchive(goal)}>
                    <Text style={styles.archiveButton}>📦</Text>
                </TouchableOpacity>
            </View>

            {/* Описание (если есть) */}
            {goal.description && (
                <Text style={styles.description} numberOfLines={2}>
                    {goal.description}
                </Text>
            )}

            {/* Прогресс-бар */}
            <View style={styles.progressContainer}>
                <View style={styles.progressBar}>
                    <View 
                        style={[
                            styles.progressFill, 
                            { 
                                width: `${goal.progress}%`,
                                backgroundColor: getProgressColor(goal.progress)
                            }
                        ]} 
                    />
                </View>
                <Text style={styles.progressText}>{goal.progress}%</Text>
            </View>

            {/* Дедлайн (если есть) */}
            {goal.deadline && (
                <View style={styles.deadlineContainer}>
                    <Text style={styles.deadlineIcon}>📅</Text>
                    <Text style={styles.deadlineText}>
                        {new Date(goal.deadline).toLocaleDateString('ru-RU')}
                    </Text>
                </View>
            )}

            {/* Теги/категории */}
            {goal.category && (
                <View style={styles.categoryTag}>
                    <Text style={styles.categoryText}>{goal.category}</Text>
                </View>
            )}
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({

    card: {
        backgroundColor: '#fff',
        borderRadius: 12,
        padding: 16,
        marginHorizontal: 16,
        marginVertical: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 8,
    },
    title: {
        fontSize: 18,
        fontWeight: '600',
        color: '#1a1a1a',
        flex: 1,
    },
    archiveButton: {
        fontSize: 20,
        padding: 4,
    },
    description: {
        fontSize: 14,
        color: '#666',
        marginBottom: 12,
        lineHeight: 20,
    },
    progressContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 12,
    },
    progressBar: {
        flex: 1,
        height: 8,
        backgroundColor: '#f0f0f0',
        borderRadius: 4,
        marginRight: 8,
        overflow: 'hidden',
    },
    progressFill: {
        height: '100%',
        borderRadius: 4,
    },
    progressText: {
        fontSize: 14,
        fontWeight: '500',
        color: '#666',
        minWidth: 40,
        textAlign: 'right',
    },
    deadlineContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 8,
    },
    deadlineIcon: {
        fontSize: 14,
        marginRight: 4,
    },
    deadlineText: {
        fontSize: 13,
        color: '#999',
    },
    categoryTag: {
        backgroundColor: '#f0f0f0',
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 12,
        alignSelf: 'flex-start',
    },
    categoryText: {
        fontSize: 12,
        color: '#666',
        fontWeight: '500',
    },
});


