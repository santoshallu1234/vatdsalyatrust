import { Ionicons } from '@expo/vector-icons'; // Icons for inputs
import axios from 'axios';
import Constants from 'expo-constants';
import { Link, router } from 'expo-router';
import React, { useRef, useState } from 'react';
import { Alert, StyleSheet, Switch, Text, TextInput, TouchableOpacity, View } from 'react-native';
import * as Animatable from 'react-native-animatable';
import favicon from '../../assets/images/favicon.png'; // Import image

const SERVER = Constants.expoConfig?.extra?.envar?.serverurl;

const SignupScreen = () => {
  const logoRef = useRef(null);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'user',
  });
  const [loading, setLoading] = useState(false);
  const [isRoleTherapist, setIsRoleTherapist] = useState(false); // For role toggle

  const handleChange = (name, value) => {
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSignup = async () => {
    const { username, email, password, confirmPassword, role } = formData;

    if (password !== confirmPassword) {
      return Alert.alert('Error', 'Passwords do not match');
    }

    if (!username || !email || !password) {
      return Alert.alert('Error', 'Please fill all fields');
    }

    try {
      setLoading(true);
      const response = await axios.post(`https://vatlaysabackend-production.up.railway.app//register`, {
        name: username,
        email,
        password,
        role,
      });

      console.log(response.data);
      setLoading(false);

      if (response.data.token) {
        Alert.alert('Success', 'Signup successful');
        router.replace('/login'); // Adjust based on your navigation structure
      }
    } catch (error) {
      setLoading(false);
      console.error(error);
      Alert.alert('Error', error.response?.data?.msg || 'Something went wrong');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.registerText}>Hello! Register to get started</Text>
      <Animatable.Image
        /*ref={logoRef}
        source={logo}
        style={styles.logo}
        animation="bounceIn"
        duration={2000}*/
      />
      <Text style={styles.title}>Signup</Text>

      {/* Username Input with Icon */}
      <View style={styles.inputContainer}>
        <Ionicons name="person" size={24} color="#777" style={styles.inputIcon} />
        <TextInput
          placeholder="Name"
          style={styles.input}
          value={formData.username}
          onChangeText={(text) => handleChange('username', text)}
        />
      </View>

      {/* Email Input with Icon */}
      <View style={styles.inputContainer}>
        <Ionicons name="mail" size={24} color="#777" style={styles.inputIcon} />
        <TextInput
          style={styles.input}
          placeholder="Email"
          keyboardType="email-address"
          value={formData.email}
          onChangeText={(text) => handleChange('email', text)}
        />
      </View>

      {/* Password Input with Icon */}
      <View style={styles.inputContainer}>
        <Ionicons name="lock-closed" size={24} color="#777" style={styles.inputIcon} />
        <TextInput
          placeholder="Password"
          style={styles.input}
          value={formData.password}
          onChangeText={(text) => handleChange('password', text)}
          secureTextEntry={true}
        />
      </View>

      {/* Confirm Password Input with Icon */}
      <View style={styles.inputContainer}>
        <Ionicons name="lock-closed" size={24} color="#777" style={styles.inputIcon} />
        <TextInput
          placeholder="Confirm Password"
          style={styles.input}
          value={formData.confirmPassword}
          onChangeText={(text) => handleChange('confirmPassword', text)}
          secureTextEntry={true}
        />
      </View>

      {/* Role Switch */}
      <View style={styles.roleSwitchContainer}>
        <Text style={styles.roleText}>User</Text>
        <Switch
          value={isRoleTherapist}
          onValueChange={(value) => {
            setIsRoleTherapist(value);
            handleChange('role', value ? 'therapist' : 'user');
          }}
          trackColor={{ false: '#767577', true: '#81b0ff' }}
          thumbColor={isRoleTherapist ? '#007BFF' : '#f4f3f4'}
        />
        <Text style={styles.roleText}>Therapist</Text>
      </View>

      {/* Signup Button */}
      <TouchableOpacity
        style={[styles.signupButton, loading && styles.buttonDisabled]}
        onPress={handleSignup}
        disabled={loading}
      >
        <Text style={styles.signupButtonText}>
          {loading ? 'Signing Up...' : 'Sign Up'}
        </Text>
      </TouchableOpacity>

      {/* Login Link */}
      <Link href={'/login'} style={styles.linktag}>
        Already have an account? Login
      </Link>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
    backgroundColor: '#f8f9fa',
  },
  registerText: {
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#333',
    marginBottom: 30,
  },
  logo: {
    width: 120,
    height: 120,
    alignSelf: 'center',
    marginBottom: 40,
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#333',
    marginBottom: 20,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    paddingHorizontal: 10,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 2,
    elevation: 3, // for Android shadow
  },
  inputIcon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    height: 50,
    fontSize: 16,
  },
  roleSwitchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 15,
  },
  roleText: {
    fontSize: 18,
    fontWeight: '500',
    marginHorizontal: 10,
  },
  signupButton: {
    backgroundColor: '#5d4bdb',
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 10,
  },
  signupButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  buttonDisabled: {
    backgroundColor: '#aaa',
  },
  linktag: {
    width: '100%',
    textAlign: 'center',
    fontSize: 15,
    marginTop: 10,
    color: '#5d4bdb',
  },
});

export default SignupScreen;