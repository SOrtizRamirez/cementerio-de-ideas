const url = "http://localhost:3001/users";

document.addEventListener("DOMContentLoaded", () => {
  const startButton = document.getElementById("start-button");
  const welcomeScreen = document.getElementById("welcome-screen");
  const loginScreen = document.getElementById("login-screen");
  const registerScreen = document.getElementById("register-screen");
  const loginForm = document.getElementById("login-form");
  const registerForm = document.getElementById("register-form");
  const registerLink = document.getElementById("register-link");
  const loginLink = document.getElementById("login-link");
  const bodyElement = document.body;

  startButton.addEventListener("click", () => {
    welcomeScreen.classList.add("hidden");
    loginScreen.classList.remove("hidden");
    bodyElement.classList.add("fondo-activo");
  });

  loginForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    console.log("Usuario:", username);
    console.log("Contraseña:", password);
    alert("Intento de inicio de sesión...");
  });

  registerLink.addEventListener("click", (event) => {
    event.preventDefault();
    loginScreen.classList.add("hidden");
    registerScreen.classList.remove("hidden");
  });

  loginLink.addEventListener("click", (event) => {
    event.preventDefault();
    registerScreen.classList.add("hidden");
    loginScreen.classList.remove("hidden");
  });

  registerForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const newUser = document.getElementById("new-username").value;
    const newPassword = document.getElementById("new-password").value;
    const confirmPassword = document.getElementById("confirm-password").value;

    if (newPassword !== confirmPassword) {
      alert("Las contraseñas no coinciden.");
      return;
    }

    console.log("Nuevo usuario:", newUser);
    alert("Registro exitoso. (Simulado)");
    registerScreen.classList.add("hidden");
    loginScreen.classList.remove("hidden");
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const addGraveButton = document.querySelector(".add-grave");
  const graveForm = document.getElementById("grave-form");
  const graveTextInput = document.getElementById("grave-text");
  const izquierda = document.querySelector(".main-content-izquierda");
  const derecha = document.querySelector(".main-content-derecha");

  let ladoDerecho = true;

  addGraveButton.addEventListener("click", () => {
    graveForm.classList.toggle("hide");
  });

  graveForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const mensaje = graveTextInput.value.trim();
    if (mensaje === "") return;

    const lapida = document.createElement("div");
    lapida.classList.add("lapida");

    const texto = document.createElement("div");
    texto.classList.add("lapida-texto");
    texto.innerHTML = `<h3>R.I.P.</h3><p>${mensaje}</p>`;

    lapida.appendChild(texto);

    if (ladoDerecho) {
      derecha.appendChild(lapida);
    } else {
      izquierda.appendChild(lapida);
    }

    ladoDerecho = !ladoDerecho;
    graveForm.reset();
    graveForm.classList.add("hide");
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

const getUserById = async (id) => {
  try {
    const response = await fetch(`${url}/${id}`);
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    return await response.json();
  } catch (error) {
    console.error(error);
  }
};


const floresEtapas = [
  "./img/flowers1", // ramas
  "./img/flowers2", // brotes
  "./img/flowers3", // florecidas
];

function florecer(button) {
  const lapida = button.closest(".lapida");
  const flores = lapida.querySelector(".flores");
  let etapa = 0;

  flores.style.opacity = 0;

  const florecerPaso = () => {
    if (etapa >= floresEtapas.length) return;
    flores.src = floresEtapas[etapa];
    flores.style.opacity = 1;

    setTimeout(() => {
      flores.style.opacity = 0;
      etapa++;
      setTimeout(florecerPaso, 500); // Espera y pasa a la siguiente etapa
    }, 1000); // Tiempo para ver la imagen actual
  };

  florecerPaso();
}