// scripts/firebase-config.js

// Importa apenas o initializeApp do SDK
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.6.0/firebase-app.js";

// Sua configuração do projeto (com as credenciais que você forneceu)
const firebaseConfig = {
    apiKey: "AIzaSyACHAocEVHNN3uUwxvbWSZSv9jB1sfVBXc",
    authDomain: "loginpwa-40d6a.firebaseapp.com",
    projectId: "loginpwa-40d6a",
    storageBucket: "loginpwa-40d6a.firebasestorage.app",
    messagingSenderId: "486451550526",
    appId: "1:486451550526:web:72e8e7876465e59039f46f",
    measurementId: "G-BS8Z544BHS"
};

// Inicializa o Firebase e EXPORTA o objeto 'app'
export const app = initializeApp(firebaseConfig);
// O analytics não é essencial para o login, então podemos ignorá-lo aqui.