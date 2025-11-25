

import { app } from "./firebase-config.js";

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
        displayMessage(`Registro realizado com sucesso para: ${userCredential.user.email}!`);
        registerForm.reset();
        
    } catch (error) {
        displayMessage(`Erro no Registro: ${error.message}`, true);
    }
});

loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;

    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        displayMessage(`Login bem-sucedido! Bem-vindo(a), ${userCredential.user.email}!`, false);
        loginForm.reset();
        
    } catch (error) {
        displayMessage(`Erro no Login: ${error.message}`, true);
    }
});

document.addEventListener('DOMContentLoaded', () => {
    
    // Lógica de Alternância de Formulário
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
    
    // Monitoramento de Autenticação
    onAuthStateChanged(auth, (user) => {
        if (user) {
            console.log("Usuário logado:", user.email);
            
        } else {
            console.log("Nenhum usuário logado. Exibindo tela de login.");
        }
    });

    // Registro do Service Worker (PWA Instalável)
    if ('serviceWorker' in navigator) {
        window.addEventListener('load', () => {
            navigator.serviceWorker.register('/sw.js')
                .then(registration => {
                    console.log('Service Worker registrado com sucesso:', registration.scope);
                })
                .catch(err => {
                    console.error('Falha no registro do Service Worker:', err);
                });
        });
    }
});