// features/goals/ui/GoalCard.tsx
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Platform } from 'react-native';
import { GoalAPI } from '../../../types/goal';
import { colors, spacing, borderRadius, typography } from '../../../shared/styles/theme';

interface GoalCardProps {
  goal: GoalAPI;
  onPress: (goal: GoalAPI) => void;
  onEdit: (goal: GoalAPI) => void;
  onArchive: (goal: GoalAPI) => void;
  onRestore?: (goal: GoalAPI) => void;
  onDelete?: (goal: GoalAPI) => void;
}

export const GoalCard = ({ goal, onPress, onEdit, onArchive, onRestore, onDelete }: GoalCardProps) => {
  const statusUpper = goal.status?.toUpperCase();
  const isArchived = statusUpper === 'ARCHIVED';
  
  console.log('GoalCard рендер:', {
    title: goal.title,
    status: goal.status,
    statusUpper,
    isArchived
  });

  const getPriorityIcon = () => {
    switch (goal.priority) {
      case 'HIGH': return '🔥';
      case 'MEDIUM': return '⚪';
      case 'LOW': return '💤';
      default: return '📌';
    }
  };

  const getStatusColor = () => {
    switch (goal.status) {
      case 'IN_PROGRESS': return colors.primary;
      case 'COMPLETED': return colors.success;
      case 'FROZEN': return colors.warning;
      case 'ARCHIVED': return colors.textSecondary;
      default: return colors.textSecondary;
    }
  };

  return (
    <TouchableOpacity style={styles.card} onPress={() => onPress(goal)} activeOpacity={0.7}>
      <View style={styles.cardContent}>
        {/* Заголовок и действия */}
        <View style={styles.header}>
          <View style={styles.titleContainer}>
            <Text style={styles.priorityIcon}>{getPriorityIcon()}</Text>
            <Text style={[styles.title, isArchived && styles.archivedTitle]} numberOfLines={1}>
              {goal.title}
            </Text>
          </View>
          <View style={styles.actions}>
            <TouchableOpacity onPress={() => onEdit(goal)} style={styles.actionButton}>
              <Text style={styles.actionIcon}>✏️</Text>
            </TouchableOpacity>
            
            {/* Условный рендеринг: если в архиве — показываем кнопку восстановления */}
            {isArchived ? (
                  onRestore && (
                    <TouchableOpacity onPress={() => onRestore(goal)} style={styles.actionButton}>
                      <Text style={styles.actionIcon}>↩️</Text>
                    </TouchableOpacity>
                  )
                ) : (
                  <TouchableOpacity onPress={() => onArchive(goal)} style={styles.actionButton}>
                    <Text style={styles.actionIcon}>📦</Text>
                  </TouchableOpacity>
                )}
            
            {onDelete && (
              <TouchableOpacity onPress={() => onDelete(goal)} style={styles.actionButton}>
                <Text style={[styles.actionIcon, styles.deleteIcon]}>🗑️</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>

        {/* Описание */}
        {goal.description ? (
          <Text style={[styles.description, isArchived && styles.archivedText]} numberOfLines={2}>
            {goal.description}
          </Text>
        ) : null}

        {/* Прогресс (скрываем для архивных целей) */}
        {!isArchived && (
          <View style={styles.progressSection}>
            <View style={styles.progressBar}>
              <View style={[styles.progressFill, { width: `${goal.progress}%` }]} />
            </View>
            <Text style={styles.progressText}>{goal.progress}%</Text>
          </View>
        )}

        {/* Дополнительная информация */}
        <View style={styles.footer}>
          <View style={[styles.statusBadge, { backgroundColor: getStatusColor() + '20' }]}>
            <View style={[styles.statusDot, { backgroundColor: getStatusColor() }]} />
            <Text style={[styles.statusText, { color: getStatusColor() }]}>
              {goal.status === 'IN_PROGRESS' ? 'В процессе' :
               goal.status === 'COMPLETED' ? 'Завершено' :
               goal.status === 'FROZEN' ? 'Заморожено' : 'В архиве'}
            </Text>
          </View>
          {goal.deadline && !isArchived && (
            <View style={styles.deadline}>
              <Text style={styles.deadlineIcon}>📅</Text>
              <Text style={styles.deadlineText}>
                {new Date(goal.deadline).toLocaleDateString('ru-RU')}
              </Text>
            </View>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    marginHorizontal: spacing.m,
    marginVertical: spacing.s,
    borderRadius: borderRadius.l,
    backgroundColor: colors.surface,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 8,
      },
      android: {
        elevation: 3,
      },
    }),
  },
  cardContent: {
    padding: spacing.m,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.s,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  priorityIcon: {
    fontSize: 18,
    marginRight: spacing.xs,
  },
  title: {
    ...typography.h3,
    fontSize: 18,
    flex: 1,
  },
  archivedTitle: {
    textDecorationLine: 'line-through',
    opacity: 0.6,
  },
  actions: {
    flexDirection: 'row',
    gap: spacing.s,
  },
  actionButton: {
    padding: spacing.xs,
  },
  actionIcon: {
    fontSize: 18,
  },
  deleteIcon: {
    opacity: 0.6,
  },
  description: {
    ...typography.bodySecondary,
    fontSize: 14,
    marginBottom: spacing.m,
    lineHeight: 20,
  },
  archivedText: {
    opacity: 0.6,
  },
  progressSection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.m,
  },
  progressBar: {
    flex: 1,
    height: 8,
    backgroundColor: colors.borderLight,
    borderRadius: borderRadius.round,
    overflow: 'hidden',
    marginRight: spacing.s,
  },
  progressFill: {
    height: '100%',
    backgroundColor: colors.primary,
    borderRadius: borderRadius.round,
  },
  progressText: {
    ...typography.caption,
    fontSize: 12,
    fontWeight: '600',
    color: colors.text,
    minWidth: 40,
    textAlign: 'right',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.s,
    paddingVertical: spacing.xs,
    borderRadius: borderRadius.round,
  },
  statusDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    marginRight: spacing.xs,
  },
  statusText: {
    ...typography.caption,
    fontSize: 11,
    fontWeight: '500',
  },
  deadline: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  deadlineIcon: {
    fontSize: 12,
    marginRight: 4,
  },
  deadlineText: {
    ...typography.caption,
    fontSize: 11,
    color: colors.textSecondary,
  },
});