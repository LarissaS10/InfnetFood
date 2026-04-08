import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import restaurantes from '../data/restaurantes';
import { useTema } from '../context/TemaContext';

export default function ProdutosScreen({ route, navigation }) {
  const { categoria } = route.params;
  const { tema } = useTema();

  const restaurantesDaCategoria = restaurantes.filter((r) => r.categoriaId === categoria.id);

  return (
    <View style={[styles.container, { backgroundColor: tema.fundo }]}>
      <Text style={[styles.titulo, { color: tema.texto }]}>{categoria.icone} {categoria.nome}</Text>
      <Text style={[styles.subtitulo, { color: tema.textoSecundario }]}>Escolha um restaurante</Text>

      <FlatList
        data={restaurantesDaCategoria}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[styles.card, { backgroundColor: tema.fundoCard, borderColor: tema.borda }]}
            onPress={() => navigation.navigate('Loja', { restaurante: item })}
          >
            <Text style={[styles.nome, { color: tema.texto }]}>{item.nome}</Text>
            <Text style={[styles.endereco, { color: tema.textoSecundario }]}>📍 {item.endereco}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  titulo: { fontSize: 24, fontWeight: 'bold', marginBottom: 4 },
  subtitulo: { fontSize: 14, marginBottom: 16 },
  card: { padding: 16, marginBottom: 12, borderRadius: 8, borderWidth: 1 },
  nome: { fontSize: 18, fontWeight: 'bold' },
  endereco: { fontSize: 13, marginTop: 4 },
});