import React, { useState } from "react";
import {
    Modal,
    View,
    Text,
    TextInput,
    TouchableOpacity,
    ScrollView,
    Alert,
    Platform,
    StyleSheet,
} from 'react-native';
import { GoalAPI } from '../../../types/goal';
import { colors, spacing, borderRadius, typography } from '../../../shared/styles/theme';

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
                    <View style={styles.header}>
                        <Text style={styles.modalTitle}>Создать новую цель</Text>
                        <TouchableOpacity onPress={onClose} style={styles.closeButton}>
                            <Text style={styles.closeButtonText}>✕</Text>
                        </TouchableOpacity>
                    </View>

                    <ScrollView 
                        showsVerticalScrollIndicator={false}
                        contentContainerStyle={styles.scrollContent}
                    >
                        {/* Название */}
                        <View style={styles.inputGroup}>
                            <Text style={styles.label}>Название <Text style={styles.required}>*</Text></Text>
                            <TextInput
                                style={styles.input}
                                value={title}
                                onChangeText={setTitle}
                                placeholder="Введите название цели"
                                placeholderTextColor={colors.textSecondary}
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
                                placeholderTextColor={colors.textSecondary}
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
                                placeholderTextColor={colors.textSecondary}
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
                                placeholderTextColor={colors.textSecondary}
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
};

const styles = StyleSheet.create({
    modalOverlay: {
        flex: 1,
        backgroundColor: colors.overlay,
        justifyContent: 'flex-end',
    },
    modalContent: {
        backgroundColor: colors.surface,
        borderTopLeftRadius: borderRadius.xl,
        borderTopRightRadius: borderRadius.xl,
        paddingHorizontal: spacing.l,
        paddingBottom: spacing.xl,
        maxHeight: '90%',
        minHeight: '70%',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: spacing.l,
        borderBottomWidth: 1,
        borderBottomColor: colors.border,
    },
    modalTitle: {
        ...typography.h2,
        fontSize: 24,
        color: colors.text,
    },
    closeButton: {
        width: 32,
        height: 32,
        borderRadius: borderRadius.round,
        backgroundColor: colors.surfaceLight,
        justifyContent: 'center',
        alignItems: 'center',
    },
    closeButtonText: {
        fontSize: 18,
        color: colors.textSecondary,
    },
    scrollContent: {
        paddingVertical: spacing.m,
    },
    inputGroup: {
        marginBottom: spacing.l,
    },
    label: {
        ...typography.caption,
        color: colors.textSecondary,
        marginBottom: spacing.xs,
    },
    required: {
        color: colors.danger,
    },
    input: {
        ...typography.body,
        backgroundColor: colors.surfaceLight,
        color: colors.text,
        paddingHorizontal: spacing.m,
        paddingVertical: spacing.s,
        borderRadius: borderRadius.s,
        borderWidth: 1,
        borderColor: colors.border,
    },
    textArea: {
        minHeight: 80,
        textAlignVertical: 'top',
    },
    hint: {
        ...typography.caption,
        color: colors.textSecondary,
        marginTop: spacing.xs,
    },
    categoriesContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginTop: spacing.s,
        gap: spacing.s,
    },
    categoryChip: {
        backgroundColor: colors.surfaceLight,
        paddingHorizontal: spacing.m,
        paddingVertical: spacing.s,
        borderRadius: borderRadius.round,
    },
    categoryChipSelected: {
        backgroundColor: colors.primary,
    },
    categoryChipText: {
        ...typography.caption,
        color: colors.textSecondary,
    },
    categoryChipTextSelected: {
        color: colors.text,
        fontWeight: '600',
    },
    priorityContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        gap: spacing.s,
    },
    priorityButton: {
        flex: 1,
        paddingVertical: spacing.s,
        backgroundColor: colors.surfaceLight,
        borderRadius: borderRadius.s,
        alignItems: 'center',
    },
    priorityButtonActive: {
        backgroundColor: colors.primary,
    },
    priorityButtonText: {
        ...typography.body,
        fontSize: 14,
        color: colors.textSecondary,
    },
    priorityButtonTextActive: {
        color: colors.text,
        fontWeight: '600',
    },
    buttonsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        gap: spacing.m,
        paddingTop: spacing.m,
        borderTopWidth: 1,
        borderTopColor: colors.border,
    },
    button: {
        flex: 1,
        paddingVertical: spacing.m,
        borderRadius: borderRadius.m,
        alignItems: 'center',
    },
    cancelButton: {
        backgroundColor: colors.surfaceLight,
    },
    cancelButtonText: {
        ...typography.body,
        color: colors.textSecondary,
        fontWeight: '600',
    },
    createButton: {
        backgroundColor: colors.primary,
        ...Platform.select({
            ios: {
                shadowColor: colors.primary,
                shadowOffset: { width: 0, height: 4 },
                shadowOpacity: 0.3,
                shadowRadius: 8,
            },
            android: {
                elevation: 4,
            },
        }),
    },
    createButtonText: {
        ...typography.body,
        color: colors.text,
        fontWeight: '600',
    },
});