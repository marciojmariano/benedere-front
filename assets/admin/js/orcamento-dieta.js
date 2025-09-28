let ingredientes = carregarIngredientesLocalStorage();
let orcamentos = carregarOrcamentosLocalStorage();


// Tabela de preços dos ingredientes
const ingredientesCarboidratos = ingredientes.filter(ingrediente => ingrediente.tipo === "carboidrato");
const ingredientesProteinas = ingredientes.filter(proteina => proteina.tipo === "proteina");
const ingredientesLegumes = ingredientes.filter(legume => legume.tipo === "legumes");
const ingredientesLeguminosas = ingredientes.filter(leguminosa => leguminosa.tipo === "leguminosa");

//const ingredientesLeguminosa = ingredientes.filter(leguminosa => leguminosa.tipo === "leguminosa");

const selectIngredientes = document.getElementById("ingredientes");
const inputQuantidade = document.getElementById(`quantidade-ingredientes`);

const totalQuantidadeElemento = document.getElementById("totalQuantidade");
const totalPrecoElemento = document.getElementById("totalPreco");
const tabelaOrcamentos = document.getElementById("tabelaItens").querySelector("tbody");

// Variáveis para armazenar os totais
let totalQuantidade = 0;
let totalPreco = 0;

// Função para adicionar ingrediente à tabela
function adicionarIngrediente() {
    debugger
    const tipoRefeicao = document.querySelector("input[name='tipoRefeicao']:checked").value;
    const ingredienteSelecionado = selectIngredientes.value;
    const quantidade = (parseInt(inputQuantidade.value, 10)) / 1000;
    const ingrediente = ingredientes.filter(ingrediente => ingrediente.id === ingredienteSelecionado)[0];

    if (!ingredienteSelecionado || isNaN(quantidade) || quantidade <= 0) {
        alert("Por favor, selecione um ingrediente e informe uma quantidade válida.");
        return;
    }

    if (ingrediente === undefined) {
        alert("Ingrediente selecionado inválido!");
        return;
    }
    const precoUnitario = ingrediente.valor;
    const precoTotal = precoUnitario * quantidade;
    salvarLocalStorage(tipoRefeicao, ingrediente, quantidade, precoTotal);

    listarIngredientesTabela();
    atualizarTotais(quantidade, precoTotal);

    selectIngredientes.value = "";
    inputQuantidade.value = 0;
}

function salvarLocalStorage(tipoRefeicao, ingrediente, quantidade, precoTotal) {
    let orcamento = {
        refeicao: tipoRefeicao,
        quantidade: quantidade,
        ingrediente: ingrediente,
        precoTotal: precoTotal
    }
    orcamentos.push(orcamento);
    localStorage.setItem("orcamentos", JSON.stringify(orcamentos));
}

function criarLinhaTabela(tabelaOrcamentos, orcamento) {
    const novaLinha = document.createElement("tr");

    novaLinha.innerHTML = `
        <td>${orcamento.refeicao}</td>
        <td>${orcamento.ingrediente.nome}</td>
        <td>${orcamento.quantidade}</td>
        <td>R$ ${orcamento.ingrediente.valor.toFixed(2).replace(".", ",")}</td>
        <td>R$ ${orcamento.precoTotal.toFixed(2).replace(".", ",")}</td>
    `;
    tabelaOrcamentos.appendChild(novaLinha);
}

// Função para atualizar os totais na interface
function atualizarTotais(quantidade, precoTotal) {
    totalQuantidade += quantidade; //Coisa nova que aprendi +=
    totalPreco += precoTotal;

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

function carregarOrcamentosLocalStorage() {
    let orcamentosLocalStorage = localStorage.getItem("orcamentos");
    if (orcamentosLocalStorage == null) {
        return []
    }
    let orcamentos = JSON.parse(orcamentosLocalStorage)
    return orcamentos;
}


function definirIngredientes($event) {
    //debugger
    let tipo = $event.target.value;
    if (tipo === "carboidrato") {
        criarOptions(ingredientesCarboidratos);
    } else if (tipo === "proteina") {
        criarOptions(ingredientesProteinas);
    } else if (tipo === "legume") {
        criarOptions(ingredientesLegumes);
    } else if (tipo === "leguminosa") {
        criarOptions(ingredientesLeguminosas);
    }
}

function criarOptions(ingredientes) {
    //<option value="arroz">Arroz</option>
    selectIngredientes.innerHTML = "<option disabled selected>-- Selecione um ingrediente --</option>";
    ingredientes.forEach(ingrediente => {
        selectIngredientes.innerHTML += `<option value="${ingrediente.id}">${ingrediente.nome}</option>`
    });
}

function listarIngredientesTabela() {
    tabelaOrcamentos.innerHTML = "";

    orcamentos.forEach(orcamento => {
        criarLinhaTabela(tabelaOrcamentos, orcamento);
    });
}

// Carrega os ingredientes na tabela ao carregar a página
document.addEventListener("DOMContentLoaded", () => {
    listarIngredientesTabela();
});