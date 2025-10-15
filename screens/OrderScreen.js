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

// 🟢 Habilitar animaciones en Android
if (Platform.OS === "android" && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

// 🧩 Datos de ejemplo
const initialOrder = [
  { id: "1", name: "Pepito de arrachera", qty: 2, price: 120, paidBy: ["EB"] },
  { id: "2", name: "Papas a la francesa", qty: 1, price: 80, paidBy: [] },
  { id: "3", name: "Media orden de ostiones", qty: 1, price: 150, paidBy: ["EB"] },
  { id: "4", name: "Cerveza artesanal", qty: 12, price: 60, paidBy: ["EB", "EB"] },
];

// 🧍 Usuario actual
const currentUser = { name: "Andrea Flores", initials: "AF" };

export default function OrderScreen({ route }) {
  const { restaurantId, table } = route.params || {};
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
        if (!newPaidBy[unitIndex]) newPaidBy[unitIndex] = currentUser.initials;
      });

      return { ...item, paidBy: newPaidBy.slice(0, item.qty) };
    });

    setOrder(updated);
    setSelectedUnits({});
  };

  const handlePayAllOfItem = (item) => {
    const newPaidBy = Array(item.qty).fill(currentUser.initials);
    const updated = order.map((i) =>
      i.id === item.id ? { ...i, paidBy: newPaidBy } : i
    );
    setOrder(updated);
    setExpandedItem(null);
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
            </View>

            <View style={styles.card}>
              <Text style={styles.sectionTitle}>Tu pedido</Text>
            </View>
          </>
        }
        renderItem={({ item }) => {
          const paidCount = item.paidBy.length;
          const remaining = item.qty - paidCount;
          const allPaid = remaining === 0;
          const selected = selectedUnits[item.id] || [];
          const expanded = expandedItem === item.id;
          const hasMultiple = item.qty > 1;

          const cardBg = allPaid
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
              disabled={allPaid}
            >
              <View
                style={[
                  styles.cardItem,
                  { backgroundColor: cardBg },
                  allPaid && { opacity: 0.6 },
                ]}
              >
                <View style={{ flex: 1 }}>
                  <View style={styles.itemHeader}>
                    <Text style={styles.itemName}>{item.name}</Text>
                    {hasMultiple && !allPaid && (
                      <Ionicons
                        name={expanded ? "chevron-up" : "chevron-down"}
                        size={20}
                        color="#666"
                      />
                    )}
                  </View>

                  <Text style={styles.itemSubtitle}>
                    ${item.price} × {item.qty} unidades
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

                  {!hasMultiple && paidCount > 0 && (
                    <View style={styles.userPaidContainer}>
                      <View style={[styles.avatar, { backgroundColor: "#81c784" }]}>
                        <Text style={styles.avatarText}>
                          {item.paidBy[0] || "?"}
                        </Text>
                      </View>
                      <Text style={styles.paidByText}>
                        Pagado por{" "}
                        {item.paidBy[0] === "AF"
                          ? "Andrea Flores"
                          : "Emilio Berber"}
                      </Text>
                    </View>
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
                              disabled={isPaid || allPaid}
                              onPress={() => toggleSelectUnit(item.id, i)}
                            >
                              {payer ? (
                                <Text
                                  style={[
                                    styles.bulletInitial,
                                    { color: payer === "AF" ? "#fff" : "#2e7d32" },
                                  ]}
                                >
                                  {payer}
                                </Text>
                              ) : isSelected ? (
                                <Ionicons name="checkmark" size={14} color="#fff" />
                              ) : null}
                            </TouchableOpacity>
                          );
                        })}
                      </View>

                      {/* 👇 Solo mostrar el botón “Pagar todos” si quedan más de 1 pendientes */}
                      {!allPaid && remaining > 1 && (
                        <TouchableOpacity
                          style={styles.payAllBtn}
                          onPress={() => handlePayAllOfItem(item)}
                        >
                          <Text style={styles.payAllText}>
                            Pagar todos los {item.name.toLowerCase()}
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
                Aún falta por pagar:{" "}
                <Text style={styles.bold}>${remainingAmount}</Text>
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
                <Text style={styles.btnOutlineText}>
                  Dividir entre comensales
                </Text>
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

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F8F9FA", paddingHorizontal: 20 },
  header: { alignItems: "center", marginTop: 80, marginBottom: 20 },
  logo: { width: 120, height: 120, marginBottom: 10 },
  orderInfo: { fontSize: 12, fontWeight: "600", color: "#333" },
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
  },
  itemHeader: { flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
  itemName: { fontSize: 16, fontWeight: "600", color: "#333" },
  itemSubtitle: { fontSize: 14, color: "#777", marginTop: 2 },
  paidInfo: { fontSize: 13, marginTop: 4, fontStyle: "italic" },
  userPaidContainer: { flexDirection: "row", alignItems: "center", marginTop: 6, gap: 6 },
  avatar: {
    width: 26,
    height: 26,
    borderRadius: 13,
    alignItems: "center",
    justifyContent: "center",
  },
  avatarText: { fontWeight: "700", color: "#fff", fontSize: 12 },
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
  bulletInitial: { fontSize: 10, fontWeight: "700" },
  payAllBtn: {
    marginTop: 10,
    backgroundColor: "#6cb3f1ff",
    paddingVertical: 10,
    borderRadius: 10,
    alignItems: "center",
  },
  payAllText: { color: "#fff", fontWeight: "600", fontSize: 14 },
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
