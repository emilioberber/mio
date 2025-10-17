import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

// 🟢 Componente del avatar animado
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
  // 🟡 Función para confirmar el cierre de sesión
  const handleLogout = () => {
    Alert.alert(
      'Cerrar sesión',
      '¿Seguro que quieres cerrar sesión?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Continuar',
          style: 'destructive',
          onPress: () => navigation.navigate('AuthScreen'),
        },
      ],
      { cancelable: true }
    );
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* 🔙 Botón de regreso */}
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Ionicons name="arrow-back" size={28} color="#50D8BC" />
      </TouchableOpacity>

      {/* 🧍 Avatar animado */}
      <AnimatedAvatar />

      {/* 🪪 Información del usuario */}
      <Text style={styles.name}>Jimena Flores</Text>
      <Text style={styles.email}>jimefloress@gmail.com</Text>
      <Text style={styles.phone}>+52 33 1747 7276</Text>

      {/* ⚙️ Opciones del usuario */}
      <View style={styles.options}>
        {/* 1️⃣ Editar perfil */}
        <OptionItem
          icon="person-outline"
          label="Editar perfil"
          onPress={() => navigation.navigate('EditarPerfil')}
        />

        {/* 2️⃣ Configuración */}
        <OptionItem
          icon="settings-outline"
          label="Configuración"
          onPress={() => navigation.navigate('Configuraciones')}
        />

        {/* 3️⃣ Cambiar contraseña */}
        <OptionItem
          icon="lock-closed-outline"
          label="Cambiar contraseña"
          onPress={() => navigation.navigate('CambiarContra')}
        />

        {/* 4️⃣ Ayuda */}
        <OptionItem
          icon="help-circle-outline"
          label="Ayuda"
          onPress={() => navigation.navigate('Ayuda')}
        />

        {/* 5️⃣ Wallet */}
        <OptionItem
          icon="wallet-outline"
          label="Ir a Wallet"
          onPress={() => navigation.navigate('Wallet')}
        />

        {/* 6️⃣ Cerrar sesión */}
        <OptionItem
          icon="log-out-outline"
          label="Cerrar sesión"
          onPress={handleLogout}
        />
      </View>
    </ScrollView>
  );
};

// 🔸 Componente para cada opción del menú
const OptionItem = ({ icon, label, onPress }) => (
  <TouchableOpacity style={styles.optionItem} onPress={onPress}>
    <Ionicons name={icon} size={22} color="#50D8BC" style={{ marginRight: 12 }} />
    <Text style={styles.optionLabel}>{label}</Text>
  </TouchableOpacity>
);

// 🎨 Estilos
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
  phone: {
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
