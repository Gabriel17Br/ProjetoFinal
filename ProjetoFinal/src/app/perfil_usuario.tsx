
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function Perfil() {
  const habilidades = ['Pintura', 'Reformas', 'Manutenção'];

  return (
    <View style={styles.container}>

      <ScrollView showsVerticalScrollIndicator={false}>

        {/* CABEÇALHO ROSA */}
        <View style={styles.header}>

          {/* FOTO DE PERFIL */}
          <View style={styles.fotoContainer}>
            <View style={styles.foto}>
              <Ionicons name="person" size={65} color="#777" />
            </View>

            <TouchableOpacity
              style={styles.camera}
              onPress={() =>
                Alert.alert('Foto', 'Adicionar foto de perfil')
              }
            >
              <Ionicons name="camera" size={18} color="#111" />
            </TouchableOpacity>
          </View>
        </View>

        {/* INFORMAÇÕES DO PERFIL */}
        <View style={styles.conteudo}>

          <Text style={styles.nome}>Vitor Isaac</Text>
          <Text style={styles.usuario}>@vitorisaac</Text>

          {/* ESTATÍSTICAS */}
          <View style={styles.estatisticas}>

            <View style={styles.estatistica}>
              <Text style={styles.numero}>12</Text>
              <Text style={styles.descricaoEstatistica}>Serviços</Text>
            </View>

            <View style={styles.linhaVertical} />

            <View style={styles.estatistica}>
              <View style={styles.avaliacao}>
                <Text style={styles.numero}>4.8</Text>
                <Ionicons name="star" size={15} color="#E6007E" />
              </View>
              <Text style={styles.descricaoEstatistica}>
                Avaliação
              </Text>
            </View>

            <View style={styles.linhaVertical} />

            <View style={styles.estatistica}>
              <Text style={styles.numero}>3</Text>
              <Text style={styles.descricaoEstatistica}>
                Candidaturas
              </Text>
            </View>

          </View>

          {/* SOBRE MIM */}
          <View style={styles.secao}>
            <Text style={styles.tituloSecao}>Sobre mim</Text>

            <Text style={styles.texto}>
              Prestador de serviços com experiência em pinturas,
              reformas e pequenos reparos.
            </Text>
          </View>

          {/* HABILIDADES */}
          <View style={styles.secao}>
            <Text style={styles.tituloSecao}>Habilidades</Text>

            <View style={styles.habilidades}>
              {habilidades.map((item, index) => (
                <View key={index} style={styles.habilidade}>
                  <Text style={styles.textoHabilidade}>
                    {item}
                  </Text>
                </View>
              ))}
            </View>
          </View>

          {/* BOTÃO EDITAR */}
          <TouchableOpacity
            style={styles.botaoEditar}
            onPress={() =>
              Alert.alert('Perfil', 'Editar informações do perfil')
            }
          >
            <Text style={styles.textoBotao}>
              Editar Perfil
            </Text>
          </TouchableOpacity>

        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },

  header: {
    height: 155,
    backgroundColor: '#E6007E',
    borderBottomLeftRadius: 45,
    borderBottomRightRadius: 45,
    alignItems: 'center',
    position: 'relative',
  },

  voltar: {
    position: 'absolute',
    top: 45,
    left: 18,
  },

  fotoContainer: {
    position: 'absolute',
    bottom: -38,
    alignItems: 'center',
    justifyContent: 'center',
  },

  foto: {
    width: 105,
    height: 105,
    borderRadius: 55,
    backgroundColor: '#F2F2F2',
    borderWidth: 4,
    borderColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },

  camera: {
    position: 'absolute',
    right: 0,
    bottom: 4,
    backgroundColor: '#FFFFFF',
    width: 32,
    height: 32,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 3,
  },

  conteudo: {
    paddingHorizontal: 22,
    paddingTop: 45,
    paddingBottom: 25,
  },

  nome: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#111111',
    textAlign: 'center',
  },

  usuario: {
    fontSize: 13,
    color: '#777777',
    textAlign: 'center',
    marginTop: 3,
  },

  estatisticas: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginTop: 22,
    marginBottom: 25,
  },

  estatistica: {
    alignItems: 'center',
    flex: 1,
  },

  numero: {
    fontSize: 19,
    fontWeight: 'bold',
    color: '#111111',
  },

  descricaoEstatistica: {
    fontSize: 11,
    color: '#666666',
    marginTop: 3,
  },

  avaliacao: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },

  linhaVertical: {
    width: 1,
    height: 35,
    backgroundColor: '#DDDDDD',
  },

  secao: {
    marginBottom: 19,
  },

  tituloSecao: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#111111',
    marginBottom: 8,
  },

  texto: {
    fontSize: 13,
    color: '#444444',
    lineHeight: 20,
  },

  habilidades: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },

  habilidade: {
    backgroundColor: '#F4EAF0',
    paddingHorizontal: 13,
    paddingVertical: 7,
    borderRadius: 20,
  },

  textoHabilidade: {
    fontSize: 11,
    color: '#333333',
    fontWeight: '500',
  },

  botaoEditar: {
    backgroundColor: '#E6007E',
    height: 43,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 5,
  },

  textoBotao: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: 'bold',
  },

  menuInferior: {
    height: 65,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#EEEEEE',
    paddingBottom: 5,
  },

  itemMenu: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },

  textoMenu: {
    fontSize: 10,
    color: '#555555',
    marginTop: 3,
  },

  textoMenuAtivo: {
    fontSize: 10,
    color: '#E6007E',
    fontWeight: 'bold',
    marginTop: 3,
  },

});
