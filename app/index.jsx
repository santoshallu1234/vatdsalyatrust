import { Link } from 'expo-router';
import React, { useState ,useRef,useEffect} from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import * as Animatable from 'react-native-animatable';
import axios from 'axios';
import { router } from 'expo-router';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './login';
//import axios from 'axios';
const Home = () => {

  
  const [loading, setLoading] = useState(false);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Signup2</Text>

      {/* Username Input 
      <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={LoginScreen} />
      </Stack.Navigator>
    </NavigationContainer>
      */}
      <Link href={'/login'} style={styles.linktag}>login</Link>
      <Link href={'/signup'} style={styles.linktag}>signup</Link>
      <Link href={'/inside/testbook2'} style={styles.linktag}>testbook</Link>
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

export default Home;
