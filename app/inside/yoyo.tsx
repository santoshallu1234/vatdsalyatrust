import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, Dimensions, ActivityIndicator, ImageBackground } from 'react-native';
import axios from 'axios';

const { height, width } = Dimensions.get('window');

// URL for random background images
const getRandomImageUrl = () => `https://source.unsplash.com/random/${Math.floor(Math.random() * 1000)}x${Math.floor(Math.random() * 1000)}/?nature,therapy`;

// New API for fetching quotes
const QUOTES_API = 'https://cors-anywhere.herokuapp.com/https://type.fit/api/quotes';


const QuotesScreen = () => {
  const [quotes, setQuotes] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch quotes from the new API
  const fetchQuotes = async () => {
    try {
      const response = await axios.get(QUOTES_API);
      setQuotes(response.data);
    } catch (error) {
      console.error('Error fetching quotes:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQuotes();
  }, []);

  // Render a single quote with a random background image
  const renderQuote = ({ item }) => (
    <ImageBackground
      source={{ uri: getRandomImageUrl() }}
      style={styles.quoteContainer}
      imageStyle={styles.backgroundImage}
    >
      <View style={styles.overlay}>
        <Text style={styles.quoteText}>{item.text}</Text>
        <Text style={styles.authorText}>- {item.author || 'Unknown'}</Text>
      </View>
    </ImageBackground>
  );

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <FlatList
      data={quotes}
      renderItem={renderQuote}
      keyExtractor={(item, index) => index.toString()}
      pagingEnabled
      showsVerticalScrollIndicator={false}
      onEndReachedThreshold={0.5}
    />
  );
};

const styles = StyleSheet.create({
  quoteContainer: {
    height: height, // Full screen height for each quote
    justifyContent: 'center',
    alignItems: 'center',
  },
  backgroundImage: {
    resizeMode: 'cover',
  },
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.4)', // Dark overlay to make text readable
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    width: '100%',
    padding: 20,
  },
  quoteText: {
    fontSize: 24,
    fontStyle: 'italic',
    textAlign: 'center',
    color: '#fff',
  },
  authorText: {
    fontSize: 18,
    textAlign: 'center',
    color: '#fff',
    marginTop: 10,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default QuotesScreen;
