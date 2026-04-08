import { View, Text, StyleSheet, FlatList, TouchableOpacity, Linking, Image } from 'react-native';
import restaurantes from '../data/restaurantes';
import { useTema } from '../context/TemaContext';

export default function MapaScreen({ navigation }) {
  const { tema } = useTema();

  function abrirMaps() {
    Linking.openURL('https://www.google.com/maps/search/restaurantes/@-22.9035,-43.1729,15z');
  }

  return (
    <View style={[styles.container, { backgroundColor: tema.fundo }]}>
      <TouchableOpacity onPress={abrirMaps}>
        <Image source={require('../assets/mapa.jpg')} style={styles.mapa} resizeMode="cover" />
        <View style={styles.overlay}>
          <Text style={styles.overlayTexto}>🗺️ Toque para abrir no Google Maps</Text>
        </View>
      </TouchableOpacity>

      <Text style={[styles.titulo, { color: tema.texto }]}>Restaurantes no Centro do Rio</Text>

      <FlatList
        data={restaurantes}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[styles.card, { backgroundColor: tema.fundoCard, borderColor: tema.borda }]}
            onPress={() => navigation.navigate('Loja', { restaurante: item })}
          >
            <Text style={[styles.tipo, { color: tema.textoSecundario }]}>{item.tipo}</Text>
            <Text style={[styles.nome, { color: tema.texto }]}>{item.nome}</Text>
            <Text style={[styles.endereco, { color: tema.textoSecundario }]}>{item.endereco}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  mapa: { width: '100%', height: 220 },
  overlay: { backgroundColor: '#55af59', padding: 8, alignItems: 'center' },
  overlayTexto: { color: '#fff', fontSize: 13, fontWeight: 'bold' },
  titulo: { fontSize: 18, fontWeight: 'bold', padding: 16, paddingBottom: 8 },
  card: { padding: 12, marginHorizontal: 16, marginBottom: 8, borderRadius: 8, borderWidth: 1 },
  tipo: { fontSize: 12 },
  nome: { fontSize: 16, fontWeight: 'bold' },
  endereco: { fontSize: 13, marginTop: 2 },
});