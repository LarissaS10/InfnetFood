import { View, Text, FlatList, StyleSheet } from 'react-native';
import pedidosMock from '../data/pedidos';
import { useCarrinho } from '../context/CarrinhoContext';
import { useTema } from '../context/TemaContext';

function corStatus(status) {
  if (status === 'Entregue') return '#55af59';
  if (status === 'Em andamento') return '#f0a500';
  return '#888';
}

export default function PedidosScreen() {
  const { pedidos } = useCarrinho();
  const { tema } = useTema();
  const todosPedidos = [...pedidos, ...pedidosMock];

  return (
    <View style={[styles.container, { backgroundColor: tema.fundo }]}>
      <Text style={[styles.titulo, { color: tema.texto }]}>Meus Pedidos</Text>
      <FlatList
        data={todosPedidos}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={[styles.card, { backgroundColor: tema.fundoCard, borderColor: tema.borda }]}>
            <View style={styles.topo}>
              <Text style={[styles.data, { color: tema.textoSecundario }]}>Pedido #{item.id} — {item.data}</Text>
              <Text style={[styles.status, { color: corStatus(item.status) }]}>{item.status}</Text>
            </View>
            <Text style={[styles.label, { color: tema.textoSecundario }]}>Itens:</Text>
            {item.itens.map((i, index) => (
              <Text key={index} style={[styles.item, { color: tema.texto }]}>• {i}</Text>
            ))}
            <Text style={[styles.total, { color: tema.texto }]}>Total: R$ {item.total.toFixed(2)}</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  titulo: { fontSize: 24, fontWeight: 'bold', marginBottom: 16 },
  card: { padding: 16, marginBottom: 12, borderRadius: 8, borderWidth: 1 },
  topo: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 },
  data: { fontSize: 14 },
  status: { fontSize: 14, fontWeight: 'bold' },
  label: { fontSize: 14, marginBottom: 4 },
  item: { fontSize: 15, marginBottom: 2 },
  total: { fontSize: 16, fontWeight: 'bold', marginTop: 8 },
});