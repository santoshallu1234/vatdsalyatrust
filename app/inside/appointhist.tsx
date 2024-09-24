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

  useEffect(() => {
    const checkLoginStatus = async () => {
      const loggedIn = await AsyncStorage.getItem('isLoggedIn');
      const storedUserId = await AsyncStorage.getItem('userId');
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
            <Text style={styles.location}>{item.location}</Text>
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
    return <ActivityIndicator size="large" color="#5d4bdb" style={styles.loading} />;
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
        keyExtractor={(item) => item._id} 
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 30,
    backgroundColor: '#f0f0f0',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#333',
    marginBottom: 20,
  },
  card: {
    marginBottom: 15,
    borderRadius: 12,
    backgroundColor: '#ffffff',
    padding: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
  },
  cardContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  leftSection: {
    flex: 1,
  },
  rightSection: {
    flex: 1,
    alignItems: 'flex-end',
  },
  date: {
    fontSize: 18,
    fontWeight: '600',
    color: '#4b5563',
  },
  location: {
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
    fontWeight: '600',
    color: '#10b981', // Green for status
  },
  notes: {
    fontSize: 14,
    color: '#9ca3af',
    textAlign: 'right',
  },
  loading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  error: {
    textAlign: 'center',
    color: 'red',
    fontSize: 16,
    marginTop: 20,
  },
  list: {
    paddingBottom: 20,
  },
});

export default AppointmentHistoryScreen;
