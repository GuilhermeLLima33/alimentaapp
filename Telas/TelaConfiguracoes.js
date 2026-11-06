import React, { useState } from "react";

import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
  StyleSheet,
  useWindowDimensions,
} from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { signOut } from "firebase/auth";

import { auth } from "../firebase";

const VERDE = "#006838";
const FUNDO = "#FFFCF6";

const OPCOES = [
  {
    titulo: "Minha conta",
    icone: "person-outline",
    rota: "TelaPerfil",
  },
  {
    titulo: "Notificações",
    icone: "notifications-outline",
    rota: "TelaNotificacoes",
  },
  {
    titulo: "Ajuda e suporte",
    icone: "help-circle-outline",
    rota: "TelaAjudaSuporte",
  },
  {
    titulo: "Sobre o Alimenta+",
    icone: "information-circle-outline",
    rota: "TelaSobreAlimenta",
  },
];

export default function TelaConfiguracoes({ navigation }) {
  const { width } = useWindowDimensions();
  const [saindo, setSaindo] = useState(false);

  function confirmarSaida() {
    if (saindo) return;

    Alert.alert(
      "Sair da conta?",
      "Seus dados e suas doações continuarão salvos.",
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Sair",
          style: "destructive",
          onPress: async () => {
            setSaindo(true);
            try {
              await signOut(auth);
            } catch (e) {
              console.error("Erro ao sair da conta:", e);
              Alert.alert(
                "Não foi possível sair",
                "Tente novamente."
              );
              setSaindo(false);
            }
          },
        },
      ]
    );
  }

  return (
    <SafeAreaView style={styles.safe} edges={["top", "bottom"]}>
      <View style={[styles.tela, { width: Math.min(width, 460) }]}>
        <Image
          source={require("../assets/images/tabIcons/fundo.png")}
          resizeMode="cover"
          style={[styles.fundoImagem, { pointerEvents: "none" }]}
        />

        <ScrollView
          contentContainerStyle={styles.conteudo}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.topo}>
            <TouchableOpacity
              style={styles.voltar}
              onPress={() =>
                navigation.canGoBack()
                  ? navigation.goBack()
                  : navigation.navigate("TelaPerfil")
              }
              accessibilityRole="button"
              accessibilityLabel="Voltar"
            >
              <Ionicons name="chevron-back" size={23} color={VERDE} />
            </TouchableOpacity>
          </View>

          <Image
            source={require("../assets/images/tabIcons/logo.png")}
            resizeMode="contain"
            style={styles.logo}
            accessibilityLabel="Alimenta+"
          />

          <View style={styles.lista}>
            {OPCOES.map((item) => (
              <TouchableOpacity
                key={item.rota}
                style={styles.opcao}
                onPress={() => navigation.navigate(item.rota)}
                accessibilityRole="button"
              >
                <Ionicons
                  name={item.icone}
                  size={22}
                  color="#5F665F"
                />
                <Text style={styles.opcaoTexto}>{item.titulo}</Text>
                <Ionicons
                  name="chevron-forward"
                  size={18}
                  color="#8B918B"
                />
              </TouchableOpacity>
            ))}

            <TouchableOpacity
              style={styles.opcao}
              onPress={confirmarSaida}
              disabled={saindo}
              accessibilityRole="button"
            >
              {saindo ? (
                <ActivityIndicator color="#E33D3D" />
              ) : (
                <Ionicons
                  name="log-out-outline"
                  size={22}
                  color="#E33D3D"
                />
              )}
              <Text style={[styles.opcaoTexto, styles.sairTexto]}>
                Sair da conta
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    alignItems: "center",
    backgroundColor: FUNDO,
  },
  tela: {
    flex: 1,
    maxWidth: 460,
    overflow: "hidden",
  },
  fundoImagem: {
    ...StyleSheet.absoluteFillObject,
    width: "100%",
    height: "100%",
    opacity: 0.8,
  },
  conteudo: {
    flexGrow: 1,
    padding: 18,
    paddingBottom: 30,
  },
  topo: {
    flexDirection: "row",
  },
  voltar: {
    width: 38,
    height: 38,
    borderRadius: 22,
    backgroundColor: "#E6F0DF",
    alignItems: "center",
    justifyContent: "center",
  },
  logo: {
    width: "82%",
    height: 155,
    alignSelf: "center",
    marginTop: 4,
    marginBottom: 20,
  },
  lista: {
    gap: 9,
  },
  opcao: {
    minHeight: 47,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: "#D7D7D7",
    borderRadius: 13,
    backgroundColor: "#FFFFFF",
    elevation: 2,
    shadowColor: "#000000",
    shadowOpacity: 0.1,
    shadowRadius: 3,
    shadowOffset: { width: 0, height: 2 },
  },
  opcaoTexto: {
    flex: 1,
    color: "#666666",
    fontFamily: "Poppins_500Medium",
    fontSize: 15,
  },
  sairTexto: {
    color: "#E33D3D",
  },
});
