import React, { useState, useCallback, useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  FlatList,
  Image,
  SafeAreaView,
  ScrollView,
  ActivityIndicator,
  RefreshControl,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useFocusEffect } from 'expo-router';
import api from '../services/api';

type VagaApi = {
  id: number;
  usuarioId?: number;
  titulo: string;
  descricao?: string | null;
  categoria?: string | null;
  valor?: number | null;
  localizacao?: string | null;
  dataTrabalho?: string | null;
  horario?: string | null;
  status?: string | null;
  imagemUrl?: string | null;
};

const categorias = ['Todas', 'Serviços', 'Reformas', 'Limpeza', 'Transporte', 'Outros'];

const IMAGEM_PADRAO =
  'https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=200&q=80';

export default function BuscarVagasScreen() {
  const [vagas, setVagas] = useState<VagaApi[]>([]);
  const [categoriaAtiva, setCategoriaAtiva] = useState('Todas');
  const [busca, setBusca] = useState('');
  const [carregando, setCarregando] = useState(true);
  const [atualizando, setAtualizando] = useState(false);

  const carregarVagas = async () => {
    try {
      const res = await api.get<VagaApi[]>('/vagas');
      const lista = Array.isArray(res.data) ? res.data : (res.data as any)?.dados ?? [];
      setVagas(lista);
    } catch (error: any) {
      console.error('Erro ao buscar vagas:', error?.response?.data || error.message);
    } finally {
      setCarregando(false);
      setAtualizando(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      carregarVagas();
    }, [])
  );

  const vagasFiltradas = useMemo(() => {
    const termo = busca.trim().toLowerCase();

    return vagas.filter((vaga) => {
      const bateCategoria =
        categoriaAtiva === 'Todas' ||
        (vaga.categoria || '').toLowerCase() === categoriaAtiva.toLowerCase();

      const bateBusca =
        !termo ||
        (vaga.titulo || '').toLowerCase().includes(termo) ||
        (vaga.descricao || '').toLowerCase().includes(termo) ||
        (vaga.localizacao || '').toLowerCase().includes(termo);

      return bateCategoria && bateBusca;
    });
  }, [vagas, categoriaAtiva, busca]);

  const formatarValor = (valor?: number | null) => {
    if (valor == null || Number.isNaN(Number(valor))) {
      return 'A combinar';
    }
    return `R$ ${Number(valor).toFixed(2).replace('.', ',')}`;
  };

  const formatarDataCurta = (dataIso?: string | null) => {
    if (!dataIso) return 'A combinar';
    const apenasData = dataIso.split('T')[0];
    const partes = apenasData.split('-');
    if (partes.length === 3) {
      return `${partes[2]}/${partes[1]}`;
    }
    return apenasData;
  };

  const handleVerVaga = (vaga: VagaApi) => {
    Alert.alert(
      vaga.titulo,
      `${vaga.descricao || 'Sem descrição detalhada.'}\n\nValor: ${formatarValor(vaga.valor)}\nLocal: ${vaga.localizacao || 'Não informado'}\nData: ${formatarDataCurta(vaga.dataTrabalho)}${vaga.horario ? ` às ${vaga.horario.slice(0, 5)}` : ''}`
    );
  };

  const renderVaga = ({ item }: { item: VagaApi }) => (
    <TouchableOpacity
      style={styles.cardVaga}
      activeOpacity={0.8}
      onPress={() => handleVerVaga(item)}
    >
      <Image
        source={{ uri: item.imagemUrl || IMAGEM_PADRAO }}
        style={styles.imagemVaga}
      />

      <View style={styles.infoVaga}>
        <Text style={styles.tituloVaga} numberOfLines={1}>
          {item.titulo}
        </Text>
        <Text style={styles.precoVaga}>{formatarValor(item.valor)}</Text>

        <View style={styles.localContainer}>
          <Ionicons name="location-outline" size={14} color="#6B7280" />
          <Text style={styles.localTexto} numberOfLines={1}>
            {item.localizacao || 'Local a combinar'} • {formatarDataCurta(item.dataTrabalho)}
          </Text>
        </View>
      </View>

      <TouchableOpacity
        style={styles.botaoSeta}
        activeOpacity={0.7}
        onPress={() => handleVerVaga(item)}
      >
        <Ionicons name="arrow-forward" size={20} color="#FFF" />
      </TouchableOpacity>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {/* Cabeçalho */}
        <View style={styles.header}>
          <View style={{ width: 24 }} />
          <Text style={styles.headerTitulo}>Buscar Vagas</Text>
          <View style={{ width: 24 }} />
        </View>

        {/* Barra de Pesquisa */}
        <View style={styles.searchContainer}>
          <Ionicons name="search" size={20} color="#6B7280" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Pesquisar vaga ou bairro..."
            placeholderTextColor="#9CA3AF"
            value={busca}
            onChangeText={setBusca}
          />
          {busca.length > 0 && (
            <TouchableOpacity onPress={() => setBusca('')}>
              <Ionicons name="close-circle" size={18} color="#9CA3AF" />
            </TouchableOpacity>
          )}
        </View>

        {/* Categorias (Filtros) */}
        <View style={styles.categoriasContainer}>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.scrollCategorias}
          >
            {categorias.map((cat, index) => (
              <TouchableOpacity
                key={index}
                style={[styles.categoriaChip, categoriaAtiva === cat && styles.categoriaAtiva]}
                onPress={() => setCategoriaAtiva(cat)}
                activeOpacity={0.8}
              >
                <Text
                  style={[
                    styles.categoriaTexto,
                    categoriaAtiva === cat && styles.categoriaTextoAtiva,
                  ]}
                >
                  {cat}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        <View style={styles.linhaSeparadora} />

        {/* Lista de Vagas */}
        {carregando ? (
          <View style={styles.centro}>
            <ActivityIndicator size="large" color="#DF0B7C" />
          </View>
        ) : (
          <FlatList
            data={vagasFiltradas}
            keyExtractor={(item) => item.id.toString()}
            renderItem={renderVaga}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.listaVagas}
            ItemSeparatorComponent={() => <View style={styles.linhaSeparadoraItem} />}
            refreshControl={
              <RefreshControl
                refreshing={atualizando}
                onRefresh={() => {
                  setAtualizando(true);
                  carregarVagas();
                }}
                colors={['#DF0B7C']}
              />
            }
            ListEmptyComponent={
              <View style={styles.centro}>
                <Text style={styles.textoVazio}>
                  Nenhuma vaga encontrada para esse filtro.
                </Text>
              </View>
            }
          />
        )}
      </View>
    </SafeAreaView>
  );
}

const COR_PRIMARIA = '#DF0B7C';

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
    gap: 10,
  },
  categoriaChip: {
    backgroundColor: '#F3F4F8',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 10,
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
    flexGrow: 1,
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
    flex: 1,
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
  },
  centro: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 50,
  },
  textoVazio: {
    fontSize: 15,
    color: '#6B7280',
    textAlign: 'center',
  },
});