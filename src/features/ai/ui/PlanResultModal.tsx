import React from 'react';
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../app/store';
import {
  setResultsModalVisible,
  toggleTaskSelection,
  selectAllTasks,
  AIGeneratedTask,  
} from '../slice';
import { styles } from './PlanResultModal.styles';

interface PlanResultModalProps {
  onAddSelected: (selectedTasks: AIGeneratedTask[]) => void; 
  onAddAll: () => void;
}

export const PlanResultModal = ({ onAddSelected, onAddAll }: PlanResultModalProps) => {
  const dispatch = useDispatch();
  const visible = useSelector((state: RootState) => state.ai.resultsModalVisible);
  const tasks = useSelector((state: RootState) => state.ai.generatedTasks);
  const isLoading = useSelector((state: RootState) => state.ai.isLoading);

  const selectedCount = tasks.filter(t => t.selected).length;
  const selectedTasks = tasks.filter(t => t.selected);

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
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      onRequestClose={handleClose}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <Text style={styles.title}>План задач от ИИ</Text>
          <Text style={styles.subtitle}>
            Выберите задачи, которые хотите добавить в цель
          </Text>

          <ScrollView showsVerticalScrollIndicator={false}>
            {tasks.map((task, index) => (
              <TouchableOpacity
                key={index}
                style={styles.taskItem}
                onPress={() => dispatch(toggleTaskSelection(index))}
              >
                <View style={styles.checkboxContainer}>
                  <View style={[
                    styles.checkbox,
                    task.selected && styles.checkboxSelected,
                  ]}>
                    {task.selected && <Text style={styles.checkmark}>✓</Text>}
                  </View>
                </View>
                <View style={styles.taskContent}>
                  <Text style={styles.taskTitle}>{task.title}</Text>
                  {task.description && (
                    <Text style={styles.taskDescription} numberOfLines={2}>
                      {task.description}
                    </Text>
                  )}
                  <View style={styles.taskMeta}>
                    {task.priority && (
                      <Text style={[
                        styles.priority,
                        task.priority === 'HIGH' && styles.priorityHigh,
                        task.priority === 'MEDIUM' && styles.priorityMedium,
                        task.priority === 'LOW' && styles.priorityLow,
                      ]}>
                        {task.priority === 'HIGH' && '🔥 Высокий'}
                        {task.priority === 'MEDIUM' && '⚪ Средний'}
                        {task.priority === 'LOW' && '💤 Низкий'}
                      </Text>
                    )}
                    {task.estimated_minutes && (
                      <Text style={styles.estimated}>
                        ⏱️ {task.estimated_minutes} мин
                      </Text>
                    )}
                  </View>
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>

          {/* Статистика */}
          <View style={styles.statsContainer}>
            <Text style={styles.statsText}>
              Выбрано: {selectedCount} / {tasks.length}
            </Text>
          </View>

          {/* Кнопки */}
          <View style={styles.buttonsContainer}>
            <TouchableOpacity
              style={[styles.button, styles.cancelButton]}
              onPress={handleClose}
            >
              <Text style={styles.cancelButtonText}>Отмена</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.button, styles.addAllButton]}
              onPress={handleAddAll}
            >
              <Text style={styles.addAllButtonText}>Добавить все</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.button,
                styles.addButton,
                selectedCount === 0 && styles.disabledButton,
              ]}
              onPress={handleAddSelected}
              disabled={selectedCount === 0}
            >
              <Text style={styles.addButtonText}>
                Добавить выбранные ({selectedCount})
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

