import { useState } from "react";
import Taxon from "./components/Taxon";
import Distribuition from "./components/Distribuition";
import { buscarPlanta } from "./service/floralApi";
import { createGlobalStyle, styled } from "styled-components";
import bkPlantas from "./assets/bkPlantas.jpg";

export default function App() {
  const [nomePlanta, setNomePlanta] = useState("");
  const [resultado, setResultado] = useState(null);

  const handleBuscar = async () => {
    setResultado(null);

    try {
      const dados = await buscarPlanta(nomePlanta);
      setResultado(dados);
      console.log(dados);
    } catch (error) {
      console.log("Erro ao buscar planta:", error);
    }
  };

  return (
    <>
      <GlobalStyle />
      <Container>
        <h1>Digite o nome da planta - Tabebuia roseoalba</h1>

        <input
          type="text"
          onChange={(e) => setNomePlanta(e.target.value)}
          placeholder="Nome científico"
          value={nomePlanta}
        />
        <button onClick={handleBuscar}>Buscar</button>

        {resultado && (
          <>
            <Taxon data={resultado} />
            <Distribuition data={resultado} />
          </>
        )}
      </Container>
    </>
  );
}

// Estilos
const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
`;

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
