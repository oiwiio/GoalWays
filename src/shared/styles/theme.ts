import { TextStyle, ViewStyle } from 'react-native';

export const colors = {
  background: '#19191E',
  surface: '#27282F',
  surfaceLight: '#32333D',
  text: '#F1F8FF',
  textSecondary: '#8C8C96',
  primary: '#6572CE',
  primaryGradient: ['#6572CE', '#7B5BB5'] as const,
  danger: '#FF3B30',
  warning: '#FF9500',
  success: '#34C759',
  border: '#3A3B44',
  borderLight: '#2C2D35',
  overlay: 'rgba(0, 0, 0, 0.5)',
  shadow: 'rgba(0, 0, 0, 0.3)',
};

export const spacing = {
  xs: 4,
  s: 8,
  m: 16,
  l: 24,
  xl: 32,
  xxl: 48,
};

export const typography = {
  h1: { fontSize: 32, fontWeight: '700' as const, color: colors.text },
  h2: { fontSize: 24, fontWeight: '700' as const, color: colors.text },
  h3: { fontSize: 20, fontWeight: '600' as const, color: colors.text },
  body: { fontSize: 16, fontWeight: '400' as const, color: colors.text },
  bodySecondary: { fontSize: 16, fontWeight: '400' as const, color: colors.textSecondary },
  caption: { fontSize: 12, fontWeight: '400' as const, color: colors.textSecondary },
  button: { fontSize: 16, fontWeight: '600' as const, color: colors.text },
  buttonSmall: { fontSize: 14, fontWeight: '600' as const, color: colors.text },
};

export const borderRadius = {
  xs: 8,
  s: 12,
  m: 16,
  l: 24,
  xl: 32,
  round: 999,
};

export const shadows = {
  small: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 3,
  },
  medium: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 5,
  },
  large: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.35,
    shadowRadius: 16,
    elevation: 8,
  },
};