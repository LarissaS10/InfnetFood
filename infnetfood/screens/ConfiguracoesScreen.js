import { View, Text, StyleSheet, TouchableOpacity, Switch } from 'react-native';
import { useTema } from '../context/TemaContext';

export default function ConfiguracoesScreen() {
  const { tema, alternarTema } = useTema();

  return (
    <View style={[styles.container, { backgroundColor: tema.fundo }]}>
      <Text style={[styles.titulo, { color: tema.texto }]}>Configurações</Text>

      <View style={[styles.card, { backgroundColor: tema.fundoCard, borderColor: tema.borda }]}>
        <View style={styles.linha}>
          <Text style={[styles.label, { color: tema.texto }]}>
            {tema.escuro ? '🌙 Tema Escuro' : '☀️ Tema Claro'}
          </Text>
          <Switch
            value={tema.escuro}
            onValueChange={alternarTema}
            trackColor={{ false: '#ccc', true: '#55af59' }}
            thumbColor={tema.escuro ? '#fff' : '#fff'}
          />
        </View>
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 24 },
  titulo: { fontSize: 24, fontWeight: 'bold', marginBottom: 24 },
  card: {
    borderRadius: 8,
    borderWidth: 1,
    padding: 16,
  },
  linha: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  label: { fontSize: 16 },
});