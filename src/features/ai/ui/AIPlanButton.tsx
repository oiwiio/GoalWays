import React from 'react';
import { TouchableOpacity, Text, ActivityIndicator, StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../app/store';
import { generatePlanRequest } from '../slice';
import { styles } from './AIPlanButton.styles';

interface AIPlanButtonProps {
  goalId: number;
  onPlanGenerated?: () => void;
}

export const AIPlanButton = ({ goalId, onPlanGenerated }: AIPlanButtonProps) => {
  const dispatch = useDispatch();
  const isLoading = useSelector((state: RootState) => state.ai.isLoading);
  const error = useSelector((state: RootState) => state.ai.error);

  // Показываем toast при ошибке
  React.useEffect(() => {
    if (error) {
      // Здесь можно использовать ваш toast компонент
      console.log('Ошибка AI:', error);
      // TODO: показать toast
    }
  }, [error]);

  const handlePress = () => {
    console.log('Кнопка AI план нажата, goalId:', goalId);
    dispatch(generatePlanRequest(goalId));
  };

  return (
    <TouchableOpacity
      style={styles.button}
      onPress={handlePress}
      disabled={isLoading}
    >
      {isLoading ? (
        <ActivityIndicator size="small" color="#fff" />
      ) : (
        <Text style={styles.text}>AI план</Text>
      )}
    </TouchableOpacity>
  );
};
