import axios from "axios";

export async function buscarPlanta(nomeCientifico) {
  try {
    const resposta = await axios.get(
      `https://servicos.jbrj.gov.br/v2/flora/taxon/${nomeCientifico}`
    );
    return resposta.data;
  } catch (error) {
    console.error("Erro ao buscar planta:", error);
    throw error;
  }
}
