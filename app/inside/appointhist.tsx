import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Card } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import Constants from 'expo-constants';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
const SERVER = Constants.expoConfig?.extra?.envar?.serverurl;

const AppointmentHistoryScreen = () => {
  const navigation = useNavigation();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userId, setUserId] = useState(null);
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
/*
  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await axios.get(`${SERVER}/userappoint`, { params: { userId: userId } });
        setAppointments(response.data); // Assuming the response contains the appointment data
      } catch (err) {
        setError('Error fetching appointment data');
      } finally {
        setLoading(false);
      }
    };

    fetchAppointments();
  }, []);*/

  useEffect(() => {
    const checkLoginStatus = async () => {
      const loggedIn = await AsyncStorage.getItem('isLoggedIn');
      const storedUserId = await AsyncStorage.getItem('userId');
      console.log(loggedIn,storedUserId);
      if (loggedIn === 'true') {
        setIsLoggedIn(true);

        const fetchAppointments = async () => {
          try {
            const response = await axios.get(`${SERVER}/userappoint`, { params: { userId: storedUserId } });
            setAppointments(response.data); // Assuming the response contains the appointment data
          } catch (err) {
            setError('Error fetching appointment data');
          } finally {
            setLoading(false);
          }
        }
        fetchAppointments();
      } else {
        navigation.navigate('/');
      }
    };

    checkLoginStatus();
  }, []);

  const handleCardPress = (appointment) => {
    navigation.navigate('AppointmentDetails', { appointment });
  };

  const renderAppointment = ({ item }) => (
    <TouchableOpacity onPress={() => handleCardPress(item)}>
      <Card style={styles.card}>
        <View style={styles.cardContent}>
          <View style={styles.leftSection}>
            <Text style={styles.date}>{item.date}</Text>
            <Text style={styles.time}>{item.location}</Text>
            {/* Assuming therapist has a 'name' property */}
            <Text style={styles.therapist}>{item.therapist.name}</Text>
          </View>
          <View style={styles.rightSection}>
            <Text style={styles.status}>{item.status}</Text>
            <Text style={styles.notes}>{item.notes}</Text>
          </View>
        </View>
      </Card>
    </TouchableOpacity>
  );

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" style={styles.loading} />;
  }

  if (error) {
    return <Text style={styles.error}>{error}</Text>;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Appointment History</Text>
      <FlatList
        data={appointments}
        renderItem={renderAppointment}
        keyExtractor={(item) => item._id} // Changed keyExtractor to use _id if available
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
  loading: {
    flex: 1,
    justifyContent: 'center',
  },
  error: {
    color: 'red',
    textAlign: 'center',
  },
});

export default AppointmentHistoryScreen;
