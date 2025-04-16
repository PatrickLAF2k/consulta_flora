from flask import Flask, request, jsonify
from flask_cors import CORS
import requests

app = Flask(__name__)
CORS(app)  # Libera acesso ao frontend para permitir requisições cross-origin

@app.route("/api/consulta", methods=["GET"])
def consultar():
    # Obtendo o nome científico da planta a partir dos parâmetros da URL
    nome_cientifico = request.args.get("nome")
    
    # Verificando se o nome científico foi fornecido
    if not nome_cientifico:
        return jsonify({"erro": "Nome científico não fornecido"}), 400
    
    # URL da API com base no nome científico
    url = f"https://servicos.jbrj.gov.br/v2/flora/taxon/{nome_cientifico}"

    try:
        # Fazendo a requisição à API externa
        response = requests.get(url)
        
        if response.status_code == 200:
            dados = response.json()
            
            # Verificando se os dados foram encontrados
            if dados:
                planta = dados[0]  # A resposta da API vem como uma lista de plantas
                
                # Corrigindo o erro da chave 'taxon' que não estava entre aspas
                taxon = planta.get("taxon", {})
                
                # Extraindo as informações da planta
                nome_cientifico_completo = taxon.get("scientificname", "—")
                nome_autor = taxon.get("scientificnameauthorship", "—")
                familia = taxon.get("family", "—")
                genero = taxon.get("genus", "—")
                reino = taxon.get("kingdom", "—")
                
                # Extraindo os nomes comuns da planta
                nomes_comuns = planta.get("vernacular_name", [])
                nomes_comum = ",".join([n["vernacularname"] for n in nomes_comuns]) or "—"
                
                # Extraindo formas de vida e tipo de vegetação
                formas_vida = planta.get("specie_profile", {}).get("lifeForm", [])
                categoria = ", ".join(formas_vida) or "—"
                
                vegetacoes = planta.get("specie_profile", {}).get("vegetationType", [])
                tipo_vegetacao = ", ".join(vegetacoes) or "—"
                
                # Corrigindo o nome da chave 'distribution' ao invés de 'distribuition'
                distribuicoes = planta.get("distribution", [])
                
                # Obtendo os estados (UFs) onde a planta é encontrada
                estados = [d["locationid"].replace("BR-", "") for d in distribuicoes]
                distribuicao_ufs = ", ".join(sorted(set(estados))) or "—"
                
                # Identificando a origem da planta (Nativa, Cultivada ou Exótica)
                origens = set(d["establishmentmeans"].upper() for d in distribuicoes)
                if "NATIVA" in origens:
                    origem = "Nativa"
                elif "CULTIVADA" in origens:
                    origem = "Cultivada"
                else:
                    origem = "Exótica"
                
                # Verificando o status de endemismo
                endemismo = set()
                for d in distribuicoes:
                    end = d.get("occurrenceremarks", {}).get("endemism")
                    if end:
                        endemismo.add(end)
                endemismo_status = ", ".join(endemismo) if endemismo else "—"

                # Retornando os dados extraídos da API para o frontend
                return jsonify({
                    "nome_cientifico": nome_cientifico_completo,
                    "autor": nome_autor,
                    "nome_comum": nomes_comum,
                    "familia": familia,
                    "genero": genero,
                    "reino": reino,
                    "forma_vida": categoria,
                    "vegetacao": tipo_vegetacao,
                    "distribuicao": distribuicao_ufs,
                    "origem": origem,
                    "endemismo": endemismo_status
                }), 200, {'content-type': 'application/json; charset=utf-8'}
        else:
            # Retorna erro 404 se a planta não for encontrada
            return jsonify({"erro": "Planta não encontrada"}), 404
    except requests.RequestException as e:
        # Retorna erro 500 em caso de falha na consulta
        return jsonify({"erro": "Erro na consulta", "detalhes": str(e)}), 500

# Inicia o servidor
if __name__ == "__main__":
    app.run(debug=True)