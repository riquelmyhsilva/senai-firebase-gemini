/**
 * Função responsável por validar a regra de negócio de entrada na festa.
 * @param {number} idade - A idade da pessoa que deseja entrar.
 */
function verificarEntrada(idade) {
  // A regra de negócio principal avalia se a idade é maior ou igual a 18
  if (idade >= 18) {
    console.log("entrada liberada");
  } else {
    console.log("entrada bloqueada");
  }
}

// Execução do teste conforme o requisito
verificarEntrada(15);