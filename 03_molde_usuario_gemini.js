/**
 * Classe UserProfile
 * Atua como o "molde" (blueprint) para todos os perfis da rede social.
 */
class UserProfile {
  
  // O constructor é o método chamado no momento exato em que "fabricamos" um novo perfil.
  constructor(username, fullName, email) {
    // DECISÃO DE ARQUITETURA: Identificador único. 
    // Em produção, isso viria do banco de dados (ex: UUID). Aqui simulamos com timestamp e números aleatórios.
    this.id = Date.now().toString() + Math.floor(Math.random() * 1000); 
    
    // Propriedades básicas do usuário
    this.username = username;
    this.fullName = fullName;
    this.email = email;
    this.bio = ""; // Inicia vazia, o usuário pode preencher depois.
    
    // DECISÃO DE ARQUITETURA: Auditoria. 
    // Sempre guarde quando um registro foi criado.
    this.joinDate = new Date(); 
    
    // DECISÃO DE ARQUITETURA: Estrutura de dados para conexões (amigos).
    // Usamos 'Set' em vez de um simples Array '[]'. 
    // O Set garante nativamente que não haverá IDs duplicados (uma pessoa não pode seguir a mesma pessoa duas vezes).
    this.connections = new Set(); 
    
    // Array simples para armazenar as postagens do usuário.
    this.posts = []; 
  }

  // --- MÉTODOS (COMPORTAMENTOS) ---

  /**
   * Atualiza a biografia do usuário.
   */
  updateBio(newBio) {
    // Validação simples: garante que a bio seja uma string e não ultrapasse um limite.
    if (typeof newBio === 'string' && newBio.length <= 160) {
      this.bio = newBio;
      return true;
    }
    return false; // Falha na atualização (ex: texto muito longo)
  }

  /**
   * Adiciona uma nova conexão (amigo/seguidor) usando o ID do outro usuário.
   */
  addConnection(otherUserId) {
    // Evita que o usuário conecte-se a si mesmo
    if (otherUserId !== this.id) {
      this.connections.add(otherUserId);
    }
  }

  /**
   * Remove uma conexão existente.
   */
  removeConnection(otherUserId) {
    this.connections.delete(otherUserId);
  }

  /**
   * Cria uma nova publicação.
   */
  createPost(content) {
    if (!content || content.trim() === "") return; // Não permite postagens vazias

    const newPost = {
      postId: "post_" + Date.now(),
      content: content,
      timestamp: new Date(),
      likes: 0
    };

    // Adiciona a nova postagem no início do array (ordem cronológica reversa)
    this.posts.unshift(newPost); 
    return newPost;
  }

  /**
   * Retorna um resumo dos dados do perfil para serem lidos pelo sistema.
   * Não interage com tela, apenas retorna os dados formatados.
   */
  getProfileSummary() {
    return {
      id: this.id,
      handle: `@${this.username}`,
      name: this.fullName,
      bio: this.bio,
      connectionsCount: this.connections.size, // O tamanho do 'Set' nos dá o número de conexões
      postsCount: this.posts.length
    };
  }
}

// ==========================================
// TESTANDO O MOLDE (SIMULAÇÃO SEM INTERFACE)
// ==========================================

// 1. Criando dois novos perfis usando o molde (instanciação)
const user1 = new UserProfile("joaodasilva", "João Silva", "joao@email.com");
const user2 = new UserProfile("mariacoders", "Maria Souza", "maria@email.com");
const rodrigo = new UserProfile("rodrigofernando", "Rodrigo Fernando", "rodrigo@email.com")

// 2. Simulando ações no sistema
user1.updateBio("Desenvolvedor aprendendo arquitetura de software!");
user1.createPost("Olá mundo! Esta é minha primeira postagem na rede.");
user1.createPost("Javascript puro é muito elegante.");

// 3. Simulando conexões sociais
user1.addConnection(user2.id); // João se conecta com a Maria
user1.addConnection(user2.id); // Tentativa de duplicidade: O 'Set' vai ignorar esta linha nativamente

// 4. Lendo os resultados do sistema via console
console.log("--- Resumo do Perfil do João ---");
console.log(user1.getProfileSummary());

console.log("\n--- Feed de Postagens do João ---");
console.log(user1.posts);


rodrigo.updateBio("Aprendendo a usar o Gemini no desenvolvimento de aplicativos.");
rodrigo.createPost("Oi, pessoal. Esse é meu primeiro post.");
rodrigo.createPost("Javascript puro é muito top!");
rodrigo.addConnection(user1.id);
console.log("-------")
console.log(rodrigo.getProfileSummary());
console.log("-------")
console.log(rodrigo.posts)