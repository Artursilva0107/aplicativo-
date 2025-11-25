import { app } from "firebase-config.js"; // CORRIGIDO: Removido o "./"

import { 
    getAuth, 
    createUserWithEmailAndPassword, 
    signInWithEmailAndPassword,
    onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/12.6.0/firebase-auth.js";


const auth = getAuth(app);

const loginForm = document.getElementById('login-form');
const registerForm = document.getElementById('register-form');
const authMessage = document.getElementById('auth-message');

function displayMessage(message, isError = false) {
    authMessage.textContent = message;
    authMessage.className = `message-area ${isError ? 'error-msg' : 'success-msg'}`;
    authMessage.classList.remove('hidden');
    setTimeout(() => {
        authMessage.classList.add('hidden');
    }, 5000);
}

registerForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = document.getElementById('register-email').value;
    const password = document.getElementById('register-password').value;

    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        
        console.log(`✅ Sucesso: O e-mail ${userCredential.user.email} foi criado e registrado no Firebase.`);
        displayMessage(`Conta criada com sucesso! Redirecionando...`);
        registerForm.reset();
        
    } catch (error) {
        displayMessage(`Erro no Registro: ${error.message}`, true);
        console.error("Detalhes do erro do Firebase:", error);
    }
});

loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;

    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        
        console.log(`🔓 Login bem-sucedido! Usuário: ${userCredential.user.email}`);
        displayMessage(`Login com sucesso! Bem-vindo(a)! Redirecionando...`, false);
        loginForm.reset();
        
    } catch (error) {
        displayMessage(`Erro no Login: ${error.message}`, true);
        console.error("Detalhes do erro do Firebase:", error);
    }
});

document.addEventListener('DOMContentLoaded', () => {
    
    const loginSection = document.getElementById('login-section');
    const registerSection = document.getElementById('register-section');
    const showRegisterLink = document.getElementById('show-register');
    const showLoginLink = document.getElementById('show-login');

    showRegisterLink.addEventListener('click', (e) => {
        e.preventDefault();
        loginSection.classList.add('hidden');
        registerSection.classList.remove('hidden');
    });

    showLoginLink.addEventListener('click', (e) => {
        e.preventDefault();
        registerSection.classList.add('hidden');
        loginSection.classList.remove('hidden');
    });
    
    onAuthStateChanged(auth, (user) => {
        if (user) {
            console.log("Usuário logado:", user.email);
            if (!window.location.pathname.includes('dashboard.html')) {
                window.location.href = 'dashboard.html';
            }
        } else {
            console.log("Nenhum usuário logado. Exibindo tela de login.");
        }
    });

    // Removido o '/' no sw.js para evitar erros no GitHub Pages
    if ('serviceWorker' in navigator) {
        window.addEventListener('load', () => {
            navigator.serviceWorker.register('sw.js') 
                .then(registration => {
                    console.log('Service Worker registrado com sucesso:', registration.scope);
                })
                .catch(err => {
                    console.error('Falha no registro do Service Worker:', err);
                });
        });
    }
});
