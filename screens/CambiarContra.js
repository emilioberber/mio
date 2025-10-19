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

const CambiarContra = ({ navigation }) => {
  const [actual, setActual] = useState('');
  const [nueva, setNueva] = useState('');
  const [confirmar, setConfirmar] = useState('');

  const handleGuardar = () => {
    if (!actual || !nueva || !confirmar) {
      Alert.alert('Error', 'Por favor completa todos los campos.');
      return;
    }
    if (nueva !== confirmar) {
      Alert.alert('Error', 'Las contraseñas no coinciden.');
      return;
    }

    // Aquí podrías agregar tu lógica de backend más adelante
    Alert.alert('Éxito', 'Tu contraseña ha sido cambiada correctamente.');
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      {/* Botón de regreso */}
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Ionicons name="arrow-back" size={28} color="#50D8BC" />
      </TouchableOpacity>

      {/* Título */}
      <Text style={styles.title}>Cambiar contraseña</Text>

      {/* Inputs */}
      <TextInput
        style={styles.input}
        placeholder="Contraseña actual"
        placeholderTextColor="#aaa"
        secureTextEntry
        value={actual}
        onChangeText={setActual}
      />
      <TextInput
        style={styles.input}
        placeholder="Nueva contraseña"
        placeholderTextColor="#aaa"
        secureTextEntry
        value={nueva}
        onChangeText={setNueva}
      />
      <TextInput
        style={styles.input}
        placeholder="Confirmar nueva contraseña"
        placeholderTextColor="#aaa"
        secureTextEntry
        value={confirmar}
        onChangeText={setConfirmar}
      />

      {/* Botón */}
      <TouchableOpacity style={styles.saveButton} onPress={handleGuardar}>
        <Text style={styles.saveText}>Guardar cambios</Text>
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
    marginBottom: 40,
  },
  input: {
    backgroundColor: '#f5f5f5',
    padding: 14,
    borderRadius: 12,
    marginBottom: 16,
    fontSize: 15,
    color: '#333',
  },
  saveButton: {
    backgroundColor: '#50D8BC',
    paddingVertical: 14,
    borderRadius: 14,
    alignItems: 'center',
    marginTop: 16,
  },
  saveText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default CambiarContra;
