import { StyleSheet } from 'react-native';
import { ui } from '../../../shared/styles/ui';

export const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.6)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: '90%',
    maxWidth: 400,
    maxHeight: '80%',
    padding: 24,
    borderRadius: 24,
    backgroundColor: ui.background,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 8,
  },
  title: {
    flex: 1,
    fontSize: 20,
    fontWeight: '600',
    color: ui.text,
  },
  subtitle: {
    fontSize: 12,
    lineHeight: 18,
    color: ui.textMuted,
    marginBottom: 20,
  },
  questionContainer: {
    marginBottom: 0,
  },
  questionLabel: {
    fontSize: 10,
    color: ui.textMuted,
    marginBottom: 4,
  },
  questionText: {
    fontSize: 14,
    fontWeight: '600',
    color: ui.text,
    marginBottom: 8,
  },
  buttonsContainer: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 4,
  },
  buttonFlex: {
    flex: 1,
  },
});