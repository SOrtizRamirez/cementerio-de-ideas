// script.js

document.addEventListener('DOMContentLoaded', () => {
    const startButton = document.getElementById('start-button');
    const welcomeScreen = document.getElementById('welcome-screen');
    const loginScreen = document.getElementById('login-screen');
    const loginForm = document.getElementById('login-form');
    const registerLink = document.getElementById('register-link');
    const bodyElement = document.body; 

    startButton.addEventListener('click', () => {
        welcomeScreen.classList.add('hidden');
        loginScreen.classList.remove('hidden');
        
        bodyElement.classList.add('fondo-activo'); 
    });

    loginForm.addEventListener('submit', (event) => {
        event.preventDefault(); 

        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        console.log('Usuario:', username);
        console.log('Contraseña:', password);

        alert('Intento de inicio de sesión..');
    });

    registerLink.addEventListener('click', (event) => {
        event.preventDefault(); 
        alert('Redirigiendo a la página de registro... (Esta es una simulación).');
    });
});