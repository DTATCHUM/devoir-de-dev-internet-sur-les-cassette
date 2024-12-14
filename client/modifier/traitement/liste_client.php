<?php
header('Content-Type: application/json');

$host = 'localhost';
$db = 'film';
$user = 'root';
$password = 'Dtae12&&';

try {
    $pdo = new PDO("mysql:host=$host;dbname=$db;charset=utf8", $user, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    $stmt = $pdo->query("SELECT * FROM client");

    $clients = $stmt->fetchAll(PDO::FETCH_ASSOC);

    $magasins = $pdo->query("SELECT id_magasin FROM magasin")->fetchAll(PDO::FETCH_ASSOC);

    echo json_encode([
        'clients' => $clients,
        'magasins' => $magasins
    ]);
} catch (PDOException $e) {
    echo json_encode(['error' => 'Erreur de serveur : ' . $e->getMessage()]);
}
?>
