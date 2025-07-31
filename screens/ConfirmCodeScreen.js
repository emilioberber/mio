import React, { useRef, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
} from 'react-native';
import { Button } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';

export default function ConfirmCodeScreen({ route, navigation }) {
  const { phone, method } = route.params;

  const codeLength = 6;
  const [code, setCode] = useState(new Array(codeLength).fill(''));
  const inputRefs = useRef([]);

  const handleChange = (text, index) => {
    if (/^\d?$/.test(text)) {
      const newCode = [...code];
      newCode[index] = text;
      setCode(newCode);

      if (text && index < codeLength - 1) {
        inputRefs.current[index + 1].focus();
      }
    }
  };

  const handleBackspace = (e, index) => {
    if (e.nativeEvent.key === 'Backspace' && !code[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  const handleSubmit = () => {
    const fullCode = code.join('');
    if (fullCode.length === codeLength) {
      console.log('Código ingresado:', fullCode);
      // Aquí verificar el código, por ahora solo navegar:
      navigation.navigate('QRScanner');
    } else {
      alert('Por favor ingresa el código completo');
    }
  };

  const handleResend = () => {
    alert(`Código reenviado por ${method}`);
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={24} color="#50D8BC" />
        </TouchableOpacity>

        <Text style={styles.title}>Ingresa el código</Text>
        <Text style={styles.subtitle}>
          Enviado por {method} al número {phone.slice(-10)}
        </Text>

        <View style={styles.codeContainer}>
          {code.map((digit, index) => (
            <TextInput
              key={index}
              ref={(ref) => (inputRefs.current[index] = ref)}
              style={styles.input}
              keyboardType="number-pad"
              maxLength={1}
              value={digit}
              onChangeText={(text) => handleChange(text, index)}
              onKeyPress={(e) => handleBackspace(e, index)}
              autoFocus={index === 0}
            />
          ))}
        </View>

        <Button
          mode="contained"
          onPress={handleSubmit}
          style={styles.button}
          labelStyle={styles.buttonLabel}
        >
          Confirmar
        </Button>

        <TouchableOpacity onPress={handleResend}>
          <Text style={styles.resend}>¿No lo recibiste? Reenviar código</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 32,
    justifyContent: 'center',
    backgroundColor: '#FFF',
  },
  backButton: {
    position: 'absolute',
    top: 80,
    left: 20,
    zIndex: 1,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 24,
    textAlign: 'center',
  },
  codeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 32,
  },
  input: {
    width: 45,
    height: 55,
    borderWidth: 2,
    borderColor: '#50D8BC',
    borderRadius: 8,
    textAlign: 'center',
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
  },
  button: {
    backgroundColor: '#50D8BC',
    borderRadius: 8,
    marginBottom: 16,
  },
  buttonLabel: {
    color: 'white',
    fontWeight: 'bold',
  },
  resend: {
    color: '#50D8BC',
    textAlign: 'center',
    fontSize: 14,
    marginTop: 12,
  },
});
