// Importando os módulos necessários do SDK Modular do Firebase (v10 via CDN)
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import {
  getAuth,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";
import {
  getFirestore,
  doc,
  getDoc
} from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

// Configuração do Firebase
// SUBSTITUA pelos dados do seu projeto no console do Firebase
const firebaseConfig = {
  apiKey: "AIzaSyCx_zj_XRToji7p-j-ot-rJ_p11MUA6vws",
  authDomain: "senai-firebase-gemini-20260516.firebaseapp.com",
  projectId: "senai-firebase-gemini-20260516",
  storageBucket: "senai-firebase-gemini-20260516.firebasestorage.app",
  messagingSenderId: "932897971263",
  appId: "1:932897971263:web:5368d1b292b69012dd2c8a",
  measurementId: "G-H3R9R30WTL"
};

// Inicialização do Firebase App
const app = initializeApp(firebaseConfig);

// Inicialização do Firebase Authentication
const auth = getAuth(app);

// Inicialização do Cloud Firestore
const db = getFirestore(app);

// Referências dos Elementos do DOM (Interface)
const loginSection = document.getElementById("login-section");
const successSection = document.getElementById("success-section");
const loginForm = document.getElementById("login-form");
const emailInput = document.getElementById("email-input");
const passwordInput = document.getElementById("password-input");
const btnLogin = document.getElementById("btn-login");
const btnLogout = document.getElementById("btn-logout");
const errorMessage = document.getElementById("error-message");
const firestoreWarning = document.getElementById("firestore-warning");
const userEmailSpan = document.getElementById("user-email");
const rgbValueSpan = document.getElementById("rgb-value");
const dynamicBg = document.getElementById("dynamic-bg");

// Fundo padrão (inicial) quando não há usuário logado
const defaultBgStyle = "radial-gradient(circle at top left, #1e1e38, #0f0f1b)";

/**
 * Exibe uma mensagem de erro na tela de login
 * @param {string} message 
 */
function showLoginError(message) {
  errorMessage.textContent = message;
  errorMessage.classList.remove("hidden");
}

/**
 * Oculta a mensagem de erro da tela de login
 */
function hideLoginError() {
  errorMessage.textContent = "";
  errorMessage.classList.add("hidden");
}

/**
 * Exibe um alerta/aviso relativo ao Firestore na tela de sucesso
 * @param {string} message 
 */
function showFirestoreWarning(message) {
  firestoreWarning.textContent = message;
  firestoreWarning.classList.remove("hidden");
}

/**
 * Oculta alertas do Firestore
 */
function hideFirestoreWarning() {
  firestoreWarning.textContent = "";
  firestoreWarning.classList.add("hidden");
}

/**
 * Controla o estado visual de carregamento (Spinner) do botão de login
 * @param {boolean} isLoading 
 */
function setLoginLoading(isLoading) {
  const btnText = btnLogin.querySelector(".btn-text");
  const spinner = btnLogin.querySelector(".spinner");

  if (isLoading) {
    btnLogin.disabled = true;
    btnText.textContent = "Entrando...";
    spinner.classList.remove("hidden");
  } else {
    btnLogin.disabled = false;
    btnText.textContent = "Entrar";
    spinner.classList.add("hidden");
  }
}

/**
 * Restaura o fundo padrão do aplicativo
 */
function resetBgToDefault() {
  dynamicBg.classList.remove("bg-corinthians");
  dynamicBg.style.backgroundColor = "";
  dynamicBg.style.background = defaultBgStyle;
  rgbValueSpan.textContent = "Padrão";
}

/**
 * Busca o documento do usuário logado na coleção 'cores' do Firestore,
 * lê a string de valor RGB e aplica dinamicamente como cor de fundo.
 * @param {string} uid - UID do usuário autenticado
 */
async function fetchUserColor(uid) {
  hideFirestoreWarning();
  try {
    // Aponta para o documento correspondente ao UID do usuário logado na coleção 'cores'
    const docRef = doc(db, "cores", uid);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const data = docSnap.data();

      // Verifica se o campo 'cor' existe no documento retornado
      if (data.cor) {
        const rgbText = data.cor.trim(); // Remove espaços desnecessários (ex: "10,200,10")

        // Validação simples do formato RGB usando expressão regular ("R,G,B")
        const rgbRegex = /^\d{1,3},\s*\d{1,3},\s*\d{1,3}$/;
        if (rgbRegex.test(rgbText)) {
          // Remove espaços para fazer comparações exatas de cor
          const normalizedColor = rgbText.replace(/\s+/g, "");

          // Verifica se o usuário é "preto e branco" (pelo valor da cor ou email do usuário)
          const userEmail = auth.currentUser ? auth.currentUser.email.toLowerCase() : "";
          const isPretoEBranco = (
            normalizedColor === "0,0,0" ||
            normalizedColor === "255,255,255" ||
            userEmail.includes("preto") ||
            userEmail.includes("branco") ||
            userEmail.includes("corinthians")
          );

          if (isPretoEBranco) {
            // Aplica a classe das listras do Corinthians (fundo preto com listras brancas finas)
            dynamicBg.classList.add("bg-corinthians");
            dynamicBg.style.background = ""; // Permite que a regra .bg-corinthians no CSS tome efeito
            dynamicBg.style.backgroundColor = "#000000";

            // Exibe o valor formatado na tela
            rgbValueSpan.textContent = "255, 255, 255; 0, 0, 0";
          } else {
            // Garante a remoção da classe do Corinthians para outras cores normais
            dynamicBg.classList.remove("bg-corinthians");

            // Converte o formato do Firestore em uma cor CSS válida
            const cssColor = `rgb(${rgbText})`;

            // Define a cor de fundo dinamicamente. A transição CSS no style.css cuidará do efeito suave.
            dynamicBg.style.background = "none"; // Remove o gradiente de fundo inicial
            dynamicBg.style.backgroundColor = cssColor; // Define a nova cor sólida

            // Atualiza as informações visuais de RGB carregadas
            rgbValueSpan.textContent = cssColor;
          }
        } else {
          showFirestoreWarning(`O campo 'cor' ("${rgbText}") está em um formato inválido no Firestore. Use o formato "R,G,B" (Ex: "10,200,10").`);
          resetBgToDefault();
        }
      } else {
        showFirestoreWarning("Aviso: O documento do usuário foi encontrado, mas o campo 'cor' não existe.");
        resetBgToDefault();
      }

    } else {
      showFirestoreWarning("Aviso: Nenhum documento de preferências encontrado para este usuário no Firestore (coleção 'cores').");
      resetBgToDefault();
    }
  } catch (error) {
    console.error("Erro ao ler o Firestore:", error);
    showFirestoreWarning(`Erro ao carregar dados do Firestore: ${error.message}`);
    resetBgToDefault();
  }
}

