import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useLocalSearchParams } from 'expo-router';
import axios from 'axios';
import { router } from 'expo-router';
import Constants from 'expo-constants';
import AsyncStorage from '@react-native-async-storage/async-storage';
const SERVER = Constants.expoConfig?.extra?.envar?.serverurl;
import DateTimePicker from '@react-native-community/datetimepicker';
const AppointmentBookingScreen = () => {

  
  // Access therapistId from route.params
  const { therapistId,name} = useLocalSearchParams();
  const [selectedTherapist, setSelectedTherapist] = useState(therapistId || ''); // Use therapistId from params if available
  const [date, setDate] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userId, setUserId] = useState('');

  const handleBook = async () => {
    try {
      const response = await axios.post(`${SERVER}/appoint`, {
        therapistId: selectedTherapist,
        date,
        userId: userId,
      });
      console.log(response.data);
      router.push('/inside/appointhist');
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    console.log(therapistId);
    console.log("hello");
  }, []);
  useEffect(() => {
    const checkLoginStatus = async () => {
      const loggedIn = await AsyncStorage.getItem('isLoggedIn');
      const storedUserId = await AsyncStorage.getItem('userId');
      console.log(loggedIn,storedUserId);
      if (loggedIn === 'true') {
        setIsLoggedIn(true);
        await setUserId(storedUserId);
      } else {
        navigation.navigate('/');
      }
    };

    checkLoginStatus();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Book an Appointment {name}  {userId}</Text>

      <Text style={styles.label}>Select Therapist{ selectedTherapist}</Text>
      <Picker
        selectedValue={selectedTherapist}
        onValueChange={(itemValue) => setSelectedTherapist(itemValue)}
        style={styles.picker}
      >
        <Picker.Item label="Dr. Amelia Smith" value="amelia" />
        <Picker.Item label="Dr. Ethan Brown" value="ethan" />
      </Picker>

      <Text style={styles.label}>Select Date</Text>
      <TextInput
        style={styles.input}
        value={date}
        onChangeText={(text) => setDate(text)}
        placeholder="YYYY-MM-DD"
      />

      <Button title="Book Appointment" onPress={handleBook} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f9f9f9',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    marginVertical: 10,
  },
  picker: {
    height: 50,
    width: '100%',
  },
  input: {
    height: 40,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 20,
  },
});

export default AppointmentBookingScreen;