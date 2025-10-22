// PagarScreen.js
import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Alert,
  LayoutAnimation,
  Platform,
  UIManager,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import visaLogo from "../assets/visa_logo.png"; // 🪪 pon tu logo aquí
import mastercardLogo from "../assets/mastercard_logo.png"; // opcional

if (Platform.OS === "android" && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

export default function PagarScreen({ navigation, route }) {
  const {
    totalToPay = 0,
    baseAmount = 0,
    tipAmount = 0,
    tipPercentage,
    currentUser,
    type,
  } = route.params || {};

  const [selectedMethod, setSelectedMethod] = useState("Visa **** 4821");
  const [showMore, setShowMore] = useState(false);

  const mioFee = baseAmount * 0.02; // 2% comisión Mío
  const finalTotal = totalToPay + mioFee;

  const handleConfirmPayment = () => {
    Alert.alert(
      "¡Pago exitoso!",
      `Has pagado $${finalTotal.toFixed(2)} con tu método ${selectedMethod}`,
      [
        {
          text: "Aceptar",
          onPress: () => navigation.navigate("OrderScreen"),
        },
      ]
    );
  };

  const toggleShowMore = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setShowMore(!showMore);
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={26} color="#50D8BC" />
        </TouchableOpacity>
        <Text style={styles.title}>Confirmar pago</Text>
      </View>

      {/* Monto principal */}
      <View style={styles.amountCard}>
        <Text style={styles.label}>Total a pagar:</Text>
        <Text style={styles.total}>${finalTotal.toFixed(2)}</Text>
        <Text style={styles.subText}>
          *Incluye propina y servicio mio (2%)
        </Text>
      </View>

      {/* Desglose */}
      <TouchableOpacity onPress={toggleShowMore} activeOpacity={0.8}>
        <View style={styles.breakdownCard}>
          <View style={styles.breakdownHeader}>
            <Text style={styles.breakdownTitle}>Ver desglose</Text>
            <Ionicons
              name={showMore ? "chevron-up" : "chevron-down"}
              size={20}
              color="#555"
            />
          </View>

          {showMore && (
            <View style={styles.breakdownContent}>
              <Text style={styles.breakdownText}>
                Subtotal: <Text style={styles.bold}>${baseAmount.toFixed(2)}</Text>
              </Text>
              <Text style={styles.breakdownText}>
                Propina ({tipPercentage === "custom" ? "personalizada" : `${tipPercentage || 0}%`}):
                <Text style={styles.bold}> ${tipAmount.toFixed(2)}</Text>
              </Text>
              <Text style={styles.breakdownText}>
                Servicio mio (2%): <Text style={styles.bold}>${mioFee.toFixed(2)}</Text>
              </Text>
            </View>
          )}
        </View>
      </TouchableOpacity>

      {/* Método de pago */}
      <View style={styles.paymentCard}>
        <Text style={styles.sectionTitle}>Método de pago</Text>

        <TouchableOpacity
          style={styles.paymentMethod}
          onPress={() => navigation.navigate("Wallet")}
          activeOpacity={0.8}
        >
          <Image source={visaLogo} style={styles.cardLogo} />
          <View style={{ flex: 1 }}>
            <Text style={styles.methodName}>{selectedMethod}</Text>
            <Text style={styles.methodSub}>Predeterminado</Text>
          </View>
          <Ionicons name="chevron-forward" size={22} color="#555" />
        </TouchableOpacity>
      </View>

      {/* Botón de pagar */}
      <TouchableOpacity
        style={styles.payButton}
        onPress={handleConfirmPayment}
        activeOpacity={0.9}
      >
        <Ionicons name="card-outline" size={20} color="#fff" />
        <Text style={styles.payButtonText}>Confirmar pago</Text>
      </TouchableOpacity>

      {/* Footer */}
      <Text style={styles.footerNote}>
        Pagos seguros con <Text style={{ color: "#50D8BC", fontWeight: "700" }}>mio</Text> 🔒
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 24,
    paddingTop: 80,
  },
  header: { flexDirection: "row", alignItems: "center", marginBottom: 30 },
  backButton: {
    position: "absolute",
    left: 0,
    top: 0,
    backgroundColor: "rgba(255,255,255,0.9)",
    borderRadius: 24,
    padding: 6,
  },
  title: {
    flex: 1,
    textAlign: "center",
    fontSize: 22,
    fontWeight: "700",
    color: "#333",
  },
  amountCard: {
    backgroundColor: "#f1f8e9",
    borderRadius: 18,
    padding: 30,
    alignItems: "center",
    marginBottom: 20,
  },
  label: { fontSize: 15, color: "#666" },
  total: { fontSize: 36, fontWeight: "800", color: "#2e7d32", marginTop: 4 },
  subText: { fontSize: 13, color: "#777", marginTop: 4 },
  breakdownCard: {
    backgroundColor: "#fafafa",
    borderRadius: 14,
    padding: 18,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "#eee",
  },
  breakdownHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  breakdownTitle: { fontSize: 15, fontWeight: "600", color: "#333" },
  breakdownContent: { marginTop: 10 },
  breakdownText: { fontSize: 14, color: "#555", marginBottom: 6 },
  bold: { fontWeight: "700" },
  paymentCard: {
    backgroundColor: "#fff",
    borderRadius: 14,
    padding: 18,
    borderWidth: 1,
    borderColor: "#eee",
    marginBottom: 30,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#333",
    marginBottom: 10,
  },
  paymentMethod: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    borderRadius: 10,
  },
  cardLogo: { width: 36, height: 24, marginRight: 10 },
  methodName: { fontSize: 15, fontWeight: "600", color: "#333" },
  methodSub: { fontSize: 12, color: "#888" },
  payButton: {
    backgroundColor: "#2e7d32",
    paddingVertical: 16,
    borderRadius: 14,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 8,
  },
  payButtonText: { color: "#fff", fontSize: 16, fontWeight: "700" },
  footerNote: {
    textAlign: "center",
    color: "#777",
    fontSize: 13,
    marginTop: 16,
  },
});
