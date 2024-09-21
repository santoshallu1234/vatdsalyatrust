import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Avatar, Card } from 'react-native-paper';
import axios from 'axios';
import process from 'process';
import Constants from 'expo-constants';
import { useRouter } from "expo-router";
import AsyncStorage from '@react-native-async-storage/async-storage';
const SERVER = Constants.expoConfig?.extra?.envar?.serverurl;
//import { SERVER_URL } from '@env';
const HomeScreen = () => {
  const navigation = useNavigation();
  const [therapists, setTherapists] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userId, setUserId] = useState(null);

  // Fetch therapist data from API
  useEffect(() => {
    const fetchTherapists = async () => {
      try {
       
        const response = await axios.get(`${SERVER}/gettherapist`); // Replace with your API endpoint
        if (response.data && Array.isArray(response.data)) {
          setTherapists(response.data);
          console.log(response.data);
        } else {
          console.error('Unexpected response data format:', response.data);
        }
      } catch (error) {
        console.error('Error fetching therapist data:', error);
       
      } finally {
        setLoading(false);
      }
    };

    fetchTherapists();
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


  // Render each therapist
  const renderTherapist = ({ item }) => (
    <Card style={styles.card} key={item._id || Math.random().toString()}>
      <View style={styles.cardContent}>
        <Avatar.Image size={60} source={{ uri: item.image || 'https://i.pravatar.cc/100' }} />
        <View style={styles.textContainer}>
          <Text style={styles.name}>{item.name || 'Unknown'}</Text>
          <Text style={styles.specialization}>{item.specialization || 'Specialization not available'}</Text>
          <Text style={styles.experience}>Experience: {item.experience ? `${item.experience} years` : 'N/A'}</Text>
          <View style={styles.availabilityContainer}>
            {item.availability ? (
              item.availability.map((slot, index) => (
                <View key={`${item.id}-${index}`} style={styles.timeSlot}>
                  <Text>{slot.day}: {slot.timeSlots ? slot.timeSlots.join(', ') : 'No slots available'}</Text>
                </View>
              ))
            ) : (
              <Text>No availability info</Text>
            )}
          </View>
          <View style={styles.buttonContainer}>
            <TouchableOpacity 
              style={styles.bookButton} 
              onPress={() => router.push({
                pathname: '/inside/appointmentbook',
                params: { therapistId:item._id,name : item.name,userId:userId}
              })}
            >
              <Text style={styles.buttonText}>Book Appointment</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={styles.chatButton} 
              onPress={() => navigation.navigate('Chat', { therapistId: item._id })}
            >
              <Text style={styles.buttonText}>Chat</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Card>
  );

  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#007BFF" />
        <Text>Loading therapists...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Select a Therapist {userId}</Text>
      <FlatList
        data={therapists}
        renderItem={renderTherapist}
        keyExtractor={(item) => (item.id ? item.id.toString() : Math.random().toString())} // Ensure fallback key if id is missing
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
      />
          <TouchableOpacity 
              style={styles.bookButton} 
              onPress={() => router.push('/inside/appointhist')}
            >
              <Text style={styles.buttonText}>MY APPOINTMENTS</Text>
            </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
    textAlign: 'center',
  },
  list: {
    paddingBottom: 30,
  },
  card: {
    marginBottom: 15,
    borderRadius: 10,
    backgroundColor: '#fff',
    elevation: 5,
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
    marginVertical: 3,
  },
  availabilityContainer: {
    marginTop: 5,
  },
  timeSlot: {
    fontSize: 12,
    color: '#555',
    backgroundColor: '#e0f7fa',
    padding: 5,
    borderRadius: 5,
    marginVertical: 3,
  },
  buttonContainer: {
    flexDirection: 'row',
    marginTop: 10,
  },
  bookButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 8,
    marginRight: 10,
  },
  chatButton: {
    backgroundColor: '#2196F3',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 8,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 14,
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default HomeScreen;
