// Authenticación del usuario

import React from 'react';
import { View, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Text, Button } from 'react-native-paper';
import { MaterialIcons, FontAwesome } from '@expo/vector-icons';

export default function AuthScreen({ navigation }) {
  return (
    <View style={styles.container}>
      {/* Logo Mio */}
      <Image source={require('../assets/mio_logo_blue.png')} style={styles.logo} />

      {/* Eslogan */}
      <Text style={styles.slogan}>
        Divide fácil. Paga lo tuyo. Pago lo <Text style={{ color: '#50D8BC', fontWeight: "bold" }}>mio</Text>.
      </Text>

      {/* Botón: Email */}
      <Button
        mode="outlined"
        icon={() => <MaterialIcons name="email" size={20} color="#50D8BC" />}
        onPress={() => navigation.navigate('LoginWithEmailScreen')}
        style={styles.authButton}
        labelStyle={styles.authButtonLabel}
      >
        Ingresar con email
      </Button>

      {/* Botón: Celular */}
      <Button
        mode="outlined"
        icon={() => <FontAwesome name="phone" size={20} color="#50D8BC" />}
        onPress={() => navigation.navigate('LoginWithPhoneScreen')}
        style={styles.authButton}
        labelStyle={styles.authButtonLabel}
      >
        Ingresar con celular
      </Button>

      {/* Botón: Google */}
      <Button
        mode="outlined"
        icon={() => (
          <Image
            source={require('../assets/google_logo.png')}
            style={styles.iconImage}
          />
        )}
        onPress={() => console.log('Ingresar con Google')}
        style={styles.authButton}
        labelStyle={styles.authButtonLabel}
      >
        Ingresar con Google
      </Button>

      {/* Botón: Apple */}
      <Button
        mode="outlined"
        icon={() => (
          <Image
            source={require('../assets/apple_logo.png')}
            style={styles.iconImage}
          />
        )}
        onPress={() => console.log('Ingresar con Apple')}
        style={styles.authButton}
        labelStyle={styles.authButtonLabel}
      >
        Ingresar con Apple
      </Button>

      {/* Texto Crear cuenta */}
      <View style={styles.signupTextContainer}>
        <Text style={styles.signupText}>¿No tienes cuenta? </Text>
        <TouchableOpacity onPress={() => navigation.navigate('SignupScreen')}>
          <Text style={styles.signupLink}>Crear cuenta.</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 200,
    alignItems: 'center',
    paddingHorizontal: 32,
    backgroundColor: '#FFFFFF',
  },
  logo: {
    width: 150,
    height: 150,
    resizeMode: 'contain',
    marginBottom: 20,
  },
  slogan: {
    fontSize: 16,
    color: '#555',
    marginBottom: 40,
    textAlign: 'center',
  },
  authButton: {
    width: '100%',
    borderColor: '#dde9e6ff',
    borderWidth: 2,
    borderRadius: 8,
    marginBottom: 16,
    backgroundColor: 'transparent',
  },
  authButtonLabel: {
    color: '#50D8BC',
    fontWeight: 'bold',
    fontSize: 16,
  },
  iconImage: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
  },
  signupTextContainer: {
    flexDirection: 'row',
    marginTop: 32,
  },
  signupText: {
    fontSize: 14,
    color: '#555',
  },
  signupLink: {
    color: '#50D8BC',
    fontWeight: 'bold',
  },
});
