<?php
session_start();
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "moresa_construcciones";

// Crear conexión
$conn = new mysqli($servername, $username, $password, $dbname);

// Verificar conexión
if ($conn->connect_error) {
    die("Conexión fallida: " . $conn->connect_error);
}

// Verificar si se ha enviado el formulario
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $userEmail = trim($_POST['userEmail']);
    $userPassword = $_POST['userPassword'];

    // Validar que los campos no estén vacíos
    if (empty($userEmail) || empty($userPassword)) {
        echo json_encode(["success" => false, "message" => "Todos los campos son obligatorios."]);
        exit;
    }

    // Validar formato del email
    if (!filter_var($userEmail, FILTER_VALIDATE_EMAIL)) {
        echo json_encode(["success" => false, "message" => "El correo electrónico no es válido."]);
        exit;
    }

    // Verificar si el correo existe en la base de datos
    $checkEmailQuery = "SELECT * FROM usuarios WHERE userEmail = ?";
    $stmt = $conn->prepare($checkEmailQuery);
    $stmt->bind_param("s", $userEmail);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($result->num_rows > 0) {
        // Verificar la contraseña
        $user = $result->fetch_assoc();
        if (password_verify($userPassword, $user['userPassword'])) {
            // Iniciar sesión
            $_SESSION['user_id'] = $user['id']; // Guardar ID de usuario en la sesión
            $_SESSION['user_name'] = $user['userName']; // Guardar nombre de usuario
            echo json_encode(["success" => true, "message" => "Iniciaste sesión correctamente."]);
        } else {
            echo json_encode(["success" => false, "message" => "Contraseña incorrecta."]);
        }
    } else {
        echo json_encode(["success" => false, "message" => "El correo no está registrado."]);
    }

    $stmt->close();
    $conn->close();
    exit; // Asegúrate de salir después de procesar el formulario
}
?>