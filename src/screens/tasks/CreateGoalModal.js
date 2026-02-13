import React, { use, useState } from "react";
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

const CreateGoalModal =({ visible, onCLose, onCreateGoal }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] =  useState('');
    const [category, setCategory] = useState('');
    const [ deadline, setDeadline] = useState('');

    const handleCreate = () => {
        if(!title.trim()) {
            Alert.alert('ошибка', 'введите название цели');
            return;
        }

        const newGoal = {
            id:Date.now().toString(),
            title: title.trim(),
            description: description.trim,
            category: category.trim,
            deadline: deadline || null,
            progress: 0,
            createdAt: new Date().toISOString(),
            status:'active' // архив, актив, выполнена
        };

        onCreateGoal(newGoal);

        setTitle('');
        setDescription('');
        setCategory('');
        setDeadline('');

        onclose();

    };

    const suggestedCategories = ['Работа','Учеба','Здоровье','Личное','Финансы'];

    return( 
        <Modal
            visible={visible}
            animationType="slide"
            transparent={true}
            onRequestClose={onClose}
        >
            <View style={styles.modalOverlay}>
                <View style={styles.modalContent}>
                    {/* Заголовок */}
                    <Text style={styles.modalTitle}>Новая цель</Text>
                    
                    <ScrollView showsVerticalScrollIndicator={false}>
                        {/* Название цели */}
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
                            
                            {/* Быстрый выбор категорий */}
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

export default CreateGoalModal;
    