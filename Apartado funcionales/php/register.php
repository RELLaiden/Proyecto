<?php
$servername = "localhost"; // Cambia esto si es necesario
$username = "root"; // Cambia esto si es necesario
$password = ""; // Cambia esto si es necesario
$dbname = "moresa_construcciones";

// Crear conexión
$conn = new mysqli($servername, $username, $password, $dbname);

// Verificar conexión
if ($conn->connect_error) {
    die("Conexión fallida: " . $conn->connect_error);
}

// Verificar si se ha enviado el formulario
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $userName = $_POST['userName'];
    $userEmail = $_POST['userEmail'];
    $userPassword = password_hash($_POST['userPassword'], PASSWORD_DEFAULT); // Encriptar la contraseña

    // Insertar el nuevo usuario
    $sql = "INSERT INTO usuarios (userName, userEmail, userPassword) VALUES ('$userName', '$userEmail', '$userPassword')";
    if ($conn->query($sql) === TRUE) {
        // Mensaje de éxito y barra de carga
        echo '<!DOCTYPE html>
        <html lang="es">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Registro exitoso</title>
            <style>
                body {
                    font-family: Arial, sans-serif;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    height: 100vh;
                    margin: 0;
                    background-color: #f4f4f4;
                }
                .alerta-exito {
                    font-size: 20px;
                    font-weight: bold;
                    color: #4CAF50;
                    margin-bottom: 10px;
                }
                .cargando {
                    font-size: 16px;
                    color: #555;
                    margin-bottom: 20px;
                }
                .barra-carga {
                    width: 80%;
                    max-width: 400px;
                    background-color: #e0e0e0;
                    border-radius: 25px;
                    overflow: hidden;
                    height: 15px;
                }
                .barra-carga .progreso {
                    height: 100%;
                    width: 0;
                    background-color: #0078d7;
                    animation: cargar 3s linear forwards;
                }
                @keyframes cargar {
                    from {
                        width: 0;
                    }
                    to {
                        width: 100%;
                    }
                }
            </style>
        </head>
        <body>
            <div class="alerta-exito">¡Registro exitoso!</div>
            <div class="cargando">En breve serás redirigido a la página principal para iniciar sesion.</div>
            <div class="barra-carga"><div class="progreso"></div></div>
            <script>
                setTimeout(() => {
                    window.location.href = "../index.html"; // Cambia esto a la URL de tu página de inicio de sesión
                }, 3000); // Redirige en 3 segundos
            </script>
        </body>
        </html>';
    } else {
        echo "Error: " . $sql . "<br>" . $conn->error;
    }
}

$conn->close();
?>
