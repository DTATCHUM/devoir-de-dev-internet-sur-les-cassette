<?php
  $host='localhost';
  $bd='film';
  $password='Dtae12&&';
  $user='root';
try{
  $connection=new PDO("mysql:host=$host;dbname=$bd",$user,$password);
  $connection->setAttribute(PDO::ATTR_ERRMODE,PDO::ERRMODE_EXCEPTION);
}catch(PDOException $e){
    echo"erreur".$e->getMessage();
}
?>