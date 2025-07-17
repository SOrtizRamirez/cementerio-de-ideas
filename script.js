const users_url = "http://localhost:3001/users";
const graves_url = "http://localhost:3001/graves";

const crearLapida = ({ massage, author = "Anónimo", rights = "no" }) => {
  const izquierda = document.querySelector(".main-content-izquierda");
  const derecha = document.querySelector(".main-content-derecha");

  // Para alternar lados basado en cantidad actual de lápidas (más equilibrado)
  const ladoDerecho = izquierda.childElementCount <= derecha.childElementCount;

  const lapida = document.createElement("div");
  lapida.classList.add("lapida");

  const texto = document.createElement("div");
  texto.classList.add("lapida-texto");
  texto.innerHTML = `<h3>R.I.P.</h3><p>${massage}</p><p><small>- ${author}</small></p>`;

  const flores = [];
  for (let i = 1; i <= 3; i++) {
    const flor = document.createElement("img");
    flor.src = `./img/flowers${i}.png`;
    flor.classList.add("flor");
    flor.dataset.fase = i;
    flor.style.zIndex = i;
    lapida.appendChild(flor);
    flores.push(flor);
  }

  const acciones = document.createElement("div");
  acciones.classList.add("acciones");

  let florActual = 0;
  const florecer = () => {
    if (florActual >= flores.length) return;
    flores[florActual].classList.add(`fase-${flores[florActual].dataset.fase}`);
    florActual++;
  };

  const likeBtn = document.createElement("button");
  likeBtn.textContent = "💗 Like";
  likeBtn.onclick = florecer;

  const apoyoBtn = document.createElement("button");
  apoyoBtn.textContent = "🤝 Apoyo";
  apoyoBtn.onclick = florecer;

  acciones.appendChild(likeBtn);
  acciones.appendChild(apoyoBtn);

  lapida.appendChild(texto);
  lapida.appendChild(acciones);

  if (ladoDerecho) {
    derecha.appendChild(lapida);
  } else {
    izquierda.appendChild(lapida);
  }
};

// --- DOMContentLoaded principal ---

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
  const addGraveButton = document.getElementById("add-grave");
  const graveForm = document.getElementById("grave-form");

  addGraveButton.addEventListener("click", () => {
    graveForm.classList.toggle("hide");
    bodyElement.classList.add("fondo-activo");
  });
  if (loginForm) {
    loginForm.addEventListener("submit", async (event) => {
      event.preventDefault();
      const username = document.getElementById("username").value;
      const password = document.getElementById("password").value;
      const users = await getUsers();
      const foundUser = users.find(
        (u) => u.name === username && u.password === password
      );
      if (foundUser) {
        setupLogin({
          name: foundUser.name,
          email: foundUser.email,
        });
        changePath();
      } else {
        alert("Usuario o contraseña incorrectos.");
      }
    });
  }
  if (registerLink || loginLink) {
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
  }
  if (registerForm) {
    registerForm.addEventListener("submit", async (event) => {
      try {
        event.preventDefault();
        const newUser = document.getElementById("new-username").value.trim();
        const newEmail = document.getElementById("new-email").value.trim();
        const newPassword = document.getElementById("new-password").value;
        const confirmPassword =
          document.getElementById("confirm-password").value;

        if (newPassword !== confirmPassword) {
          alert("Las contraseñas no coinciden.");
          return;
        }
        if (!newUser || !newEmail || !newPassword) {
          alert("Completa todos los campos.");
          return;
        }

        await addUser({
          name: newUser,
          email: newEmail,
          password: newPassword,
        });

        alert("Registro exitoso");
        changePath();
        registerScreen.classList.add("hidden");
        loginScreen.classList.remove("hidden");
      } catch (error) {
        console.log(error);
      }
    });
  }


  graveForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    try {
      const mensajeInput = document.getElementById("grave-text");
      const autorInput = document.getElementById("author-name");
      const derechosCheckbox = document.getElementById("derechos-autor");

      const mensaje = mensajeInput.value.trim();
      const autor = autorInput.value.trim();
      const quiereDerechos = derechosCheckbox.checked;

      if (!mensaje || !autor) {
        alert("Debes completar mensaje y autor.");
        return;
      }

      const newGrave = {
        massage: mensaje,
        author: autor,
        rights: quiereDerechos ? "yes" : "no",
      };

      await addGrave(newGrave);
      crearLapida(newGrave);

      graveForm.classList.add("hide");
    } catch (error) {
      console.error(error);
    }
  });
});

// --- Función para cargar lápidas desde servidor ---
const renderGraves = async () => {
  try {
    const graves = await getGraves();
    graves.forEach((grave) => crearLapida(grave));
  } catch (error) {
    console.error("Error cargando tumbas:", error);
  }
};

// --- API Fetch ---
const addUser = async (newUser) => {
  try {
    const response = await fetch(users_url, {
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
    const response = await fetch(users_url);
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    return await response.json();
  } catch (err) {
    console.error(err);
  }
};

const addGrave = async (newGrave) => {
  try {
    console.log(newGrave);
    const response = await fetch(graves_url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newGrave),
    });

    if (!response.ok) {
      throw new Error(response.statusText);
    }
    return await response.json();
  } catch (error) {
    console.error(error);
  }
};

const getGraves = async () => {
  try {
    const response = await fetch(graves_url);
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    return await response.json();
  } catch (err) {
    console.error(err);
  }
};

const setupLogin = (userInfo) => {
  localStorage.setItem("auth", "true");
  localStorage.setItem("user", JSON.stringify(userInfo));
};

const changePath = (path = "/inicio") => {
  window.location.pathname = path;
};

window.addEventListener("load", () => {
  const isAuth = localStorage.getItem("auth") === "true";
  const onInicio =
    window.location.pathname === "/inicio" ||
    window.location.pathname === "/inicio.html";

  if (!isAuth) return;

  if (onInicio) {
    renderGraves();
  } else {
    changePath("/inicio");
  }
});