// ==========================================
// MONITORAMENTO DE ESTADO DE AUTENTICAÇÃO
// ==========================================
onAuthStateChanged(auth, (user) => {
  if (user) {
    // Se o usuário estiver autenticado:
    userEmailSpan.textContent = user.email;

    // Altera a visibilidade das seções da interface
    loginSection.classList.add("hidden");
    successSection.classList.remove("hidden");

    // Carrega e renderiza a cor personalizada a partir do Firestore
    fetchUserColor(user.uid);

    // Limpa o formulário de login para fins de segurança
    loginForm.reset();
  } else {
    // Se o usuário estiver deslogado ou se deslogar:
    userEmailSpan.textContent = "---";
    resetBgToDefault();

    // Altera a visibilidade das seções da interface
    successSection.classList.add("hidden");
    loginSection.classList.remove("hidden");
  }
});

// ==========================================
// EVENTO DE LOGIN (SUBMIT DO FORMULÁRIO)
// ==========================================
loginForm.addEventListener("submit", async (e) => {
  e.preventDefault(); // Evita o reload nativo do formulário HTML

  const email = emailInput.value.trim();
  const password = passwordInput.value;

  // Validação simples no lado do cliente
  if (!email || !password) {
    showLoginError("Por favor, preencha todos os campos.");
    return;
  }

  hideLoginError();
  setLoginLoading(true);

  try {
    // Tenta realizar o login via Firebase Authentication
    await signInWithEmailAndPassword(auth, email, password);
  } catch (error) {
    console.error("Erro de autenticação:", error);

    // Tradução e formatação didática de erros do Firebase Auth
    let friendlyMessage = "Ocorreu um erro ao tentar entrar. Tente novamente.";
    switch (error.code) {
      case "auth/invalid-email":
        friendlyMessage = "O formato do e-mail inserido é inválido.";
        break;
      case "auth/user-disabled":
        friendlyMessage = "Esta conta de usuário foi desativada.";
        break;
      case "auth/user-not-found":
        friendlyMessage = "Nenhum usuário encontrado com este e-mail.";
        break;
      case "auth/wrong-password":
        friendlyMessage = "A senha fornecida está incorreta.";
        break;
      case "auth/invalid-credential":
        friendlyMessage = "E-mail ou senha incorretos. Verifique suas credenciais.";
        break;
      case "auth/missing-password":
        friendlyMessage = "Por favor, digite sua senha.";
        break;
      case "auth/too-many-requests":
        friendlyMessage = "Muitas tentativas malsucedidas. Acesso temporariamente bloqueado. Tente novamente mais tarde.";
        break;
      case "auth/network-request-failed":
        friendlyMessage = "Erro de rede. Verifique a conexão com a internet.";
        break;
    }
    showLoginError(friendlyMessage);
  } finally {
    setLoginLoading(false);
  }
});

// ==========================================
// EVENTO DE LOGOUT (CLIQUE NO BOTÃO SAIR)
// ==========================================
btnLogout.addEventListener("click", async () => {
  try {
    // Efetua o logout do Firebase Authentication
    await signOut(auth);
  } catch (error) {
    console.error("Erro ao deslogar:", error);
    alert("Erro ao tentar sair: " + error.message);
  }
});
