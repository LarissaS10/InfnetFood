import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import produtos from '../data/produtos';
import { useTema } from '../context/TemaContext';

export default function DetalhesRestauranteScreen({ route, navigation }) {
  const { restaurante } = route.params;
  const { tema } = useTema();

  const produtosDoRestaurante = produtos.filter((p) => p.restauranteId === restaurante.id);

  return (
    <View style={[styles.container, { backgroundColor: tema.fundo }]}>
      <View style={[styles.cabecalho, { backgroundColor: tema.fundoCard, borderColor: tema.borda }]}>
        <Text style={styles.icone}>{restaurante.tipo.split(' ')[0]}</Text>
        <Text style={[styles.nome, { color: tema.texto }]}>{restaurante.nome}</Text>
        <Text style={[styles.endereco, { color: tema.textoSecundario }]}>📍 {restaurante.endereco}</Text>
      </View>

      <Text style={[styles.secao, { color: '#55af59' }]}>Cardápio</Text>

      <FlatList
        data={produtosDoRestaurante}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[styles.card, { backgroundColor: tema.fundoCard, borderColor: tema.borda }]}
            onPress={() => navigation.navigate('Detalhes', { produto: item })}
          >
            <Text style={[styles.produtoNome, { color: tema.texto }]}>{item.nome}</Text>
            <Text style={[styles.produtoPreco, { color: '#55af59' }]}>R$ {item.preco.toFixed(2)}</Text>
            <Text style={[styles.produtoDesc, { color: tema.textoSecundario }]}>{item.descricao}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  cabecalho: { alignItems: 'center', marginBottom: 24, padding: 16, borderRadius: 8, borderWidth: 1 },
  icone: { fontSize: 48, marginBottom: 8 },
  nome: { fontSize: 22, fontWeight: 'bold', marginBottom: 4 },
  endereco: { fontSize: 14 },
  secao: { fontSize: 18, fontWeight: 'bold', marginBottom: 12 },
  card: { padding: 16, marginBottom: 12, borderRadius: 8, borderWidth: 1 },
  produtoNome: { fontSize: 18, fontWeight: 'bold' },
  produtoPreco: { fontSize: 15, marginTop: 4 },
  produtoDesc: { fontSize: 13, marginTop: 4 },
});