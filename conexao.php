<?php
$servidor = "localhost";
$usuario = "root";
$senha = "";
$banco = "gerenciador_logistico";

$conexao= new mysqli(
    $servidor,
    $usuario,
    $senha,
    $banco
);

if ($conexao->connect_error) {
    die("Erro na conexção: " . $conexao->connect_error);
}
?>