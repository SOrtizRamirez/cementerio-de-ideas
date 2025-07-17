const url = "http://localhost:3001/users"


/* REGISTER AND LOGIN */
document.addEventListener('DOMContentLoaded', () => {
    const startButton = document.getElementById('start-button');
    const welcomeScreen = document.getElementById('welcome-screen');
    const loginScreen = document.getElementById('login-screen');
    const registerScreen = document.getElementById('register-screen');
    const loginForm = document.getElementById('login-form');
    const registerForm = document.getElementById('register-form');
    const registerLink = document.getElementById('register-link');
    const loginLink = document.getElementById('login-link');
    const bodyElement = document.body;

    startButton.addEventListener('click', () => { // show the login form
        welcomeScreen.classList.add('hidden');
        loginScreen.classList.remove('hidden');
        bodyElement.classList.add('fondo-activo'); // add background animation
    });

    loginForm.addEventListener('submit', async(event) => {
        try {
        event.preventDefault();
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;
        
        /* search */
        const data  =  await getUsers()
        const foundUser = data.find((u) => u.name === username && u.password === password)
            if(foundUser){
                alert("inicio de sesion exitoso")
            }
    
        } catch (error) {
            console.error(error)
        }
      
    });

    registerLink.addEventListener('click', (event) => { 
        event.preventDefault();
        loginScreen.classList.add('hidden');
        registerScreen.classList.remove('hidden');
    });

    loginLink.addEventListener('click', (event) => {
        event.preventDefault();
        registerScreen.classList.add('hidden'); // hide register form
        loginScreen.classList.remove('hidden'); // show login
    });

    registerForm.addEventListener('submit', async(event) => {
    try {
        event.preventDefault();
        const newUser = document.getElementById('new-username').value;
        const newEmail = document.getElementById('new-email').value
        const newPassword = document.getElementById('new-password').value;
        const confirmPassword = document.getElementById('confirm-password').value;

        if (newPassword !== confirmPassword) {
            alert('Las contraseñas no coinciden.');
            return;
        }

        await addUser({
            "name": newUser,
            "email": newEmail,
            "password": newPassword
        })
        alert('Registro exitoso.');
        registerScreen.classList.add('hidden');
        loginScreen.classList.remove('hidden');
    } catch (error) {
        alert(error)
    }
     
    });
});








/* API */
const addUser = async (newUser) => {
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newUser),
    });

    if (!response.ok) {
      throw new Error(response.statusText);
    }
    return await response.json();
  } catch (error) {
    console.error(error);
  }
};
const getUsers = async () => {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    return await response.json();
  } catch (err) {
    console.error(err);
  }
};

const getUserById = async(id) =>{
    try {
        const response = await fetch(`${url}/${id}`);
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    return await response.json();
    } catch (error) {
        console.error(error)
    }
}


