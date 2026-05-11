import React, { useState, useEffect } from 'react';
import {
  Modal,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  StyleSheet,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../app/store';
import {
  setClarificationModalVisible,
  setAnswer,
  clarifyPlanRequest,
  clearError,
} from '../slice';
import { styles } from './ClarificationModal.style';

export const ClarificationModal = () => {
  const dispatch = useDispatch();
  const visible = useSelector((state: RootState) => state.ai.clarificationModalVisible);
  const isLoading = useSelector((state: RootState) => state.ai.isLoading);
  const questions = useSelector((state: RootState) => state.ai.questions);
  const answers = useSelector((state: RootState) => state.ai.answers);
  const sessionId = useSelector((state: RootState) => state.ai.sessionId);
  const goalId = useSelector((state: RootState) => state.ai.currentGoalId);
  const error = useSelector((state: RootState) => state.ai.error);

  // Валидация: все поля должны быть заполнены
  const isFormValid = () => {
    return questions.every(q => answers[q.id] && answers[q.id].trim().length > 0);
  };

  const handleSubmit = () => {
    if (!isFormValid()) return;

    const answersArray = questions.map(q => ({
      question_id: q.id,
      answer: answers[q.id].trim(),
    }));

    dispatch(clarifyPlanRequest({
      goalId: goalId!,
      sessionId: sessionId!,
      answers: answersArray,
    }));
  };

  const handleClose = () => {
    dispatch(setClarificationModalVisible(false));
  };

  // Показываем ошибку, если есть
  useEffect(() => {
    if (error) {
      // Ошибка уже покажется через toast в основном компоненте
      dispatch(clearError());
    }
  }, [error, dispatch]);

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      onRequestClose={handleClose}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          {/* Заголовок */}
          <Text style={styles.title}>🤖 ИИ нуждается в уточнениях</Text>
          <Text style={styles.subtitle}>
            Ответьте на вопросы для создания качественного плана задач
          </Text>

          <ScrollView showsVerticalScrollIndicator={false}>
            {questions.map((question, index) => (
              <View key={question.id} style={styles.questionContainer}>
                <Text style={styles.questionLabel}>
                  Вопрос {index + 1}:
                </Text>
                <Text style={styles.questionText}>{question.text}</Text>
                <TextInput
                  style={[styles.input, styles.textArea]}
                  value={answers[question.id] || ''}
                  onChangeText={(text) => dispatch(setAnswer({ questionId: question.id, answer: text }))}
                  placeholder="Введите ответ..."
                  multiline
                  numberOfLines={3}
                  textAlignVertical="top"
                />
              </View>
            ))}
          </ScrollView>

          {/* Кнопки */}
          <View style={styles.buttonsContainer}>
            <TouchableOpacity
              style={[styles.button, styles.cancelButton]}
              onPress={handleClose}
              disabled={isLoading}
            >
              <Text style={styles.cancelButtonText}>Отмена</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.button,
                styles.submitButton,
                (!isFormValid() || isLoading) && styles.disabledButton,
              ]}
              onPress={handleSubmit}
              disabled={!isFormValid() || isLoading}
            >
              {isLoading ? (
                <ActivityIndicator size="small" color="#fff" />
              ) : (
                <Text style={styles.submitButtonText}>Отправить ответы</Text>
              )}
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

