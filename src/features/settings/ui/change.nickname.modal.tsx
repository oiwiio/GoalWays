import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Modal, StyleSheet, Alert } from 'react-native';

interface Props {
  visible: boolean;
  onClose: () => void;
  onSave: (newNickname: string) => void;
  currentNickname: string;
}

export const ChangeNicknameModal = ({ visible, onClose, onSave, currentNickname }: Props) => {
  const [nickname, setNickname] = useState(currentNickname);
  const [confirmNickname, setConfirmNickname] = useState('');

  const handleSave = () => {
    if (!nickname || !confirmNickname) {
      Alert.alert('Ошибка', 'Заполните все поля');
      return;
    }
    if (nickname !== confirmNickname) {
      Alert.alert('Ошибка', 'Nickname не совпадают');
      return;
    }
    onSave(nickname);
  };

  return (
    <Modal visible={visible} transparent animationType="slide">
      <View style={styles.overlay}>
        <View style={styles.modal}>
          <Text style={styles.title}>Сменить Nickname</Text>
          
          <TextInput
            style={styles.input}
            placeholder="Новый nickname"
            value={nickname}
            onChangeText={setNickname}
            keyboardType="email-address"
            autoCapitalize="none"
          />
          
          <View style={styles.buttons}>
            <TouchableOpacity style={styles.cancelButton} onPress={onClose}>
              <Text>Отмена</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
              <Text style={styles.saveText}>Сохранить</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modal: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 12,
    width: '80%',
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  cancelButton: {
    padding: 12,
    flex: 1,
    alignItems: 'center',
  },
  saveButton: {
    backgroundColor: '#007AFF',
    padding: 12,
    borderRadius: 8,
    flex: 1,
    alignItems: 'center',
  },
  saveText: {
    color: '#fff',
    fontWeight: '600',
  },
});