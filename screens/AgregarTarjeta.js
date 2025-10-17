import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Keyboard,
  Animated,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const AgregarTarjeta = ({ navigation }) => {
  const [cardNumber, setCardNumber] = useState('');
  const [cardName, setCardName] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvv, setCvv] = useState('');

  const cardAnim = useRef(new Animated.Value(0)).current;
  const numberInputRef = useRef(null);

  // Mostrar teclado automáticamente
  useEffect(() => {
    const timer = setTimeout(() => {
      numberInputRef.current?.focus();
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  // Animación suave al escribir
  useEffect(() => {
    Animated.spring(cardAnim, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
  }, [cardNumber, cardName, expiry]);

  const handleAddCard = () => {
    console.log('Nueva tarjeta agregada:', { cardNumber, cardName, expiry, cvv });
    navigation.goBack();
  };

  // Formatear número de tarjeta
  const handleCardNumberChange = (text) => {
    const cleaned = text.replace(/\D/g, '').slice(0, 16);
    const formatted = cleaned.replace(/(.{4})/g, '$1 ').trim();
    setCardNumber(formatted);
  };

  // Validar formato MM/AA
  const handleExpiryChange = (text) => {
    let cleaned = text.replace(/\D/g, '');
    if (cleaned.length > 4) cleaned = cleaned.slice(0, 4);

    if (cleaned.length >= 3) {
      const month = parseInt(cleaned.slice(0, 2), 10);
      if (month < 1 || month > 12) return; // evita meses inválidos
      cleaned = `${cleaned.slice(0, 2)}/${cleaned.slice(2)}`;
    }

    setExpiry(cleaned);
  };

  // CVV solo 3 dígitos
  const handleCvvChange = (text) => {
    const cleaned = text.replace(/\D/g, '').slice(0, 3);
    setCvv(cleaned);
  };

  return (
    <View style={styles.container}>
      {/* Botón regresar */}
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Ionicons name="arrow-back" size={28} color="#50D8BC" />
      </TouchableOpacity>

      <Text style={styles.title}>Agregar Tarjeta</Text>

      {/* Tarjeta visual interactiva */}
      <Animated.View
        style={[
          styles.previewCard,
          {
            transform: [
              {
                scale: cardAnim.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0.95, 1],
                }),
              },
            ],
          },
        ]}
      >
        <Text style={styles.previewNumber}>
          {cardNumber || '**** **** **** ****'}
        </Text>
        <Text style={styles.previewName}>
          {cardName || 'NOMBRE DEL TITULAR'}
        </Text>
        <Text style={styles.previewExpiry}>
          {expiry || 'MM/AA'}
        </Text>
      </Animated.View>

      {/* Campos */}
      <TextInput
        ref={numberInputRef}
        style={styles.input}
        placeholder="Número de Tarjeta"
        keyboardType="numeric"
        value={cardNumber}
        onChangeText={handleCardNumberChange}
        maxLength={19} // 16 números + 3 espacios
      />

      <TextInput
        style={styles.input}
        placeholder="Nombre del Titular"
        value={cardName}
        onChangeText={setCardName}
        autoCapitalize="characters"
      />

      <View style={styles.row}>
        <TextInput
          style={[styles.input, styles.halfInput]}
          placeholder="MM/AA"
          keyboardType="numeric"
          value={expiry}
          onChangeText={handleExpiryChange}
          maxLength={5}
        />
        <TextInput
          style={[styles.input, styles.halfInput]}
          placeholder="CVV"
          keyboardType="numeric"
          value={cvv}
          onChangeText={handleCvvChange}
          secureTextEntry
          maxLength={3}
        />
      </View>

      <TouchableOpacity style={styles.addButton} onPress={handleAddCard}>
        <Text style={styles.addButtonText}>Guardar Tarjeta</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 70,
    paddingHorizontal: 20,
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
    fontSize: 24,
    fontWeight: '700',
    color: '#333',
    textAlign: 'center',
    marginBottom: 20,
  },
  previewCard: {
    backgroundColor: '#777979ff',
    borderRadius: 20,
    padding: 20,
    marginBottom: 30,
    shadowColor: '#000000ff',
    shadowOpacity: 0.4,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 5 },
    elevation: 5,
  },
  previewNumber: {
    color: '#fff',
    fontSize: 20,
    letterSpacing: 2,
    marginBottom: 14,
  },
  previewName: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 14,
    marginBottom: 6,
  },
  previewExpiry: {
    color: '#fff',
    fontSize: 14,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 12,
    padding: 14,
    marginBottom: 16,
    fontSize: 16,
    backgroundColor: '#fafafa',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  halfInput: {
    width: '48%',
  },
  addButton: {
    backgroundColor: '#50D8BC',
    paddingVertical: 14,
    borderRadius: 16,
    alignItems: 'center',
    marginTop: 10,
  },
  addButtonText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 16,
  },
});

export default AgregarTarjeta;
