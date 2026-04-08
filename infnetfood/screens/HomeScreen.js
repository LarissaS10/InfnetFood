import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import categorias from '../data/categorias';
import { useTema } from '../context/TemaContext';

export default function HomeScreen({ navigation }) {
  const { tema } = useTema();

  return (
    <View style={[styles.container, { backgroundColor: tema.fundo }]}>

      <View style={styles.cabecalho}>
        <Text style={styles.logo}>🍔</Text>
        <Text style={[styles.titulo, { color: tema.texto }]}>InfnetFood</Text>
        <Text style={[styles.subtitulo, { color: tema.textoSecundario }]}>O que você quer pedir hoje?</Text>
      </View>

      <View style={styles.botoes}>
        <TouchableOpacity style={styles.botao} onPress={() => navigation.navigate('Carrinho')}>
          <Text style={styles.botaoTexto}>🛒 Carrinho</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.botao} onPress={() => navigation.navigate('Pedidos')}>
          <Text style={styles.botaoTexto}>📋 Pedidos</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.botao} onPress={() => navigation.navigate('Perfil')}>
          <Text style={styles.botaoTexto}>👤 Perfil</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.botao} onPress={() => navigation.navigate('Mapa')}>
          <Text style={styles.botaoTexto}>🗺️ Mapa</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.botao} onPress={() => navigation.navigate('Configuracoes')}>
          <Text style={styles.botaoTexto}>⚙️ Configurações</Text>
        </TouchableOpacity>
      </View>

      <Text style={[styles.secao, { color: tema.texto }]}>Categorias</Text>

      <FlatList
        data={categorias}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[styles.card, { backgroundColor: tema.fundoCard, borderColor: tema.borda }]}
            onPress={() => navigation.navigate('Lojas', { categoria: item })}
          >
            <Text style={styles.icone}>{item.icone}</Text>
            <Text style={[styles.nome, { color: tema.texto }]}>{item.nome}</Text>
          </TouchableOpacity>
        )}
      />

    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  cabecalho: { alignItems: 'center', marginBottom: 16 },
  logo: { fontSize: 64 },
  titulo: { fontSize: 28, fontWeight: 'bold', marginTop: 8 },
  subtitulo: { fontSize: 16, marginTop: 4 },
  botoes: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginBottom: 16 },
  botao: {
    flex: 1,
    backgroundColor: '#55af59',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    minWidth: '45%',
  },
  botaoTexto: { color: '#fff', fontWeight: 'bold', fontSize: 14 },
  secao: { fontSize: 20, fontWeight: 'bold', marginBottom: 12 },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    marginBottom: 12,
    borderRadius: 8,
    borderWidth: 1,
  },
  icone: { fontSize: 32, marginRight: 16 },
  nome: { fontSize: 18 },
});