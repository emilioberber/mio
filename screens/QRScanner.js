import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  Button,
  TouchableOpacity,
} from "react-native";
import { CameraView, useCameraPermissions } from "expo-camera";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";

const QRScanner = () => {
  const [permission, requestPermission] = useCameraPermissions();
  const [scanned, setScanned] = useState(false);
  const [invalidQR, setInvalidQR] = useState(false);
  const [flash, setFlash] = useState("off");
  const navigation = useNavigation();

  useFocusEffect(
    React.useCallback(() => {
      setScanned(false);
      setInvalidQR(false);
    }, [])
  );

  const handleScan = ({ data }) => {
    if (!scanned && typeof data === "string") {
      try {
        const parsedData = JSON.parse(data);
        const { restaurantId, table } = parsedData;

        if (restaurantId && table) {
          setScanned(true);
          setInvalidQR(false);
          navigation.navigate("OrderScreen", {
            restaurantId,
            table,
          });
        } else {
          throw new Error("Missing fields");
        }
      } catch (error) {
        setScanned(true);
        setInvalidQR(true);
        setTimeout(() => setScanned(false), 3000);
      }
    }
  };

  if (!permission) return <View />;
  if (!permission.granted) {
    return (
      <View style={styles.permissionContainer}>
        <Text style={styles.message}>
          Necesitamos permiso para acceder a la cámara
        </Text>
        <Button title="Dar permiso" onPress={requestPermission} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Cámara en el fondo */}
      <CameraView
        style={StyleSheet.absoluteFillObject}
        barcodeScannerSettings={{ barcodeTypes: ["qr"] }}
        onBarcodeScanned={handleScan}
        flash={flash}
      />

      {/* Botón de regresar */}
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.navigate("Auth")}
      >
        <Ionicons name="arrow-back" size={28} color="#fff" />
      </TouchableOpacity>

      {/* Botón de linterna */}
      <TouchableOpacity
        style={styles.flashButton}
        onPress={() => setFlash(flash === "off" ? "torch" : "off")}
      >
        <Ionicons
          name={flash === "off" ? "flashlight-outline" : "flashlight"}
          size={28}
          color="#fff"
        />
      </TouchableOpacity>

      {/* Overlay de logo y texto */}
      <View style={styles.overlay}>
        <Image
          source={require("../assets/mio_logo_blue.png")}
          style={styles.logo}
        />
        <Text style={styles.scanText}>Escanea el código QR de tu cuenta</Text>
        <View style={styles.scanArea} />
        {invalidQR && <Text style={styles.invalidQRText}>QR No válido</Text>}
      </View>

      {/* Barra inferior de navegación */}
      <View style={styles.bottomNav}>
        <TouchableOpacity
          style={styles.navItem}
          onPress={() => navigation.navigate("Perfil")}
        >
          <Ionicons name="person-outline" size={25} color="#fff" />
          <Text style={styles.navText}>Perfil</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.navItem}
          onPress={() => navigation.navigate("Ayuda")}
        >
          <Ionicons name="help-circle-outline" size={25} color="#fff" />
          <Text style={styles.navText}>Ayuda</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.navItem}
          onPress={() => navigation.navigate("Wallet")}
        >
          <Ionicons name="wallet-outline" size={25} color="#fff" />
          <Text style={styles.navText}>Wallet</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.navItem}
          onPress={() => navigation.navigate("Restaurantes")}
        >
          <Ionicons name="restaurant-outline" size={25} color="#fff" />
          <Text style={styles.navText}>Restaurantes</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#000" },
  backButton: {
    position: "absolute",
    top: 60,
    left: 20,
    zIndex: 10,
    borderRadius: 24,
    padding: 6,
  },
  flashButton: {
    position: "absolute",
    top: 60,
    right: 20,
    zIndex: 10,
    borderRadius: 24,
    padding: 6,
  },
  permissionContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    paddingHorizontal: 20,
  },
  message: {
    textAlign: "center",
    fontSize: 16,
    marginBottom: 16,
  },
  overlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 100,
  },
  logo: {
    width: 100,
    height: 100,
    resizeMode: "contain",
    marginBottom: 10,
  },
  scanText: {
    color: "white",
    fontSize: 16,
    marginBottom: 20,
    textAlign: "center",
    fontWeight: "600",
  },
  scanArea: {
    width: 250,
    height: 250,
    borderWidth: 2,
    borderColor: "white",
    borderRadius: 10,
    marginBottom: 100,
  },
  invalidQRText: {
    color: "red",
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 10,
    textAlign: "center",
  },
  bottomNav: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 80,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    paddingBottom: 40,
  },
  navItem: {
    alignItems: "center",
    justifyContent: "center",
  },
  navText: {
    color: "#fff",
    fontSize: 12,
    marginTop: 4,
  },
});

export default QRScanner;
