export default function Taxon({ data }) {
  const [result] = data;

  const {
    scientificname,
    taxonrank,
    nomenclaturalstatus,
    taxonomicstatus,
    kingdom,
    phylum,
    class: clasee,
    order,
    family,
    genus,
    specificepithet,
    infraspecificepithet,
    scientificnameauthorship,
    acceptednameusage,
    higherclassification,
    source,
    parentnameusage,
    namepublishedin,
    namepublishedinyear,
    references,
    bibliographiccitation_how_to_cite,
    modified,
  } = result.taxon;
  return (
    <div>
      <h2>Táxon</h2>
      <h3>Nome científico</h3>
      <p>{scientificname}</p>

      <h3>Nível taxonômico</h3>
      <p>{taxonrank}</p>

      <h3>Status nomenclatural</h3>
      <p>{nomenclaturalstatus}</p>

      <h3>Status taxonômico</h3>
      <p>{taxonomicstatus}</p>

      <h3>Reino</h3>
      <p>{kingdom}</p>

      <h3>Filo</h3>
      <p>{phylum}</p>

      <h3>Classe</h3>
      <p>{clasee}</p>

      <h3>Ordem</h3>
      <p>{order}</p>

      <h3>Família</h3>
      <p>{family}</p>

      <h3>Gênero</h3>
      <p>{genus}</p>

      <h3>Epíteto específico</h3>
      <p>{specificepithet}</p>

      <h3>Epíteto infraespecífico</h3>
      <p>{infraspecificepithet}</p>

      <h3>Autoria do nome científico</h3>
      <p>{scientificnameauthorship}</p>

      <h3>Nome aceito relacionado</h3>
      <p>{acceptednameusage}</p>

      <h3>Classificação superior</h3>
      <p>{higherclassification}</p>

      <h3>Fonte</h3>
      <p>{source}</p>

      <h3>Nome do táxon pai</h3>
      <p>{parentnameusage}</p>

      <h3>Nome publicado em</h3>
      <p>
        {namepublishedin && namepublishedinyear
          ? `${namepublishedin} no ano de ${namepublishedinyear}`
          : "Informação não disponível"}
      </p>

      <h3>Referência online</h3>
      <p>{references}</p>

      <h3>Como citar</h3>
      <p>{bibliographiccitation_how_to_cite}</p>

      <h3>Última modificação</h3>
      <p>{modified}</p>
    </div>
  );
}
