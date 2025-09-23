let ingredientes = carregarIngredientesLocalStorage();

console.clear();
console.table(ingredientes);


function cadastrar($event) {
    debugger
    $event.preventDefault(); //Garante que não vai enviar pra lugar nenhum os dados do form
    const campoTipo = document.getElementById("tipo");
    const campoNome = document.getElementById("nome");
    const campoValor = document.getElementById("valor");
    const tipo = campoTipo.value;
    const nome = campoNome.value;
    const valor = campoValor.value;
    const id = crypto.randomUUID();
    console.log("Tipo: " + tipo + " - Nome: " + nome + " - Valor: " + valor);
    let ingrediente = {
        id: id, nome: nome, tipo: tipo, valor: valor
    };
    ingredientes.push(ingrediente);
    localStorage.setItem("ingredientes", JSON.stringify(ingredientes));
    console.clear();
    console.table(ingredientes);
    //localStorage.setItem("nome", nome);
    //localStorage.setItem("tipo", tipo);
    //localStorage.setItem("valor", valor);
}

function carregarIngredientesLocalStorage() {
    let ingredientesLocalStorage = localStorage.getItem("ingredientes");
    if (ingredientesLocalStorage == null) {
        //return []
        let massaDados = massaDeDados();
        localStorage.setItem("ingredientes", JSON.stringify(massaDados));
        return massaDados;
    }
    let ingredientes = JSON.parse(ingredientesLocalStorage)
    return ingredientes;
}

function massaDeDados() {
    return [
        {
            id: crypto.randomUUID(),
            nome: "Filé de frango",
            tipo: "proteina",
            valor: 20.0
        },
        {
            id: crypto.randomUUID(),
            nome: "Sobrecoxa de frango",
            tipo: "proteina",
            valor: 15.0
        },
        {
            id: crypto.randomUUID(),
            nome: "Filé de tilápia",
            tipo: "proteina",
            valor: 25.0
        },
        {
            id: crypto.randomUUID(),
            nome: "Filé de salmão",
            tipo: "proteina",
            valor: 40.0
        },
        {
            id: crypto.randomUUID(),
            nome: "Patinho Moído",
            tipo: "proteina",
            valor: 30.0
        },
        {
            id: crypto.randomUUID(),
            nome: "Filé mignon bovino",
            tipo: "proteina",
            valor: 50.0
        },
        {
            id: crypto.randomUUID(),
            nome: "Filé mignon suíno",
            tipo: "proteina",
            valor: 35.0
        },
        {
            id: crypto.randomUUID(),
            nome: "Arroz",
            tipo: "carboidrato",
            valor: 5.0
        },
        {
            id: crypto.randomUUID(),
            nome: "Batata Baroa",
            tipo: "carboidrato",
            valor: 8.0
        },
        {
            id: crypto.randomUUID(),
            nome: "Batata Doce",
            tipo: "carboidrato",
            valor: 7.0
        },
        {
            id: crypto.randomUUID(),
            nome: "Batata Inglesa",
            tipo: "carboidrato",
            valor: 6.0
        },
        {
            id: crypto.randomUUID(),
            nome: "Purê de Batata Baroa",
            tipo: "carboidrato",
            valor: 10.0
        },
        {
            id: crypto.randomUUID(),
            nome: "Purê de Batata Doce",
            tipo: "carboidrato",
            valor: 9.0
        },
        {
            id: crypto.randomUUID(),
            nome: "Purê de Batata Inglesa",
            tipo: "carboidrato",
            valor: 8.0
        },
        {
            id: crypto.randomUUID(),
            nome: "Abóbrinha",
            tipo: "legumes",
            valor: 4.0
        },
        {
            id: crypto.randomUUID(),
            nome: "Berinjela",
            tipo: "legumes",
            valor: 5.0
        },
        {
            id: crypto.randomUUID(),
            nome: "Brócolis",
            tipo: "legumes",
            valor: 6.0
        },
        {
            id: crypto.randomUUID(),
            nome: "Cenoura",
            tipo: "legumes",
            valor: 3.0
        },
        {
            id: crypto.randomUUID(),
            nome: "Couve Flor",
            tipo: "legumes",
            valor: 7.0
        },
        {
            id: crypto.randomUUID(),
            nome: "Vagem",
            tipo: "legumes",
            valor: 4.0
        }
    ]
}

// Função para listar os ingredientes na pagina
function listarIngredientesTabela() {
    const ingredientes = carregarIngredientesLocalStorage();
    const tabelaIngredientes = document.querySelector("#listaIngredientes tbody");
    tabelaIngredientes.innerHTML = "";

    ingredientes.forEach(ingrediente => {
        const linha = document.createElement("tr");

        const colunaNome = document.createElement("td");
        colunaNome.textContent = ingrediente.nome;

        const colunaTipo = document.createElement("td");
        colunaTipo.textContent = ingrediente.tipo;

        const colunaValor = document.createElement("td");
        colunaValor.textContent = "R$ " + ingrediente.valor.toFixed(2).replace(".", ",");


        linha.appendChild(colunaNome);
        linha.appendChild(colunaTipo);
        linha.appendChild(colunaValor);

        tabelaIngredientes.appendChild(linha);
    });
}

// Carrega os ingredientes na tabela ao carregar a página
document.addEventListener("DOMContentLoaded", () => {
    listarIngredientesTabela();
});