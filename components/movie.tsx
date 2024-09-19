import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';

const LandingPage = () => {
  const movies = [
    {
      id: 1,
      title: 'Inception',
      image: 'https://linktoimage/inception.jpg',
    },
    {
      id: 2,
      title: 'The Dark Knight',
      image: 'https://linktoimage/darkknight.jpg',
    },
    {
      id: 3,
      title: 'Interstellar',
      image: 'https://linktoimage/interstellar.jpg',
    },
  ];

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Movie Showing App</Text>
      </View>

      {/* Featured Movies */}
      <View style={styles.movieSection}>
        <Text style={styles.sectionTitle}>Featured Movies</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {movies.map((movie) => (
            <View key={movie.id} style={styles.movieCard}>
              <Image source={{ uri: movie.image }} style={styles.movieImage} />
              <Text style={styles.movieTitle}>{movie.title}</Text>
            </View>
          ))}
        </ScrollView>
      </View>

      {/* CTA Button */}
      <TouchableOpacity style={styles.ctaButton}>
        <Text style={styles.ctaText}>Browse All Movies</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    backgroundColor: '#000',
    padding: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    color: '#fff',
    fontWeight: 'bold',
  },
  movieSection: {
    marginTop: 20,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  movieCard: {
    marginRight: 15,
  },
  movieImage: {
    width: 150,
    height: 220,
    borderRadius: 10,
  },
  movieTitle: {
    marginTop: 5,
    fontSize: 16,
    textAlign: 'center',
  },
  ctaButton: {
    backgroundColor: '#E50914',
    padding: 15,
    borderRadius: 10,
    margin: 20,
    alignItems: 'center',
  },
  ctaText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default LandingPage;
