import React, { useState, useRef } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import * as Animatable from 'react-native-animatable';
import axios from 'axios';
import { router } from 'expo-router';
import { Link } from 'expo-router';
import Constants from 'expo-constants';
const SERVER = Constants.expoConfig?.extra?.envar?.serverurl;
const LoginScreen = () => {
  const logoRef = useRef(null);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (name, value) => {
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleLogin = async () => {
    const { email, password } = formData;

    if (!email || !password) {
      return Alert.alert('Error', 'Please fill all fields');
    }

    try {
      setLoading(true);

      const response = await axios.post(`${SERVER}/login`, {
        email,
        password,
      });

      setLoading(false);

      if (response.data.token) {
        Alert.alert('Success', 'Login successful');
        // Navigate to the home or dashboard after login
        router.replace('/'); // Adjust this based on your app's navigation structure
      } else {
        Alert.alert('Error', response.data.msg || 'Invalid credentials');
      }
    } catch (error) {
      setLoading(false);
      console.error(error);
      Alert.alert('Error', error.response?.data?.msg || 'Something went wrong');
    }
  };

  return (
    <View style={styles.container}>
      <Animatable.Image
        ref={logoRef}
        source={{ uri: '../assets/images/favicon.png' }} // Replace with your logo URL
        style={styles.logo}
        animation="bounceIn"
        duration={2000}
      />
      <Text style={styles.title}>Login</Text>

      {/* Email Input */}
      <TextInput
        style={styles.input}
        placeholder="Email"
        keyboardType="email-address"
        value={formData.email}
        onChangeText={(text) => handleChange('email', text)}
      />

      {/* Password Input */}
      <TextInput
        placeholder="Password"
        style={styles.input}
        value={formData.password}
        onChangeText={(text) => handleChange('password', text)}
        secureTextEntry={true}
      />

      <Button
        title={loading ? 'Logging In...' : 'Login'}
        onPress={handleLogin}
        disabled={loading}
        color="#007BFF"
      />

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
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  input: {
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 10,
    marginBottom: 15,
    fontSize: 16,
  },
  linktag: {
    width: '100%',
    textAlign: 'center',
    fontSize: 15,
    marginTop: 10,
  },
});

export default LoginScreen;
