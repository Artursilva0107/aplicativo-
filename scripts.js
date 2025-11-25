// scripts/main.js (Versão Final para Deploy)

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
        
        // NOVO: console.log de sucesso no registro
        console.log(`✅ Sucesso: O e-mail ${userCredential.user.email} foi registrado no Firebase.`);
        
        displayMessage(`Registro realizado com sucesso! Redirecionando...`);
        registerForm.reset();
        
    } catch (error) {
        displayMessage(`Erro no Registro: ${error.message}`, true);
        console.error("Detalhes do erro do Firebase:", error); // Adicionando console.error para debug
    }
});

loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;

    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        displayMessage(`Login bem-sucedido! Redirecionando...`, false);
        loginForm.reset();
        
    } catch (error) {
        displayMessage(`Erro no Login: ${error.message}`, true);
        console.error("Detalhes do erro do Firebase:", error); // Adicionando console.error para debug
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
    
    // Monitoramento de Autenticação (Redirecionamento)
    onAuthStateChanged(auth, (user) => {
        if (user) {
            // Se logado, vai para a página principal (dashboard.html)
            console.log("Usuário logado:", user.email);
            // CORREÇÃO: Adicionamos o redirecionamento aqui.
            // Apenas redireciona se não estiver já no dashboard, evitando loops
            if (!window.location.pathname.includes('dashboard.html')) {
                window.location.href = 'dashboard.html';
            }
        } else {
            console.log("Nenhum usuário logado. Exibindo tela de login.");
             // Se deslogado, permanece no index.html.
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
