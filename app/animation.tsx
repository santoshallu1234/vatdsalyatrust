import React, { useRef, useEffect } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity } from 'react-native';
import * as Animatable from 'react-native-animatable';

const LandingPage = () => {
  const logoRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const sectionRef1 = useRef(null);
  const sectionRef2 = useRef(null);
  const featureRef = useRef(null);
  const testimonialRef = useRef(null);
  const callToActionRef = useRef(null);
  const contactRef = useRef(null);

  useEffect(() => {
    logoRef.current?.bounceIn(2000);
    titleRef.current?.fadeIn(2000);
    subtitleRef.current?.slideInUp(2000);
    sectionRef1.current?.fadeInUp(2000);
    sectionRef2.current?.fadeInUp(2500);
    featureRef.current?.fadeInUp(3000);
    testimonialRef.current?.fadeInUp(3500);
    callToActionRef.current?.fadeInUp(4000);
    contactRef.current?.fadeInUp(4500);
  }, []);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Logo Animation */}
      <Animatable.Image
        ref={logoRef}
        source={{ uri: 'https://via.placeholder.com/150?text=Logo' }}  // Updated placeholder image URL
        style={styles.logo}
        animation="bounceIn"
        duration={2000}
      />

      {/* App Title */}
      <Animatable.Text
        ref={titleRef}
        style={styles.title}
        animation="fadeIn"
        duration={2000}
      >
        Movie Showing App
      </Animatable.Text>

      {/* Subtitle with slide-in effect */}
      <Animatable.Text
        ref={subtitleRef}
        style={styles.subtitle}
        animation="slideInUp"
        delay={2000}
        duration={2000}
      >
        Discover and enjoy the best movies in theaters!
      </Animatable.Text>

      {/* Section 1 */}
      <Animatable.View
        ref={sectionRef1}
        style={styles.section}
        animation="fadeInUp"
        delay={2500}
        duration={2000}
      >
        <Text style={styles.sectionTitle}>Discover Top Movies</Text>
        <Image
          source={{ uri: 'https://picsum.photos/300/200?random=1' }}  // Updated placeholder image URL
          style={styles.sectionImage}
        />
        <Text style={styles.sectionText}>
          Explore a wide range of movies with detailed information and trailers.
        </Text>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Explore Now</Text>
        </TouchableOpacity>
      </Animatable.View>

      {/* Section 2 */}
      <Animatable.View
        ref={sectionRef2}
        style={styles.section}
        animation="fadeInUp"
        delay={3000}
        duration={2000}
      >
        <Text style={styles.sectionTitle}>Get Personalized Recommendations</Text>
        <Image
          source={{ uri: 'https://picsum.photos/300/200?random=2' }}  // Updated placeholder image URL
          style={styles.sectionImage}
        />
        <Text style={styles.sectionText}>
          Receive movie recommendations based on your preferences and viewing history.
        </Text>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Get Recommendations</Text>
        </TouchableOpacity>
      </Animatable.View>

      {/* Features Section */}
      <Animatable.View
        ref={featureRef}
        style={styles.section}
        animation="fadeInUp"
        delay={3500}
        duration={2000}
      >
        <Text style={styles.sectionTitle}>App Features</Text>
        <Image
          source={{ uri: 'https://picsum.photos/300/200?random=3' }}  // Updated placeholder image URL
          style={styles.sectionImage}
        />
        <Text style={styles.sectionText}>
          Enjoy a seamless experience with our easy-to-use interface, multiple movie categories, and user-friendly features.
        </Text>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Learn More</Text>
        </TouchableOpacity>
      </Animatable.View>

      {/* Testimonials Section */}
      <Animatable.View
        ref={testimonialRef}
        style={styles.section}
        animation="fadeInUp"
        delay={4000}
        duration={2000}
      >
        <Text style={styles.sectionTitle}>User Testimonials</Text>
        <Image
          source={{ uri: 'https://picsum.photos/300/200?random=4' }}  // Updated placeholder image URL
          style={styles.sectionImage}
        />
        <Text style={styles.sectionText}>
          "An amazing app! It has completely changed the way I discover and watch movies."
        </Text>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Read More Reviews</Text>
        </TouchableOpacity>
      </Animatable.View>

      {/* Call to Action Section */}
      <Animatable.View
        ref={callToActionRef}
        style={styles.section}
        animation="fadeInUp"
        delay={4500}
        duration={2000}
      >
        <Text style={styles.sectionTitle}>Ready to Dive In?</Text>
        <Text style={styles.sectionText}>
          Download the app now and start exploring the best movies at your fingertips.
        </Text>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Download Now</Text>
        </TouchableOpacity>
      </Animatable.View>

      {/* Contact Section */}
      <Animatable.View
        ref={contactRef}
        style={styles.section}
        animation="fadeInUp"
        delay={5000}
        duration={2000}
      >
        <Text style={styles.sectionTitle}>Contact Us</Text>
        <Text style={styles.sectionText}>
          Have any questions or feedback? Get in touch with our support team.
        </Text>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Contact Support</Text>
        </TouchableOpacity>
      </Animatable.View>

      {/* Footer */}
      <View style={styles.footer}>
        <Text style={styles.footerText}>© 2024 Movie Showing App</Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#121212',  // Dark theme background
    padding: 20,
  },
  logo: {
    width: 150,
    height: 150,
    marginBottom: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    color: '#ccc',
    textAlign: 'center',
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  section: {
    width: '100%',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    marginBottom: 30,
    alignItems: 'center',
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  sectionImage: {
    width: '100%',
    height: 200,
    marginBottom: 15,
    borderRadius: 10,
  },
  sectionText: {
    fontSize: 16,
    textAlign: 'center',
    color: '#333',
    marginBottom: 15,
  },
  button: {
    backgroundColor: '#E50914',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
  footer: {
    marginTop: 20,
    paddingVertical: 10,
    width: '100%',
    backgroundColor: '#333',
    alignItems: 'center',
  },
  footerText: {
    color: '#fff',
    fontSize: 14,
  },
});

export default LandingPage;
