import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { useAuth } from '../context/AuthContext';
import { useTema } from '../context/TemaContext';

export default function PerfilScreen() {
  const { usuarioLogado, logout } = useAuth();
  const { tema } = useTema();

  return (
    <View style={[styles.container, { backgroundColor: tema.fundo }]}>
      <Image source={require('../assets/perfilApolo.jpg')} style={styles.foto} />
      <Text style={[styles.nome, { color: tema.texto }]}>{usuarioLogado.nome}</Text>

      <View style={[styles.card, { backgroundColor: tema.fundoCard, borderColor: tema.borda }]}>
        <View style={styles.linha}>
          <Text style={[styles.label, { color: tema.textoSecundario }]}>E-mail</Text>
          <Text style={[styles.valor, { color: tema.texto }]}>{usuarioLogado.email}</Text>
        </View>
        <View style={styles.linha}>
          <Text style={[styles.label, { color: tema.textoSecundario }]}>Telefone</Text>
          <Text style={[styles.valor, { color: tema.texto }]}>(21) 99999-9999</Text>
        </View>
        <View style={styles.linha}>
          <Text style={[styles.label, { color: tema.textoSecundario }]}>Endereço</Text>
          <Text style={[styles.valor, { color: tema.texto }]}>Rua das Flores, 123 - Rio de Janeiro</Text>
        </View>
      </View>

      <TouchableOpacity style={styles.botaoSair} onPress={logout}>
        <Text style={styles.botaoSairTexto}>Sair</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 24, alignItems: 'center' },
  foto: { width: 100, height: 100, borderRadius: 50, marginBottom: 12, marginTop: 24 },
  nome: { fontSize: 22, fontWeight: 'bold', marginBottom: 24 },
  card: { width: '100%', borderRadius: 8, borderWidth: 1, padding: 16 },
  linha: { marginBottom: 16 },
  label: { fontSize: 12, marginBottom: 2 },
  valor: { fontSize: 16 },
  botaoSair: { marginTop: 24, backgroundColor: '#E63946', padding: 14, borderRadius: 8, width: '100%', alignItems: 'center' },
  botaoSairTexto: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
});