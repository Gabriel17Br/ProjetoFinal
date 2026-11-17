import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

// 1. Dados falsos (mock) simulando serviços postados por usuários
type Servico = {
  id: string;
  titulo: string;
  descricao: string;
  preco: string;
  autor: string;
  categoria: string;
};
const servicos = [
  {
    id: "1",
    titulo: "Montador de Móveis",
    descricao:
      "Monto guarda-roupas, camas, mesas e painéis de TV com rapidez e limpeza.",
    preco: "R$ 150,00",
    autor: "João Silva",
    categoria: "Serviços Gerais",
  },
  {
    id: "2",
    titulo: "Design de Logotipo",
    descricao:
      "Crio logos profissionais e identidade visual completa para a sua marca.",
    preco: "R$ 350,00",
    autor: "Marina Costa",
    categoria: "Design",
  },
  {
    id: "3",
    titulo: "Passeador de Cães (Dog Walker)",
    descricao:
      "Passeios de 1 hora no parque. Tenho experiência com cães de grande porte.",
    preco: "R$ 40,00 / hora",
    autor: "Carlos Eduardo",
    categoria: "Pets",
  },
  {
    id: "4",
    titulo: "Aulas de Inglês Conversação",
    descricao:
      "Aulas online focadas em conversação e perda da timidez para falar.",
    preco: "R$ 60,00 / aula",
    autor: "Ana Paula",
    categoria: "Aulas",
  },
];

export default function ListaServicosScreen() {
  const renderizarServico = ({ item }: { item: Servico }) => (
    <TouchableOpacity
      style={styles.card}
      activeOpacity={0.7} // Deixa o card levemente transparente ao clicar
      onPress={() => console.log(`Clicou no serviço: ${item.titulo}`)}
    >
      <View style={styles.cabecalhoCard}>
        <Text style={styles.categoria}>{item.categoria}</Text>
        <Text style={styles.preco}>{item.preco}</Text>
      </View>

      <Text style={styles.titulo}>{item.titulo}</Text>
      <Text style={styles.descricao} numberOfLines={2}>
        {item.descricao}
      </Text>

      <View style={styles.rodapeCard}>
        <Text style={styles.postadoPor}>
          Postado por: <Text style={styles.autor}>{item.autor}</Text>
        </Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.tituloPagina}>Serviços Disponíveis</Text>
      <Text style={styles.subtitulo}>Encontre o que você precisa</Text>

      <FlatList
        data={servicos}
        keyExtractor={(item) => item.id}
        renderItem={renderizarServico}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listaPadding}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F3F4F6",
    paddingTop: 60,
  },
  tituloPagina: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#111827",
    paddingHorizontal: 20,
  },
  subtitulo: {
    fontSize: 16,
    color: "#6B7280",
    paddingHorizontal: 20,
    marginBottom: 20,
    marginTop: 4,
  },
  listaPadding: {
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    // Sombra iOS
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    // Sombra Android
    elevation: 3,
  },
  cabecalhoCard: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  categoria: {
    backgroundColor: "#003bfd",
    color: "#dedcfc",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    fontSize: 12,
    fontWeight: "600",
  },
  preco: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#10B981",
  },
  titulo: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#1F2937",
    marginBottom: 6,
  },
  descricao: {
    fontSize: 14,
    color: "#4B5563",
    lineHeight: 20,
    marginBottom: 12,
  },
  rodapeCard: {
    borderTopWidth: 1,
    borderTopColor: "#F3F4F6",
    paddingTop: 10,
  },
  postadoPor: {
    fontSize: 12,
    color: "#9CA3AF",
  },
  autor: {
    color: "#374151",
    fontWeight: "600",
  },
});
