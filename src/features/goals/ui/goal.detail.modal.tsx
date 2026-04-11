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
import { Goal, Task } from '../../../types/goal';

interface GoalDetailModalProps {
    visible: boolean;
    mode: 'goal' | 'task';              
    item: Goal | Task | null;            
    onClose: () => void;
    onSave: (updatedItem: Goal | Task) => void;
    onAddTask?: () => void;              
    onTaskPress?: (task: Task) => void; 
}
import { styles } from './goal.detail.modal.styles'

export const GoalDetailModal = ({ 
    visible, 
    mode,
    item, 
    onClose, 
    onSave,
    onAddTask,
    onTaskPress 
}: GoalDetailModalProps) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('');
    const [deadline, setDeadline] = useState('');
    const [priority, setPriority] = useState<'high' | 'medium' | 'low'>('medium');
    const [progress, setProgress] = useState('0');
    const [status, setStatus] = useState<'in_progress' | 'completed' | 'frozen' | 'archived'>('in_progress');
    const [resultModalVisible, setResultModalVisible] = useState(false);
    const [resultText, setResultText] = useState('');
    const [results, setResults] = useState<string[]>([]);
        
    
    // для цели — список задач
    const [tasks, setTasks] = useState<Task[]>([]);

    

    useEffect(() => {
        if (item) {
            setTitle(item.title || '');
            setDescription(item.description || '');
            
            // Общие поля для цели и задачи
            if ('priority' in item) setPriority(item.priority);
            if ('progress' in item) setProgress(item.progress?.toString() || '0');
            if ('deadline' in item) setDeadline(item.deadline || '');
            
            // Поля только для цели
            if (mode === 'goal') {
                const goal = item as Goal;
                setCategory(goal.category || '');
                setStatus(goal.status);
                
            }
        }
    }, [item, mode]);

        const handleAddTextResult = () => {
            if (resultText.trim()) {
                setResults([...results, resultText.trim()]);
                setResultText('');
                setResultModalVisible(false);
             }
        };

        const handleAddPhotoResult = () => {
            Alert.alert(
             'Функция в разработке',
             'Загрузка фото будет доступна позже'
            );
        };

    const handleSave = () => {
        if (!title.trim()) {
            Alert.alert('Ошибка', 'Введите название');
            return;
        }

        if (!item) return;

        const progressNum = parseInt(progress, 10);
        if (isNaN(progressNum) || progressNum < 0 || progressNum > 100) {
            Alert.alert('Ошибка', 'Прогресс должен быть числом от 0 до 100');
            return;
        }

        const baseFields = {
            ...item,
            title: title.trim(),
            description: description.trim(),
            priority,
            progress: progressNum,
            deadline: deadline || null,
        };

        let updatedItem: Goal | Task;

        if (mode === 'goal') {
            updatedItem = {
                ...baseFields,
                category: category.trim() || 'Без категории',
                status,
            } as Goal;
        } else {
            updatedItem = baseFields as Task;
        }
        console.log('Данные из модалки:', JSON.stringify(updatedItem, null, 2));
        onSave(updatedItem);
        
        onSave(updatedItem);
        onClose();
    };

    const suggestedCategories = ['Работа', 'Учеба', 'Здоровье', 'Личное', 'Финансы'];

    if (!item) return null;

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
                        {mode === 'goal' ? 'Редактировать цель' : 'Редактировать задачу'}
                    </Text>

                    <ScrollView showsVerticalScrollIndicator={false}>
                        {/* название */}
                        <View style={styles.inputGroup}>
                            <Text style={styles.label}>Название *</Text>
                            <TextInput
                                style={styles.input}
                                value={title}
                                onChangeText={setTitle}
                                placeholder="Введите название"
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
                                placeholder="Опишите"
                                multiline
                                numberOfLines={3}
                                maxLength={200}
                            />
                        </View>

                        {/* приоритет (общее поле) */}
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

                        {/* прогресс (общее поле) */}
                        <View style={styles.inputGroup}>
                            <Text style={styles.label}>Прогресс (0-100%)</Text>
                            <TextInput
                                style={styles.input}
                                value={progress}
                                onChangeText={setProgress}
                                placeholder="0-100"
                                keyboardType="default"
                                maxLength={3}
                            />
                        </View>

                        {/* дедлайн (общее поле) */}
                        <View style={styles.inputGroup}>
                            <Text style={styles.label}>Дедлайн</Text>
                            <TextInput
                                style={styles.input}
                                value={deadline}
                                onChangeText={setDeadline}
                                placeholder="ГГГГ-ММ-ДД"
                            />
                            <Text style={styles.hint}>Формат: 2025-12-31</Text>
                        </View>

                        {/* поля только для цели */}
                        {mode === 'goal' && (
                            <>
                                {/* категория */}
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

                                {/* статус цели */}
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
                                    </View>
                                </View>

                                {/* список задач */}
                                <View style={styles.inputGroup}>
                                    <View style={styles.tasksHeader}>
                                        <Text style={styles.label}>Задачи</Text>
                                        {onAddTask && (
                                            <TouchableOpacity onPress={onAddTask}>
                                                <Text style={styles.addButton}>+ Добавить</Text>
                                            </TouchableOpacity>
                                        )}
                                    </View>
                                    
                                    {tasks.length === 0 ? (
                                        <Text style={styles.emptyText}>Нет задач</Text>
                                    ) : (
                                        tasks.map((task) => (
                                            <TouchableOpacity
                                                key={task.id}
                                                style={styles.taskItem}
                                                onPress={() => onTaskPress?.(task)}
                                            >
                                                <Text style={styles.taskTitle}>{task.title}</Text>
                                                <Text style={styles.taskProgress}>{task.progress}%</Text>
                                            </TouchableOpacity>
                                        ))
                                    )}
                                </View>
                            </>
                        )}
                    </ScrollView> 

                    {/* результаты */}
                    <View style={styles.inputGroup}>
                        <Text style={styles.label}>Результаты</Text>
  
                    {results.map((res, idx) => (
                        <Text key={idx} style={styles.resultItem}>• {res}</Text>
                    ))}

                         <View style={styles.resultButtons}>
                            <TouchableOpacity 
                            style={styles.resultButton}
                            onPress={() => setResultModalVisible(true)}
                            >
                            <Text style={styles.resultButtonText}>➕ Текст</Text>
                        </TouchableOpacity>
    
                        <TouchableOpacity 
                          style={styles.resultButton}
                          onPress={handleAddPhotoResult}
                        >
                        <Text style={styles.resultButtonText}>📷 Фото</Text>
                        </TouchableOpacity>
                    </View>
                    </View>

                        {/* модалка для результата */}
                        <Modal visible={resultModalVisible} transparent animationType="slide">
                            <View style={styles.modalOverlay}>
                                <View style={styles.modalContent}>
                                    <Text style={styles.modalTitle}>Добавить результат</Text>

                        <TextInput
                        style={[styles.input, styles.textArea]}
                        multiline
                        placeholder="Введите текст..."
                        value={resultText}
                        onChangeText={setResultText}
                        />

                        <View style={styles.row}>
                            <TouchableOpacity 
                            style={[styles.button, styles.cancelButton]} 
                            onPress={() => setResultModalVisible(false)}
                            >
                                <Text style={styles.cancelButtonText}>Отмена</Text>
                            </TouchableOpacity>

                               <TouchableOpacity 
                                 style={[styles.button, styles.saveButton]} 
                                 onPress={handleAddTextResult}
                                >
                                 <Text style={styles.saveButtonText}>Сохранить</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                        </View>
                    </Modal>

                    {/* кнопки */}
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

