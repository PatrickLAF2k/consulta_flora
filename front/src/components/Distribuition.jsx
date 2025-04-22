export default function Distribuition({ data }) {
  const [result] = data;

  // Agrupar distribuição por país
  const distribuicoesPorPais = {};

  result.distribuition.forEach((item) => {
    const { countrycode, locationid, establishmentmeans, occurrenceremarks } = item;

    const estado = locationid.split("-")[1] || locationid;
    const endemism = occurrenceremarks?.endemism || "Não informado";
    const dominio = occurrenceremarks?.phytogeographicDomain?.join(", ") || "Não informado";

    const localFormatado = `${estado} - ${establishmentmeans} - ${endemism} - ${dominio}`;

    if (!distribuicoesPorPais[countrycode]) {
      distribuicoesPorPais[countrycode] = [];
    }

    distribuicoesPorPais[countrycode].push(localFormatado);
  });

  return (
    <div>
      <h2>Distribuição</h2>

      {Object.entries(distribuicoesPorPais).map(([pais, locais]) => (
        <div key={pais}>
          <h3>País: {pais}</h3>
          <ul>
            {locais.map((local, index) => (
              <li key={index}>{local}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
