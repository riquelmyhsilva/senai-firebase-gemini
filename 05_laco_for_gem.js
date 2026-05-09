/**
 * Script de processamento da lista de supermercado.
 * Atuando como um pipeline simples de leitura e exibição de dados.
 */

// 1. A Fonte de Dados (Dataset)
// Utilizamos um Array constante para armazenar nossa lista de strings.
const listaDeSupermercado = [
  "Arroz",
  "Feijão",
  "Café",
  "Ovos",
  "Maçãs"
];

// 2. O Processamento / Iteração
// Utilizamos o método forEach para percorrer cada elemento do nosso array sequencialmente.
listaDeSupermercado.forEach(function(item) {
  // 3. A Saída de Dados (Output)
  // Utilizamos Template Literals (as crases ``) para interpolar a variável dentro da string de forma limpa.
  console.log(`preciso comprar: ${item}`);
});