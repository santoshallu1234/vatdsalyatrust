import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import Constants from 'expo-constants';
import { Link, router } from 'expo-router';
import React, { useRef, useState } from 'react';
import { Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import * as Animatable from 'react-native-animatable';

const SERVER = Constants.expoConfig?.extra?.envar?.serverurl;

const LoginScreen = () => {
  const logoRef = useRef(null);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (name:any , value:any) => {
    setFormData({
      ...formData,
      [name] : value,
    });
  };

  const handleLogin = async () => {
    const { email, password } = formData;

    if (!email || !password) {
      return Alert.alert('Error', 'Please fill all fields');
    }

    try {
      setLoading(true);

      const response = await axios.post(`https://vatlaysabackend-production.up.railway.app/login`, { email, password });
      setLoading(false);

      if (response.data.payload) {
        Alert.alert('Success', 'Login successful');
        await AsyncStorage.setItem('userId', response.data.payload.userId.toString());
        await AsyncStorage.setItem('isLoggedIn', 'true');
        router.replace('/inside'); // Navigate to home/dashboard
      } else {
        Alert.alert('Error', response.data.msg || 'Invalid credentials');
      }
    } catch (error:any) {
      setLoading(false);
      console.error(error);
      Alert.alert('Error', error.response?.data?.msg || 'Something went wrong');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.appTitle}>Welcome Back! Glad to see you back, again!</Text>
      <Animatable.Image
        /*ref={logoRef}
        source={require('images/vatsalya_logo.png')} // Use require for local images
        style={styles.logo}
        animation="bounceIn"
        duration={2000}*/
      />
      <Text style={styles.title}>Login</Text>

      <TextInput
        style={styles.input}
        placeholder="Email"
        keyboardType="email-address"
        value={formData.email}
        onChangeText={(text) => handleChange('email', text)}
      />

      <TextInput
        placeholder="Password"
        style={styles.input}
        value={formData.password}
        onChangeText={(text) => handleChange('password', text)}
        secureTextEntry={true}
      />

      <TouchableOpacity
        style={styles.button}
        onPress={handleLogin}
        disabled={loading}
      >
        <Text style={styles.buttonText}>{loading ? 'Logging In...' : 'Login'}</Text>
      </TouchableOpacity>

      <Link href={'/signup'} style={styles.linktag}>
        Don't have an account? Signup
      </Link>
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
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'black',
    marginBottom: 80,
    //textTransform: 'uppercase',
    fontFamily: 'Cambria', // Change to your preferred font
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: 80,
    alignSelf: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#333',
    marginBottom: 20,
  },
  input: {
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 25,
    paddingHorizontal: 20,
    marginBottom: 15,
    fontSize: 16,
    backgroundColor: '#fff',
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
  linktag: {
    color: '#5d4bdb',
    textAlign: 'center',
    fontSize: 15,
    marginTop: 10,
  },
});

export default LoginScreen;