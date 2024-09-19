import { Link } from 'expo-router';
import React, { useState ,useRef,useEffect} from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import * as Animatable from 'react-native-animatable';
import axios from 'axios';
import { router } from 'expo-router';
import Constants from 'expo-constants';
const SERVER = Constants.expoConfig?.extra?.envar?.serverurl;
//import axios from 'axios';
const SignupScreen = () => {

  const logoRef = useRef(null);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'user', // or 'therapist'
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (name, value) => {
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSignup = async () => {
    const { username, email, password, confirmPassword, role } = formData;
     console.log(username,email,password,role);
    if (password !== confirmPassword) {
      return Alert.alert('Error', 'Passwords do not match');
    }

    if (!username || !email || !password) {
      return Alert.alert('Error', 'Please fill all fields');
    }

    try {
      setLoading(true);
     
          const response = await axios.post(`${SERVER}/register`,{name:username,
            email,
            password,
            role,}); // Replace with your API endpoint
          console.log(response.data);
          router.replace('/login');
      setLoading(false);

      if (response.data.token) {
        Alert.alert('Success', 'Signup successful');
        // Navigate to login or home screen after signup
        navigation.navigate('Login'); // Adjust based on your navigation structure
      }
    } catch (error) {
      setLoading(false);
      console.error(error);
      Alert.alert('Error', error.response?.data?.msg || 'Something went wrong');
    }
  };
  
 /* const handleSignup = () => {
    if (!formData.username || !formData.email || !formData.password) {
      Alert.alert('Error', 'Please fill out all fields.');
    } else if (!validateEmail(formData.email)) {
      Alert.alert('Error', 'Please enter a valid email address.');
    } else {
      Alert.alert('Signup Success', `Welcome, ${formData.username}!`);
      // Add signup logic, API call, or further validation here
    }
  };*/

  return (
    <View style={styles.container}>
         <Animatable.Image
        ref={logoRef}
        source={{ uri: '../assets/images/favicon.png' }}  // Replace with your logo URL
        style={styles.logo}
        animation="bounceIn"
        duration={2000}
      />
      <Text style={styles.title}>Signup2</Text>

      {/* Username Input */}
      <TextInput
        placeholder="Name"
        style={styles.input}
        value={formData.name}
        onChangeText={(text) => handleChange('username', text)}
      />

      {/* Email Input */}
      <TextInput
        style={styles.input}
        placeholder="Email"
        keyboardType="email-address"
        value={formData.email}
        onChangeText={(text) =>   handleChange('email', text)}
      />

      {/* Password Input */}
      <TextInput
        placeholder="Password"
        style={styles.input}
        value={formData.password}
        onChangeText={(text) => handleChange('password', text)}
        secureTextEntry={true}
      />
      <TextInput
        placeholder="Confirm Password"
        style={styles.input}
        value={formData.confirmPassword}
        onChangeText={(text) => handleChange('confirmPassword', text)}
        secureTextEntry={true}
      />
        <Button
          title={formData.role === 'user' ? 'User' : 'Therapist'}
          onPress={() => handleChange('role', formData.role === 'user' ? 'therapist' : 'user')}
        />
     
     <Button
        title={loading ? 'Signing Up...' : 'Sign Up'}
        onPress={handleSignup}
        disabled={loading}
        color="#007BFF"
      />
      <Link href={'/login'} style={styles.linktag}>login</Link>
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
  linktag:{
    width:"100%",
   textAlign:'center',
   fontSize:15,
   marginTop:10,
  }
  ,
});

export default SignupScreen;
