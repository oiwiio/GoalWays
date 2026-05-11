import React, { useState } from 'react';
import { TouchableOpacity, Text, ActivityIndicator, StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../app/store';
import { generatePlanRequest } from '../slice';
import { AIPromptModal } from './AIPromptModal';

interface AIPlanButtonProps {
  goalId: number;
}

export const AIPlanButton = ({ goalId }: AIPlanButtonProps) => {
  const dispatch = useDispatch();
  const [modalVisible, setModalVisible] = useState(false);
  
  const isLoading = useSelector((state: RootState) => state.ai.isLoading);
  const error = useSelector((state: RootState) => state.ai.error);

  React.useEffect(() => {
    if (error) {
      console.log('Ошибка AI:', error);
      // TODO: показать toast
    }
  }, [error]);

  const handleSubmitPrompt = (prompt: string) => {
    console.log('Кнопка AI план нажата, goalId:', goalId, 'prompt:', prompt);
    dispatch(generatePlanRequest({ goalId, prompt }));
    setModalVisible(false);
  };

  return (
    <>
      <TouchableOpacity
        style={styles.button}
        onPress={() => setModalVisible(true)}
        disabled={isLoading}
      >
        {isLoading ? (
          <ActivityIndicator size="small" color="#fff" />
        ) : (
          <Text style={styles.text}>AI план</Text>
        )}
      </TouchableOpacity>

      <AIPromptModal
        visible={modalVisible}
        isLoading={isLoading}
        onSubmit={handleSubmitPrompt}
        onClose={() => setModalVisible(false)}
      />
    </>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#7C3AED',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginLeft: 8,
  },
  text: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
});