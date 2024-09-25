import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Avatar, Card } from 'react-native-paper';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Constants from 'expo-constants';
import { useNavigation } from '@react-navigation/native';
import { useRouter } from 'expo-router';

const SERVER = Constants.expoConfig?.extra?.envar?.serverurl;

const TherapistScreen = () => {
  const navigation = useNavigation();
  const router = useRouter();
  const [therapists, setTherapists] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState(null);

  // Fetch therapist data
  useEffect(() => {
    const fetchTherapists = async () => {
      try {
        const response = await axios.get(`https://vatlaysabackend-production.up.railway.app/gettherapist`);
        setTherapists(response.data || []);
      } catch (error) {
        console.error('Error fetching therapist data:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchTherapists();
  }, []);

  // Check login status
  useEffect(() => {
    const checkLoginStatus = async () => {
      const storedUserId = await AsyncStorage.getItem('userId');
      setUserId(storedUserId);
      if (!storedUserId) {
        navigation.navigate('/');
      }
    };
    checkLoginStatus();
  }, []);

  const handleBookAppointment = (therapistId, therapistName) => {
    router.push({
      pathname: '/inside/appointmentbook',
      params: { therapistId, name: therapistName, userId }
    });
  };

  const renderAvailability = (availability) => {
    if (!availability || availability.length === 0) {
      return <Text style={styles.availabilityText}>No availability info</Text>;
    }
    return availability.map((slot, index) => (
      <View key={index} style={styles.availabilityContainer}>
        <Text>{slot.day}: {slot.timeSlots ? slot.timeSlots.join(', ') : 'No slots available'}</Text>
      </View>
    ));
  };

  const renderTherapist = ({ item }) => (
    <Card style={styles.card}>
      <View style={styles.cardContent}>
      <Avatar.Image size={60} source={{ uri: `https://gravatar.com/avatar/${item.name.toLowerCase().replace(/\s+/g, '')}?d=identicon` }} />
      <View style={styles.textContainer}>
          <Text style={styles.name}>{item.name || 'Unknown'}</Text>
          <Text style={styles.specialization}>{item.specialization || 'N/A'}</Text>
          <Text style={styles.experience}>Experience: {item.experience ? `${item.experience} years` : 'N/A'}</Text>
          <View style={styles.availabilityList}>
            {renderAvailability(item.availability)}
          </View>
          <TouchableOpacity
            style={styles.bookButton}
            onPress={() => handleBookAppointment(item._id, item.name)}
          >
            <Text style={styles.buttonText}>Book Appointment</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Card>
  );

  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#5d4bdb" />
        <Text>Loading therapists...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Select a Therapist</Text>
      <FlatList
        data={therapists}
        renderItem={renderTherapist}
        keyExtractor={(item) => item._id || Math.random().toString()}
        contentContainerStyle={styles.list}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    backgroundColor: '#f0f0f0',
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginVertical: 20,
  },
  list: {
    paddingBottom: 30,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 15,
    marginBottom: 20,
    elevation: 4,
    padding: 15,
  },
  cardContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  textContainer: {
    flex: 1,
    marginLeft: 15,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#222',
  },
  specialization: {
    fontSize: 14,
    color: '#777',
    marginVertical: 5,
  },
  experience: {
    fontSize: 14,
    color: '#555',
  },
  availabilityList: {
    marginTop: 10,
  },
  availabilityContainer: {
    backgroundColor: '#e0f7fa',
    padding: 5,
    borderRadius: 5,
    marginVertical: 3,
  },
  availabilityText: {
    fontSize: 12,
    color: '#555',
  },
  bookButton: {
    marginTop: 10,
    backgroundColor: '#5d4bdb',
    paddingVertical: 10,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default TherapistScreen;
