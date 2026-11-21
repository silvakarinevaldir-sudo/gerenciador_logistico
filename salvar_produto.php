<?php
header("Content-Type: application/json; charset=UTF-8");

include "conexao.php";

$dados = json_decode(file_get_contents("php://input"), true);

$nome = $dados["nome"] ?? "";
$codigo = $dados["codigo"] ?? "";
$quantidade = $dados["quantidade"] ?? "";
$preco = $dados["preco"] ?? "";

if ($nome === "" || $codigo === "" || $quantidade === "" || $preco === "") {
    echo json_encode(["sucesso" => false, "mensagem" => "Preencha todos os campos."]);
    exit;
}

$sql = "INSERT INTO produtos (nome, codigo, quantidade, preco) VALUES (?, ?, ?, ?)";

$stmt = $conexao->prepare($sql);
$stmt->bind_param("ssid", $nome, $codigo, $quantidade, $preco);

if ($stmt->execute()) {
    echo json_encode(["sucesso" => true, "mensagem" => "Produto salvo com sucesso!"]);
} else {
    echo json_encode(["sucesso" => false, "mensagem" => $stmt->error]);
}

$stmt->close();
$conexao->close();
?>