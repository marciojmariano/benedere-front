let ingredientes = carregarIngredientesLocalStorage();

// [
//   {
//     "id": "54b2bf8e-3289-4df3-8fb9-7003b3b88efc",
//     "nome": "Grão de Bico",
//     "tipo": "leguminosa",
//     "valor": "15"
//   },
//   {
//     "id": "255eb2b2-a6cf-4b81-9cc4-80f76c95c94d",
//     "nome": "Arroz Negro",
//     "tipo": "carboidrato",
//     "valor": "10"
//   },
//   {
//     "id": "b04b5c6b-9cbb-47b2-87b2-88a541a94877",
//     "nome": "Salmão",
//     "tipo": "proteina",
//     "valor": "100"
//   }
// ]
// Tabela de preços dos ingredientes
const ingredientesCarboidratos = ingredientes.filter(ingrediente => ingrediente.tipo === "carboidrato");
const ingredientesProteinas = ingredientes.filter(proteina => proteina.tipo === "proteina");
const ingredientesLegumes = ingredientes.filter(legume => legume.tipo === "legumes");
//const ingredientesLeguminosa = ingredientes.filter(leguminosa => leguminosa.tipo === "leguminosa");

const selectIngredientes = document.getElementById("ingredientes");

// Variáveis para armazenar os totais
let totalQuantidade = 0;
let totalPreco = 0;

// Função para adicionar ingrediente à tabela
function adicionarIngrediente(tipoIngrediente) {
    const selecaoTipoIngrediente = document.getElementById(tipoIngrediente);
    const quantidadeInformada = document.getElementById(`quantidade-${tipoIngrediente}`);
    const ingredienteSelecionado = selecaoTipoIngrediente.value;
    const quantidade = (parseInt(quantidadeInformada.value, 10)) / 1000;

    if (!ingredienteSelecionado || isNaN(quantidade) || quantidade <= 0) {
        alert("Por favor, selecione um ingrediente e informe uma quantidade válida.");
        return;
    }

    if (!precosIngredientes[ingredienteSelecionado]) {
        alert("Ingrediente selecionado inválido!");
        return;
    }

    const ingrediente = precosIngredientes[ingredienteSelecionado];
    const precoUnitario = ingrediente.preco;
    const precoTotal = precoUnitario * quantidade;

    totalQuantidade += quantidade; //Coisa nova que aprendi +=
    totalPreco += precoTotal;

    const tabelaIngredientes = document.getElementById("tabelaItens").querySelector("tbody");
    const novaLinha = document.createElement("tr");

    novaLinha.innerHTML = `
        <td>${ingrediente.nome}</td>
        <td>${quantidade}</td>
        <td>R$ ${precoUnitario.toFixed(2).replace(".", ",")}</td>
        <td>R$ ${precoTotal.toFixed(2).replace(".", ",")}</td>
    `;

    tabelaIngredientes.appendChild(novaLinha);

    atualizarTotais();

    selecaoTipoIngrediente.value = "";
    quantidadeInformada.value = 0;
}

// Função para atualizar os totais na interface
function atualizarTotais() {
    const totalQuantidadeElemento = document.getElementById("totalQuantidade");
    const totalPrecoElemento = document.getElementById("totalPreco");

    totalQuantidadeElemento.textContent = totalQuantidade.toFixed(3).replace(".", ",");
    totalPrecoElemento.textContent = `R$ ${totalPreco.toFixed(2).replace(".", ",")}`;
}

function carregarIngredientesLocalStorage() {
    let ingredientesLocalStorage = localStorage.getItem("ingredientes");
    if (ingredientesLocalStorage == null) {
        return []
    }
    let ingredientes = JSON.parse(ingredientesLocalStorage)
    return ingredientes;


}

function definirIngredientes($event) {
    //debugger
    let tipo = $event.target.value;
    if (tipo === "carboidrato") {
        criarOptions(ingredientesCarboidratos);
    } else if (tipo === "proteina") {
        criarOptions(ingredientesProteinas);
    }

}

function criarOptions(ingredientes) {
    //<option value="arroz">Arroz</option>
    selectIngredientes.innerHTML = "<option disabled selected>-- Selecione um ingrediente --</option>";
    ingredientes.forEach(ingrediente => {
        selectIngredientes.innerHTML += `<option value="arroz">${ingrediente.nome}</option>`

    });
}
