import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';
const AppointmentBookingScreen = () => {
  const [selectedTherapist, setSelectedTherapist] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');

  const handleBook = () => {
    // Handle booking logic
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Book an Appointment</Text>

      <Text style={styles.label}>Select Therapist</Text>
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

      <Text style={styles.label}>Select Time</Text>
      <TextInput
        style={styles.input}
        value={time}
        onChangeText={(text) => setTime(text)}
        placeholder="HH:MM"
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
