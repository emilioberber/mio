import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Switch,
  Alert,
  ScrollView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const Configuraciones = ({ navigation }) => {
  const [isSpanish, setIsSpanish] = useState(true);
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [darkMode, setDarkMode] = useState(false);

  const toggleLanguage = () => setIsSpanish(!isSpanish);
  const toggleNotifications = () => setNotificationsEnabled(!notificationsEnabled);
  const toggleDarkMode = () => setDarkMode(!darkMode);

  const handleDeleteAccount = () => {
    Alert.alert(
      'Eliminar cuenta',
      '¿Estás seguro de que quieres eliminar tu cuenta? Esta acción no se puede deshacer.',
      [
        { text: 'Cancelar', style: 'cancel' },
        { text: 'Eliminar', onPress: () => console.log('Cuenta eliminada'), style: 'destructive' },
      ]
    );
  };

  const handleLogout = () => {
    Alert.alert(
      'Cerrar sesión',
      '¿Seguro que quieres cerrar sesión?',
      [
        { text: 'Cancelar', style: 'cancel' },
        { text: 'Continuar', onPress: () => navigation.navigate('AuthScreen') },
      ]
    );
  };

  return (
    <View style={styles.container}>
      {/* Botón de regreso */}
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Ionicons name="arrow-back" size={28} color="#50D8BC" />
      </TouchableOpacity>

      {/* Título */}
      <Text style={styles.title}>Configuraciones</Text>

      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {/* Sección de Preferencias */}
        <Text style={styles.sectionTitle}>Preferencias</Text>

        {/* Cambiar idioma */}
        <View style={styles.option}>
          <View style={styles.optionLeft}>
            <Ionicons name="language-outline" size={22} color="#50D8BC" style={styles.icon} />
            <Text style={styles.optionText}>Idioma</Text>
          </View>
          <TouchableOpacity onPress={toggleLanguage}>
            <Text style={styles.valueText}>{isSpanish ? 'Español' : 'Inglés'}</Text>
          </TouchableOpacity>
        </View>

        {/* Notificaciones */}
        <View style={styles.option}>
          <View style={styles.optionLeft}>
            <Ionicons name="notifications-outline" size={22} color="#50D8BC" style={styles.icon} />
            <Text style={styles.optionText}>Notificaciones</Text>
          </View>
          <Switch
            value={notificationsEnabled}
            onValueChange={toggleNotifications}
            trackColor={{ false: '#ccc', true: '#50D8BC' }}
            thumbColor="#fff"
          />
        </View>

        {/* Modo oscuro */}
        <View style={styles.option}>
          <View style={styles.optionLeft}>
            <Ionicons name="moon-outline" size={22} color="#50D8BC" style={styles.icon} />
            <Text style={styles.optionText}>Modo oscuro</Text>
          </View>
          <Switch
            value={darkMode}
            onValueChange={toggleDarkMode}
            trackColor={{ false: '#ccc', true: '#50D8BC' }}
            thumbColor="#fff"
          />
        </View>

        {/* Sección de Seguridad */}
        <Text style={styles.sectionTitle}>Seguridad</Text>

        {/* Borrar cuenta */}
        <TouchableOpacity style={styles.option} onPress={handleDeleteAccount}>
          <View style={styles.optionLeft}>
            <Ionicons name="trash-outline" size={22} color="#FF4D4D" style={styles.icon} />
            <Text style={[styles.optionText, { color: '#FF4D4D' }]}>Borrar cuenta</Text>
          </View>
        </TouchableOpacity>

        {/* Cerrar sesión */}
        <TouchableOpacity style={styles.option} onPress={handleLogout}>
          <View style={styles.optionLeft}>
            <Ionicons name="log-out-outline" size={22} color="#50D8BC" style={styles.icon} />
            <Text style={[styles.optionText, { color: '#50D8BC' }]}>Cerrar sesión</Text>
          </View>
        </TouchableOpacity>

        {/* Política de Privacidad */}
        <TouchableOpacity style={styles.option} onPress={() => console.log('Ir a Privacidad')}>
          <View style={styles.optionLeft}>
            <Ionicons name="document-text-outline" size={22} color="#50D8BC" style={styles.icon} />
            <Text style={styles.optionText}>Política de Privacidad</Text>
          </View>
        </TouchableOpacity>

        {/* Ayuda */}
        <TouchableOpacity style={styles.option} onPress={() => navigation.navigate('Ayuda')}>
          <View style={styles.optionLeft}>
            <Ionicons name="help-circle-outline" size={22} color="#50D8BC" style={styles.icon} />
            <Text style={styles.optionText}>Centro de ayuda</Text>
          </View>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

// Estilos
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 70,
  },
  scrollContainer: {
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  backButton: {
    position: 'absolute',
    top: 60,
    left: 20,
    backgroundColor: 'rgba(255,255,255,0.9)',
    borderRadius: 24,
    padding: 6,
    zIndex: 10,
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    color: '#333',
    textAlign: 'center',
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#333',
    marginBottom: 10,
    marginTop: 20,
  },
  option: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  optionLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    marginRight: 12,
  },
  optionText: {
    fontSize: 15,
    color: '#333',
  },
  valueText: {
    fontSize: 15,
    color: '#50D8BC',
    fontWeight: '600',
  },
});

export default Configuraciones;
