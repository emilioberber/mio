// OrderScreen.js
import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  FlatList,
  TouchableOpacity,
  LayoutAnimation,
  Platform,
  UIManager,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import docenaLogo from "../assets/docena_logo.png";

if (Platform.OS === "android" && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

// 🧩 Datos simulados
const initialOrder = [
  { id: "1", name: "Pepito de arrachera", qty: 2, price: 210, paidBy: ["EB"] },
  { id: "2", name: "Tostada de aguachile", qty: 1, price: 180, paidBy: [] },
  { id: "3", name: "Camote a la francesa", qty: 1, price: 150, paidBy: [] },
  { id: "4", name: "Orden de ostiones a la diabla", qty: 1, price: 250, paidBy: ["EB"] },
  { id: "5", name: "Pinguinos", qty: 12, price: 220, paidBy: ["EB", "EB"] },
];

export default function OrderScreen({ route }) {
  const { restaurantId, table, user } = route.params || {};
  const currentUser = user || { name: "Jimena Flores" };

  const initials = currentUser.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();

  const [order, setOrder] = useState(initialOrder);
  const [selectedUnits, setSelectedUnits] = useState({});
  const [expandedItem, setExpandedItem] = useState(null);

  const toggleExpand = (itemId) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setExpandedItem(expandedItem === itemId ? null : itemId);
  };

  const toggleSelectUnit = (itemId, unitIndex) => {
    setSelectedUnits((prev) => {
      const current = prev[itemId] || [];
      if (current.includes(unitIndex)) {
        return { ...prev, [itemId]: current.filter((i) => i !== unitIndex) };
      } else {
        return { ...prev, [itemId]: [...current, unitIndex] };
      }
    });
  };

  const handleSingleSelect = (itemId, item) => {
    const paidCount = item.paidBy.length;
    if (paidCount >= item.qty) return;
    setSelectedUnits((prev) => {
      const already = prev[itemId]?.includes(0);
      return already ? { ...prev, [itemId]: [] } : { ...prev, [itemId]: [0] };
    });
  };

  const handlePaySelected = () => {
    const updated = order.map((item) => {
      const selected = selectedUnits[item.id] || [];
      if (selected.length === 0) return item;

      const newPaidBy = [...item.paidBy];
      selected.forEach((unitIndex) => {
        if (!newPaidBy[unitIndex]) newPaidBy[unitIndex] = initials;
      });

      return { ...item, paidBy: newPaidBy.slice(0, item.qty) };
    });

    setOrder(updated);
    setSelectedUnits({});
  };

  const handlePayAllOfItem = (item) => {
    const selected = [];
    for (let i = 0; i < item.qty; i++) {
      if (!item.paidBy[i]) selected.push(i);
    }
    setSelectedUnits((prev) => ({ ...prev, [item.id]: selected }));
  };

  const totalAmount = order.reduce((acc, item) => acc + item.price * item.qty, 0);
  const selectedAmount = order.reduce((acc, item) => {
    const selected = selectedUnits[item.id]?.length || 0;
    return acc + item.price * selected;
  }, 0);
  const remainingAmount = order.reduce(
    (acc, item) => acc + item.price * (item.qty - item.paidBy.length),
    0
  );
  const allPaid = remainingAmount === 0;

  const countPaymentsByUser = (paidByArray) => {
    const counts = {};
    paidByArray.forEach((payer) => {
      counts[payer] = (counts[payer] || 0) + 1;
    });
    return counts;
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={order}
        keyExtractor={(item) => item.id}
        ListHeaderComponent={
          <>
            <View style={styles.header}>
              <Image source={docenaLogo} style={styles.logo} resizeMode="contain" />
              <Text style={styles.orderInfo}>Orden #1234 | Mesa {table}</Text>

              {allPaid && (
                <View style={styles.thankYouContainer}>
                  <View style={styles.checkCircle}>
                    <Ionicons name="checkmark" size={28} color="#fff" />
                  </View>
                  <Text style={styles.thankYouText}>
                    Gracias, ha pagado el total de su cuenta.{"\n"}¡Nos vemos pronto!
                  </Text>
                </View>
              )}
            </View>

            <View style={styles.card}>
              <Text style={styles.sectionTitle}>Tu pedido</Text>
            </View>
          </>
        }
        renderItem={({ item }) => {
          const paidCount = item.paidBy.length;
          const remaining = item.qty - paidCount;
          const isAllPaid = remaining === 0;
          const selected = selectedUnits[item.id] || [];
          const expanded = expandedItem === item.id;
          const hasMultiple = item.qty > 1;
          const paymentsByUser = countPaymentsByUser(item.paidBy);

          const cardBg = isAllPaid
            ? "#e8f5e9"
            : selected.length > 0
            ? "#f1f8e9"
            : "#fff";

          return (
            <TouchableOpacity
              activeOpacity={0.9}
              onPress={() =>
                hasMultiple ? toggleExpand(item.id) : handleSingleSelect(item.id, item)
              }
            >
              <View style={[styles.cardItem, { backgroundColor: cardBg }]}>
                <View style={{ flex: 1 }}>
                  <View style={styles.itemHeader}>
                    <Text style={styles.itemName}>{item.name}</Text>
                    {hasMultiple && (
                      <Ionicons
                        name={expanded ? "chevron-up" : "chevron-down"}
                        size={20}
                        color="#666"
                      />
                    )}
                  </View>

                  <Text style={styles.itemSubtitle}>
                    ${item.price} c/u × {item.qty} unidades
                  </Text>

                  <Text
                    style={[
                      styles.paidInfo,
                      { color: paidCount === 0 ? "#c62828" : "#388e3c" },
                    ]}
                  >
                    {paidCount > 0
                      ? `${paidCount} pagado${paidCount > 1 ? "s" : ""}, ${remaining} pendiente${remaining !== 1 ? "s" : ""}`
                      : "Sin pagos aún"}
                  </Text>

                  {paidCount > 0 && (
                    <View style={styles.userPaidContainer}>
                      {Object.entries(paymentsByUser).map(([payer, count]) => (
                        <View key={payer} style={styles.payerTag}>
                          <View style={[styles.avatar, { backgroundColor: "#c8e6c9" }]}>
                            <Text style={[styles.avatarText, { color: "#2e7d32" }]}>
                              {payer}
                            </Text>
                          </View>
                          <Text style={styles.paidByText}>
                            {payer === initials ? currentUser.name : "Emilio Berber"} ×{count}
                          </Text>
                        </View>
                      ))}
                    </View>
                  )}

                  {/* 🔹 Mantiene visible el contador aunque se cambie de item */}
                  {selected.length > 0 && (
                    <Text style={styles.selectedCount}>x{selected.length}</Text>
                  )}

                  {hasMultiple && expanded && (
                    <>
                      <View style={styles.bulletContainer}>
                        {Array.from({ length: item.qty }).map((_, i) => {
                          const payer = item.paidBy[i];
                          const isPaid = !!payer;
                          const isSelected = selected.includes(i);

                          return (
                            <TouchableOpacity
                              key={i}
                              style={[
                                styles.bullet,
                                isPaid && styles.bulletPaid,
                                isSelected && styles.bulletSelected,
                              ]}
                              disabled={isPaid}
                              onPress={() => toggleSelectUnit(item.id, i)}
                            >
                              {payer ? (
                                <Text style={styles.bulletInitial}>{payer}</Text>
                              ) : isSelected ? (
                                <Ionicons name="checkmark" size={14} color="#fff" />
                              ) : null}
                            </TouchableOpacity>
                          );
                        })}
                      </View>

                      {remaining > 1 && (
                        <TouchableOpacity
                          style={styles.payAllBtn}
                          onPress={() => handlePayAllOfItem(item)}
                        >
                          <Ionicons name="cash-outline" size={16} color="#2e7d32" />
                          <Text style={styles.payAllText}>
                            Seleccionar todos los productos
                          </Text>
                        </TouchableOpacity>
                      )}
                    </>
                  )}
                </View>
              </View>
            </TouchableOpacity>
          );
        }}
        ListFooterComponent={
          <>
            <View style={styles.summary}>
              <Text style={styles.summaryText}>
                Total de la cuenta: <Text style={styles.bold}>${totalAmount}</Text>
              </Text>
              <Text style={styles.summaryText}>
                Tu selección: <Text style={styles.bold}>${selectedAmount}</Text>
              </Text>
              <Text style={[styles.summaryText, { color: "#c62828" }]}>
                Aún falta por pagar: <Text style={styles.bold}>${remainingAmount}</Text>
              </Text>
            </View>

            <View style={styles.actions}>
              <TouchableOpacity
                style={[styles.btnPrimary, { opacity: selectedAmount === 0 ? 0.5 : 1 }]}
                disabled={selectedAmount === 0}
                onPress={handlePaySelected}
              >
                <Text style={styles.btnText}>Pagar productos seleccionados</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.btnSecondary}>
                <Text style={styles.btnText}>Pagar total</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.btnOutline}>
                <Text style={styles.btnOutlineText}>Dividir entre comensales</Text>
              </TouchableOpacity>
            </View>
          </>
        }
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 80 }}
      />
    </View>
  );
}

