import React, { useState } from 'react';
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
import CountryPicker from 'react-native-country-picker-modal';

export default function LoginWithPhoneScreen({ navigation }) {
  const [countryCode, setCountryCode] = useState('MX');
  const [callingCode, setCallingCode] = useState('52');
  const [phone, setPhone] = useState('');

  const onSelectCountry = (country) => {
    setCountryCode(country.cca2);
    setCallingCode(country.callingCode[0]);
  };

  const fullPhone = `+${callingCode}${phone}`;

  const handleSMS = () => {
    console.log('Enviar código por SMS a:', fullPhone);
  };

  const handleWhatsApp = () => {
    console.log('Enviar código por WhatsApp a:', fullPhone);
  };

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

              <Text style={styles.subtitle}>
                Te enviaremos un código único de verificación
              </Text>

              {/* Selector de país y número */}
              <View style={styles.phoneRow}>
                <CountryPicker
                  countryCode={countryCode}
                  withFilter
                  withFlag
                  withCallingCode
                  withEmoji
                  onSelect={onSelectCountry}
                />
                <Text style={styles.callingCode}>+{callingCode}</Text>
                <TextInput
                  placeholder="Tu número"
                  keyboardType="phone-pad"
                  value={phone}
                  onChangeText={setPhone}
                  style={styles.phoneInput}
                  mode="outlined"
                  outlineColor="#50D8BC"
                  activeOutlineColor="#50D8BC"
                />
              </View>

              
              {/* Botones de envío */}
              <Button
                mode="contained"
                style={styles.smsButton}
                labelStyle={styles.loginLabel}
                onPress={handleSMS}
              >
                Recibirlo por SMS
              </Button>

              <Button
                mode="outlined"
                style={styles.whatsappButton}
                labelStyle={styles.whatsappLabel}
                onPress={handleWhatsApp}
              >
                Recibirlo por WhatsApp
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
    marginBottom: 8,
    textAlign: 'center',
    fontWeight: 'bold',
    color: '#333',
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
    marginBottom: 24,
    textAlign: 'center',
  },
  phoneRow: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    marginBottom: 16,
  },
  callingCode: {
    marginLeft: 8,
    marginRight: 4,
    fontSize: 16,
    color: '#333',
  },
  phoneInput: {
    flex: 1,
    backgroundColor: 'white',
  },
  smsButton: {
    backgroundColor: '#50D8BC',
    borderRadius: 8,
    width: '100%',
    marginBottom: 10,
  },
  whatsappButton: {
    borderColor: '#50D8BC',
    borderWidth: 2,
    borderRadius: 8,
    width: '100%',
  },
  loginLabel: {
    color: 'white',
    fontWeight: 'bold',
  },
  whatsappLabel: {
    color: '#50D8BC',
    fontWeight: 'bold',
  },
});
