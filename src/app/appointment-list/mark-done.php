<?php
include 'db.php';

$data = json_decode(file_get_contents("php://input"));

$id = $data->id;

$sql = "UPDATE new SET status='done' WHERE id='$id'";

if ($conn->query($sql) === TRUE) {
  echo json_encode(["message" => "Record updated successfully"]);
} else {
  echo json_encode(["message" => "Error updating record: " ]);
}

$conn->close();
?>
