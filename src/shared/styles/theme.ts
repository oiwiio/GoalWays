export const colors = {
  // основа
  primary: '#007AFF',
  secondary: '#5856D6',
  success: '#34C759',
  danger: '#FF3B30',
  warning: '#FF9500',
  
  // фон
  background: '#F2F2F7',
  surface: '#FFFFFF',
  card: '#FFFFFF',
  
  // текст
  text: '#000000',
  textSecondary: '#8E8E93',
  textTertiary: '#C6C6C8',
  
  // граница
  border: '#C6C6C8',
  borderLight: '#E5E5EA',
  
  // прогресс
  progressLow: '#FF3B30',
  progressMedium: '#FF9500',
  progressHigh: '#34C759',
};

export const spacing = {
  xs: 4,
  s: 8,
  m: 16,
  l: 24,
  xl: 32,
  xxl: 48,
};

export const borderRadius = {
  s: 8,
  m: 12,
  l: 16,
  xl: 20,
  round: 999,
};

export const typography = {
  h1: {
    fontSize: 28,
    fontWeight: '700' as const,
    color: colors.text,
  },
  h2: {
    fontSize: 24,
    fontWeight: '600' as const,
    color: colors.text,
  },
  h3: {
    fontSize: 20,
    fontWeight: '600' as const,
    color: colors.text,
  },
  body: {
    fontSize: 16,
    fontWeight: '400' as const,
    color: colors.text,
  },
  bodySmall: {
    fontSize: 14,
    fontWeight: '400' as const,
    color: colors.textSecondary,
  },
  caption: {
    fontSize: 12,
    fontWeight: '400' as const,
    color: colors.textTertiary,
  },
  button: {
    fontSize: 16,
    fontWeight: '600' as const,
    color: colors.surface,
  },
};

export const shadows = {
  small: {
    shadowColor: colors.text,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  medium: {
    shadowColor: colors.text,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 5,
  },
};