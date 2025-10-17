import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Image,
  ScrollView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const applePayLogo = require('../assets/apple-pay.png');
const paypalLogo = require('../assets/paypal.png');

const initialCards = [
  {
    id: '1',
    cardType: 'Visa',
    cardNumber: '**** **** **** 3221',
    expiry: '12/29',
    bgColor: '#50D8BC',
  },
  {
    id: '2',
    cardType: 'Mastercard',
    cardNumber: '**** **** **** 5678',
    expiry: '11/27',
    bgColor: '#3478F6',
  },
  {
    id: '3',
    cardType: 'American Express',
    cardNumber: '**** **** **** 9821',
    expiry: '10/30',
    bgColor: '#2C2C2C',
  },
];

const dummyTransactions = [
  {
    id: '1',
    title: 'Docena',
    date: '15 Oct 2025',
    amount: '- $1,054.00',
    cardUsed: 'Visa **** 3221',
  },
  {
    id: '2',
    title: 'Docena',
    date: '10 Sep 2025',
    amount: '- $3,500.00',
    cardUsed: 'Mastercard **** 5678',
  },
  {
    id: '3',
    title: 'Gastón',
    date: '23 Jul 2025',
    amount: '- $1,300.99',
    cardUsed: 'American Express **** 9821',
  },
  {
    id: '4',
    title: 'Docena',
    date: '21 Ago 2025',
    amount: '- $1300.00',
    cardUsed: 'Visa **** 3221',
  },
];

