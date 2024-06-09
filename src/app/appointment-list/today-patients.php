<?php
include 'db.php';



$today = date("Y-m-d");
$sql = "SELECT * FROM new WHERE appointment_date = '$today'";
$result = $conn->query($sql);

$patients = array();
while($row = $result->fetch_assoc()) {
  $patients[] = $row;
}

echo json_encode($patients);

$conn->close();
?>
