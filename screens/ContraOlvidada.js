import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const ContraOlvidada = ({ navigation }) => {
  const [email, setEmail] = useState('');

  const handleRecuperar = () => {
    if (!email) {
      Alert.alert('Error', 'Por favor ingresa tu correo electrónico.');
      return;
    }

    // Aquí iría la lógica del backend para enviar enlace de recuperación
    Alert.alert(
      'Correo enviado',
      'Hemos enviado un enlace de recuperación a tu correo electrónico.'
    );
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      {/* Botón de regreso */}
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Ionicons name="arrow-back" size={28} color="#50D8BC" />
      </TouchableOpacity>

      {/* Título */}
      <Text style={styles.title}>Recuperar contraseña</Text>

      <Text style={styles.description}>
        Ingresa el correo asociado a tu cuenta y te enviaremos un enlace para restablecer tu contraseña.
      </Text>

      {/* Input de correo */}
      <TextInput
        style={styles.input}
        placeholder="Correo electrónico"
        placeholderTextColor="#aaa"
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
      />

      {/* Botón */}
      <TouchableOpacity style={styles.recoverButton} onPress={handleRecuperar}>
        <Text style={styles.recoverText}>Enviar enlace</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 24,
    paddingTop: 80,
  },
  backButton: {
    position: 'absolute',
    top: 60,
    left: 20,
    backgroundColor: 'rgba(255,255,255,0.9)',
    borderRadius: 24,
    padding: 6,
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    color: '#333',
    textAlign: 'center',
    marginBottom: 16,
  },
  description: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    marginTop: 80,
    marginBottom: 30,
    paddingHorizontal: 10,
  },
  input: {
    backgroundColor: '#f5f5f5',
    padding: 14,
    borderRadius: 12,
    fontSize: 15,
    color: '#333',
    marginBottom: 20,
  },
  recoverButton: {
    backgroundColor: '#50D8BC',
    paddingVertical: 14,
    borderRadius: 14,
    alignItems: 'center',
  },
  recoverText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default ContraOlvidada;
