console.log("Olá, Gerenciador Logístico!");

function mostrarTela(id) {
    document.querySelectorAll(".tela").forEach(tela => {
        tela.style.display = "none";
    });

    document.getElementById(id).style.display = "block";
}

document.getElementById("btnProdutos").addEventListener("click", function() {
    mostrarTela("Produtos");
});

document.getElementById("btnEnderecos").addEventListener("click", function() {
    mostrarTela("Enderecos");
});

document.getElementById("btnTransportadoras").addEventListener("click", function() {
    mostrarTela("Transportadoras");
});

document.getElementById("btnFretes").addEventListener("click", function() {
    mostrarTela("Fretes");
});

document.getElementById("btnInicio").addEventListener("click", function() {
    mostrarTela("Inicio");
});
document.querySelectorAll(".cartao").forEach( cartao => {
        cartao.addEventListener("click", function() {
            mostrarTela(this.dataset.tela);
        });
    });        
document.getElementById("btnAdicionarProduto").addEventListener("click", async function() {
    let nome = document.getElementById("nomeProduto").value;
    let codigo = document.getElementById("codigoProduto").value;
    let quantidade = document.getElementById("quantidadeProduto").value;
    let preco = document.getElementById("precoProduto").value;

    if (!nome || !codigo || !quantidade || !preco) {
        alert("Preencha todos os campos!");
        return;
    }

    try {
        const resposta = await fetch("salvar_produto.php", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({nome, codigo, quantidade, preco})
        });

        const resultado = await resposta.json();

        if (!resultado.sucesso) {
            alert(resultado.mensagem);
            return;
        }

        alert("Produto salvo no banco de dados!");

        let tabela = document.getElementById("listaProdutos");
        let linha = tabela.insertRow();
        linha.insertCell(0).textContent = nome;
        linha.insertCell(1).textContent = codigo;
        linha.insertCell(2).textContent = quantidade;
        linha.insertCell(3).textContent = "R$ " + Number(preco).toFixed(2);

        document.getElementById("nomeProduto").value = "";
        document.getElementById("codigoProduto").value = "";
        document.getElementById("quantidadeProduto").value = "";
        document.getElementById("precoProduto").value = "";

    } catch (erro) {
        alert("Erro ao enviar os dados para o PHP.");
        console.error(erro);
    }
});

document.getElementById("btnAdicionarTransportadora").addEventListener("click", function(){
    let nome = document.getElementById("nomeTransportadora").value;
    let cnpj = document.getElementById("cnpjTransportadora").value;
    let telefone = document.getElementById("telefoneTransportadora").value;

    if (nome ==="" || cnpj === "" || telefone === "") {
        alert("preencha todos os campos!");
        return;
    }

    let tabela = document.getElementById("listaTransportadoras");
    let linha = tabela.insertRow();

    linha.insertCell(0).textContent = nome;
    linha.insertCell(1).textContent = cnpj;
    linha.insertCell(2).textContent = telefone;

    document.getElementById("nomeTransportadora").value = "";
    document.getElementById("cnpjTransportadora").value = "";
    document.getElementById("telefoneTransportadora").value = "";
});

document.getElementById("btnAdicionarFrete").addEventListener("click", function(){
    let origem = document.getElementById("origemFrete").value;
    let destino = document.getElementById("destinoFrete").value;
    let transportadora = document.getElementById("transportadoraFrete").value;
    let valor = document.getElementById("valorFrete").value;

    if (origem === "" || destino === "" || transportadora === "" || valor === ""){
        alert("Preencha todos os campos!");
        return;

    }

    let tabela = document.getElementById("listaFretes");
    let linha = tabela.insertRow();

    linha.insertCell(0).textContent = origem;
    linha.insertCell(1).textContent = destino;
    linha.insertCell(2).textContent = transportadora;
    linha.insertCell(3).textContent = "R$" + Number(valor).toFixed(2)
});

document.getElementById("btnAdicionarEndereco").addEventListener("click", function() {
    let codigo = document.getElementById("codigoEndereco").value;
    let rua = document.getElementById("ruaEndereco").value;
    let numero = document.getElementById("numeroEndereco").value;
    let cidade = document.getElementById("cidadeEndereco").value;

    if (codigo ==="" || rua === "" || numero === "" || cidade === "") {
        alert("Preencha todos os campos!");
        return;

    }

    let tabela = document.getElementById("listaEnderecos");
    let linha = tabela.insertRow();
    
    linha.insertCell(0).textContent = codigo;
    linha.insertCell(1).textContent = rua;
    linha.insertCell(2).textContent = numero;
    linha.insertCell(3).textContent = cidade;
});


