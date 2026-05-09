// 1. Criando um "objeto" que simula o seu input
const meuInput = {
    value: "Valor inicial",
    type: "text"
};

// --- O QUE VOCÊ PODE FAZER ---

// Alterar uma propriedade interna (mutabilidade)
meuInput.value = "Novo texto digitado"; 
console.log(meuInput.value); // Saída: "Novo texto digitado"

// Adicionar novas propriedades
meuInput.placeholder = "Digite seu nome"; 


// --- O QUE VOCÊ NÃO PODE FAZER ---

try {
    // Tentar transformar a variável em outra coisa (reatribuição)
    meuInput = "Virei uma string"; 
} catch (erro) {
    console.log("Erro: " + erro.message); // Saída: Assignment to constant variable.
}
