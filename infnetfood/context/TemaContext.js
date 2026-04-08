import { createContext, useState, useContext } from 'react';

const TemaContext = createContext();

export function TemaProvider({ children }) {
  const [temaEscuro, setTemaEscuro] = useState(false);

  function alternarTema() {
    setTemaEscuro((atual) => !atual);
  }

  const tema = {
    escuro: temaEscuro,
    fundo: temaEscuro ? '#1a1a1a' : '#ffffff',
    fundoCard: temaEscuro ? '#2a2a2a' : '#f9f9f9',
    texto: temaEscuro ? '#ffffff' : '#000000',
    textoSecundario: temaEscuro ? '#aaaaaa' : '#888888',
    borda: temaEscuro ? '#444444' : '#eeeeee',
  };

  return (
    <TemaContext.Provider value={{ tema, alternarTema }}>
      {children}
    </TemaContext.Provider>
  );
}

export function useTema() {
  return useContext(TemaContext);
}