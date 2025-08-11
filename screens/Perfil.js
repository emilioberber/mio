import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

// Componente de Avatar Animado
const AnimatedAvatar = () => {
  const [currentImage, setCurrentImage] = useState(0);

  const avatarImages = [
    require('../assets/avatar1.png'),
    require('../assets/avatar2.png'),
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prevIndex) => (prevIndex + 1) % avatarImages.length);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <View style={styles.avatarContainer}>
      <Image source={avatarImages[currentImage]} style={styles.avatar} />
    </View>
  );
};

const ProfileScreen = ({ navigation }) => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Botón de regreso */}
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Ionicons name="arrow-back" size={28} color="#50D8BC" />
      </TouchableOpacity>

      {/* Avatar dinámico */}
      <AnimatedAvatar />

      {/* Info del perfil */}
      <Text style={styles.name}>Andrea Flores</Text>
      <Text style={styles.email}>andyflo@hotmail.com</Text>
      <Text style={styles.phone}>+52 33 1747 7276</Text>


      {/* Opciones de usuario */}
      <View style={styles.options}>
        <OptionItem icon="person-outline" label="Editar perfil" />
        <OptionItem icon="settings-outline" label="Configuración" />
        <OptionItem icon="lock-closed-outline" label="Cambiar contraseña" />
        <OptionItem icon="help-circle-outline" label="Ayuda" />
        <OptionItem icon="wallet-outline" label="Agregar tarjeta a Wallet" />
        <OptionItem icon="log-out-outline" label="Cerrar sesión" />
      </View>
    </ScrollView>
  );
};

// Item de opción
const OptionItem = ({ icon, label }) => (
  <TouchableOpacity style={styles.optionItem}>
    <Ionicons name={icon} size={22} color="#50D8BC" style={{ marginRight: 12 }} />
    <Text style={styles.optionLabel}>{label}</Text>
  </TouchableOpacity>
);

// Estilos
const styles = StyleSheet.create({
  container: {
    padding: 24,
    backgroundColor: '#fff',
    flexGrow: 1,
    alignItems: 'center',
  },
  backButton: {
    position: 'absolute',
    top: 60,
    left: 20,
    zIndex: 10,
    backgroundColor: 'rgba(255,255,255,0.9)',
    borderRadius: 24,
    padding: 6,
  },
  avatarContainer: {
    marginTop: 100,
    marginBottom: 16,
    alignItems: 'center',
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#c5f0e7ff',
  },
  name: {
    fontSize: 20,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  email: {
    fontSize: 14,
    color: '#777',
  },
  phone:{
    fontSize: 12,
    color: '#777',
    marginBottom: 54,
  },
  options: {
    width: '100%',
    marginTop: 10,
  },
  optionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  optionLabel: {
    fontSize: 16,
    color: '#333',
  },
});

export default ProfileScreen;
