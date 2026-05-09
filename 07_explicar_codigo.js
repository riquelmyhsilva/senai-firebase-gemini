/**
 * Análise do Código: Filtragem de Arrays em JavaScript
 */

// ==========================================
// 1. A FONTE DE DADOS (Dataset)
// ==========================================
// Declaramos um array (lista) chamado 'notas' que guarda números inteiros.
// Usamos 'const' como decisão de arquitetura para garantir que a variável 'notas' 
// jamais seja acidentalmente reatribuída a outro tipo de dado ao longo do sistema.
const notas = [5, 8, 4, 9, 10];

// ==========================================
// 2. O PROCESSAMENTO (Transformação/Filtragem)
// ==========================================
// O método '.filter()' percorre automaticamente o array 'notas' inteiro.
// Para cada elemento dentro da lista, ele executa uma função de teste.
// Aqui, estamos passando uma "Arrow Function" (Função Seta): nota => nota >= 7.
// A lógica é: "Para cada 'nota' na lista, retorne 'true' se ela for maior ou igual a 7".
// Se for 'true', o elemento é guardado. Se for 'false', o elemento é ignorado.
const aprovados = notas.filter(nota => nota >= 7);

// ==========================================
// 3. A SAÍDA (Output)
// ==========================================
// Por fim, usamos a interface do sistema para exibir os dados resultantes.
// O console imprimirá um novo array contendo apenas [8, 9, 10].
console.log(aprovados);