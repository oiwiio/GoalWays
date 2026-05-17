import React, { useState } from 'react';
import { TouchableOpacity, Text, ActivityIndicator, StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../app/store';
import { generatePlanRequest } from '../slice';
import { AIPromptModal } from './AIPromptModal';
import { colors, spacing, borderRadius, typography } from '../../../shared/styles/theme';

interface AIPlanButtonProps {
  goalId: number;
}

export const AIPlanButton = ({ goalId }: AIPlanButtonProps) => {
  const dispatch = useDispatch();
  const [modalVisible, setModalVisible] = useState(false);
  const [toastVisible, setToastVisible] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  
  const isLoading = useSelector((state: RootState) => state.ai.isLoading);
  const error = useSelector((state: RootState) => state.ai.error);

  React.useEffect(() => {
    if (error) {
      setToastMessage(error);
      setToastVisible(true);
    }
  }, [error]);

  const handleOpenModal = () => {
    console.log('Открываем модалку AI');
    setModalVisible(true);
  };

  const handleSubmitPrompt = (prompt: string) => {
    console.log('Отправка запроса, goalId:', goalId, 'prompt:', prompt);
    dispatch(generatePlanRequest({ goalId, prompt }));
    setModalVisible(false);
  };

  console.log('AIPlanButton рендер, modalVisible:', modalVisible, 'isLoading:', isLoading);

  return (
    <>
      <TouchableOpacity
        style={styles.button}
        onPress={handleOpenModal}
        disabled={isLoading}
      >
        {isLoading ? (
          <ActivityIndicator size="small" color={colors.text} />
        ) : (
          <Text style={styles.text}>AI план</Text>
        )}
      </TouchableOpacity>

      <AIPromptModal
        visible={modalVisible}
        isLoading={isLoading}
        onSubmit={handleSubmitPrompt}
        onClose={() => {
          console.log('Закрываем модалку');
          setModalVisible(false);
        }}
      />

      {/* Toast временно уберём для теста */}
      {/* <Toast
        isVisible={toastVisible}
        message={toastMessage}
        type="error"
        onHide={() => setToastVisible(false)}
      /> */}
    </>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: colors.primary,
    paddingHorizontal: spacing.m,
    paddingVertical: spacing.s,
    borderRadius: borderRadius.round,
    marginLeft: spacing.s,
  },
  text: {
    ...typography.buttonSmall,
    color: colors.text,
  },
});