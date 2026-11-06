import React from "react";

import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  useWindowDimensions,
  Linking,
  Alert,
} from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";

const VERDE = "#006838";
const FUNDO = "#FFFCF6";
const EMAIL_SUPORTE = "alimentamais-suporte@gmail.com";

export default function TelaAjudaSuporte({ navigation }) {
  const { width } = useWindowDimensions();

  async function abrirEmailSuporte() {
    try {
      await Linking.openURL(`mailto:${EMAIL_SUPORTE}`);
    } catch (erro) {
      console.error("Não foi possível abrir o e-mail de suporte:", erro);
      Alert.alert(
        "Não foi possível abrir o e-mail",
        `Envie sua mensagem para ${EMAIL_SUPORTE}.`
      );
    }
  }

  return (
    <SafeAreaView style={styles.safe} edges={["top", "bottom"]}>
      <View style={[styles.tela, { width: Math.min(width, 460) }]}>
        <View style={styles.topo}>
          <TouchableOpacity
            style={styles.voltar}
            onPress={() =>
              navigation.canGoBack()
                ? navigation.goBack()
                : navigation.navigate("TelaConfiguracoes")
            }
            accessibilityRole="button"
            accessibilityLabel="Voltar"
          >
            <Ionicons name="chevron-back" size={23} color={VERDE} />
          </TouchableOpacity>
          <Text style={styles.titulo}>Ajuda e Suporte</Text>
        </View>

        <Text style={styles.subtitulo}>Estamos aqui para te ajudar!</Text>

        <View style={styles.card}>
          <View style={styles.iconeFundo}>
            <Ionicons name="mail-outline" size={56} color="#222222" />
          </View>

          <Text style={styles.cardTitulo}>Fale conosco</Text>
          <Text style={styles.descricao}>
            Envie sua dúvida, sugestão ou relato para a equipe. Será um
            prazer ajudar!
          </Text>

          <TouchableOpacity
            style={styles.contato}
            onPress={abrirEmailSuporte}
            accessibilityRole="link"
            accessibilityLabel={`Enviar e-mail para ${EMAIL_SUPORTE}`}
          >
            <Ionicons name="mail-outline" size={21} color={VERDE} />
            <Text style={styles.contatoTexto}>
              {EMAIL_SUPORTE}
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.resposta}>
          <Text style={styles.respostaTitulo}>Como falar com a equipe</Text>
          <Text style={styles.respostaTexto}>
            Toque no endereço acima para abrir uma nova mensagem no seu
            aplicativo de e-mail.
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: FUNDO,
    alignItems: "center",
  },
  tela: {
    flex: 1,
    maxWidth: 460,
    padding: 20,
  },
  topo: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  voltar: {
    width: 38,
    height: 38,
    borderRadius: 22,
    backgroundColor: "#E6F0DF",
    alignItems: "center",
    justifyContent: "center",
  },
  titulo: {
    color: VERDE,
    fontFamily: "Poppins_700Bold",
    fontSize: 21,
  },
  subtitulo: {
    color: "#666666",
    fontFamily: "Poppins_400Regular",
    fontSize: 16,
    marginTop: 8,
  },
  card: {
    alignItems: "center",
    marginTop: 26,
    padding: 18,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: "#D8DDD6",
    backgroundColor: "#FFFFFF",
    elevation: 3,
    shadowColor: "#000000",
    shadowOpacity: 0.12,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 3 },
  },
  iconeFundo: {
    width: 98,
    height: 98,
    borderRadius: 52,
    backgroundColor: "#EEF4E5",
    alignItems: "center",
    justifyContent: "center",
  },
  cardTitulo: {
    color: VERDE,
    fontFamily: "Poppins_700Bold",
    fontSize: 19,
    marginTop: 7,
  },
  descricao: {
    color: "#666666",
    fontFamily: "Poppins_400Regular",
    fontSize: 15,
    lineHeight: 23,
    textAlign: "center",
    marginTop: 3,
  },
  contato: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    width: "100%",
    padding: 10,
    marginTop: 19,
    borderRadius: 11,
    backgroundColor: "#EEF4E5",
  },
  contatoTexto: {
    flex: 1,
    color: VERDE,
    fontFamily: "Poppins_500Medium",
    fontSize: 12,
    textAlign: "center",
  },
  resposta: {
    marginTop: 18,
    padding: 14,
    borderRadius: 13,
    borderWidth: 1,
    borderColor: "#CFD8C6",
    backgroundColor: "#EEF4E5",
  },
  respostaTitulo: {
    color: VERDE,
    fontFamily: "Poppins_700Bold",
    fontSize: 15,
  },
  respostaTexto: {
    color: "#686868",
    fontFamily: "Poppins_400Regular",
    fontSize: 13,
    lineHeight: 19,
  },
});
