function toggleDarkMode() {
    const body = document.body;
    const btn = document.querySelector(".test-scss-button");
  
    body.classList.toggle("dark-mode");
  
    if (body.classList.contains("dark-mode")) {
      btn.textContent = "Desactivar modo oscuro";
    } else {
      btn.textContent = "Activar modo oscuro";
    }
  }
  window.onload = () => {
    if (localStorage.getItem("dark-mode") === "true") {
      document.body.classList.add("dark-mode");
      document.querySelector(".test-scss-button").textContent = "Desactivar modo oscuro";
    }
  };
  
  function toggleDarkMode() {
    const body = document.body;
    const btn = document.querySelector(".test-scss-button");
  
    body.classList.toggle("dark-mode");
  
    const isDark = body.classList.contains("dark-mode");
    localStorage.setItem("dark-mode", isDark);
  
    btn.textContent = isDark ? "Desactivar modo oscuro" : "Activar modo oscuro";
  }