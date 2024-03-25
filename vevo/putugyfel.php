<?php
$putdata = fopen('php://input', "r");
$raw_data= "";
while($chunk = fread($putdata, 1024)){
    $raw_data.= $chunk;
}
fclose($putdata);
$adatJson = json_decode($raw_data);
$vazon=$adatJson->vazon;
$vnev=$adatJson->vnev;
$vcim =$adatJson->vcim;
require_once './databaseconnect.php';
$sql = "UPDATE vevo SET vnev=?, vcim=? WHERE vazon=?";
$stmt = $connection->prepare($sql);
$stmt->bind_param("ssi", $vnev, $vcim, $vazon);  
if ($stmt->execute()) {
    http_response_code(201);
    echo 'Sikeresen módosítva';
} else {
    http_response_code(404);
    echo 'Nem sikerült módosítani';
}