import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { GoalAPI } from '../../types/goal';
import { colors, spacing, typography, borderRadius, shadows } from '../../shared/styles/theme';

type GoalCardProps = {
    goal: GoalAPI;
    onPress: (goal: GoalAPI) => void;
    onArchive: (goal: GoalAPI) => void;
};

export const GoalCard = ({ goal, onPress, onArchive }: GoalCardProps) => {
    const getProgressColor = (progress: number): string => {
        if (progress < 30) return colors.danger;
        if (progress < 70) return colors.warning;
        return colors.success;
    };

    const progress = Math.max(0, Math.min(100, goal.progress));

    return (
        <TouchableOpacity style={styles.card} activeOpacity={0.8} onPress={() => onPress(goal)}>
            {/* Заголовок и статус */}
            <View style={styles.header}>
                <Text style={styles.title} numberOfLines={2}>{goal.title}</Text>
                <TouchableOpacity
                    style={styles.archiveButton}
                    onPress={() => onArchive(goal)}
                    hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
                >
                    <Text style={styles.archiveIcon}>📦</Text>
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
                                width: `${progress}%`,
                                backgroundColor: getProgressColor(progress),
                            },
                        ]}
                    />
                </View>
                <Text style={styles.progressText}>{progress}%</Text>
            </View>

            {/* Дедлайн и категория */}
            {(goal.deadline || goal.category) && (
                <View style={styles.footer}>
                    {goal.deadline ? (
                        <View style={styles.deadlineContainer}>
                            <Text style={styles.deadlineIcon}>📅</Text>
                            <Text style={styles.deadlineText}>
                                {new Date(goal.deadline).toLocaleDateString('ru-RU')}
                            </Text>
                        </View>
                    ) : (
                        <View />
                    )}

                    {goal.category && (
                        <View style={styles.categoryTag}>
                            <Text style={styles.categoryText}>{goal.category}</Text>
                        </View>
                    )}
                </View>
            )}
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    card: {
        backgroundColor: colors.surface,
        borderRadius: borderRadius.m,
        borderWidth: 1,
        borderColor: colors.borderLight,
        padding: spacing.m,
        marginHorizontal: spacing.m,
        marginVertical: spacing.s,
        ...shadows.small,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: spacing.s,
    },
    title: {
        ...typography.h3,
        flex: 1,
        marginRight: spacing.s,
    },
    archiveButton: {
        width: 36,
        height: 36,
        borderRadius: borderRadius.round,
        backgroundColor: colors.surfaceLight,
        alignItems: 'center',
        justifyContent: 'center',
    },
    archiveIcon: {
        fontSize: 16,
    },
    description: {
        ...typography.bodySecondary,
        fontSize: 14,
        lineHeight: 20,
        marginBottom: spacing.m,
    },
    progressContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: spacing.m,
    },
    progressBar: {
        flex: 1,
        height: 8,
        backgroundColor: colors.surfaceLight,
        borderRadius: borderRadius.round,
        marginRight: spacing.s,
        overflow: 'hidden',
    },
    progressFill: {
        height: '100%',
        borderRadius: borderRadius.round,
    },
    progressText: {
        ...typography.buttonSmall,
        minWidth: 40,
        textAlign: 'right',
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    deadlineContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    deadlineIcon: {
        fontSize: 14,
        marginRight: spacing.xs,
    },
    deadlineText: {
        ...typography.caption,
        fontSize: 13,
    },
    categoryTag: {
        backgroundColor: 'rgba(101, 114, 206, 0.18)',
        paddingHorizontal: 10,
        paddingVertical: spacing.xs,
        borderRadius: borderRadius.round,
    },
    categoryText: {
        ...typography.caption,
        color: colors.primary,
        fontWeight: '600',
    },
});