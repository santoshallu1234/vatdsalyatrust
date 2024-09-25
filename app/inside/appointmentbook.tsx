import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet, TextInput, TouchableOpacity, Alert, Platform } from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import axios from 'axios';
import Constants from 'expo-constants';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DateTimePicker from '@react-native-community/datetimepicker'; // Fixed import

const SERVER = Constants.expoConfig?.extra?.envar?.serverurl;

const AppointmentBookingScreen = () => {
  const { therapistId, name } = useLocalSearchParams();
  const [selectedTherapist, setSelectedTherapist] = useState(therapistId || '');
  const [date, setDate] = useState(new Date());
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userId, setUserId] = useState('');
  const [showDatePicker, setShowDatePicker] = useState(false); // Changed `open` to `showDatePicker`
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const checkLoginStatus = async () => {
      const loggedIn = await AsyncStorage.getItem('isLoggedIn');
      const storedUserId = await AsyncStorage.getItem('userId');
      if (loggedIn === 'true') {
        setIsLoggedIn(true);
        setUserId(storedUserId);
      } else {
        router.replace('/');
      }
    };
    checkLoginStatus();
  }, []);

  // New useEffect to watch for changes in the date
  useEffect(() => {
    console.log('Selected date has changed:', date.toDateString());
  }, [date]);

  const handleBook = async () => {
    if (!date || !selectedTherapist) {
      return Alert.alert('Error', 'Please select a date and therapist.');
    }

    setLoading(true);
    let attempts = 0;
    const maxRetries = 3;

    while (attempts < maxRetries) {
      try {
        const response = await axios.post(`https://vatlaysabackend-production.up.railway.app/appoint`, {
          therapistId: selectedTherapist,
          date,
          userId,
        });
        Alert.alert('Success', 'Appointment booked!');
        router.push('/inside/appointhist');
        break; // Exit loop on success
      } catch (error) {
        attempts++;
        console.error(error);
        if (attempts >= maxRetries) {
          Alert.alert('Error', 'Failed to book the appointment after multiple attempts');
        } else {
          await new Promise(res => setTimeout(res, 1000)); // Wait 1 second before retrying
        }
      } finally {
        setLoading(false);
      }
    }
  };

  const handleDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShowDatePicker(Platform.OS === 'ios'); // Keep date picker open on iOS
    setDate(currentDate); // Update date state
  };

  return (
    <View style={styles.container}>
      <Text style={styles.appTitle}>Book Your Appointment with {name}</Text>

      <Text style={styles.label}>Selected Therapist: {selectedTherapist}</Text>

      <TextInput
        style={styles.input}
        placeholder="Therapist ID"
        value={selectedTherapist}
        editable={false}
      />

      <Text style={styles.label}>Selected Date: {date.toDateString()}</Text>

      <TouchableOpacity style={styles.button} onPress={() => setShowDatePicker(true)}>
        <Text style={styles.buttonText}>Select Date</Text>
      </TouchableOpacity>

      {/* DatePicker: Show only when the button is pressed */}
      {showDatePicker && (
        <DateTimePicker
          value={date}// Value must be a valid Date object
          minimumDate={new Date()}  
          mode="date"
          display="default"
          onChange={handleDateChange} // Handle date changes
        />
      )}

      <TouchableOpacity
        style={styles.button}
        onPress={handleBook}
        disabled={loading}
      >
        <Text style={styles.buttonText}>{loading ? 'Booking...' : 'Book Appointment'}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
    backgroundColor: '#f0f0f0',
  },
  appTitle: {
    fontSize: 26,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#333',
    marginBottom: 40,
  },
  label: {
    fontSize: 18,
    fontWeight: '600',
    marginVertical: 10,
    color: '#333',
  },
  input: {
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 25,
    paddingHorizontal: 20,
    marginBottom: 20,
    backgroundColor: '#fff',
    fontSize: 16,
  },
  button: {
    height: 50,
    borderRadius: 25,
    backgroundColor: '#5d4bdb',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default AppointmentBookingScreen;
