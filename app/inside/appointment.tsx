import React, { useState,useEffect } from 'react';
import { View, Text, Button } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import * as Notifications from 'expo-notifications';

const AppointmentScreen = ({ route }) => {
  //const { therapistId } = route.params;
  const { therapistId } = 'hunjmkmk';
  const [selectedDate, setSelectedDate] = useState(new Date());
  const bookAppointment = () => {
    // Save appointment in the backend and schedule notifications
    console.log('Appointment booked for therapist', therapistId);
  };
  
  useEffect(() => {
    Notifications.scheduleNotificationAsync({
      content: {
        title: "Upcoming Appointment",
        body: 'You have an appointment in 1 hour',
      },
      trigger: {
        seconds: 3600, // 1 hour before
      },
    });
  }, []);

  return (
    <View>
      <Text>Book an Appointment</Text>
      <DateTimePicker
        value={selectedDate}
        mode="date"
        display="default"
        onChange={(event, date) => setSelectedDate(date)}
      />
      <Button title="Book" onPress={bookAppointment} />
    </View>
  );
};

export default AppointmentScreen;
