import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function AppTabs() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#C20E6A', // Cor rosa principal do seu app
        tabBarInactiveTintColor: '#9CA3AF',
        headerShown: false,
        tabBarStyle: {
          backgroundColor: '#FFFFFF',
          borderTopWidth: 1,
          borderTopColor: '#F3F4F6',
          height: 60,
          paddingBottom: 8,
          paddingTop: 8,
        },
      }}
    >
      {/* Aba 1: Buscar Vagas (arquivo index.tsx) */}
      <Tabs.Screen
        name="index"
        options={{
          title: 'Buscar',
          tabBarIcon: ({ color, size }: any) => (
            <Ionicons name="search" size={size} color={color} />
          ),
        }}
      />

      {/* Aba 2: Publicar Vaga/Serviço (arquivo publicar.tsx) */}
      <Tabs.Screen
        name="publicar"
        options={{
          title: 'Publicar',
          tabBarIcon: ({ color, size }: any) => (
            <Ionicons name="add-circle" size={size} color={color} />
          ),
        }}
      />

      {/* Aba 3: Perfil (arquivo perfil.tsx) */}
      <Tabs.Screen
        name="perfil"
        options={{
          title: 'Perfil',
          tabBarIcon: ({ color, size }: any) => (
            <Ionicons name="person" size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}