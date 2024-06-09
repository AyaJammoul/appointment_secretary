<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

include 'db.php';

$method = $_SERVER['REQUEST_METHOD'];

switch ($method) {
    case 'GET':
        if (isset($_GET['today'])) {
            $today = date("Y-m-d");
            $stmt = $pdo->prepare("SELECT * FROM new WHERE appointment_date = ? AND status != 'done'");
            $stmt->execute([$today]);
        } else if (isset($_GET['checkTime'])) {
            $date = $_GET['date'];
            $time = $_GET['time'];
            $stmt = $pdo->prepare("SELECT COUNT(*) FROM new WHERE appointment_date = ? AND appointment_time = ?");
            $stmt->execute([$date, $time]);
            $count = $stmt->fetchColumn();
            echo json_encode(['count' => $count]);
        } else {
            $stmt = $pdo->query("SELECT * FROM new");
        }
        $users = $stmt->fetchAll();
        echo json_encode($users);
        break;

    case 'POST':
        $data = json_decode(file_get_contents('php://input'), true);
        $stmt = $pdo->prepare("SELECT COUNT(*) FROM new WHERE appointment_date = ? AND appointment_time = ?");
        $stmt->execute([$data['appointment_date'], $data['appointment_time']]);
        $count = $stmt->fetchColumn();

        if ($count > 0) {
            http_response_code(409); 
            echo json_encode(['error' => 'Appointment time conflict']);
        } else {
            $stmt = $pdo->prepare("INSERT INTO new (name, mobile, city, age, is_first_time, gender, appointment_date, appointment_time, narration, status) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, 'pending')");
            $stmt->execute([$data['name'], $data['mobile'], $data['city'], $data['age'], $data['is_first_time'], $data['gender'], $data['appointment_date'], $data['appointment_time'], $data['narration']]);
            echo json_encode(['id' => $pdo->lastInsertId()]);
        }
        break;

    case 'PUT':
        $data = json_decode(file_get_contents('php://input'), true);
        $stmt = $pdo->prepare("UPDATE new SET status = ? WHERE id = ?");
        $stmt->execute([$data['status'], $data['id']]);
        echo json_encode(['status' => 'success']);
        break;

    case 'DELETE':
        $id = $_GET['id'];
        $stmt = $pdo->prepare("DELETE FROM new WHERE id = ?");
        $stmt->execute([$id]);
        echo json_encode(['status' => 'success']);
        break;

    case 'OPTIONS':
        http_response_code(204);
        break;

    default:
        http_response_code(405);
        echo json_encode(['error' => 'Method Not Allowed']);
        break;
}
?>
