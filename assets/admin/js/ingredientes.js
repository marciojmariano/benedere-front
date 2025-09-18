let ingredientes = carregarIngredientesLocalStorage();

console.clear();
console.table(ingredientes);


function cadastrar($event) {
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
        return []
    }
    let ingredientes = JSON.parse(ingredientesLocalStorage)
    return ingredientes;


}