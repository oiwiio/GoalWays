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
import { styles } from "./task-modal.style";

interface TaskModalProps {
    visible: boolean;
    mode: 'create' | 'edit';
    task?: any;
    goalId: number;
    onClose: () => void;
    onSave: (goalId: number, taskData: any, taskId?: number) => void;
}

export const TaskModal = ({ visible, mode, task, goalId, onClose, onSave }: TaskModalProps) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [priority, setPriority] = useState<'LOW' | 'MEDIUM' | 'HIGH'>('MEDIUM');
    const [deadline, setDeadline] = useState('');
    const [estimatedMinutes, setEstimatedMinutes] = useState('');
    const [progress, setProgress] = useState('0');

    useEffect(() => {
    if (task && mode === 'edit') {
        setTitle(task.title || '');
        setDescription(task.description || '');
        setPriority(task.priority || 'MEDIUM');
        setDeadline(task.deadline || '');
        setEstimatedMinutes(task.estimatedMinutes?.toString() || '');
        setProgress(task.progress?.toString() || '0');
    }
    }, [task]); 

    const handleClose = () => {
        setTitle('');
        setDescription('');
        setPriority('MEDIUM');
        setDeadline('');
        setEstimatedMinutes('');
        setProgress('0');
        onClose();
    };


    const handleSave = () => {
        if (!title.trim()) {
            Alert.alert('Ошибка', 'Введите название задачи');
            return;
        }

        const progressNum = parseInt(progress, 10);
        if (isNaN(progressNum) || progressNum < 0 || progressNum > 100) {
            Alert.alert('Ошибка', 'Прогресс должен быть числом от 0 до 100');
            return;
        }

        const minutes = parseInt(estimatedMinutes, 10);
        if (isNaN(minutes) || minutes < 0) {
            Alert.alert('Ошибка', 'Время на задачу должно быть положительным числом');
            return;
        }

        const taskData = {
            title: title.trim(),
            description: description.trim(),
            priority,
            deadline: deadline || null,
            estimatedMinutes: minutes,
            progress: progressNum,
        };

        if (mode === 'edit' && task) {
            onSave(goalId, taskData, task.id);
        } else {
            onSave(goalId, taskData);
        }
        onClose();
    };

    const priorityOptions = [
        { value: 'LOW', label: '💤 Низкий' },
        { value: 'MEDIUM', label: '⚪ Средний' },
        { value: 'HIGH', label: '🔥 Высокий' },
    ];

    return (
        <Modal
            visible={visible}
            animationType="slide"
            transparent={true}
            onRequestClose={onClose}
        >
            <View style={styles.modalOverlay}>
                <View style={styles.modalContent}>
                    <Text style={styles.modalTitle}>
                        {mode === 'create' ? 'Новая задача' : 'Редактировать задачу'}
                    </Text>

                    <ScrollView showsVerticalScrollIndicator={false}>
                        {/* название */}
                        <View style={styles.inputGroup}>
                            <Text style={styles.label}>Название *</Text>
                            <TextInput
                                style={styles.input}
                                value={title}
                                onChangeText={setTitle}
                                placeholder="Введите название задачи"
                                maxLength={50}
                            />
                        </View>

                        {/* описание */}
                        <View style={styles.inputGroup}>
                            <Text style={styles.label}>Описание</Text>
                            <TextInput
                                style={[styles.input, styles.textArea]}
                                value={description}
                                onChangeText={setDescription}
                                placeholder="Опишите задачу"
                                multiline
                                numberOfLines={3}
                            />
                        </View>

                        {/* приоритет */}
                        <View style={styles.inputGroup}>
                            <Text style={styles.label}>Приоритет</Text>
                            <View style={styles.priorityContainer}>
                                {priorityOptions.map((opt) => (
                                    <TouchableOpacity
                                        key={opt.value}
                                        style={[
                                            styles.priorityButton,
                                            priority === opt.value && styles.priorityButtonActive
                                        ]}
                                        onPress={() => setPriority(opt.value as any)}
                                    >
                                        <Text style={[
                                            styles.priorityButtonText,
                                            priority === opt.value && styles.priorityButtonTextActive
                                        ]}>
                                            {opt.label}
                                        </Text>
                                    </TouchableOpacity>
                                ))}
                            </View>
                        </View>

                        {/* дедлайн */}
                        <View style={styles.inputGroup}>
                            <Text style={styles.label}>Срок</Text>
                            <TextInput
                                style={styles.input}
                                value={deadline}
                                onChangeText={setDeadline}
                                placeholder="ГГГГ-ММ-ДД"
                            />
                            <Text style={styles.hint}>Формат: 2026-12-31</Text>
                        </View>

                        {/* время на задачу */}
                        <View style={styles.inputGroup}>
                            <Text style={styles.label}>Время на задачу (минут)</Text>
                            <TextInput
                                style={styles.input}
                                value={estimatedMinutes}
                                onChangeText={setEstimatedMinutes}
                                placeholder="60"
                                keyboardType="numeric"
                            />
                        </View>

                        {/* прогресс */}
                        <View style={styles.inputGroup}>
                            <Text style={styles.label}>Прогресс (0-100%)</Text>
                            <TextInput
                                style={styles.input}
                                value={progress}
                                onChangeText={setProgress}
                                placeholder="0"
                                keyboardType="numeric"
                            />
                        </View>
                    </ScrollView>

                    <View style={styles.buttonsContainer}>
                        <TouchableOpacity style={[styles.button, styles.cancelButton]} onPress={onClose}>
                            <Text style={styles.cancelButtonText}>Отмена</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.button, styles.saveButton]} onPress={handleSave}>
                            <Text style={styles.saveButtonText}>Сохранить</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    );
};

