import React from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { Card } from 'react-native-paper';
import Constants from 'expo-constants';
const SERVER = Constants.expoConfig?.extra?.envar?.serverurl;
const ResourcesScreen = () => {
  const resources = [
    { id: '1', title: 'Managing Stress', description: 'Tips and strategies for managing stress.' },
    { id: '2', title: 'Understanding Therapy', description: 'A guide to what therapy is and how it helps.' },
  ];

  const renderResource = ({ item }) => (
    <Card style={styles.card}>
      <View style={styles.cardContent}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.description}>{item.description}</Text>
        <TouchableOpacity style={styles.readMoreButton}>
          <Text style={styles.readMoreText}>Read More</Text>
        </TouchableOpacity>
      </View>
    </Card>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Resources and Articles</Text>
      <FlatList
        data={resources}
        renderItem={renderResource}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.list}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f9f9f9',
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  card: {
    marginBottom: 15,
    padding: 15,
    borderRadius: 10,
    backgroundColor: '#fff',
    elevation: 3,
  },
  cardContent: {
    flexDirection: 'column',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  description: {
    fontSize: 14,
    marginVertical: 10,
  },
  readMoreButton: {
    marginTop: 10,
    padding: 10,
    backgroundColor: '#4CAF50',
    borderRadius: 5,
    alignItems: 'center',
  },
  readMoreText: {
    color: '#fff',
  },
  list: {
    paddingBottom: 20,
  },
});

export default ResourcesScreen;
