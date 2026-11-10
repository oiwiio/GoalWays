import React, { useState } from 'react';
import { Modal, View, Text, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { X, Flame, Circle, Moon } from 'lucide-react-native';
import type { LucideIcon } from 'lucide-react-native';
import { GoalAPI } from '../../../types/goal';
import { Input } from '../../../shared/ui/input';
import { Button } from '../../../shared/ui/button';
import { ui } from '../../../shared/styles/ui';
import { styles } from './create-goal-modal.styles';

interface CreateGoalModalProps {
  visible: boolean;
  onClose: () => void;
  onCreateGoal: (goal: Omit<GoalAPI, 'id' | 'createdAt'>) => void;
}

type Priority = 'high' | 'medium' | 'low';

const PRIORITIES: { key: Priority; label: string; icon: LucideIcon }[] = [
  { key: 'high', label: 'Высокий', icon: Flame },
  { key: 'medium', label: 'Средний', icon: Circle },
  { key: 'low', label: 'Низкий', icon: Moon },
];

const SUGGESTED_CATEGORIES = ['Работа', 'Учеба', 'Здоровье', 'Личное', 'Финансы'];

export const CreateGoalModal = ({ visible, onClose, onCreateGoal }: CreateGoalModalProps) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [deadline, setDeadline] = useState('');
  const [priority, setPriority] = useState<Priority>('medium');

  const handleCreate = () => {
    if (!title.trim()) {
      Alert.alert('Ошибка', 'Введите название цели');
      return;
    }

    const priorityUpperCase =
      priority === 'high' ? 'HIGH' : priority === 'medium' ? 'MEDIUM' : 'LOW';

    const goalData: any = {
      title: title.trim(),
      description: description.trim(),
      priority: priorityUpperCase,
      start_date: new Date().toISOString().split('T')[0],
      deadline: deadline || null,
      daily_time_minutes: 60,
      progress: 0,
      status: 'IN_PROGRESS',
      category: category.trim() || 'Без категории',
      stages: [
        {
          title: 'Базовая задача',
          priority: priorityUpperCase,
          estimatedMinutes: 60,
          deadline: new Date().toISOString().split('T')[0],
          startsAt: new Date().toISOString().split('T')[0],
          sortOrder: 0,
        },
      ],
    };

    onCreateGoal(goalData);

    // очистка
    setTitle('');
    setDescription('');
    setCategory('');
    setDeadline('');
    setPriority('medium');
    onClose();
  };

  return (
    <Modal visible={visible} animationType="slide" transparent={true} onRequestClose={onClose}>
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <View style={styles.header}>
            <Text style={styles.modalTitle}>Создать новую цель</Text>
            <TouchableOpacity
              onPress={onClose}
              style={styles.closeButton}
              hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
            >
              <X size={18} strokeWidth={1.75} color={ui.text} />
            </TouchableOpacity>
          </View>

          <ScrollView
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
            contentContainerStyle={styles.scrollContent}
          >
            {/* Название */}
            <Input
              label="Название *"
              value={title}
              onChangeText={setTitle}
              placeholder="Введите название цели"
              maxLength={50}
            />

            {/* Описание */}
            <Input
              label="Описание"
              value={description}
              onChangeText={setDescription}
              placeholder="Опишите вашу цель"
              multiline
              numberOfLines={3}
              maxLength={200}
            />

            {/* Категория */}
            <Input
              label="Категория"
              value={category}
              onChangeText={setCategory}
              placeholder="Выберите или введите категорию"
              style={styles.inputTight}
            />
            <View style={[styles.categoriesContainer, styles.inputGroup]}>
              {SUGGESTED_CATEGORIES.map((cat) => (
                <TouchableOpacity
                  key={cat}
                  style={[styles.categoryChip, category === cat && styles.categoryChipSelected]}
                  onPress={() => setCategory(cat)}
                  activeOpacity={0.8}
                >
                  <Text
                    style={[
                      styles.categoryChipText,
                      category === cat && styles.categoryChipTextSelected,
                    ]}
                  >
                    {cat}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            {/* Приоритет */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Приоритет</Text>
              <View style={styles.priorityContainer}>
                {PRIORITIES.map(({ key, label, icon: Icon }) => {
                  const active = priority === key;
                  return (
                    <TouchableOpacity
                      key={key}
                      style={[styles.priorityButton, active && styles.priorityButtonActive]}
                      onPress={() => setPriority(key)}
                      activeOpacity={0.8}
                    >
                      <Icon size={16} strokeWidth={1.75} color={active ? ui.text : ui.textMuted} />
                      <Text
                        style={[
                          styles.priorityButtonText,
                          active && styles.priorityButtonTextActive,
                        ]}
                      >
                        {label}
                      </Text>
                    </TouchableOpacity>
                  );
                })}
              </View>
            </View>

            {/* Дедлайн */}
            <Input
              label="Дедлайн (опционально, ГГГГ-ММ-ДД)"
              value={deadline}
              onChangeText={setDeadline}
              placeholder="2026-12-31"
            />
          </ScrollView>

          {/* Кнопки */}
          <View style={styles.buttonsContainer}>
            <Button
              title="Отмена"
              variant="secondary"
              onPress={onClose}
              style={styles.buttonFlex}
            />
            <Button title="Создать" onPress={handleCreate} style={styles.buttonFlex} />
          </View>
        </View>
      </View>
    </Modal>
  );
};