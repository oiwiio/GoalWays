import { StyleSheet } from 'react-native';

export const taskItemStyles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    padding: 12,
    marginHorizontal: 16,
    marginVertical: 6,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#eee',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  priorityIcon: {
    fontSize: 14,
    marginRight: 8,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
    flex: 1,
  },
  description: {
    fontSize: 13,
    color: '#666',
    marginBottom: 8,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  date: {
    fontSize: 11,
    color: '#999',
  },
  time: {
    fontSize: 11,
    color: '#999',
  },
  progress: {
    fontSize: 13,
    fontWeight: '500',
    color: '#007AFF',
  },
});