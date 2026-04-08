import { createContext, useState, useContext } from 'react';

const CarrinhoContext = createContext();

export function CarrinhoProvider({ children }) {
  const [carrinho, setCarrinho] = useState([]);
  const [pedidos, setPedidos] = useState([]);

  function adicionarItem(produto, quantidade) {
    setCarrinho((atual) => {
      const existe = atual.find((item) => item.id === produto.id);
      if (existe) {
        return atual.map((item) =>
          item.id === produto.id
            ? { ...item, quantidade: item.quantidade + quantidade }
            : item
        );
      }
      return [...atual, { ...produto, quantidade }];
    });
  }

  function removerItem(id) {
    setCarrinho((atual) => atual.filter((item) => item.id !== id));
  }

  function limparCarrinho() {
    setCarrinho([]);
  }

  function adicionarPedido(itensDoPedido, totalDoPedido) {
    const novoPedido = {
      id: String(pedidos.length + 4), 
      data: new Date().toLocaleDateString('pt-BR'),
      status: 'Aguardando',
      itens: itensDoPedido.map((i) => `${i.nome} x${i.quantidade}`),
      total: totalDoPedido,
    };
    setPedidos((atual) => [novoPedido, ...atual]);
  }

  const total = carrinho.reduce(
    (soma, item) => soma + item.preco * item.quantidade, 0
  );

  return (
    <CarrinhoContext.Provider value={{ carrinho, adicionarItem, removerItem, limparCarrinho, adicionarPedido, pedidos, total }}>
      {children}
    </CarrinhoContext.Provider>
  );
}

export function useCarrinho() {
  return useContext(CarrinhoContext);
}