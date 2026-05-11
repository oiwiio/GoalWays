import React, { useState } from "react";
import {
    Modal,
    View,
    Text,
    TextInput,
    TouchableOpacity,
    ScrollView,
    Alert
} from 'react-native';
import { GoalAPI } from '../../../types/goal';
import { styles } from './create-goal-modal.styles';

interface CreateGoalModalProps {
    visible: boolean;
    onClose: () => void;
    onCreateGoal: (goal: Omit<GoalAPI, 'id' | 'createdAt'>) => void;
}

export const CreateGoalModal = ({ visible, onClose, onCreateGoal }: CreateGoalModalProps) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('');
    const [deadline, setDeadline] = useState('');
    const [priority, setPriority] = useState<'high' | 'medium' | 'low'>('medium');

    const handleCreate = () => {
        if (!title.trim()) {
            Alert.alert('Ошибка', 'Введите название цели');
            return;
        }

        const priorityUpperCase = priority === 'high' ? 'HIGH' : priority === 'medium' ? 'MEDIUM' : 'LOW';

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
            }
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

    const suggestedCategories = ['Работа', 'Учеба', 'Здоровье', 'Личное', 'Финансы'];

    return (
        <Modal
            visible={visible}
            animationType="slide"
            transparent={true}
            onRequestClose={onClose}
        >
            <View style={styles.modalOverlay}>
                <View style={styles.modalContent}>
                    <Text style={styles.modalTitle}>Новая цель</Text>

                    <ScrollView showsVerticalScrollIndicator={false}>
                        {/* Название */}
                        <View style={styles.inputGroup}>
                            <Text style={styles.label}>Название *</Text>
                            <TextInput
                                style={styles.input}
                                value={title}
                                onChangeText={setTitle}
                                placeholder="Введите название цели"
                                maxLength={50}
                            />
                        </View>

                        {/* Описание */}
                        <View style={styles.inputGroup}>
                            <Text style={styles.label}>Описание</Text>
                            <TextInput
                                style={[styles.input, styles.textArea]}
                                value={description}
                                onChangeText={setDescription}
                                placeholder="Опишите вашу цель"
                                multiline
                                numberOfLines={3}
                                maxLength={200}
                            />
                        </View>

                        {/* Категория */}
                        <View style={styles.inputGroup}>
                            <Text style={styles.label}>Категория</Text>
                            <TextInput
                                style={styles.input}
                                value={category}
                                onChangeText={setCategory}
                                placeholder="Выберите или введите категорию"
                            />

                            <View style={styles.categoriesContainer}>
                                {suggestedCategories.map((cat) => (
                                    <TouchableOpacity
                                        key={cat}
                                        style={[
                                            styles.categoryChip,
                                            category === cat && styles.categoryChipSelected
                                        ]}
                                        onPress={() => setCategory(cat)}
                                    >
                                        <Text style={[
                                            styles.categoryChipText,
                                            category === cat && styles.categoryChipTextSelected
                                        ]}>
                                            {cat}
                                        </Text>
                                    </TouchableOpacity>
                                ))}
                            </View>
                        </View>

                        {/* Приоритет */}
                        <View style={styles.inputGroup}>
                            <Text style={styles.label}>Приоритет</Text>
                            <View style={styles.priorityContainer}>
                                <TouchableOpacity
                                    style={[
                                        styles.priorityButton,
                                        priority === 'high' && styles.priorityButtonActive
                                    ]}
                                    onPress={() => setPriority('high')}
                                >
                                    <Text style={[
                                        styles.priorityButtonText,
                                        priority === 'high' && styles.priorityButtonTextActive
                                    ]}>🔥 Высокий</Text>
                                </TouchableOpacity>

                                <TouchableOpacity
                                    style={[
                                        styles.priorityButton,
                                        priority === 'medium' && styles.priorityButtonActive
                                    ]}
                                    onPress={() => setPriority('medium')}
                                >
                                    <Text style={[
                                        styles.priorityButtonText,
                                        priority === 'medium' && styles.priorityButtonTextActive
                                    ]}>⚪ Средний</Text>
                                </TouchableOpacity>

                                <TouchableOpacity
                                    style={[
                                        styles.priorityButton,
                                        priority === 'low' && styles.priorityButtonActive
                                    ]}
                                    onPress={() => setPriority('low')}
                                >
                                    <Text style={[
                                        styles.priorityButtonText,
                                        priority === 'low' && styles.priorityButtonTextActive
                                    ]}>💤 Низкий</Text>
                                </TouchableOpacity>
                            </View>
                        </View>

                        {/* Дедлайн */}
                        <View style={styles.inputGroup}>
                            <Text style={styles.label}>Дедлайн (опционально)</Text>
                            <TextInput
                                style={styles.input}
                                value={deadline}
                                onChangeText={setDeadline}
                                placeholder="ГГГГ-ММ-ДД"
                            />
                            <Text style={styles.hint}>Формат: 2026-12-31</Text>
                        </View>
                    </ScrollView>

                    {/* Кнопки */}
                    <View style={styles.buttonsContainer}>
                        <TouchableOpacity
                            style={[styles.button, styles.cancelButton]}
                            onPress={onClose}
                        >
                            <Text style={styles.cancelButtonText}>Отмена</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={[styles.button, styles.createButton]}
                            onPress={handleCreate}
                        >
                            <Text style={styles.createButtonText}>Создать</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    );
}
