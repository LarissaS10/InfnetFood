import * as Notifications from 'expo-notifications';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

export async function pedirPermissao() {
  const { status } = await Notifications.requestPermissionsAsync();
  return status === 'granted';
}

export async function notificarPedidoRecebido() {
  await Notifications.scheduleNotificationAsync({
    content: {
      title: '🍔 Pedido recebido!',
      body: 'Seu pedido foi confirmado e está sendo preparado.',
    },
    trigger: { seconds: 2 },
  });
}

export async function notificarPedidoSaiu() {
  await Notifications.scheduleNotificationAsync({
    content: {
      title: '🛵 Pedido a caminho!',
      body: 'Seu pedido saiu para entrega. Aguarde!',
    },
    trigger: { seconds: 5 },
  });
}

export async function notificarPedidoEntregue() {
  await Notifications.scheduleNotificationAsync({
    content: {
      title: '✅ Pedido entregue!',
      body: 'Seu pedido foi entregue. Bom apetite!',
    },
    trigger: { seconds: 10 },
  });
}