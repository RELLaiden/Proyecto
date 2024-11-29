(function () {
    const formLogin = document.querySelector(".form-login");
    const inputPass = document.querySelector('.form-login input[type="password"]');
    const inputEmail = document.querySelector('.form-login input[type="email"]');
    const alertaError = document.querySelector(".form-login .alerta-error");
    const alertaExito = document.querySelector(".form-login .alerta-exito");
  
    const emailRegex = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
    const passwordRegex = /^.{4,12}$/;
  
    const estadoValidacionCampos = {
        userEmail: false,
        userPassword: false,
    };
  
    document.addEventListener("DOMContentLoaded", () => {
        formLogin.addEventListener("submit", (e) => {
            e.preventDefault();
            enviarFormulario();
        });
  
        inputEmail.addEventListener("input", () => {
            validarCampo(emailRegex, inputEmail, "El correo solo puede contener letras, números, puntos, guiones y guion bajo.");
        });
  
        inputPass.addEventListener("input", () => {
            validarCampo(passwordRegex, inputPass, "La contraseña tiene que ser de 4 a 12 dígitos.");
        });
    });
  
    function validarCampo(regularExpresion, campo, mensaje) {
        const validarCampo = regularExpresion.test(campo.value);
        if (validarCampo) {
            eliminarAlerta(campo.parentElement.parentElement);
            estadoValidacionCampos[campo.name] = true;
            campo.parentElement.classList.remove("error");
            return;
        }
        estadoValidacionCampos[campo.name] = false;
        campo.parentElement.classList.add("error");
        mostrarAlerta(campo.parentElement.parentElement, mensaje);
    }
  
    function mostrarAlerta(referencia, mensaje) {
        eliminarAlerta(referencia);
        const alertaDiv = document.createElement("div");
        alertaDiv.classList.add("alerta");
        alertaDiv.textContent = mensaje;
        referencia.appendChild(alertaDiv);
    }
  
    function eliminarAlerta(referencia) {
        const alerta = referencia.querySelector(".alerta");
        if (alerta) alerta.remove();
    }
  
    function enviarFormulario() {
        if (estadoValidacionCampos.userEmail && estadoValidacionCampos.userPassword) {
            const formData = new FormData(formLogin);
  
            fetch("../php/login.php", {
                method: "POST",
                body: formData
            })
            .then(response => response.json())
            .then(result => {
                if (result.success) {
                    // Mostrar pantalla de carga
                    const loadingScreen = document.getElementById("loadingScreen");
                    loadingScreen.style.display = "flex";
  
                    // Redirigir después de 3 segundos
                    setTimeout(() => {
                        window.location.href = "../html/Moresa_Diseños_y_Construcciones.html"; // Cambia esta URL a la página que desees
                    }, 3000);
                } else {
                    alertaError.classList.add("alertaError");
                    mostrarAlerta(formLogin, result.message);
                    setTimeout(() => {
                        alertaError.classList.remove("alertaError");
                    }, 3000);
                }
            })
            .catch(error => {
                console.error("Error al procesar el login:", error);
                alertaError.classList.add("alertaError");
                alertaError.textContent = "Hubo un error en el proceso de inicio de sesión.";
                setTimeout(() => {
                    alertaError.classList.remove("alertaError");
                }, 3000);
            });
        } else {
            alertaExito.classList.remove("alertaExito");
            alertaError.classList.add("alertaError");
            setTimeout(() => {
                alertaError.classList.remove("alertaError");
            }, 3000);
        }
    }
  })();
  