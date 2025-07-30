import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Alert,
  Image,
  Button,
  TouchableOpacity,
} from "react-native";
import { CameraView, useCameraPermissions } from "expo-camera";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { Ionicons } from '@expo/vector-icons';

const QRScanner = () => {
  const [permission, requestPermission] = useCameraPermissions();
  const [scanned, setScanned] = useState(false);
  const [invalidQR, setInvalidQR] = useState(false);
  const navigation = useNavigation();

  // Resetear estados cada vez que la pantalla gana foco
  useFocusEffect(
    React.useCallback(() => {
      setScanned(false);
      setInvalidQR(false);
    }, [])
  );

  const handleScan = ({ data }) => {
    if (!scanned) {
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
          setInvalidQR(true);
          Alert.alert("QR inválido", "Faltan campos necesarios.");
        }
      } catch (error) {
        setInvalidQR(true);
        Alert.alert("QR inválido", "El QR no tiene formato JSON válido.");
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
      {/* Botón de regresar */}
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Ionicons name="arrow-back" size={28} color="#50D8BC" />
      </TouchableOpacity>

      <CameraView

        style={styles.camera}
        barcodeScannerSettings={{ barcodeTypes: ["qr"] }}
        onBarcodeScanned={handleScan}
      >
        <View style={styles.overlay}>
          <Image
            source={require("../assets/mio_logo_blue.png")}
            style={styles.logo}
          />
          <Text style={styles.scanText}>
            Escanea el código QR de tu cuenta
          </Text>
          <View style={styles.scanArea} />

          {invalidQR && (
            <Text style={styles.invalidQRText}>QR No válido</Text>
          )}
        </View>
      </CameraView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  backButton: {
    position: "absolute",
    top: 60,
    left: 20,
    zIndex: 10,
    backgroundColor: "rgba(255,255,255,0.9)",
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
  camera: { flex: 1 },
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
    marginBottom: 10,
  },
  invalidQRText: {
    color: "red",
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 10,
    textAlign: "center",
  },
});

export default QRScanner;