// 🎨 Estilos
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F8F9FA", paddingHorizontal: 20 },
  header: { alignItems: "center", marginTop: 80, marginBottom: 20 },
  logo: { width: 120, height: 120, marginBottom: 10 },
  orderInfo: { fontSize: 12, fontWeight: "600", color: "#333" },
  thankYouContainer: { alignItems: "center", marginVertical: 20 },
  checkCircle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#2e7d32",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
  },
  thankYouText: {
    textAlign: "center",
    color: "#2e7d32",
    fontWeight: "600",
    fontSize: 14,
    lineHeight: 20,
  },
  card: { marginBottom: 10 },
  sectionTitle: { fontSize: 20, fontWeight: "700", color: "#222" },
  cardItem: {
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 2,
    position: "relative",
  },
  itemHeader: { flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
  itemName: { fontSize: 16, fontWeight: "600", color: "#333" },
  itemSubtitle: { fontSize: 14, color: "#777", marginTop: 2 },
  paidInfo: { fontSize: 13, marginTop: 4, fontStyle: "italic" },
  userPaidContainer: { flexDirection: "row", flexWrap: "wrap", marginTop: 8, gap: 8 },
  payerTag: { flexDirection: "row", alignItems: "center", gap: 4 },
  avatar: {
    width: 24,
    height: 24,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  avatarText: { fontWeight: "700", fontSize: 10 },
  paidByText: { fontSize: 13, color: "#388e3c" },
  bulletContainer: { flexDirection: "row", marginTop: 10, gap: 8, flexWrap: "wrap" },
  bullet: {
    width: 30,
    height: 30,
    borderRadius: 15,
    borderWidth: 2,
    borderColor: "#ccc",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
  },
  bulletSelected: { backgroundColor: "#2e7d32", borderColor: "#2e7d32" },
  bulletPaid: { backgroundColor: "#c8e6c9", borderColor: "#388e3c" },
  bulletInitial: { fontSize: 10, color: "#2e7d32", fontWeight: "700" },
  selectedCount: {
    position: "absolute",
    bottom: 10,
    right: 16,
    backgroundColor: "#2e7d32",
    color: "#fff",
    fontSize: 12,
    fontWeight: "700",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 10,
  },
  payAllBtn: {
    marginTop: 10,
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    borderColor: "#2e7d32",
    borderWidth: 1,
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 10,
    alignSelf: "flex-start",
    backgroundColor: "#fff",
  },
  payAllText: { color: "#2e7d32", fontWeight: "600", fontSize: 13 },
  summary: { alignItems: "center", marginTop: 20, marginBottom: 20 },
  summaryText: { fontSize: 16, color: "#444", marginVertical: 2 },
  bold: { fontWeight: "700" },
  actions: { marginBottom: 10 },
  btnPrimary: {
    backgroundColor: "#2e7d32",
    padding: 15,
    borderRadius: 12,
    alignItems: "center",
    marginBottom: 12,
  },
  btnSecondary: {
    backgroundColor: "#1e88e5",
    padding: 15,
    borderRadius: 12,
    alignItems: "center",
    marginBottom: 12,
  },
  btnOutline: {
    borderColor: "#555",
    borderWidth: 1.5,
    padding: 15,
    borderRadius: 12,
    alignItems: "center",
  },
  btnText: { color: "#fff", fontWeight: "600", fontSize: 16 },
  btnOutlineText: { color: "#333", fontWeight: "600", fontSize: 16 },
});
