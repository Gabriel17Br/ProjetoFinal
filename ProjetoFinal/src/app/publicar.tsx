import React, { useState } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  StyleSheet, 
  SafeAreaView, 
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Alert
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function PublicarScreen() {
  // Controla se o usuário está publicando uma 'vaga' ou um 'servico'
  const [tipoPublicacao, setTipoPublicacao] = useState<'vaga' | 'servico'>('vaga');

  // Estados do formulário
  const [categoria, setCategoria] = useState('Reformas');
  const [titulo, setTitulo] = useState('');
  const [descricao, setDescricao] = useState('');
  const [valor, setValor] = useState('');
  const [data, setData] = useState('');
  const [local, setLocal] = useState('');

  const isVaga = tipoPublicacao === 'vaga';

  const handlePublicar = () => {
    Alert.alert(
      'Sucesso!',
      isVaga ? 'Sua vaga foi publicada!' : 'Seu serviço foi anunciado!'
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView 
        style={styles.container} 
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        {/* Cabeçalho Dinâmico */}
        <View style={styles.header}>
          <TouchableOpacity activeOpacity={0.7} style={styles.backButton}>
          <View style={{ width: 24 }} />
          </TouchableOpacity>
        </View>

        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
          
          {/* SELETOR: Vaga vs Serviço */}
          <View style={styles.selectorContainer}>
            <TouchableOpacity 
              style={[styles.selectorButton, isVaga && styles.selectorButtonActive]}
              onPress={() => setTipoPublicacao('vaga')}
              activeOpacity={0.8}
            >
              <Ionicons 
                name="briefcase-outline" 
                size={18} 
                color={isVaga ? '#FFFFFF' : '#4B5563'} 
              />
              <Text style={[styles.selectorText, isVaga && styles.selectorTextActive]}>
                Preciso de alguém
              </Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={[styles.selectorButton, !isVaga && styles.selectorButtonActive]}
              onPress={() => setTipoPublicacao('servico')}
              activeOpacity={0.8}
            >
              <Ionicons 
                name="construct-outline" 
                size={18} 
                color={!isVaga ? '#FFFFFF' : '#4B5563'} 
              />
              <Text style={[styles.selectorText, !isVaga && styles.selectorTextActive]}>
                Quero trabalhar
              </Text>
            </TouchableOpacity>
          </View>

          <Text style={styles.sectionTitle}>
            {isVaga ? 'Informações da vaga' : 'Detalhes do seu serviço'}
          </Text>

          {/* Campo: Categoria */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Categoria</Text>
            <TouchableOpacity style={styles.dropdownInput} activeOpacity={0.7}>
              <Text style={styles.dropdownText}>{categoria}</Text>
            </TouchableOpacity>
          </View>

          {/* Campo: Título (Importante para diferenciar o anúncio) */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>
              {isVaga ? 'O que você precisa?' : 'Título do seu serviço'}
            </Text>
            <TextInput
              style={styles.input}
              placeholder={isVaga ? 'Ex: Montador de guarda-roupa' : 'Ex: Faço frete e mudanças'}
              placeholderTextColor="#9CA3AF"
              value={titulo}
              onChangeText={setTitulo}
            />
          </View>

          {/* Campo: Descrição */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Descrição</Text>
            <TextInput
              style={styles.textArea}
              placeholder={
                isVaga 
                  ? 'Descreva os detalhes do trabalho que precisa ser feito...' 
                  : 'Descreva sua experiência, ferramentas que possui, etc...'
              }
              placeholderTextColor="#9CA3AF"
              multiline
              numberOfLines={4}
              textAlignVertical="top"
              value={descricao}
              onChangeText={setDescricao}
            />
          </View>
 
          {/* Campo: Valor */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>
              {isVaga ? 'Quanto pretende pagar? (R$)' : 'Valor cobrado (R$)'}
            </Text>
            <TextInput
              style={styles.input}
              placeholder={isVaga ? 'Ex: 150,00' : 'Ex: 80,00 / hora'}
              placeholderTextColor="#9CA3AF"
              keyboardType="numeric"
              value={valor}
              onChangeText={setValor}
            />
          </View>

          {/* Campo: Data disponível */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>
              {isVaga ? 'Para quando você precisa?' : 'Dias/Horários disponíveis'}
            </Text>
            <View style={styles.inputWithIcon}>
              <Ionicons name="calendar-outline" size={20} color="#111827" style={styles.inputIcon} />
              <TextInput
                style={styles.inputFlex}
                placeholder={isVaga ? 'Selecione uma data' : 'Ex: Segunda a Sexta, 08h às 18h'}
                placeholderTextColor="#9CA3AF"
                value={data}
                onChangeText={setData}
              />
            </View>
          </View>

          {/* Campo: Local */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>
              {isVaga ? 'Local do serviço' : 'Região de atendimento'}
            </Text>
            <View style={styles.inputWithIcon}>
              <Ionicons name="location-outline" size={20} color="#111827" style={styles.inputIcon} />
              <TextInput
                style={styles.inputFlex}
                placeholder={isVaga ? 'Digite o endereço...' : 'Ex: Centro e região'}
                placeholderTextColor="#9CA3AF"
                value={local}
                onChangeText={setLocal}
              />
            </View>
          </View>

        </ScrollView>

        {/* Botão Fixo no Rodapé */}
        <View style={styles.footer}>
          <TouchableOpacity 
            style={styles.submitButton} 
            activeOpacity={0.8}
            onPress={handlePublicar}
          >
            <Text style={styles.submitButtonText}>
              {isVaga ? 'Publicar Vaga' : 'Publicar Serviço'}
            </Text>
          </TouchableOpacity>
        </View>

      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const COR_PRIMARIA = '#C20E6A';
const COR_BORDA = '#E5E7EB';
const COR_TEXTO = '#111827';

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
  backButton: {
    padding: 4,
    marginLeft: -4,
  },
  headerTitulo: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COR_TEXTO,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 30,
  },
  // Estilos do Seletor (Abas)
  selectorContainer: {
    flexDirection: 'row',
    backgroundColor: '#F3F4F6',
    borderRadius: 12,
    padding: 4,
    marginTop: 5,
    marginBottom: 20,
  },
  selectorButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    borderRadius: 10,
    gap: 6,
  },
  selectorButtonActive: {
    backgroundColor: COR_PRIMARIA,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.15,
    shadowRadius: 2,
    elevation: 2,
  },
  selectorText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#4B5563',
  },
  selectorTextActive: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  // Estilos do Formulário
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COR_TEXTO,
    marginBottom: 16,
  },
  inputGroup: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: '700',
    color: COR_TEXTO,
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: COR_BORDA,
    borderRadius: 10,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 15,
    color: COR_TEXTO,
  },
  dropdownInput: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: COR_BORDA,
    borderRadius: 10,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  dropdownText: {
    fontSize: 15,
    color: COR_TEXTO,
  },
  textArea: {
    borderWidth: 1,
    borderColor: COR_BORDA,
    borderRadius: 10,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 15,
    color: COR_TEXTO,
    height: 100,
  },
  inputWithIcon: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COR_BORDA,
    borderRadius: 10,
    paddingHorizontal: 16,
  },
  inputIcon: {
    marginRight: 10,
  },
  inputFlex: {
    flex: 1,
    paddingVertical: 12,
    fontSize: 15,
    color: COR_TEXTO,
  },
  footer: {
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderTopWidth: 1,
    borderTopColor: '#F3F4F6',
    backgroundColor: '#FFFFFF',
  },
  submitButton: {
    backgroundColor: COR_PRIMARIA,
    borderRadius: 10,
    paddingVertical: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  submitButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});