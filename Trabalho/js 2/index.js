    var tbody = document.querySelector("table>tbody");
    var form={
        nome: document.querySelector("#nome"),
        quantidade: document.getElementById("quantidade"),
        valor: document.getElementById("valor"),
        observacao: document.getElementById("observacao"),
        btnSalvar: document.getElementById("btn-salvar"),
        btnCancelar: document.getElementById("btn-cancelafr"),
    }

    form.btnSalvar.addEventListener('click', () => {
      
        var produto = {
            nome: form.nome.value,
            quantidadeEstoque: form.quantidade.value,
            valor: form.valor.value,
            observacao: form.observacao.value
        };

        if(!produto.nome || !produto.quantidadeEstoque || !produto.valor){

            alert("Os campos nome, quantidade e valor são obrigatórios");
            return;
        }
        cadastrarProdutoAPI(produto);
    });

    function cadastrarProdutoAPI(produto){

        fetch("http://localhost:3400/produtos",{
            headers: {
                "Content-Type": "application/json",
            },
            method: "POST",
            body: JSON.stringify(produto)
        })
        .then(response => response.json()) // SE FUNCIONAR
        .then(response => {
            alert("deu certo porra")
        }) 
        .catch(erro => {// SE NÃO FUNCIONAR
            console.log(erro);
            alert("Deu ruim essa MERDAAAAA!!!!!!!!!")
        })

    }

    function obterProdutosDaAPI(){

        fetch("http://localhost:3400/produtos")
        .then(response => response.json()) // SE FUNCIONAR
        .then(response => {
            preencherTabela(response);
        }) 
        .catch(erro => console.log(erro)) // SE NÃO FUNCIONAR
    }
 
    function preencherTabela(produtos){
        //Limpando a tabela
        tbody.textContent = "";
        
        produtos.map(produto => {

            var tr = document.createElement("tr");
            var tdID = document.createElement("td");
            var tdNome = document.createElement("td");
            var tdValor = document.createElement("td");
            var tdQuantidade = document.createElement("td");
            var tdObservacao = document.createElement("td");
            var tdDataCadastro = document.createElement("td");

            tdID.textContent = produto.id;
            tdNome.textContent = produto.nome;
            tdQuantidade.textContent = produto.quantidadeEstoque;
            tdValor.textContent = produto.valor;
            tdObservacao.textContent = produto.observacao;
            tdDataCadastro.textContent = aplicarMascaraDataEHoraEmDataIso(produto.dataCadastro);

            tr.appendChild(tdID);
            tr.appendChild(tdNome);
            tr.appendChild(tdQuantidade);
            tr.appendChild(tdValor);
            tr.appendChild(tdObservacao);
            tr.appendChild(tdDataCadastro);

            tbody.appendChild(tr);

        })
}

    obterProdutosDaAPI();