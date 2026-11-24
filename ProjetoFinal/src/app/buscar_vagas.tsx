import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, FlatList, Image, SafeAreaView, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

// 1. Tipagem e Dados Mockados
type Vaga = {
  id: string;
  titulo: string;
  preco: string;
  local: string;
  data: string;
  imagemUrl: string;
};

const categorias = ['Todas', 'Serviços', 'Reformas', 'Limpeza', 'Transporte', 'Outros'];

const vagasMock: Vaga[] = [
  {
    id: '1',
    titulo: 'Montagem de móveis',
    preco: 'R$ 120,00',
    local: 'Bairro Jardim',
    data: 'Hoje',
    imagemUrl: 'https://images.unsplash.com/photo-1595514535415-375f14e6e660?auto=format&fit=crop&w=200&q=80',
  },
  {
    id: '2',
    titulo: 'Serviço de limpeza',
    preco: 'R$ 100,00',
    local: 'Centro',
    data: 'Hoje',
    imagemUrl: 'https://images.unsplash.com/photo-1584820927498-cafe6c0c29b4?auto=format&fit=crop&w=200&q=80',
  },
  {
    id: '3',
    titulo: 'Instalação de ventilador',
    preco: 'R$ 80,00',
    local: 'Vila Nova',
    data: 'Ontem',
    imagemUrl: 'https://images.unsplash.com/photo-1565150937812-40f421f2d621?auto=format&fit=crop&w=200&q=80',
  },
];

export default function BuscarVagasScreen() {
  const [categoriaAtiva, setCategoriaAtiva] = useState('Todas');

  // 2. Renderização de cada Vaga
  const renderVaga = ({ item }: { item: Vaga }) => (
    <View style={styles.cardVaga}>
      <Image source={{ uri: item.imagemUrl }} style={styles.imagemVaga} />
      
      <View style={styles.infoVaga}>
        <Text style={styles.tituloVaga}>{item.titulo}</Text>
        <Text style={styles.precoVaga}>{item.preco}</Text>
        
        <View style={styles.localContainer}>
          <Ionicons name="location-outline" size={14} color="#6B7280" />
          <Text style={styles.localTexto}>{item.local} • {item.data}</Text>
        </View>
      </View>

      <TouchableOpacity style={styles.botaoSeta} activeOpacity={0.7}>
        <Ionicons name="arrow-forward" size={20} color="#FFF" />
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        
        {/* Cabeçalho */}
        <View style={styles.header}>
          <TouchableOpacity activeOpacity={0.7}>
          </TouchableOpacity>
          <Text style={styles.headerTitulo}>Buscar Vagas</Text>
          <View style={{ width: 24 }} /> {/* Espaçador para centralizar o título */}
        </View>

        {/* Barra de Pesquisa */}
        <View style={styles.searchContainer}>
          <Ionicons name="search" size={20} color="#6B7280" style={styles.searchIcon} />
          <TextInput 
            style={styles.searchInput}
            placeholder="Pesquisar"
            placeholderTextColor="#9CA3AF"
          />
        </View>

        {/* Categorias (Filtros) */}
        <View style={styles.categoriasContainer}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.scrollCategorias}>
            {categorias.map((cat, index) => (
              <TouchableOpacity 
                key={index}
                style={[styles.categoriaChip, categoriaAtiva === cat && styles.categoriaAtiva]}
                onPress={() => setCategoriaAtiva(cat)}
                activeOpacity={0.8}
              >
                <Text style={[styles.categoriaTexto, categoriaAtiva === cat && styles.categoriaTextoAtiva]}>
                  {cat}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Linha separadora */}
        <View style={styles.linhaSeparadora} />

        {/* Lista de Vagas */}
        <FlatList
          data={vagasMock}
          keyExtractor={(item) => item.id}
          renderItem={renderVaga}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.listaVagas}
          ItemSeparatorComponent={() => <View style={styles.linhaSeparadoraItem} />}
        />

      </View>
    </SafeAreaView>
  );
}

// 3. Estilos fiéis ao layout
const COR_PRIMARIA = '#DF0B7C'; // Rosa magenta da imagem

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 15,
  },
  headerTitulo: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#111827',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F3F4F8',
    marginHorizontal: 20,
    borderRadius: 25,
    paddingHorizontal: 15,
    height: 48,
    marginBottom: 20,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 15,
    color: '#111827',
  },
  categoriasContainer: {
    marginBottom: 15,
  },
  scrollCategorias: {
    paddingHorizontal: 20,
    gap: 10, // Espaçamento entre os chips (suportado nas versões mais recentes)
  },
  categoriaChip: {
    backgroundColor: '#F3F4F8',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 10, // Fallback caso gap não funcione
  },
  categoriaAtiva: {
    backgroundColor: COR_PRIMARIA,
  },
  categoriaTexto: {
    color: '#4B5563',
    fontWeight: '600',
    fontSize: 14,
  },
  categoriaTextoAtiva: {
    color: '#FFFFFF',
  },
  linhaSeparadora: {
    height: 1,
    backgroundColor: '#F3F4F6',
    marginBottom: 10,
  },
  listaVagas: {
    paddingHorizontal: 20,
    paddingBottom: 30,
  },
  cardVaga: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
  },
  imagemVaga: {
    width: 80,
    height: 80,
    borderRadius: 12,
    backgroundColor: '#E5E7EB',
  },
  infoVaga: {
    flex: 1,
    marginLeft: 15,
    justifyContent: 'center',
  },
  tituloVaga: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 4,
  },
  precoVaga: {
    fontSize: 18,
    fontWeight: '900',
    color: '#111827',
    marginBottom: 6,
  },
  localContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  localTexto: {
    fontSize: 13,
    color: '#6B7280',
    marginLeft: 4,
  },
  botaoSeta: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: COR_PRIMARIA,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
  },
  linhaSeparadoraItem: {
    height: 1,
    backgroundColor: '#F3F4F6',
    width: '100%',
  }
});