import React, { useState, useEffect } from "react";
import {
    Modal,
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    ScrollView,
    Alert
} from 'react-native';
import { Goal } from '../../../types/goal';

interface EditGoalModalProps {
    visible: boolean;
    goal: Goal | null;
    onClose: () => void;
    onSave: (updatedGoal: Goal) => void;
}

export const EditGoalModal = ({ visible, goal, onClose, onSave }: EditGoalModalProps) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('');
    const [deadline, setDeadline] = useState('');
    const [priority, setPriority] = useState<'high' | 'medium' | 'low'>('medium');
    const [progress, setProgress] = useState('0');
    const [status, setStatus] = useState<'in_progress' | 'completed' | 'frozen' | 'archived'>('in_progress');

    // Заполняем форму данными цели при открытии
    useEffect(() => {
        if (goal) {
            setTitle(goal.title || '');
            setDescription(goal.description || '');
            setCategory(goal.category || '');
            setDeadline(goal.deadline || '');
            setPriority(goal.priority || 'medium');
            setProgress(goal.progress?.toString() || '0');
            setStatus(goal.status || 'in_progress');
        }
    }, [goal]);

    const handleSave = () => {
        if (!title.trim()) {
            Alert.alert('Ошибка', 'Введите название цели');
            return;
        }

        if (!goal) return;

        const progressNum = parseInt(progress, 10);
        if (isNaN(progressNum) || progressNum < 0 || progressNum > 100) {
            Alert.alert('Ошибка', 'Прогресс должен быть числом от 0 до 100');
            return;
        }

        const updatedGoal: Goal = {
            ...goal,
            title: title.trim(),
            description: description.trim(),
            category: category.trim() || 'Без категории',
            deadline: deadline || null,
            priority: priority,
            progress: progressNum,
            status: status,
        };

        onSave(updatedGoal);
        onClose();
    };

    const suggestedCategories = ['Работа', 'Учеба', 'Здоровье', 'Личное', 'Финансы'];

    if (!goal) return null;

    return (
        <Modal
            visible={visible}
            animationType="slide"
            transparent={true}
            onRequestClose={onClose}
        >
            <View style={styles.modalOverlay}>
                <View style={styles.modalContent}>
                    <Text style={styles.modalTitle}>Редактировать цель</Text>

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

                        {/* Прогресс */}
                        <View style={styles.inputGroup}>
                            <Text style={styles.label}>Прогресс (0-100%)</Text>
                            <TextInput
                                style={styles.input}
                                value={progress}
                                onChangeText={setProgress}
                                placeholder="0-100"
                                keyboardType="numeric"
                                maxLength={3}
                            />
                        </View>

                        {/* Статус */}
                        <View style={styles.inputGroup}>
                            <Text style={styles.label}>Статус</Text>
                            <View style={styles.statusContainer}>
                                <TouchableOpacity
                                    style={[
                                        styles.statusButton,
                                        status === 'in_progress' && styles.statusButtonActive
                                    ]}
                                    onPress={() => setStatus('in_progress')}
                                >
                                    <Text style={[
                                        styles.statusButtonText,
                                        status === 'in_progress' && styles.statusButtonTextActive
                                    ]}>▶️ В процессе</Text>
                                </TouchableOpacity>

                                <TouchableOpacity
                                    style={[
                                        styles.statusButton,
                                        status === 'completed' && styles.statusButtonActive
                                    ]}
                                    onPress={() => setStatus('completed')}
                                >
                                    <Text style={[
                                        styles.statusButtonText,
                                        status === 'completed' && styles.statusButtonTextActive
                                    ]}>✅ Завершено</Text>
                                </TouchableOpacity>

                                <TouchableOpacity
                                    style={[
                                        styles.statusButton,
                                        status === 'frozen' && styles.statusButtonActive
                                    ]}
                                    onPress={() => setStatus('frozen')}
                                >
                                    <Text style={[
                                        styles.statusButtonText,
                                        status === 'frozen' && styles.statusButtonTextActive
                                    ]}>❄️ Заморожено</Text>
                                </TouchableOpacity>

                                <TouchableOpacity
                                    style={[
                                        styles.statusButton,
                                        status === 'archived' && styles.statusButtonActive
                                    ]}
                                    onPress={() => setStatus('archived')}
                                >
                                    <Text style={[
                                        styles.statusButtonText,
                                        status === 'archived' && styles.statusButtonTextActive
                                    ]}>📦 В архив</Text>
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
                            <Text style={styles.hint}>Формат: 2025-12-31</Text>
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
                            style={[styles.button, styles.saveButton]}
                            onPress={handleSave}
                        >
                            <Text style={styles.saveButtonText}>Сохранить</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'flex-end',
    },
    modalContent: {
        backgroundColor: '#fff',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        padding: 20,
        minHeight: '80%',
        maxHeight: '90%',
    },
    modalTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#1a1a1a',
        marginBottom: 20,
        textAlign: 'center',
    },
    inputGroup: {
        marginBottom: 20,
    },
    label: {
        fontSize: 16,
        fontWeight: '600',
        color: '#333',
        marginBottom: 8,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 10,
        padding: 12,
        fontSize: 16,
        backgroundColor: '#f9f9f9',
    },
    textArea: {
        minHeight: 80,
        textAlignVertical: 'top',
    },
    hint: {
        fontSize: 12,
        color: '#999',
        marginTop: 4,
    },
    categoriesContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginTop: 10,
    },
    categoryChip: {
        backgroundColor: '#f0f0f0',
        paddingHorizontal: 15,
        paddingVertical: 8,
        borderRadius: 20,
        marginRight: 10,
        marginBottom: 10,
    },
    categoryChipSelected: {
        backgroundColor: '#007AFF',
    },
    categoryChipText: {
        color: '#666',
        fontSize: 14,
    },
    categoryChipTextSelected: {
        color: '#fff',
    },
    priorityContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 8,
    },
    priorityButton: {
        flex: 1,
        paddingVertical: 12,
        backgroundColor: '#f0f0f0',
        borderRadius: 8,
        marginHorizontal: 4,
        alignItems: 'center',
    },
    priorityButtonActive: {
        backgroundColor: '#007AFF',
    },
    priorityButtonText: {
        fontSize: 14,
        color: '#333',
    },
    priorityButtonTextActive: {
        color: '#fff',
    },
    statusContainer: {
        marginTop: 8,
    },
    statusButton: {
        paddingVertical: 12,
        paddingHorizontal: 16,
        backgroundColor: '#f0f0f0',
        borderRadius: 8,
        marginBottom: 8,
        alignItems: 'center',
    },
    statusButtonActive: {
        backgroundColor: '#007AFF',
    },
    statusButtonText: {
        fontSize: 14,
        color: '#333',
    },
    statusButtonTextActive: {
        color: '#fff',
    },
    buttonsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 20,
        paddingTop: 20,
        borderTopWidth: 1,
        borderTopColor: '#eee',
    },
    button: {
        flex: 1,
        paddingVertical: 15,
        borderRadius: 10,
        alignItems: 'center',
        marginHorizontal: 5,
    },
    cancelButton: {
        backgroundColor: '#f0f0f0',
    },
    saveButton: {
        backgroundColor: '#007AFF',
    },
    cancelButtonText: {
        color: '#666',
        fontSize: 16,
        fontWeight: '600',
    },
    saveButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
    },
});