import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import {
  Pencil,
  Archive,
  ArchiveRestore,
  Trash2,
  Calendar,
  Flame,
  Circle,
  Moon,
  Pin,
} from 'lucide-react-native';
import { GoalAPI } from '../../../types/goal';
import { ui } from '../../../shared/styles/ui';

interface GoalCardProps {
  goal: GoalAPI;
  onPress: (goal: GoalAPI) => void;
  onEdit: (goal: GoalAPI) => void;
  onArchive: (goal: GoalAPI) => void;
  onRestore?: (goal: GoalAPI) => void;
  onDelete?: (goal: GoalAPI) => void;
}

const ICON_PROPS = { size: 18, strokeWidth: 1.75, color: ui.text } as const;

export const GoalCard = ({
  goal,
  onPress,
  onEdit,
  onArchive,
  onRestore,
  onDelete,
}: GoalCardProps) => {
  const statusUpper = goal.status?.toUpperCase();
  const isArchived = statusUpper === 'ARCHIVED';

  const renderPriorityIcon = () => {
    const props = { size: 16, strokeWidth: 1.75, color: ui.textMuted };
    switch (goal.priority) {
      case 'HIGH':
        return <Flame {...props} color={ui.warning} />;
      case 'MEDIUM':
        return <Circle {...props} />;
      case 'LOW':
        return <Moon {...props} />;
      default:
        return <Pin {...props} />;
    }
  };

  const getStatusColor = () => {
    switch (statusUpper) {
      case 'IN_PROGRESS':
        return ui.accentLight;
      case 'COMPLETED':
        return ui.success;
      case 'FROZEN':
        return ui.warning;
      default:
        return ui.textMuted;
    }
  };

  const getStatusLabel = () => {
    switch (statusUpper) {
      case 'IN_PROGRESS':
        return 'В процессе';
      case 'COMPLETED':
        return 'Завершено';
      case 'FROZEN':
        return 'Заморожено';
      default:
        return 'В архиве';
    }
  };

  const statusColor = getStatusColor();

  return (
    <TouchableOpacity style={styles.card} onPress={() => onPress(goal)} activeOpacity={0.7}>
      {/* Заголовок и действия */}
      <View style={styles.header}>
        <View style={styles.titleContainer}>
          <View style={styles.priorityIcon}>{renderPriorityIcon()}</View>
          <Text style={[styles.title, isArchived && styles.archivedTitle]} numberOfLines={1}>
            {goal.title}
          </Text>
        </View>
        <View style={styles.actions}>
          <TouchableOpacity
            onPress={() => onEdit(goal)}
            style={styles.actionButton}
            hitSlop={{ top: 6, bottom: 6, left: 6, right: 6 }}
          >
            <Pencil {...ICON_PROPS} />
          </TouchableOpacity>

          {/* В архиве — кнопка восстановления, иначе — архивирования */}
          {isArchived ? (
            onRestore && (
              <TouchableOpacity
                onPress={() => onRestore(goal)}
                style={styles.actionButton}
                hitSlop={{ top: 6, bottom: 6, left: 6, right: 6 }}
              >
                <ArchiveRestore {...ICON_PROPS} />
              </TouchableOpacity>
            )
          ) : (
            <TouchableOpacity
              onPress={() => onArchive(goal)}
              style={styles.actionButton}
              hitSlop={{ top: 6, bottom: 6, left: 6, right: 6 }}
            >
              <Archive {...ICON_PROPS} />
            </TouchableOpacity>
          )}

          {onDelete && (
            <TouchableOpacity
              onPress={() => onDelete(goal)}
              style={styles.actionButton}
              hitSlop={{ top: 6, bottom: 6, left: 6, right: 6 }}
            >
              <Trash2 {...ICON_PROPS} color={ui.danger} />
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

      {/* Статус и дедлайн */}
      <View style={styles.footer}>
        <View style={[styles.statusBadge, { backgroundColor: statusColor + '26' }]}>
          <View style={[styles.statusDot, { backgroundColor: statusColor }]} />
          <Text style={[styles.statusText, { color: statusColor }]}>{getStatusLabel()}</Text>
        </View>
        {goal.deadline && !isArchived && (
          <View style={styles.deadline}>
            <Calendar size={12} strokeWidth={1.75} color={ui.textMuted} />
            <Text style={styles.deadlineText}>
              {new Date(goal.deadline).toLocaleDateString('ru-RU')}
            </Text>
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    marginBottom: 12,
    padding: 16,
    borderRadius: 12,
    backgroundColor: ui.card,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  priorityIcon: {
    marginRight: 8,
  },
  title: {
    flex: 1,
    fontSize: 14,
    fontWeight: '700',
    color: ui.text,
  },
  archivedTitle: {
    textDecorationLine: 'line-through',
    opacity: 0.6,
  },
  actions: {
    flexDirection: 'row',
    gap: 12,
    marginLeft: 12,
  },
  actionButton: {
    padding: 2,
  },
  description: {
    marginBottom: 12,
    fontSize: 12,
    lineHeight: 18,
    color: ui.textMuted,
  },
  archivedText: {
    opacity: 0.6,
  },
  progressSection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  progressBar: {
    flex: 1,
    height: 6,
    marginRight: 12,
    borderRadius: 3,
    overflow: 'hidden',
    backgroundColor: ui.border,
  },
  progressFill: {
    height: '100%',
    borderRadius: 3,
    backgroundColor: ui.text,
  },
  progressText: {
    minWidth: 36,
    textAlign: 'right',
    fontSize: 10,
    fontWeight: '700',
    color: ui.text,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    marginRight: 6,
  },
  statusText: {
    fontSize: 10,
    fontWeight: '600',
  },
  deadline: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  deadlineText: {
    fontSize: 10,
    color: ui.textMuted,
  },
});