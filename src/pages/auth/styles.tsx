import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 30,
    textAlign: 'center',
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 15,
    marginBottom: 15,
  },
  link: {
    color: '#007AFF',
    textAlign: 'center',
    marginTop: 20,
  },

  subtitle: {
  fontSize: 14,
  color: '#666',
  textAlign: 'center',
  marginBottom: 20,
  paddingHorizontal: 20,
  },

  inputError: {
  borderColor: '#ff3b30',
  borderWidth: 1,
},
errorText: {
  color: '#ff3b30',
  fontSize: 12,
  marginTop: -10,
  marginBottom: 10,
  marginLeft: 15,
},


});