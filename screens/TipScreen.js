// TipScreen.js
import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function TipScreen({ navigation, route }) {
  const { type, amount, remainingAmount, currentUser, splitType, splitInput } = route.params || {};

  const [selectedTip, setSelectedTip] = useState(null);
  const [customTip, setCustomTip] = useState("");

  const baseAmount = parseFloat(amount || 0);
  const tipPercentage = selectedTip ? selectedTip / 100 : 0;

  const tipAmount = customTip
    ? parseFloat(customTip) || 0
    : baseAmount * tipPercentage;

  const totalToPay = baseAmount + tipAmount;

  const handleContinue = () => {
    navigation.navigate("PagarScreen", {
      totalToPay,
      baseAmount,
      tipAmount,
      tipPercentage: selectedTip || (customTip ? "custom" : 0),
      currentUser,
      type,
      splitType,
      splitInput,
    });
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      style={styles.container}
    >
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={26} color="#50D8BC" />
        </TouchableOpacity>
        <Text style={styles.title}>Propina</Text>
      </View>

      {/* Info */}
      <View style={styles.card}>
        <Text style={styles.subtitle}>Total:</Text>
        <Text style={styles.amount}>${baseAmount.toFixed(2)}</Text>

        {type === "split" && (
          <Text style={styles.splitInfo}>
            División por {splitType === "people" ? `${splitInput} persona(s)` : `$${splitInput}`}
          </Text>
        )}
      </View>

      {/* Tip options */}
      <Text style={styles.sectionTitle}>Elige un porcentaje de propina</Text>
      <View style={styles.tipOptions}>
        {[0, 10, 15, 20].map((percent) => (
          <TouchableOpacity
            key={percent}
            style={[
              styles.tipButton,
              selectedTip === percent && styles.tipButtonSelected,
            ]}
            onPress={() => {
              setSelectedTip(percent);
              setCustomTip("");
            }}
          >
            <Text
              style={[
                styles.tipButtonText,
                selectedTip === percent && styles.tipButtonTextSelected,
              ]}
            >
              {percent}%
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Custom tip input */}
      <View style={styles.customTipContainer}>
        <Text style={styles.customTipLabel}>O ingresa un monto personalizado (MXN)</Text>
        <TextInput
          style={styles.input}
          placeholder="$ 0.00"
          placeholderTextColor="#aaa"
          keyboardType="numeric"
          value={customTip}
          onChangeText={(value) => {
            setCustomTip(value);
            setSelectedTip(null);
          }}
          returnKeyType="done"
          onSubmitEditing={() => Keyboard.dismiss()}
        />
      </View>

      {/* Summary */}
      <View style={styles.summaryCard}>
        <Text style={styles.summaryText}>
          Propina: <Text style={styles.bold}>${tipAmount.toFixed(2)}</Text>
        </Text>
        <Text style={styles.summaryText}>
          Total a pagar:{" "}
          <Text style={[styles.bold, { color: "#2e7d32" }]}>
            ${totalToPay.toFixed(2)}
          </Text>
        </Text>
      </View>

      {/* Continue button */}
      <TouchableOpacity
        style={styles.continueButton}
        onPress={handleContinue}
        activeOpacity={0.9}
      >
        <Text style={styles.continueText}>Continuar con el pago 💳</Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", paddingHorizontal: 24, paddingTop: 80 },
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
  card: {
    backgroundColor: "#f9f9f9",
    padding: 20,
    borderRadius: 16,
    alignItems: "center",
    marginBottom: 20,
  },
  subtitle: { fontSize: 15, color: "#555" },
  amount: { fontSize: 28, fontWeight: "700", color: "#2e7d32", marginTop: 4 },
  splitInfo: { fontSize: 13, color: "#666", marginTop: 6, fontStyle: "italic" },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
    marginBottom: 12,
  },
  tipOptions: { flexDirection: "row", justifyContent: "space-between", marginBottom: 20 },
  tipButton: {
    flex: 1,
    borderWidth: 1.5,
    borderColor: "#50D8BC",
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: "center",
    marginHorizontal: 4,
  },
  tipButtonSelected: { backgroundColor: "#50D8BC" },
  tipButtonText: { fontSize: 16, fontWeight: "600", color: "#50D8BC" },
  tipButtonTextSelected: { color: "#fff" },
  customTipContainer: { marginBottom: 30 },
  customTipLabel: { fontSize: 14, color: "#666", marginBottom: 8 },
  input: {
    backgroundColor: "#f5f5f5",
    borderRadius: 12,
    padding: 14,
    fontSize: 15,
    color: "#333",
  },
  summaryCard: {
    backgroundColor: "#f1f8e9",
    borderRadius: 16,
    padding: 20,
    alignItems: "center",
    marginBottom: 30,
  },
  summaryText: { fontSize: 16, color: "#333", marginBottom: 4 },
  bold: { fontWeight: "700" },
  continueButton: {
    backgroundColor: "#2e7d32",
    borderRadius: 14,
    paddingVertical: 16,
    alignItems: "center",
    marginBottom: 20,
  },
  continueText: { color: "#fff", fontWeight: "700", fontSize: 16 },
});
