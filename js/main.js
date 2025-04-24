
  function toggleDarkMode() {
    const body = document.body;
    const btn = document.querySelector(".test-scss-button");
  
    body.classList.toggle("dark-mode");
  
    const isDark = body.classList.contains("dark-mode");
    localStorage.setItem("dark-mode", isDark);
  
    btn.textContent = isDark ? "Desactivar modo oscuro" : "Activar modo oscuro";
  }
document.addEventListener("DOMContentLoaded", () => {
    const btnDark = document.getElementById("toggle-dark");
  
    btnDark.addEventListener("click", () => {
      document.body.classList.toggle("dark-mode");
    });
  });

function toggleDarkMode() {
    document.body.classList.toggle("dark-mode");
    const btn = document.querySelector(".test-scss-button");
  }
  