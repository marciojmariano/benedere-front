// Função para calcular o valor total
function calcularOrcamento() {
    // Pega o valor do produto selecionado
    let produtoSelect = document.getElementById("produto");
    let valorProduto = parseFloat(produtoSelect.value);
    
    // Pega a quantidade informada
    let quantidade = parseInt(document.getElementById("quantidade").value);
    
    // Pega o campo onde vamos mostrar o resultado
    let campoTotal = document.getElementById("valorTotal");
    
    // Verifica se um produto foi selecionado e se a quantidade é válida
    if (produtoSelect.value === "" || quantidade <= 0 || isNaN(quantidade)) {
        campoTotal.value = "R$ 0,00";
        return;
    }
    
    // Calcula o valor total
    let valorTotal = valorProduto * quantidade;
    
    // Formata o valor para moeda brasileira e exibe no campo
    campoTotal.value = "R$ " + valorTotal.toFixed(2).replace(".", ",");
}

// Função para limpar todos os campos
function limparCalculo() {
    document.getElementById("produto").value = "";
    document.getElementById("quantidade").value = "1";
    document.getElementById("valorTotal").value = "R$ 0,00";
}

