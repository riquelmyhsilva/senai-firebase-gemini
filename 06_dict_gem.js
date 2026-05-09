/**
 * Criação de um objeto literal em JavaScript.
 * Utilizamos 'const' pois a referência da variável 'celular' ao objeto 
 * na memória não será reatribuída ao longo da execução.
 */
const celular = {
  // A propriedade 'marca' armazena um texto (String). 
  // O uso de aspas define claramente o tipo de dado textual.
  marca: "Samsung", 

  // A propriedade 'preco' armazena um valor numérico (Number/Int ou Float). 
  // Sem aspas, permitindo que no futuro possamos fazer cálculos matemáticos com ele.
  preco: 2499.90, 

  // A propriedade 'emEstoque' armazena um estado lógico (Boolean). 
  // 'true' ou 'false' são perfeitos para representar estados binários (tem ou não tem).
  emEstoque: true    
};

// ==========================================
// ACESSANDO E EXIBINDO OS DADOS
// ==========================================

// Para extrair e imprimir apenas o preço, utilizamos a "notação de ponto" (dot notation).
console.log(celular.preco);