# 🍔 InfnetFood

App de pedidos e delivery de lanches e refeições desenvolvido em React Native com Expo.

## Configuração

Antes de começar, você precisa ter instalado na sua máquina:

- [Node.js](https://nodejs.org/) (versão 18 ou superior)
- [Git](https://git-scm.com/)
- Aplicativo **Expo Go** no seu celular:
([Android](https://play.google.com/store/apps/details?id=host.exp.exponent) / [iOS](https://apps.apple.com/app/expo-go/id982107779))

## Como executar

### Opção 1 — Pelo Snack Expo (mais fácil, sem instalar nada)
Acesse o link e escaneie o QR Code com o Expo Go:
🔗 (https://snack.expo.dev/@lari_moreti/infnetfood)

QR code do projeto (para facilitar a vida ;)
<img width="324" height="322" alt="image" src="https://github.com/user-attachments/assets/38f78193-aafa-4fde-bc86-9066fe441ba4" />


### Opção 2 — Rodando localmente

**1. Clone o repositório**
```bash
git clone https://github.com/LarissaS10/InfnetFood.git
```

**2. Entre na pasta do projeto**
```bash
cd InfnetFood
```

**3. Instale as dependências**
```bash
npm install
```

**4. Instale o Expo CLI (se não tiver)**
```bash
npm install -g expo-cli
```

**5. Inicie o projeto**
```bash
npx expo start
```

**6. Abra no celular**
- Abra o aplicativo **Expo Go** no celular
- Escaneie o QR Code que aparecer no terminal

## Dependências principais

| Pacote | Versão |
|--------|--------|
| react-native-paper | 4.9.2 |
| @expo/vector-icons | ^15.0.3 |
| @react-navigation/native | * |
| @react-navigation/native-stack | * |
| react-native-screens | ~4.16.0 |
| react-native-safe-area-context | ~5.6.0 |

## Credenciais de teste

| Campo | Valor |
|-------|-------|
| E-mail | user@infnet.com |
| Senha | 1234 |

## Funcionalidades

- ✅ Login com autenticação mockada
- ✅ Listagem de categorias
- ✅ Restaurantes por categoria
- ✅ Cardápio do restaurante
- ✅ Detalhes do produto com imagem da API
- ✅ Carrinho de compras
- ✅ Checkout com endereço e pagamento
- ✅ Histórico de pedidos
- ✅ Perfil do usuário
- ✅ Mapa com restaurantes
- ✅ Tema claro e escuro
- ✅ Animações com Animated

## Telas

| Tela | Descrição |
|------|-----------|
| Login | Autenticação do usuário |
| Home | Página inicial com categorias |
| Restaurantes | Lista de restaurantes por categoria |
| Cardápio | Produtos do restaurante selecionado |
| Detalhes | Detalhes do produto com imagem real |
| Carrinho | Itens selecionados e total |
| Checkout | Revisão do pedido, endereço e pagamento |
| Pedidos | Histórico de pedidos |
| Perfil | Dados do usuário logado |
| Mapa | Mapa com restaurantes do Centro do Rio |
| Configurações | Troca de tema claro/escuro |

## API externa

O app consome a API pública **TheMealDB** para exibir imagens reais de pratos na tela de detalhes do produto.
🔗 https://www.themealdb.com/api.php

## Autor

Desenvolvido por **Larissa** para o Assessment da disciplina Desenvolvimento Mobile com React Native — Instituto Infnet.
