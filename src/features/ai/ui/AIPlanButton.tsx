import React, { useState } from 'react';
import { ViewStyle } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../app/store';
import { generatePlanRequest } from '../slice';
import { AIPromptModal } from './AIPromptModal';
import { Button } from '../../../shared/ui/button';

interface AIPlanButtonProps {
  goalId: number;
  style?: ViewStyle;
}

export const AIPlanButton = ({ goalId, style }: AIPlanButtonProps) => {
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

  const handleSubmitPrompt = (prompt: string) => {
    dispatch(generatePlanRequest({ goalId, prompt }));
    setModalVisible(false);
  };

  return (
    <>
      <Button
        title="AI план"
        variant="secondary"
        onPress={() => setModalVisible(true)}
        loading={isLoading}
        style={style}
      />

      <AIPromptModal
        visible={modalVisible}
        isLoading={isLoading}
        onSubmit={handleSubmitPrompt}
        onClose={() => setModalVisible(false)}
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