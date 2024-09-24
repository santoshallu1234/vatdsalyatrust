import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet, TextInput, TouchableOpacity, Alert } from 'react-native';
import { useLocalSearchParams ,router} from 'expo-router';
import axios from 'axios';
import Constants from 'expo-constants';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DatePicker from '@react-native-community/datetimepicker';

const SERVER = Constants.expoConfig?.extra?.envar?.serverurl;

const AppointmentBookingScreen = () => {
  const therapistId = "dfghj";
  const name = "yogi"
  const [selectedTherapist, setSelectedTherapist] = useState(therapistId || '');
  const [date, setDate] = useState(new Date());
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userId, setUserId] = useState('');
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false); // For showing a loader during API call

  
  const handleBook = async () => {
    if (!date || !selectedTherapist) {
      return Alert.alert('Error', 'Please select a date and therapist.');
    }
    
    setLoading(true);
    try {
      const response = await axios.post(`${SERVER}/appoint`, {
        therapistId: selectedTherapist,
        date,
        userId,
      });
      Alert.alert('Success', 'Appointment booked!');
      router.push('/inside/appointhist');
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'Failed to book the appointment');
    } finally {
      setLoading(false);
    }
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

      <TouchableOpacity style={styles.button} onPress={() => setOpen(true)}>
        <Text style={styles.buttonText}>Select Date</Text>
      </TouchableOpacity>

      {open && (
  <DatePicker
    modal
    open={open}
    value={date}
    minimumDate={new Date()} // Add this prop
    onConfirm={(selectedDate) => {
      setOpen(false);
      setDate(selectedDate);
    }}
    onCancel={() => setOpen(false)}
    mode="date"
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