const WalletScreen = ({ navigation }) => {
  const [cards, setCards] = useState(initialCards);
  const [defaultMethod, setDefaultMethod] = useState('card'); // 'card' | 'apple' | 'paypal'

  const setAsDefault = (selectedCard) => {
    const reordered = [selectedCard, ...cards.filter((c) => c.id !== selectedCard.id)];
    setCards(reordered);
    setDefaultMethod('card');
  };

  const selectApplePay = () => setDefaultMethod('apple');
  const selectPayPal = () => setDefaultMethod('paypal');

  const renderCard = ({ item, index }) => (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={() => setAsDefault(item)}
      style={[styles.card, { backgroundColor: item.bgColor }]}
    >
      <Text style={styles.cardType}>{item.cardType}</Text>
      <Text style={styles.cardNumber}>{item.cardNumber}</Text>

      <View style={styles.cardFooter}>
        <Text style={styles.expiry}>Exp: {item.expiry}</Text>
        {defaultMethod === 'card' && index === 0 && (
          <View style={styles.defaultBadge}>
            <Text style={styles.defaultBadgeText}>Predeterminada</Text>
          </View>
        )}
      </View>
    </TouchableOpacity>
  );

  const renderTransaction = ({ item }) => (
    <View style={styles.transaction}>
      <View>
        <Text style={styles.transactionTitle}>{item.title}</Text>
        <Text style={styles.transactionDate}>{item.date}</Text>
        <Text style={styles.transactionCard}>{item.cardUsed}</Text>
      </View>
      <Text
        style={[
          styles.transactionAmount,
          item.amount.startsWith('+') ? styles.income : styles.expense,
        ]}
      >
        {item.amount}
      </Text>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Back button */}
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      >
        <Ionicons name="arrow-back" size={28} color="#50D8BC" />
      </TouchableOpacity>

      {/* Title */}
      <Text style={styles.title}>Wallet</Text>

      <ScrollView
        style={styles.scrollContainer}
        contentContainerStyle={{ paddingBottom: 80 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Cards */}
        <Text style={styles.sectionTitle}>Mis Tarjetas</Text>
        <FlatList
          data={[...cards, { id: 'add-card' }]}
          horizontal
          keyExtractor={(item) => item.id}
          renderItem={({ item, index }) =>
            item.id === 'add-card' ? (
              <TouchableOpacity
                style={styles.addCardButton}
                onPress={() => navigation.navigate('AgregarTarjeta')}
              >
                <Ionicons name="add" size={28} color="#50D8BC" />
                <Text style={styles.addCardText}>Agregar Tarjeta</Text>
              </TouchableOpacity>
            ) : (
              renderCard({ item, index })
            )
          }
          showsHorizontalScrollIndicator={false}
          style={{ marginBottom: 24 }}
          contentContainerStyle={{ paddingLeft: 20, paddingRight: 10 }}
        />

        {/* Payment Buttons */}
        <View style={styles.paymentButtonsContainer}>
          <TouchableOpacity
            style={[
              styles.paymentButton,
              defaultMethod === 'apple' && styles.selectedPaymentButton,
            ]}
            onPress={selectApplePay}
          >
            <Image source={applePayLogo} style={styles.paymentLogo} resizeMode="contain" />
            <View>
              <Text style={styles.paymentText}>Pagar con Apple Pay</Text>
              {defaultMethod === 'apple' && (
                <Text style={styles.defaultMethodText}>Predeterminada</Text>
              )}
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.paymentButton,
              defaultMethod === 'paypal' && styles.selectedPaymentButton,
            ]}
            onPress={selectPayPal}
          >
            <Image source={paypalLogo} style={styles.paymentLogo} resizeMode="contain" />
            <View>
              <Text style={styles.paymentText}>Pagar con PayPal</Text>
              {defaultMethod === 'paypal' && (
                <Text style={styles.defaultMethodText}>Predeterminada</Text>
              )}
            </View>
          </TouchableOpacity>
        </View>

        {/* Transactions */}
        <Text style={styles.sectionTitle}>Movimientos Pasados</Text>

        <FlatList
          data={dummyTransactions}
          keyExtractor={(item) => item.id}
          renderItem={renderTransaction}
          contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 20 }}
          showsVerticalScrollIndicator={false}
          scrollEnabled={false}
        />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 70,
  },
  scrollContainer: {
    flex: 1,
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
    fontSize: 25,
    fontWeight: '700',
    color: '#333',
    textAlign: 'center',
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#333',
    paddingHorizontal: 20,
    marginBottom: 16,
  },
  card: {
    width: 280,
    height: 160,
    borderRadius: 20,
    padding: 24,
    marginRight: 20,
    justifyContent: 'space-between',
    shadowColor: '#50D8BC',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  cardType: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 18,
  },
  cardNumber: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 18,
    letterSpacing: 4,
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  expiry: {
    color: '#fff',
    fontSize: 14,
  },
  defaultBadge: {
    backgroundColor: '#fff',
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 10,
  },
  defaultBadgeText: {
    color: '#333',
    fontWeight: '700',
    fontSize: 12,
  },
  transaction: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 18,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    paddingBottom: 12,
  },
  transactionTitle: {
    fontSize: 13,
    color: '#333',
    fontWeight: '600',
  },
  transactionDate: {
    fontSize: 12,
    color: '#999',
    marginTop: 4,
  },
  transactionCard: {
    fontSize: 10,
    color: '#777',
    marginTop: 2,
  },
  transactionAmount: {
    fontSize: 14,
    fontWeight: '700',
    alignSelf: 'center',
  },
  income: {
    color: '#50D8BC',
  },
  expense: {
    color: '#FF4D4D',
  },
  paymentButtonsContainer: {
    justifyContent: 'space-around',
    marginTop: 20,
    marginBottom: 60,
    flexDirection: 'column',
    gap: 19,
    paddingHorizontal: 20,
  },
  paymentButton: {
    flexDirection: 'row',
    gap: 12,
    alignItems: 'center',
    backgroundColor: '#ebebebff',
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 14,
    shadowColor: '#ccc',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.7,
    shadowRadius: 4,
    elevation: 3,
  },
  selectedPaymentButton: {
    borderColor: '#50D8BC',
    borderWidth: 2,
    backgroundColor: '#dcf9f3',
  },
  paymentLogo: {
    width: 28,
    height: 28,
    marginRight: 10,
  },
  paymentText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
  },
  defaultMethodText: {
    fontSize: 12,
    color: '#50D8BC',
    fontWeight: '700',
    marginTop: 2,
  },
  addCardButton: {
    width: 160,
    height: 160,
    borderRadius: 20,
    borderWidth: 1.5,
    borderColor: '#e0e0e0',
    borderStyle: 'dashed',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 20,
    backgroundColor: '#fff',
    shadowColor: '#ccc',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 2,
  },
  addCardText: {
    marginTop: 8,
    fontSize: 14,
    fontWeight: '600',
    color: '#50D8BC',
  },
});

export default WalletScreen;
