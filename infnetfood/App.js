import { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { CarrinhoProvider } from './context/CarrinhoContext';
import { AuthProvider, useAuth } from './context/AuthContext';
import { TemaProvider } from './context/TemaContext';
import { pedirPermissao } from './utils/notificacoes';
import LoginScreen from './screens/LoginScreen';
import HomeScreen from './screens/HomeScreen';
import ProdutosScreen from './screens/ProdutosScreen';
import DetalhesScreen from './screens/DetalhesScreen';
import CarrinhoScreen from './screens/CarrinhoScreen';
import PerfilScreen from './screens/PerfilScreen';
import PedidosScreen from './screens/PedidosScreen';
import MapaScreen from './screens/MapaScreen';
import DetalhesRestauranteScreen from './screens/DetalhesRestauranteScreen';
import CheckoutScreen from './screens/CheckoutScreen';
import ConfiguracoesScreen from './screens/ConfiguracoesScreen';

const Stack = createNativeStackNavigator();

function AreaPublica() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Login" component={LoginScreen} />
    </Stack.Navigator>
  );
}

function AreaLogada() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Inicio" component={HomeScreen} />
      <Stack.Screen name="Lojas" component={ProdutosScreen} />
      <Stack.Screen name="Detalhes" component={DetalhesScreen} />
      <Stack.Screen name="Carrinho" component={CarrinhoScreen} />
      <Stack.Screen name="Perfil" component={PerfilScreen} />
      <Stack.Screen name="Pedidos" component={PedidosScreen} />
      <Stack.Screen name="Mapa" component={MapaScreen} />
      <Stack.Screen name="Loja" component={DetalhesRestauranteScreen} />
      <Stack.Screen name="Checkout" component={CheckoutScreen} />
      <Stack.Screen name="Configuracoes" component={ConfiguracoesScreen} />
    </Stack.Navigator>
  );
}

function Navegacao() {
  const { usuarioLogado } = useAuth();
  return usuarioLogado ? <AreaLogada /> : <AreaPublica />;
}

export default function App() {
  useEffect(() => {
    pedirPermissao();
  }, []);

  return (
    <AuthProvider>
      <TemaProvider>
        <CarrinhoProvider>
          <NavigationContainer>
            <Navegacao />
          </NavigationContainer>
        </CarrinhoProvider>
      </TemaProvider>
    </AuthProvider>
  );
}