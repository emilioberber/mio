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

export default function LoginWithPhoneScreen({ navigation }) {
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

              <Text style={styles.title}>Iniciar sesión con celular</Text>

              <TextInput
                label="Número de celular"
                mode="outlined"
                keyboardType="phone-pad"
                style={styles.input}
                outlineColor="#50D8BC"
                activeOutlineColor="#50D8BC"
              />

              <Button
                mode="contained"
                style={styles.loginButton}
                labelStyle={styles.loginLabel}
                onPress={() => console.log('Código enviado')}
              >
                Enviar código
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
  loginButton: {
    backgroundColor: '#50D8BC',
    borderRadius: 8,
    marginTop: 8,
    width: '100%',
  },
  loginLabel: {
    color: 'white',
    fontWeight: 'bold',
  },
});
