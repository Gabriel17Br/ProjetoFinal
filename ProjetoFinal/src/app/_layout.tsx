import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';

export default function TabLayout() {
  return (
    <Tabs screenOptions={{ 
      tabBarActiveTintColor: '#E6007E', 
      tabBarInactiveTintColor: '#9CA3AF', 
      headerShown: false 
    }}>
      
      {/* 1º BOTÃO: Tela de Serviços */}
      <Tabs.Screen
        name="servicos_feed"
        options={{
          title: 'Serviços',
          tabBarIcon: ({ color, size }: any) => (
            <Ionicons name="list" size={size} color={color} />
          ),
        }}
      />

      {/* 4º BOTÃO: Tela de Publicar Vaga */}
      <Tabs.Screen
        name="publicar"
        options={{
          title: 'Publicar',
          tabBarIcon: ({ color, size }: any) => (
            <AntDesign name="plus" size={24} color={color} />
          ),
        }}
      /> 
      {/* 3º BOTÃO: Tela de Buscar Vagas */}
      <Tabs.Screen
        name="buscar_vagas"
        options={{
          title: 'Buscar Vagas',
          tabBarIcon: ({ color, size }: any) => (
            <Ionicons name="list" size={size} color={color} />
          ),
        }}
      /> 
        {/* 2º BOTÃO: Tela de Perfil */}
        <Tabs.Screen
          name="perfil_usuario"
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