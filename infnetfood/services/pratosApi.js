const BASE_URL = 'https://www.themealdb.com/api/json/v1/1';

export async function buscarImagemPrato(nomePrato) {
  try {
    const response = await fetch(`${BASE_URL}/search.php?s=${nomePrato}`);
    const data = await response.json();
    if (data.meals && data.meals.length > 0) {
      return data.meals[0].strMealThumb;
    }
    return null;
  } catch (error) {
    console.log('Erro ao buscar imagem:', error);
    return null;
  }
}

export async function buscarPratoAleatorio() {
  try {
    const response = await fetch(`${BASE_URL}/random.php`);
    const data = await response.json();
    if (data.meals && data.meals.length > 0) {
      return data.meals[0].strMealThumb;
    }
    return null;
  } catch (error) {
    console.log('Erro ao buscar prato:', error);
    return null;
  }
}