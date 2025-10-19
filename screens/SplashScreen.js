import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import LottieView from 'lottie-react-native';

const SplashScreen = ({ navigation }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace('AuthScreen'); // elimina Splash del historial
    }, 4000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={styles.container}>
      <LottieView
        source={require('../assets/splash-animation.json')}
        autoPlay
        loop={false}
        style={styles.animation}
      />

      <Image
        source={require('../assets/mio_logo_blue.png')} // tu logo
        style={styles.logo}
        resizeMode="contain"
      />

      <Text style={styles.slogan}>Tú paga lo tuyo, y yo lo mio</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  animation: {
    width: 300,
    height: 300,
  },
  logo: {
    width: 140,
    height: 140,
    marginTop: 10,
  },
  slogan: {
    fontSize: 14,
    color: '#666',
    marginTop: 8,
  },
});

export default SplashScreen;
