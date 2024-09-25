import { Link } from 'expo-router';
import React, { useState } from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
//import favicon from '../../assets/images/favicon.png'; // Import the logo image


const Home = () => {
  const [loading, setLoading] = useState(false);

  return (
    <View style={styles.container}>
      <Image 
        source={{ uri:'https://s.tmimgcdn.com/scr/800x500/143100/therapy-logo-template_143176-original.jpg'}} // Use the imported logo image
        style={styles.logo}
      />
      <Text style={styles.title}>Vatsalya Trust Mumbai</Text>

      <View style={styles.linkContainer}>
        <Link href={'/login'} style={styles.linktag}>Login</Link>
        <Link href={'/signup'} style={styles.linktag}>Sign Up</Link>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    backgroundColor: '#fff',
  },
  logo: {
    width: 200, // Adjust as needed
    height: 200, // Adjust as needed
    marginBottom: 100,
    
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 50,
  },
  linkContainer: {
    width: '100%',
    alignItems: 'center',
  },
  linktag: {
    width: "90%",
    textAlign: 'center',
    fontSize: 15,
    fontWeight: 'bold',
    marginTop: 20,
    padding: 17,
    backgroundColor: '#5d4bdb', // Example button color
    color: '#fff',
    borderRadius: 10,
  },
});

export default Home;