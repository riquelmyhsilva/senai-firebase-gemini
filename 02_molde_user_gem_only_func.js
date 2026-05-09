/**
 * Função Fábrica (Factory Function): createUserProfile
 * Atua como o "molde" para perfis da rede social sem utilizar Classes.
 * * @param {string} usernameStr - O nome de usuário (String)
 * @param {number} ageInt - A idade do usuário (Inteiro)
 * @param {boolean} isPublicBool - Se o perfil é aberto ao público (Booleano)
 */
function createUserProfile(usernameStr, ageInt, isPublicBool) {
  // ==========================================
  // 1. ESTADO PRIVADO (Encapsulamento com Closures)
  // ==========================================
  // DECISÃO DE ARQUITETURA: Usamos 'const' para valores que NUNCA devem 
  // ser reatribuídos após a criação do perfil.
  const id = "usr_" + Date.now() + "_" + Math.floor(Math.random() * 1000);
  const joinDate = new Date().toISOString();

  // DECISÃO DE ARQUITETURA: Usamos 'let' para variáveis internas que 
  // mudarão ao longo do tempo (estado mutável). Elas ficam "escondidas" 
  // dentro da função, protegidas de alterações externas diretas.
  let bio = "";               // String
  let friendsCount = 0;       // Inteiro (Number)
  let isOnline = false;       // Booleano

  // ==========================================
  // 2. O OBJETO DO USUÁRIO (A Instância)
  // ==========================================
  // Construímos e retornamos o objeto que representa o usuário real.
  const profile = {
    // Propriedades públicas
    username: usernameStr,
    age: ageInt,
    isPublic: isPublicBool,
    posts: [], // Array para guardar as postagens

    // --- MÉTODOS (COMPORTAMENTOS) ---

    /**
     * Atualiza a biografia, garantindo que seja uma String.
     */
    updateBio: function(newBio) {
      if (typeof newBio === 'string') {
        bio = newBio;
        return true;
      }
      return false; // Falha se não for string
    },

    /**
     * Altera o status online do usuário, exigindo um Booleano.
     */
    setOnlineStatus: function(status) {
      if (typeof status === 'boolean') {
        isOnline = status;
      }
    },

    /**
     * Adiciona um amigo, manipulando nosso Inteiro interno.
     */
    addFriend: function() {
      friendsCount += 1;
    },

    /**
     * Cria uma postagem, usando Strings para o texto e Inteiros para os likes.
     */
    createPost: function(contentStr) {
      if (typeof contentStr === 'string' && contentStr.trim() !== "") {
        // 'const' garante que a estrutura deste post específico não seja sobrescrita acidentalmente
        const newPost = {
          postId: "post_" + Date.now(),
          content: contentStr, // String
          likes: 0             // Inteiro
        };
        this.posts.unshift(newPost); // Adiciona no topo do array
        return newPost;
      }
    },

    /**
     * Retorna um resumo seguro do perfil, juntando propriedades públicas 
     * e variáveis privadas (graças ao Closure).
     */
    getSummary: function() {
      return {
        id: id,                     // Vindo da const privada
        username: this.username,    // Vindo da propriedade pública
        age: this.age,              // Vindo da propriedade pública (Inteiro)
        isPublic: this.isPublic,    // Vindo da propriedade pública (Booleano)
        bio: bio,                   // Vindo do let privado (String)
        friendsCount: friendsCount, // Vindo do let privado (Inteiro)
        isOnline: isOnline,         // Vindo do let privado (Booleano)
        postsCount: this.posts.length
      };
    }
  };

  // O "molde" finaliza seu trabalho entregando o objeto pronto
  return profile; 
}

// ==========================================
// TESTANDO O MOLDE (SIMULAÇÃO SEM INTERFACE)
// ==========================================

// 1. Criando perfis (usando o tipo String, Int e Boolean)
const user1 = createUserProfile("carlos_dev", 28, true);
const user2 = createUserProfile("ana_tech", 32, false);

// 2. Modificando o estado usando os métodos
user1.updateBio("Apaixonado por JavaScript puro."); // String
user1.setOnlineStatus(true); // Boolean
user1.addFriend(); // Incrementa o Int internamente
user1.addFriend(); 

user1.createPost("Hoje aprendi sobre Factory Functions!");

// 3. Imprimindo os resultados
console.log("--- Resumo do Carlos ---");
console.log(user1.getSummary());

console.log("\n--- Resumo da Ana ---");
console.log(user2.getSummary());