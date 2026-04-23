import React, { useState } from "react";
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
import { GoalAPI } from '../../../types/goal';

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

   const goalData = {
        title: title.trim(),
        description: description.trim(),
        priority: priority,
        startdate: new Date().toISOString().split('T')[0],
        deadline: deadline || null,
        daily_time_minutes: 60,
        progress: 0,
        status: 'IN_PROGRESS' as const,
        stages: [],
     
};
   
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
        minHeight: '70%',
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
    createButton: {
        backgroundColor: '#007AFF',
    },
    cancelButtonText: {
        color: '#666',
        fontSize: 16,
        fontWeight: '600',
    },
    createButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
    },
});