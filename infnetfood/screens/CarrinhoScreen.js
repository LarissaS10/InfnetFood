import { useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { useCarrinho } from '../context/CarrinhoContext';
import { useTema } from '../context/TemaContext';

export default function CarrinhoScreen({ navigation }) {
  const { carrinho, removerItem, total } = useCarrinho();
  const { tema } = useTema();
  const [mensagem, setMensagem] = useState('');

  function finalizarPedido() {
    navigation.navigate('Checkout');
  }

  if (carrinho.length === 0) {
    return (
      <View style={[styles.vazio, { backgroundColor: tema.fundo }]}>
        <Text style={[styles.vazioTexto, { color: tema.textoSecundario }]}>Seu carrinho está vazio.</Text>
      </View>
    );
  }

  return (
    <View style={[styles.container, { backgroundColor: tema.fundo }]}>
      <FlatList
        data={carrinho}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={[styles.card, { backgroundColor: tema.fundoCard, borderColor: tema.borda }]}>
            <View>
              <Text style={[styles.nome, { color: tema.texto }]}>{item.nome}</Text>
              <Text style={[styles.info, { color: tema.textoSecundario }]}>
                {item.quantidade}x — R$ {(item.preco * item.quantidade).toFixed(2)}
              </Text>
            </View>
            <TouchableOpacity onPress={() => removerItem(item.id)}>
              <Text style={styles.remover}>Remover</Text>
            </TouchableOpacity>
          </View>
        )}
      />

      <View style={[styles.rodape, { borderColor: tema.borda }]}>
        <Text style={[styles.total, { color: tema.texto }]}>Total: R$ {total.toFixed(2)}</Text>
        {mensagem !== '' && (
          <View style={styles.mensagem}><Text style={styles.mensagemTexto}>{mensagem}</Text></View>
        )}
        <TouchableOpacity style={styles.botao} onPress={finalizarPedido}>
          <Text style={styles.botaoTexto}>Finalizar Pedido</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  vazio: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  vazioTexto: { fontSize: 18 },
  card: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 16, marginBottom: 12, borderRadius: 8, borderWidth: 1 },
  nome: { fontSize: 18, fontWeight: 'bold' },
  info: { fontSize: 14, marginTop: 4 },
  remover: { color: '#E63946', fontSize: 14 },
  rodape: { borderTopWidth: 1, paddingTop: 16 },
  total: { fontSize: 22, fontWeight: 'bold', marginBottom: 16 },
  mensagem: { backgroundColor: '#e6f4e6', padding: 12, borderRadius: 8, marginBottom: 12, borderWidth: 1, borderColor: '#55af59' },
  mensagemTexto: { color: '#55af59', fontSize: 15, fontWeight: 'bold', textAlign: 'center' },
  botao: { backgroundColor: '#55af59', padding: 16, borderRadius: 8, alignItems: 'center' },
  botaoTexto: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
});