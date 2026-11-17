import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function TabLayout() {
  return (
    <Tabs screenOptions={{ 
      tabBarActiveTintColor: '#E6007E', 
      tabBarInactiveTintColor: '#9CA3AF', 
      headerShown: false 
    }}>
      
      {/* 1º BOTÃO: Tela de Serviços */}
      <Tabs.Screen
        name="index"
        options={{
          title: 'Serviços',
          tabBarIcon: ({ color, size }: any) => (
            <Ionicons name="list" size={size} color={color} />
          ),
        }}
      />

      {/* 2º BOTÃO: Tela de Perfil */}
      <Tabs.Screen
        name="perfil_usuario"
        options={{
          title: 'Meu Perfil',
          tabBarIcon: ({ color, size }: any) => (
            <Ionicons name="person" size={size} color={color} />
          ),
        }}
      />

    </Tabs>
  );
}