import React from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { Card } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';

const AppointmentHistoryScreen = () => {
  const navigation = useNavigation();

  const appointments = [
    { id: '1', date: '2024-09-01', therapist: 'Dr. Amelia Smith', status: 'Completed', time: '10:00 AM', notes: 'Had a productive session discussing stress management.' },
    { id: '2', date: '2024-09-15', therapist: 'Dr. Ethan Brown', status: 'Upcoming', time: '2:00 PM', notes: 'Next session to focus on coping strategies.' },
  ];

  const handleCardPress = (appointment) => {
    navigation.navigate('AppointmentDetails', { appointment });
  };

  const renderAppointment = ({ item }) => (
    <TouchableOpacity onPress={() => handleCardPress(item)}>
      <Card style={styles.card}>
        <View style={styles.cardContent}>
          <View style={styles.leftSection}>
            <Text style={styles.date}>{item.date}</Text>
            <Text style={styles.time}>{item.time}</Text>
            <Text style={styles.therapist}>{item.therapist}</Text>
          </View>
          <View style={styles.rightSection}>
            <Text style={styles.status}>{item.status}</Text>
            <Text style={styles.notes}>{item.notes}</Text>
          </View>
        </View>
      </Card>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Appointment History</Text>
      <FlatList
        data={appointments}
        renderItem={renderAppointment}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.list}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f1f5f9',
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  card: {
    marginBottom: 15,
    borderRadius: 12,
    backgroundColor: '#fff',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  cardContent: {
    flexDirection: 'row',
    padding: 15,
    alignItems: 'center',
  },
  leftSection: {
    flex: 1,
    justifyContent: 'center',
  },
  rightSection: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  date: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1f2937',
  },
  time: {
    fontSize: 16,
    color: '#6b7280',
    marginBottom: 5,
  },
  therapist: {
    fontSize: 16,
    color: '#4b5563',
  },
  status: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#10b981', // Green color for completed
  },
  notes: {
    fontSize: 14,
    color: '#9ca3af',
    marginTop: 5,
    textAlign: 'right',
  },
  list: {
    paddingBottom: 20,
  },
});

export default AppointmentHistoryScreen;
