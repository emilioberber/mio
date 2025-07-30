import React from 'react';
import {
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import { Text, TextInput, Button } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';

export default function SignupScreen({ navigation }) {
  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={{ flex: 1 }}>
          <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={24} color="#50D8BC" />
          </TouchableOpacity>

          <ScrollView contentContainerStyle={styles.scrollContainer} keyboardShouldPersistTaps="handled">
            <View style={styles.container}>
              {/* Logo */}
              <Image source={require('../assets/mio_logo_blue.png')} style={styles.logo} />

              <Text style={styles.title}>Crear cuenta</Text>

              <TextInput
                label="Nombre completo"
                mode="outlined"
                style={styles.input}
                outlineColor="#50D8BC"
                activeOutlineColor="#50D8BC"
              />
              <TextInput
                label="Correo electrónico"
                mode="outlined"
                style={styles.input}
                keyboardType="email-address"
                outlineColor="#50D8BC"
                activeOutlineColor="#50D8BC"
              />
              <TextInput
                label="Contraseña"
                mode="outlined"
                secureTextEntry
                style={styles.input}
                outlineColor="#50D8BC"
                activeOutlineColor="#50D8BC"
              />
              <TextInput
                label="Repite tu contraseña"
                mode="outlined"
                secureTextEntry
                style={styles.input}
                outlineColor="#50D8BC"
                activeOutlineColor="#50D8BC"
              />

              <Button
                mode="contained"
                style={styles.signupButton}
                labelStyle={styles.signupLabel}
                onPress={() => console.log('Cuenta creada')}
              >
                Registrarme
              </Button>
            </View>
          </ScrollView>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingHorizontal: 32,
    backgroundColor: '#FFFFFF',
  },
  container: {
    alignItems: 'center',
  },
  backButton: {
    position: 'absolute',
    top: 80,
    left: 20,
    zIndex: 1,
  },
  logo: {
    width: 120,
    height: 120,
    resizeMode: 'contain',
    alignSelf: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 20,
    marginBottom: 24,
    textAlign: 'center',
    fontWeight: 'bold',
    color: '#333',
  },
  input: {
    marginBottom: 16,
    backgroundColor: 'white',
    width: '100%',
  },
  signupButton: {
    backgroundColor: '#50D8BC',
    borderRadius: 8,
    marginTop: 8,
    width: '100%',
  },
  signupLabel: {
    color: 'white',
    fontWeight: 'bold',
  },
});
