import { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Animated } from 'react-native';
import { useCarrinho } from '../context/CarrinhoContext';
import { useTema } from '../context/TemaContext';

const enderecosMock = [
  'Rua das Flores, 123 - Rio de Janeiro',
  'Av. Atlântica, 456 - Copacabana',
  'Rua do Ouvidor, 789 - Centro',
];

const pagamentosMock = ['💳 Cartão de Crédito', '💵 Dinheiro', '📱 Pix'];

const notificacoes = [
  { icone: '🍔', titulo: 'Pedido recebido!', desc: 'Seu pedido foi confirmado e está sendo preparado.' },
  { icone: '🛵', titulo: 'Pedido a caminho!', desc: 'Seu pedido saiu para entrega. Aguarde!' },
  { icone: '✅', titulo: 'Pedido entregue!', desc: 'Bom apetite!' },
];

export default function CheckoutScreen({ navigation }) {
  const { carrinho, total, limparCarrinho, adicionarPedido } = useCarrinho();
  const { tema } = useTema();
  const [endereco, setEndereco] = useState('');
  const [pagamento, setPagamento] = useState('');
  const [erro, setErro] = useState('');
  const [pedidoFeito, setPedidoFeito] = useState(false);
  const [notifVisiveis, setNotifVisiveis] = useState([]);

  const escala = useRef(new Animated.Value(0)).current;
  const opacidade = useRef(new Animated.Value(0)).current;

  useEffect(() => {
  if (!pedidoFeito) return;

  notificacoes.forEach((_, index) => {
    setTimeout(() => {
      setNotifVisiveis((atual) => [...atual, index]);
    }, (index + 1) * 1500);
  });

  setTimeout(() => navigation.replace('Inicio'), 6000);
}, [pedidoFeito, navigation]);

  function animarConfirmacao() {
    Animated.parallel([
      Animated.spring(escala, { toValue: 1, friction: 4, useNativeDriver: true }),
      Animated.timing(opacidade, { toValue: 1, duration: 400, useNativeDriver: true }),
    ]).start();
  }

  function finalizar() {
    if (endereco === '') { setErro('❌ Selecione um endereço de entrega.'); return; }
    if (pagamento === '') { setErro('❌ Selecione um método de pagamento.'); return; }
    setErro('');
    adicionarPedido(carrinho, total);
    limparCarrinho();
    setPedidoFeito(true);
    animarConfirmacao();
  }

  if (pedidoFeito) {
    return (
      <View style={[styles.confirmacao, { backgroundColor: tema.fundo }]}>
        <Animated.Text style={[styles.confirmacaoIcone, { transform: [{ scale: escala }], opacity: opacidade }]}>
          ✅
        </Animated.Text>
        <Animated.Text style={[styles.confirmacaoTexto, { opacity: opacidade }]}>
          Pedido realizado com sucesso!
        </Animated.Text>

        {notificacoes.map((n, index) =>
          notifVisiveis.includes(index) ? (
            <NotifCard key={index} notif={n} />
          ) : null
        )}

        {notifVisiveis.length === notificacoes.length && (
          <Text style={[styles.confirmacaoSub, { color: tema.textoSecundario }]}>
            Voltando para o início...
          </Text>
        )}
      </View>
    );
  }

  return (
    <ScrollView style={[styles.container, { backgroundColor: tema.fundo }]}>
      <Text style={[styles.titulo, { color: tema.texto }]}>Revisar Pedido</Text>

      <Text style={styles.secao}>Itens</Text>
      {carrinho.map((item) => (
        <View key={item.id} style={[styles.item, { backgroundColor: tema.fundoCard, borderColor: tema.borda }]}>
          <Text style={[styles.itemNome, { color: tema.texto }]}>{item.nome}</Text>
          <Text style={[styles.itemInfo, { color: tema.textoSecundario }]}>
            {item.quantidade}x — R$ {(item.preco * item.quantidade).toFixed(2)}
          </Text>
        </View>
      ))}
      <Text style={[styles.total, { color: tema.texto }]}>Total: R$ {total.toFixed(2)}</Text>

      <Text style={styles.secao}>Endereço de Entrega</Text>
      {enderecosMock.map((end) => (
        <TouchableOpacity
          key={end}
          style={[styles.opcao, { backgroundColor: tema.fundoCard, borderColor: endereco === end ? '#55af59' : tema.borda }]}
          onPress={() => setEndereco(end)}
        >
          <Text style={[styles.opcaoTexto, { color: endereco === end ? '#55af59' : tema.texto }]}>📍 {end}</Text>
        </TouchableOpacity>
      ))}

      <Text style={styles.secao}>Método de Pagamento</Text>
      {pagamentosMock.map((pag) => (
        <TouchableOpacity
          key={pag}
          style={[styles.opcao, { backgroundColor: tema.fundoCard, borderColor: pagamento === pag ? '#55af59' : tema.borda }]}
          onPress={() => setPagamento(pag)}
        >
          <Text style={[styles.opcaoTexto, { color: pagamento === pag ? '#55af59' : tema.texto }]}>{pag}</Text>
        </TouchableOpacity>
      ))}

      {erro !== '' && (
        <View style={styles.erro}>
          <Text style={styles.erroTexto}>{erro}</Text>
        </View>
      )}

      <TouchableOpacity style={styles.botao} onPress={finalizar}>
        <Text style={styles.botaoTexto}>Finalizar Pedido</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

function NotifCard({ notif }) {
  const opacidade = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(20)).current;

  useEffect(() => {
  Animated.parallel([
    Animated.timing(opacidade, { toValue: 1, duration: 400, useNativeDriver: true }),
    Animated.spring(translateY, { toValue: 0, useNativeDriver: true }),
  ]).start();
}, [opacidade, translateY]);

  return (
    <Animated.View style={[styles.statusBox, { opacity: opacidade, transform: [{ translateY }] }]}>
      <Text style={styles.statusItem}>{notif.icone} {notif.titulo}</Text>
      <Text style={styles.statusDesc}>{notif.desc}</Text>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  titulo: { fontSize: 24, fontWeight: 'bold', marginBottom: 16 },
  secao: { fontSize: 18, fontWeight: 'bold', marginTop: 16, marginBottom: 8, color: '#55af59' },
  item: { padding: 12, borderRadius: 8, borderWidth: 1, marginBottom: 8 },
  itemNome: { fontSize: 16, fontWeight: 'bold' },
  itemInfo: { fontSize: 14, marginTop: 2 },
  total: { fontSize: 20, fontWeight: 'bold', marginTop: 8, marginBottom: 8 },
  opcao: { padding: 14, borderRadius: 8, borderWidth: 1, marginBottom: 8 },
  opcaoTexto: { fontSize: 15 },
  erro: { backgroundColor: '#fde8e8', padding: 12, borderRadius: 8, marginTop: 12, borderWidth: 1, borderColor: '#E63946' },
  erroTexto: { color: '#E63946', fontSize: 15, fontWeight: 'bold', textAlign: 'center' },
  botao: { backgroundColor: '#55af59', padding: 16, borderRadius: 8, alignItems: 'center', marginTop: 16, marginBottom: 32 },
  botaoTexto: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
  confirmacao: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 24 },
  confirmacaoIcone: { fontSize: 80, marginBottom: 16 },
  confirmacaoTexto: { fontSize: 22, fontWeight: 'bold', color: '#55af59', marginBottom: 16 },
  confirmacaoSub: { fontSize: 14, marginTop: 24 },
  statusBox: {
    backgroundColor: '#e6f4e6',
    borderWidth: 1,
    borderColor: '#55af59',
    borderRadius: 8,
    padding: 12,
    marginTop: 12,
    width: '100%',
  },
  statusItem: { fontSize: 15, fontWeight: 'bold', color: '#55af59' },
  statusDesc: { fontSize: 13, color: '#555', marginTop: 4 },
});