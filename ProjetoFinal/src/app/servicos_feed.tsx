import React, { useState, useCallback } from 'react';
import {
  ActivityIndicator,
  Alert,
  FlatList,
  RefreshControl,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useFocusEffect } from 'expo-router';
import Api from '../services/api';

type ServicoApi = {
  id: number;
  titulo: string;
  descricao: string;
  preco?: number | null;
  categoria?: string | null;
  localizacao?: string | null;
  autor?: string | null;
  usuario?: {
    id: number;
    nome: string;
  } | null;
};

export default function ListaServicosScreen() {
  const [servicos, setServicos] = useState<ServicoApi[]>([]);
  const [carregando, setCarregando] = useState(true);
  const [atualizando, setAtualizando] = useState(false);

  const carregarServicos = async () => {
    try {
      const res = await Api.get<ServicoApi[]>('/Servicos/ListarTodos');
      const lista = Array.isArray(res.data) ? res.data : (res.data as any)?.dados ?? [];
      setServicos(lista);
    } catch (error: any) {
      console.error('Erro ao buscar serviços:', error?.response?.data || error.message);
    } finally {
      setCarregando(false);
      setAtualizando(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      carregarServicos();
    }, [])
  );

  const formatarPreco = (preco?: number | null) => {
    if (preco == null || Number.isNaN(Number(preco))) {
      return 'A combinar';
    }
    return `R$ ${Number(preco).toFixed(2).replace('.', ',')}`;
  };

  const obterNomeAutor = (item: ServicoApi) => {
    return item.usuario?.nome || item.autor || 'Prestador TRAMPI';
  };

  const handleSelecionarServico = (item: ServicoApi) => {
    Alert.alert(
      item.titulo,
      `${item.descricao}\n\nValor: ${formatarPreco(item.preco)}\nPor: ${obterNomeAutor(item)}`
    );
  };

  const renderizarServico = ({ item }: { item: ServicoApi }) => (
    <TouchableOpacity
      style={styles.card}
      activeOpacity={0.7}
      onPress={() => handleSelecionarServico(item)}
    >
      <View style={styles.cabecalhoCard}>
        <Text style={styles.categoria}>{item.categoria || 'Serviços'}</Text>
        <Text style={styles.preco}>{formatarPreco(item.preco)}</Text>
      </View>

      <Text style={styles.titulo}>{item.titulo}</Text>
      <Text style={styles.descricao} numberOfLines={2}>
        {item.descricao}
      </Text>

      <View style={styles.rodapeCard}>
        <Text style={styles.postadoPor}>
          Postado por: <Text style={styles.autor}>{obterNomeAutor(item)}</Text>
          {item.localizacao ? ` • ${item.localizacao}` : ''}
        </Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.tituloPagina}>Serviços Disponíveis</Text>
      <Text style={styles.subtitulo}>Encontre o que você precisa</Text>

      {carregando ? (
        <View style={styles.centro}>
          <ActivityIndicator size="large" color="#A5065D" />
        </View>
      ) : (
        <FlatList
          data={servicos}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderizarServico}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.listaPadding}
          refreshControl={
            <RefreshControl
              refreshing={atualizando}
              onRefresh={() => {
                setAtualizando(true);
                carregarServicos();
              }}
              colors={['#A5065D']}
            />
          }
          ListEmptyComponent={
            <View style={styles.centro}>
              <Text style={styles.textoVazio}>Nenhum serviço disponível no momento.</Text>
            </View>
          }
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3F4F6',
    paddingTop: 60,
  },
  tituloPagina: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#111827',
    paddingHorizontal: 20,
  },
  subtitulo: {
    fontSize: 16,
    color: '#6B7280',
    paddingHorizontal: 20,
    marginBottom: 20,
    marginTop: 4,
  },
  listaPadding: {
    paddingHorizontal: 20,
    paddingBottom: 40,
    flexGrow: 1,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cabecalhoCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  categoria: {
    backgroundColor: '#A5065D',
    color: '#FDDEF3',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    fontSize: 12,
    fontWeight: '600',
  },
  preco: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#10B981',
  },
  titulo: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 6,
  },
  descricao: {
    fontSize: 14,
    color: '#4B5563',
    lineHeight: 20,
    marginBottom: 12,
  },
  rodapeCard: {
    borderTopWidth: 1,
    borderTopColor: '#F3F4F6',
    paddingTop: 10,
  },
  postadoPor: {
    fontSize: 12,
    color: '#9CA3AF',
  },
  autor: {
    color: '#374151',
    fontWeight: '600',
  },
  centro: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 60,
  },
  textoVazio: {
    fontSize: 15,
    color: '#6B7280',
    textAlign: 'center',
  },
});