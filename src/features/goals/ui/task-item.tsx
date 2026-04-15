import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { taskItemStyles as styles } from './task-item.styles';
import { Task } from '../../../types/goal';

interface TaskItemProps {
  task: any;
  onPress: (task: any) => void;
}

export const TaskItem = ({ task, onPress }: TaskItemProps) => {
  const getPriorityIcon = (priority: string) => {
    switch (priority) {
      case 'HIGH': return '🔥';
      case 'MEDIUM': return '⚪';
      case 'LOW': return '💤';
      default: return '⚪';
    }
  };

  return (
    <TouchableOpacity style={styles.container} onPress={() => onPress(task)}>
      <View style={styles.header}>
        <Text style={styles.priorityIcon}>{getPriorityIcon(task.priority)}</Text>
        <Text style={styles.title} numberOfLines={1}>{task.title}</Text>
      </View>
      {task.description && (
        <Text style={styles.description} numberOfLines={2}>{task.description}</Text>
      )}
      <View style={styles.footer}>
        <Text style={styles.date}>📅 {task.deadline ? new Date(task.deadline).toLocaleDateString('ru-RU') : '—'}</Text>
        <Text style={styles.time}>⏱️ {task.estimatedMinutes} мин</Text>
        <Text style={styles.progress}>{task.progress}%</Text>
      </View>
    </TouchableOpacity>
  );
};