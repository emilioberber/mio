import React from 'react';
import { View, StyleSheet, Image } from 'react-native';
import { Text, Button } from 'react-native-paper';

export default function AuthScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Image source={require('../assets/mio_logo_blue.png')} style={styles.logo} />

      <Button
        mode="contained"
        style={styles.loginButton}
        labelStyle={styles.loginLabel}
        onPress={() => navigation.navigate('QRScanner')}
        >
        Iniciar Sesión
      </Button>

      <Button
        mode="outlined"
        style={styles.signupButton}
        labelStyle={styles.signupLabel}
        onPress={() => console.log('Ir a Crear Cuenta')}
      >
        Crear Cuenta
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 32,
    backgroundColor: '#FFFFFF',
  },
  logo: {
    width: 150,
    height: 150,
    resizeMode: 'contain',
    marginBottom: 40,
  },
  loginButton: {
    backgroundColor: '#50D8BC',
    marginBottom: 16,
    borderRadius: 8,
    width: '100%',
  },
  loginLabel: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  signupButton: {
    borderColor: '#50D8BC',
    borderWidth: 2,
    borderRadius: 8,
    width: '100%',
  },
  signupLabel: {
    color: '#50D8BC',
    fontWeight: 'bold',
    fontSize: 16,
  },
});