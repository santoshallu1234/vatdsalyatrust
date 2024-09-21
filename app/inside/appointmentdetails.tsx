import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Card } from 'react-native-paper';
import Constants from 'expo-constants';
const SERVER = Constants.expoConfig?.extra?.envar?.serverurl;
const AppointmentDetailsScreen = ({ route }) => {
  //const { appointment } = route.params;
  const  appointment = [
    {
        therapist:"jnjnjx",
        date:'',
    }
  ]
  return (
    <View style={styles.container}>
      <Card style={styles.card}>
        <View style={styles.cardContent}>
          <Text style={styles.label}>Therapist:</Text>
          <Text style={styles.detail}>{appointment?.therapist}</Text>
          <Text style={styles.label}>Date & Time:</Text>
          <Text style={styles.detail}>{appointment?.date} at {appointment?.time}</Text>
          <Text style={styles.label}>Location:</Text>
          <Text style={styles.detail}>{appointment?.location || 'Online'}</Text>
          <Text style={styles.label}>Notes:</Text>
          <Text style={styles.detail}>{appointment?.notes || 'No additional notes'}</Text>
        </View>
      </Card>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f9f9f9',
  },
  card: {
    padding: 20,
    borderRadius: 10,
    backgroundColor: '#fff',
    elevation: 3,
  },
  cardContent: {
    flexDirection: 'column',
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginVertical: 5,
  },
  detail: {
    fontSize: 16,
    marginBottom: 15,
  },
});

export default AppointmentDetailsScreen;
