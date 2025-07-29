import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function OrderScreen({ route }) {
  const { restaurantId, table } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🍽️ Restaurante: {restaurantId}</Text>
      <Text style={styles.subtitle}>🪑 Mesa: {table}</Text>

      {/* Aquí después pondrás la lógica para mostrar los productos pedidos */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    color: "#555",
  },
});
