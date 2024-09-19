import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Linking } from 'react-native';

const EmergencyContactScreen = () => {
  const handleCall = (number) => {
    Linking.openURL(`tel:${number}`);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Emergency Contacts</Text>
      <View style={styles.contactItem}>
        <Text style={styles.label}>National Suicide Prevention Lifeline</Text>
        <TouchableOpacity onPress={() => handleCall('1-800-273-8255')}>
          <Text style={styles.contactNumber}>1-800-273-8255</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.contactItem}>
        <Text style={styles.label}>Crisis Text Line</Text>
        <TouchableOpacity onPress={() => handleCall('Text HOME to 741741')}>
          <Text style={styles.contactNumber}>Text HOME to 741741</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f9f9f9',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  contactItem: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  contactNumber: {
    fontSize: 16,
    color: '#4CAF50',
    marginTop: 5,
  },
});

export default EmergencyContactScreen;
