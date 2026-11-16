export const ui = {
  background: '#1B1B1D',
  card: '#2A2A30',
  cardLight: '#34343C',
  tabBar: '#222226',
  text: '#FFFFFF',
  textMuted: '#A8A8AD',
  textInactive: '#6E6E75',
  border: '#4A4A52',
  borderLight: '#33333A',
  accent: '#4F2BA8',
  accentLight: '#8B6BEA',
  success: '#3DBE7A',
  warning: '#F2A93B',
  danger: '#E83A3A',
  avatarBg: '#D9D9D9',
  overlay: 'rgba(0, 0, 0, 0.5)',
  shadow: 'rgba(0, 0, 0, 0.3)',
};

// Те же имена цветов, что в theme.ts, но со значениями из ui.
// Нужны, чтобы позже можно было переключить экраны заменой одного импорта:
// import { colors, spacing, ... } from '.../shared/styles/theme'  ->  '.../shared/styles/ui' 


export const colors = {
  background: ui.background,
  surface: ui.card,
  surfaceLight: ui.cardLight,
  text: ui.text,
  textSecondary: ui.textMuted,
  primary: ui.accent,
  primaryLight: ui.accentLight,
  danger: ui.danger,
  warning: ui.warning,
  success: ui.success,
  border: ui.border,
  borderLight: ui.borderLight,
  overlay: ui.overlay,
  shadow: ui.shadow,
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
  xs: 8,
  s: 12,
  m: 16,
  l: 24,
  xl: 32,
  round: 999,
};

export const typography = {
  h1: { fontSize: 32, fontWeight: '700' as const, color: ui.text },
  h2: { fontSize: 24, fontWeight: '700' as const, color: ui.text },
  h3: { fontSize: 20, fontWeight: '600' as const, color: ui.text },
  body: { fontSize: 16, fontWeight: '400' as const, color: ui.text },
  bodySecondary: { fontSize: 16, fontWeight: '400' as const, color: ui.textMuted },
  caption: { fontSize: 12, fontWeight: '400' as const, color: ui.textMuted },
  button: { fontSize: 16, fontWeight: '600' as const, color: ui.text },
  buttonSmall: { fontSize: 14, fontWeight: '600' as const, color: ui.text },
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