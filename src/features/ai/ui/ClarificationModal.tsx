import React, { useEffect } from 'react';
import { Modal, View, Text, ScrollView } from 'react-native';
import { Bot } from 'lucide-react-native';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../app/store';
import {
  setClarificationModalVisible,
  setAnswer,
  clarifyPlanRequest,
  clearError,
} from '../slice';
import { Input } from '../../../shared/ui/input';
import { Button } from '../../../shared/ui/button';
import { ui } from '../../../shared/styles/ui';
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
    return questions.every((q) => answers[q.id] && answers[q.id].trim().length > 0);
  };

  const handleSubmit = () => {
    if (!isFormValid()) return;

    const answersArray = questions.map((q) => ({
      question_id: q.id,
      answer: answers[q.id].trim(),
    }));

    dispatch(
      clarifyPlanRequest({
        goalId: goalId!,
        sessionId: sessionId!,
        answers: answersArray,
      })
    );
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
    <Modal visible={visible} animationType="slide" transparent={true} onRequestClose={handleClose}>
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          {/* Заголовок */}
          <View style={styles.header}>
            <Bot size={22} strokeWidth={1.75} color={ui.text} />
            <Text style={styles.title}>ИИ нуждается в уточнениях</Text>
          </View>
          <Text style={styles.subtitle}>
            Ответьте на вопросы для создания качественного плана задач
          </Text>

          <ScrollView showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="handled">
            {questions.map((question, index) => (
              <View key={question.id} style={styles.questionContainer}>
                <Text style={styles.questionLabel}>Вопрос {index + 1}</Text>
                <Text style={styles.questionText}>{question.text}</Text>
                <Input
                  value={answers[question.id] || ''}
                  onChangeText={(text) =>
                    dispatch(setAnswer({ questionId: question.id, answer: text }))
                  }
                  placeholder="Введите ответ..."
                  multiline
                  numberOfLines={3}
                />
              </View>
            ))}
          </ScrollView>

          {/* Кнопки */}
          <View style={styles.buttonsContainer}>
            <Button
              title="Отмена"
              variant="secondary"
              onPress={handleClose}
              disabled={isLoading}
              style={styles.buttonFlex}
            />
            <Button
              title="Отправить ответы"
              onPress={handleSubmit}
              loading={isLoading}
              disabled={!isFormValid()}
              style={styles.buttonFlex}
            />
          </View>
        </View>
      </View>
    </Modal>
  );
};