// Tabela de preços dos ingredientes
const precosIngredientes = {
    fg1: { nome: "Filé de frango", preco: 20.0 },
    fg2: { nome: "Sobrecoxa de frango", preco: 15.0 },
    px1: { nome: "Filé de tilápia", preco: 25.0 },
    px2: { nome: "Filé de salmão", preco: 40.0 },
    bv1: { nome: "Patinho Moído", preco: 30.0 },
    bv2: { nome: "Filé mignon bovino", preco: 50.0 },
    sn1: { nome: "Filé mignon suíno", preco: 35.0 },
    cb1: { nome: "Arroz", preco: 5.0 },
    cb2: { nome: "Batata Baroa", preco: 8.0 },
    cb3: { nome: "Batata Doce", preco: 7.0 },
    cb4: { nome: "Batata Inglesa", preco: 6.0 },
    cb5: { nome: "Purê de Batata Baroa", preco: 10.0 },
    cb6: { nome: "Purê de Batata Doce", preco: 9.0 },
    cb7: { nome: "Purê de Batata Inglesa", preco: 8.0 },
    lg1: { nome: "Abóbrinha", preco: 4.0 },
    lg2: { nome: "Berinjela", preco: 5.0 },
    lg3: { nome: "Brócolis", preco: 6.0 },
    lg4: { nome: "Cenoura", preco: 3.0 },
    lg5: { nome: "Couve Flor", preco: 7.0 },
    lg6: { nome: "Vagem", preco: 4.0 }
};

let ingredientes = carregarIngredientesLocalStorage();

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