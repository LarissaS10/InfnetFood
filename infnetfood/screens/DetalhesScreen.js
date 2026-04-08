import { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Animated, Image, ActivityIndicator } from 'react-native';
import { useCarrinho } from '../context/CarrinhoContext';
import { useTema } from '../context/TemaContext';
import { buscarPratoAleatorio } from '../services/pratosApi';

export default function DetalhesScreen({ route, navigation }) {
  const { produto } = route.params;
  const [quantidade, setQuantidade] = useState(1);
  const [mensagem, setMensagem] = useState('');
  const [imagem, setImagem] = useState(null);
  const [carregando, setCarregando] = useState(true);
  const { adicionarItem } = useCarrinho();
  const { tema } = useTema();

  const escala = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    buscarPratoAleatorio().then((url) => {
      setImagem(url);
      setCarregando(false);
    });
  }, []);

  function animarBotao() {
    Animated.sequence([
      Animated.spring(escala, { toValue: 1.2, useNativeDriver: true }),
      Animated.spring(escala, { toValue: 1, useNativeDriver: true }),
    ]).start();
  }

  function adicionar() {
    adicionarItem(produto, quantidade);
    animarBotao();
    setMensagem(`✅ ${quantidade}x ${produto.nome} adicionado ao carrinho!`);
    setTimeout(() => setMensagem(''), 3000);
  }

  return (
    <View style={[styles.container, { backgroundColor: tema.fundo }]}>

      {carregando ? (
        <View style={styles.imagemPlaceholder}>
          <ActivityIndicator size="large" color="#55af59" />
        </View>
      ) : imagem ? (
        <Image source={{ uri: imagem }} style={styles.imagem} resizeMode="cover" />
      ) : (
        <View style={styles.imagemPlaceholder}>
          <Text style={styles.imagemEmoji}>🍽️</Text>
        </View>
      )}

      <Text style={[styles.nome, { color: tema.texto }]}>{produto.nome}</Text>
      <Text style={[styles.descricao, { color: tema.textoSecundario }]}>{produto.descricao}</Text>
      <Text style={[styles.preco, { color: tema.texto }]}>R$ {produto.preco.toFixed(2)}</Text>

      <View style={styles.quantidade}>
        <TouchableOpacity
          style={[styles.botao, { backgroundColor: tema.fundoCard }]}
          onPress={() => setQuantidade(q => Math.max(1, q - 1))}
        >
          <Text style={[styles.botaoTexto, { color: tema.texto }]}>-</Text>
        </TouchableOpacity>
        <Text style={[styles.numero, { color: tema.texto }]}>{quantidade}</Text>
        <TouchableOpacity
          style={[styles.botao, { backgroundColor: tema.fundoCard }]}
          onPress={() => setQuantidade(q => q + 1)}
        >
          <Text style={[styles.botaoTexto, { color: tema.texto }]}>+</Text>
        </TouchableOpacity>
      </View>

      <Text style={[styles.total, { color: tema.texto }]}>
        Total: R$ {(produto.preco * quantidade).toFixed(2)}
      </Text>

      {mensagem !== '' && (
        <View style={styles.mensagem}>
          <Text style={styles.mensagemTexto}>{mensagem}</Text>
        </View>
      )}

      <Animated.View style={{ transform: [{ scale: escala }] }}>
        <TouchableOpacity style={styles.adicionar} onPress={adicionar}>
          <Text style={styles.adicionarTexto}>Adicionar ao Carrinho</Text>
        </TouchableOpacity>
      </Animated.View>

      <TouchableOpacity
        style={[styles.verCarrinho, { backgroundColor: tema.escuro ? '#444' : '#333' }]}
        onPress={() => navigation.navigate('Carrinho')}
      >
        <Text style={styles.verCarrinhoTexto}>Ver Carrinho</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 24 },
  imagem: { width: '100%', height: 200, borderRadius: 8, marginBottom: 16 },
  imagemPlaceholder: {
    width: '100%',
    height: 200,
    borderRadius: 8,
    marginBottom: 16,
    backgroundColor: '#f0f0f0',
    alignItems: 'center',
    justifyContent: 'center',
  },
  imagemEmoji: { fontSize: 48 },
  nome: { fontSize: 26, fontWeight: 'bold', marginBottom: 8 },
  descricao: { fontSize: 16, marginBottom: 16 },
  preco: { fontSize: 22, marginBottom: 24 },
  quantidade: { flexDirection: 'row', alignItems: 'center', marginBottom: 16 },
  botao: { padding: 10, borderRadius: 6, width: 40, alignItems: 'center' },
  botaoTexto: { fontSize: 20, fontWeight: 'bold' },
  numero: { fontSize: 22, marginHorizontal: 24 },
  total: { fontSize: 20, fontWeight: 'bold', marginBottom: 16 },
  mensagem: { backgroundColor: '#e6f4e6', padding: 12, borderRadius: 8, marginBottom: 16, borderWidth: 1, borderColor: '#55af59' },
  mensagemTexto: { color: '#55af59', fontSize: 15, fontWeight: 'bold', textAlign: 'center' },
  adicionar: { backgroundColor: '#55af59', padding: 16, borderRadius: 8, alignItems: 'center', marginBottom: 12 },
  adicionarTexto: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
  verCarrinho: { padding: 16, borderRadius: 8, alignItems: 'center' },
  verCarrinhoTexto: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
});