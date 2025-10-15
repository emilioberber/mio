// RESTAURANTES EN LOS QUE EL USUARI0 YA VISITÓ 

import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  FlatList,
  ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

// Dummy Data
const visitedRestaurants = [
  { id: "1", name: "La Docena", logo: require("../assets/docena_logo.png") },
  { id: "2", name: "Gaston", logo: require("../assets/gaston_logo.png") },
];

const allRestaurants = [
  { id: "1", name: "La Docena", logo: require("../assets/docena_logo.png") },
  { id: "2", name: "Gaston", logo: require("../assets/gaston_logo.png") },
  { id: "3", name: "Meridiano", logo: require("../assets/meridiano_logo.png") },
  { id: "4", name: "El Habanero Negro", logo: require("../assets/habaneronegro_logo.png") },
];

const Restaurantes = () => {
  const navigation = useNavigation();

  const renderRestaurantCard = ({ item }) => (
    <TouchableOpacity style={styles.restaurantCard}>
      <Image source={item.logo} style={styles.restaurantLogo} />
      <Text style={styles.restaurantName}>{item.name}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {/* Botón regresar */}
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Ionicons name="arrow-back" size={28} color="#50D8BC" />
      </TouchableOpacity>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Título */}
        <Text style={styles.title}>Restaurantes</Text>

        {/* Restaurantes visitados */}
        <Text style={styles.sectionTitle}>Ya visitaste</Text>
        <FlatList
          data={visitedRestaurants}
          renderItem={renderRestaurantCard}
          keyExtractor={(item) => item.id}
          numColumns={2}
          columnWrapperStyle={styles.row}
          scrollEnabled={false}
        />

        {/* Todos los restaurantes */}
        <Text style={styles.sectionTitle}>Todos los restaurantes con MIO</Text>
        <FlatList
          data={allRestaurants}
          renderItem={renderRestaurantCard}
          keyExtractor={(item) => item.id}
          numColumns={2}
          columnWrapperStyle={styles.row}
          scrollEnabled={false}
        />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F7F9FB", 
  },
  backButton: {
    position: "absolute",
    top: 50,
    left: 20,
    borderRadius: 24,
    padding: 6,
    zIndex: 10,
  },
  scrollContent: {
    paddingTop: 80,
    paddingBottom: 40,
    paddingHorizontal: 20,
    justifyContent: "center",
  },
  title: {
    fontSize: 22,
    fontWeight: "700",
    color: "#222",
    textAlign: "center",
    marginBottom: 25,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#000", 
    marginBottom: 20,
    marginTop: 40,
  },
  row: {
    justifyContent: "space-between",
    marginBottom: 16,
  },
  restaurantCard: {
    backgroundColor: "#fff",
    borderRadius: 14,
    alignItems: "center",
    paddingVertical: 16,
    flex: 1,
    marginHorizontal: 5,
    borderWidth: 1,
    borderColor: "#E6E6E6",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
    elevation: 2,
  },
  restaurantLogo: {
    width: 70,
    height: 70,
    resizeMode: "cover",
    borderRadius: 35, 
    marginBottom: 8,
  },
  restaurantName: {
    fontSize: 13,
    fontWeight: "500",
    color: "#333",
    textAlign: "center",
  },
});

export default Restaurantes;
