import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  FlatList,
  Image 
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const applePayLogo = require('../assets/apple-pay.png');
const paypalLogo = require('../assets/paypal.png');

const dummyCards = [
  {
    id: '1',
    cardType: 'Visa',
    cardNumber: '**** **** **** 1234',
    expiry: '12/24',
    bgColor: '#50D8BC',
  },
  {
    id: '2',
    cardType: 'Mastercard',
    cardNumber: '**** **** **** 5678',
    expiry: '11/25',
    bgColor: '#3478F6',
  },
];

const dummyTransactions = [
  {
    id: '1',
    title: 'Docena',
    date: '27 Jul 2025',
    amount: '- $1,054.40',
  },
  {
    id: '2',
    title: 'Wings Army',
    date: '25 Jul 2025',
    amount: '- $500.00',
  },
  {
    id: '3',
    title: 'Sereno',
    date: '23 Jul 2025',
    amount: '- $1,300.99',
  },
  
];

const WalletScreen = ({ navigation }) => {
  const renderCard = ({ item }) => (
    <View style={[styles.card, { backgroundColor: item.bgColor }]}>
      <Text style={styles.cardType}>{item.cardType}</Text>
      <Text style={styles.cardNumber}>{item.cardNumber}</Text>
      <View style={styles.cardFooter}>
        <Text style={styles.expiry}>Exp: {item.expiry}</Text>
        <Text style={styles.balance}>{item.balance}</Text>
      </View>
    </View>
  );

  const renderTransaction = ({ item }) => (
    <View style={styles.transaction}>
      <View>
        <Text style={styles.transactionTitle}>{item.title}</Text>
        <Text style={styles.transactionDate}>{item.date}</Text>
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

      
      {/* Balance */}
      <View style={styles.balanceContainer}>
      </View>

      {/* Cards */}
      <Text style={styles.sectionTitle}>Mis Tarjetas</Text>
      <FlatList
        data={[...dummyCards, { id: 'add-card' }]}
        horizontal
        keyExtractor={(item) => item.id}
        renderItem={({ item }) =>
            item.id === 'add-card' ? (
            <TouchableOpacity
                style={styles.addCardButton}
                onPress={() => {
                // Aquí va la lógica para agregar una tarjeta
                console.log('Agregar nueva tarjeta');
                }}
            >
                <Ionicons name="add" size={28} color="#50D8BC" />
                <Text style={styles.addCardText}>Agregar Tarjeta</Text>
            </TouchableOpacity>
            ) : (
            renderCard({ item })
            )
        }
        showsHorizontalScrollIndicator={false}
        style={{ marginBottom: 24 }}
        contentContainerStyle={{ paddingLeft: 20, paddingRight: 10 }}
        />

      <View style={styles.paymentButtonsContainer}>
            <TouchableOpacity style={styles.paymentButton} onPress={() => {console.log('Pagar con Apple Pay')}}>
                <Image source={applePayLogo} style={styles.paymentLogo} resizeMode="contain" />
                <Text style={styles.paymentText}>Pagar con Apple Pay</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.paymentButton}  onPress={() => {console.log('Pagar con PayPal')}}>
                <Image source={paypalLogo} style={styles.paymentLogo} resizeMode="contain"/>
                <Text style={styles.paymentText}>Pagar con PayPal</Text>
            </TouchableOpacity>
        </View>


      {/* Transactions */}
      <Text style={styles.sectionTitle}>Movimientos Pasados</Text>
      <FlatList
        data={dummyTransactions}
        keyExtractor={(item) => item.id}
        renderItem={renderTransaction}
        contentContainerStyle={{ paddingHorizontal: 20 }}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 70,
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
  balanceContainer: {
    alignItems: 'center',
    marginBottom: 50,
  },
  balanceLabel: {
    fontSize: 16,
    color: '#777',
    marginBottom: 6,
  },
  balanceAmount: {
    fontSize: 36,
    fontWeight: '800',
    color: '#50D8BC',
  },
  sectionTitle: {
    fontSize: 18,
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
  },
  expiry: {
    color: '#fff',
    fontSize: 14,
  },
  balance: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 18,
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
    fontSize: 16,
    color: '#333',
    fontWeight: '600',
  },
  transactionDate: {
    fontSize: 12,
    color: '#999',
    marginTop: 4,
  },
  transactionAmount: {
    fontSize: 16,
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
  marginBottom: 50,
  paddingHorizontal: 50,
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
