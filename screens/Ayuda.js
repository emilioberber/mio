import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Linking,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const FAQ_DATA = [
  {
    question: "¿Cómo divido la cuenta con mio?",
    answer:
      "Selecciona los platillos que consumiste y mio calculará automáticamente tu parte de la cuenta.",
  },
  {
    question: "¿Puedo pagar solo lo que consumí?",
    answer:
      "Sí, mio permite pagar únicamente los platillos que seleccionaste, evitando pagar demás. Pero también puedes pagar por el total de la cuenta.",
  },
  {
    question: "¿Qué pasa si alguien no paga su parte?",
    answer:
      "El mesero al escanear el QR verá que todavía se deben cosas de la cuenta y les pedirá amablemente que liquiden el total de su cuenta.",
  },
  {
    question: "¿En qué restaurantes puedo usar mio?",
    answer:
      "En todos los restaurantes que cuentan con mio. Puedes ver la lista dandole clic a Restaurantes.",
  },
];

const STEPS = [
  { step: 1, title: "Escanea el QR de tu ticket de cuenta" },
  { step: 2, title: "Selecciona tus platillos en la cuenta" },
  { step: 3, title: "Confirma y paga tu parte" },
];

const Ayuda = () => {
  const navigation = useNavigation();

  const handleContactSupport = () => {
    // Aquí se abrirá un chat, mail o soporte real
    console.log("Contacto soporte");
    alert("Gracias por contactarnos. Pronto un agente te atenderá.");
  };

  const handleOpenTutorial = () => {
    // TUTORIAL
    Linking.openURL("https://www.youtube.com/watch?v=dQw4w9WgXcQ"); // ejemplo
  };

  return (
    <View style={styles.container}>
      {/* Botón regresar */}
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Ionicons name="arrow-back" size={28} color="#50D8BC" />
      </TouchableOpacity>

      <Text style={styles.title}>Ayuda</Text>

      <ScrollView
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        {/* FAQ */}
        <Text style={styles.sectionTitle}>Preguntas frecuentes</Text>
        {FAQ_DATA.map(({ question, answer }, index) => (
          <View key={index} style={styles.faqItem}>
            <Text style={styles.faqQuestion}>{question}</Text>
            <Text style={styles.faqAnswer}>{answer}</Text>
          </View>
        ))}

        {/* Pasos para usar mio */}
        <Text style={styles.sectionTitle}>¿Cómo usar mio?</Text>
        {STEPS.map(({ step, title }) => (
          <View key={step} style={styles.stepItem}>
            <View style={styles.stepCircle}>
              <Text style={styles.stepNumber}>{step}</Text>
            </View>
            <Text style={styles.stepTitle}>{title}</Text>
          </View>
        ))}

        {/* Botón contacto soporte */}
        <TouchableOpacity style={styles.contactButton} onPress={handleContactSupport}>
          <Ionicons name="chatbubble-ellipses" size={20} color="#fff" />
          <Text style={styles.contactButtonText}>Contactar soporte</Text>
        </TouchableOpacity>

        {/* Botón tutorial */}
        <TouchableOpacity style={styles.tutorialButton} onPress={handleOpenTutorial}>
          <Ionicons name="play-circle" size={20} color="#50D8BC" />
          <Text style={styles.tutorialButtonText}>Ver tutorial rápido</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: 60,
    paddingHorizontal: 20,
  },
  backButton: {
    position: "absolute",
    top: 60,
    left: 20,
    borderRadius: 24,
    padding: 6,
    zIndex: 10,
  },
  title: {
    fontSize: 22,
    fontWeight: "700",
    color: "#222",
    textAlign: "center",
    marginTop: 20,
    marginBottom: 55,
  },
  contentContainer: {
    paddingBottom: 40,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#333",
    marginBottom: 12,
    marginTop: 10,
  },
  faqItem: {
    marginBottom: 20,
    backgroundColor: "#f9f9f9",
    padding: 15,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 6,
    elevation: 1,
  },
  faqQuestion: {
    fontWeight: "700",
    fontSize: 15,
    color: "#50D8BC",
    marginBottom: 6,
  },
  faqAnswer: {
    fontSize: 14,
    color: "#444",
    lineHeight: 20,
  },
  stepItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 18,
  },
  stepCircle: {
    backgroundColor: "#50D8BC",
    width: 30,
    height: 30,
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 14,
  },
  stepNumber: {
    color: "#fff",
    fontWeight: "700",
  },
  stepTitle: {
    fontSize: 15,
    color: "#333",
    flexShrink: 1,
  },
  contactButton: {
    marginTop: 30,
    flexDirection: "row",
    backgroundColor: "#50D8BC",
    paddingVertical: 14,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
  },
  contactButtonText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 16,
  },
  tutorialButton: {
    marginTop: 16,
    flexDirection: "row",
    borderColor: "#50D8BC",
    borderWidth: 2,
    paddingVertical: 14,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
  },
  tutorialButtonText: {
    color: "#50D8BC",
    fontWeight: "700",
    fontSize: 16,
  },
});

export default Ayuda;
