import { useState, useRef, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Animated } from 'react-native';
import { useAuth } from '../context/AuthContext';
import { useTema } from '../context/TemaContext';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [erro, setErro] = useState('');
  const { login } = useAuth();
  const { tema } = useTema();

  const escala = useRef(new Animated.Value(0)).current;

  useEffect(() => {
  Animated.spring(escala, { toValue: 1, friction: 4, useNativeDriver: true }).start();
}, [escala]);

  function handleLogin() {
    if (email === '' || senha === '') { setErro('❌ Preencha todos os campos.'); return; }
    if (!email.includes('@')) { setErro('❌ E-mail inválido.'); return; }
    const sucesso = login(email, senha);
    if (!sucesso) { setErro('❌ E-mail ou senha incorretos.'); return; }
    setErro('');
  }

  return (
    <View style={[styles.container, { backgroundColor: tema.fundo }]}>
      <Animated.Text style={[styles.logo, { transform: [{ scale: escala }] }]}>🍔</Animated.Text>
      <Text style={[styles.titulo, { color: tema.texto }]}>InfnetFood</Text>

      <TextInput
        style={[styles.input, { backgroundColor: tema.fundoCard, borderColor: tema.borda, color: tema.texto }]}
        placeholder="E-mail"
        placeholderTextColor={tema.textoSecundario}
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
      />
      <TextInput
        style={[styles.input, { backgroundColor: tema.fundoCard, borderColor: tema.borda, color: tema.texto }]}
        placeholder="Senha"
        placeholderTextColor={tema.textoSecundario}
        value={senha}
        onChangeText={setSenha}
        secureTextEntry
      />

      {erro !== '' && (
        <View style={styles.erro}><Text style={styles.erroTexto}>{erro}</Text></View>
      )}

      <TouchableOpacity style={styles.botao} onPress={handleLogin}>
        <Text style={styles.botaoTexto}>Entrar</Text>
      </TouchableOpacity>
      <Text style={[styles.dica, { color: tema.textoSecundario }]}>Use: user@infnet.com / 1234</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
  flex: 1,
  justifyContent: 'flex-start',
  padding: 24,
  paddingTop: 80,
},
  logo: { fontSize: 80, textAlign: 'center', marginBottom: 8 },
  titulo: { fontSize: 28, fontWeight: 'bold', marginBottom: 24, textAlign: 'center' },
  input: { borderWidth: 1, borderRadius: 6, padding: 10, marginBottom: 12, fontSize: 16 },
  erro: { backgroundColor: '#fde8e8', padding: 12, borderRadius: 8, marginBottom: 12, borderWidth: 1, borderColor: '#E63946' },
  erroTexto: { color: '#E63946', fontSize: 15, fontWeight: 'bold', textAlign: 'center' },
  botao: { backgroundColor: '#55af59', padding: 14, borderRadius: 8, alignItems: 'center', marginBottom: 12 },
  botaoTexto: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
  dica: { marginTop: 8, textAlign: 'center', fontSize: 12 },
});