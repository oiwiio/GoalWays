import React from 'react';
import { Modal, View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { Check, Flame, Circle, Moon, Clock } from 'lucide-react-native';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../app/store';
import {
  setResultsModalVisible,
  toggleTaskSelection,
  AIGeneratedTask,
} from '../slice';
import { Button } from '../../../shared/ui/button';
import { ui } from '../../../shared/styles/ui';
import { styles } from './PlanResultModal.styles';

interface PlanResultModalProps {
  onAddSelected: (selectedTasks: AIGeneratedTask[]) => void;
  onAddAll: () => void;
}

const PRIORITY_VIEW = {
  HIGH: { icon: Flame, label: 'Высокий', color: ui.danger },
  MEDIUM: { icon: Circle, label: 'Средний', color: ui.warning },
  LOW: { icon: Moon, label: 'Низкий', color: ui.success },
} as const;

export const PlanResultModal = ({ onAddSelected, onAddAll }: PlanResultModalProps) => {
  const dispatch = useDispatch();
  const visible = useSelector((state: RootState) => state.ai.resultsModalVisible);
  const tasks = useSelector((state: RootState) => state.ai.generatedTasks);

  const selectedTasks = tasks.filter((t) => t.selected);
  const selectedCount = selectedTasks.length;

  const handleClose = () => {
    dispatch(setResultsModalVisible(false));
  };

  const handleAddSelected = () => {
    if (selectedTasks.length === 0) return;
    onAddSelected(selectedTasks);
    dispatch(setResultsModalVisible(false));
  };

  const handleAddAll = () => {
    onAddAll();
    dispatch(setResultsModalVisible(false));
  };

  if (!visible) return null;

  return (
    <Modal visible={visible} animationType="slide" transparent={true} onRequestClose={handleClose}>
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <Text style={styles.title}>План задач от ИИ</Text>
          <Text style={styles.subtitle}>Выберите задачи, которые хотите добавить в цель</Text>

          <ScrollView showsVerticalScrollIndicator={false}>
            {tasks.map((task, index) => {
              const priority =
                task.priority && PRIORITY_VIEW[task.priority as keyof typeof PRIORITY_VIEW];
              return (
                <TouchableOpacity
                  key={index}
                  style={styles.taskItem}
                  onPress={() => dispatch(toggleTaskSelection(index))}
                  activeOpacity={0.7}
                >
                  <View style={styles.checkboxContainer}>
                    <View style={[styles.checkbox, task.selected && styles.checkboxSelected]}>
                      {task.selected && <Check size={16} strokeWidth={2.5} color={ui.text} />}
                    </View>
                  </View>
                  <View style={styles.taskContent}>
                    <Text style={styles.taskTitle}>{task.title}</Text>
                    {task.description ? (
                      <Text style={styles.taskDescription} numberOfLines={2}>
                        {task.description}
                      </Text>
                    ) : null}
                    <View style={styles.taskMeta}>
                      {priority ? (
                        <View style={[styles.priority, { backgroundColor: priority.color + '26' }]}>
                          <priority.icon size={12} strokeWidth={1.75} color={priority.color} />
                          <Text style={[styles.priorityText, { color: priority.color }]}>
                            {priority.label}
                          </Text>
                        </View>
                      ) : null}
                      {task.estimated_minutes ? (
                        <View style={styles.estimated}>
                          <Clock size={12} strokeWidth={1.75} color={ui.textMuted} />
                          <Text style={styles.estimatedText}>{task.estimated_minutes} мин</Text>
                        </View>
                      ) : null}
                    </View>
                  </View>
                </TouchableOpacity>
              );
            })}
          </ScrollView>

          {/* Статистика */}
          <View style={styles.statsContainer}>
            <Text style={styles.statsText}>
              Выбрано: {selectedCount} / {tasks.length}
            </Text>
          </View>

          {/* Кнопки */}
          <View style={styles.buttonsContainer}>
            <Button
              title={`Добавить выбранные (${selectedCount})`}
              onPress={handleAddSelected}
              disabled={selectedCount === 0}
            />
            <View style={styles.buttonsRow}>
              <Button
                title="Отмена"
                variant="secondary"
                onPress={handleClose}
                style={styles.buttonFlex}
              />
              <Button
                title="Добавить все"
                variant="secondary"
                onPress={handleAddAll}
                style={styles.buttonFlex}
              />
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
};