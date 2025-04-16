import { useState } from "react";
import { createGlobalStyle, styled } from "styled-components";
import bkPlantas from "./assets/bkPlantas.jpg";

// Componente auxiliar para exibir uma linha da tabela
function Linha({ titulo, valor }) {
  return (
    <tr>
      <td style={{ fontWeight: "bold", padding: "6px", borderBottom: "1px solid #ccc" }}>{titulo}</td>
      <td style={{ padding: "6px", borderBottom: "1px solid #ccc" }}>{valor}</td>
    </tr>
  );
}

export default function App() {
  const [nome, setNome] = useState("");
  const [resultado, setResultado] = useState(null);

  async function handlePesquisar() {
    if (!nome) return;
    try {
      // Faz a requisição para o backend Flask passando o nome científico pela URL
      const res = await fetch(`https://consulta-flora.onrender.com/api/consulta?nome=${nome}`);
      const dados = await res.json();
      setResultado(dados);
    } catch {
      setResultado({ erro: "Erro ao consultar a API" });
    }
  }

  return (
    <>
      <GlobalStyle />
      <Container>
        <h1>Consultas de plantas</h1>
        <div>
          <h2>Digite o nome científico</h2>
          <input
            type="text"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
          />
          <button onClick={handlePesquisar}>Pesquisar</button>

          {resultado && (
            <div style={{ backgroundColor: "#ffffffcc", padding: "1rem", marginTop: "1rem", borderRadius: "8px" }}>
              {resultado.erro ? (
                <p>{resultado.erro}</p>
              ) : (
                <table style={{ width: "100%", borderCollapse: "collapse" }}>
                  <tbody>
                    <Linha titulo="Nome Científico" valor={resultado.nome_cientifico} />
                    <Linha titulo="Autor" valor={resultado.autor} />
                    <Linha titulo="Nome Comum" valor={resultado.nome_comum} />
                    <Linha titulo="Família" valor={resultado.familia} />
                    <Linha titulo="Gênero" valor={resultado.genero} />
                    <Linha titulo="Reino" valor={resultado.reino} />
                    <Linha titulo="Forma de Vida" valor={resultado.forma_vida} />
                    <Linha titulo="Tipo de Vegetação" valor={resultado.vegetacao} />
                    <Linha titulo="Distribuição por UFs" valor={resultado.distribuicao} />
                    <Linha titulo="Origem" valor={resultado.origem} />
                    <Linha titulo="Endemismo" valor={resultado.endemismo} />
                  </tbody>
                </table>
              )}
            </div>
          )}
        </div>
      </Container>
    </>
  );
}

// Estilos globais
const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
`;

// Estilo do container principal
const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 100vw;
  height: 100vh;
  background-image: url(${bkPlantas});
  background-size: cover;
`;
