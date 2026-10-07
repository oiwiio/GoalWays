import React from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';
import { colors, spacing, borderRadius, typography } from '../styles/theme';

interface ToastProps {
  isVisible: boolean;      
  message: string;
  type?: 'success' | 'error' | 'info';
  onHide: () => void;
  duration?: number;
}

export const Toast = ({ isVisible, message, type = 'error', onHide, duration = 3000 }: ToastProps) => {
  const opacity = React.useRef(new Animated.Value(0)).current;

  React.useEffect(() => {
    if (isVisible) {
      Animated.sequence([
        Animated.timing(opacity, { toValue: 1, duration: 300, useNativeDriver: true }),
        Animated.delay(duration),
        Animated.timing(opacity, { toValue: 0, duration: 300, useNativeDriver: true }),
      ]).start(() => onHide());
    }
  }, [isVisible]);

  if (!isVisible) return null;

  const backgroundColor = type === 'error' ? colors.danger : type === 'success' ? colors.success : colors.primary;

  return (
    <Animated.View style={[styles.container, { opacity, backgroundColor }]}>
      <Text style={styles.text}>{message}</Text>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 100,
    left: spacing.m,
    right: spacing.m,
    padding: spacing.m,
    borderRadius: borderRadius.m,
    alignItems: 'center',
    zIndex: 1000,
  },
  text: {
    ...typography.body,
    color: colors.text,
    textAlign: 'center',
  },
});