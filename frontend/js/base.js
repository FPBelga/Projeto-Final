var tbody = document.querySelector("table>tbody");
let btnAdicionar = document.getElementById("btn-adicionar");

let form = {
    id: document.getElementById("id"),
    nome: document.getElementById("nome"),
    email: document.getElementById("email"),
    salario: document.getElementById("salario"),
    dataAdmissao: document.getElementById("dataAdmissao"),
    dataCadastro: document.getElementById("dataCadastro"),
    btnSalvar: document.getElementById("btn-salvar"),
    btnCancelar: document.getElementById("btn-cancelar"),
    titulo: document.getElementById("titulo")
};

let listaProfessores = [];
let modoEdicao = false;
let textoModal = "Adicionar professor";

btnAdicionar.addEventListener('click', () => {
    limparCampos();
    modoEdicao = false;
    atualizartextoModal(modoEdicao);
});
form.btnSalvar.addEventListener('click', () => {
    // Aqui preciso verificar se os campos foram preenchidos
    if (!form.nome.value || !form.email.value || !form.salario.value || !form.dataAdmissao.value) {
        //Se não foi, mandar mensagem para o usuário preencher
        return;
    };
    var professor = {
        id: form.id.value,
        nome: form.nome.value,
        email: form.email.value,
        salario: form.salario.value,
        dataAdmissao: form.dataAdmissao.value,
        dataCadastro: form.dataCadastro.value
    };
    (modoEdicao) ?        
        editarProfessorAPI(professor):
        cadastrarProfessorAPI(professor);
});
function cadastrarProfessorAPI(professor) {
    fetch("http://localhost:3000/professores", {
        headers: {
            "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify(professor)
    })
        .then(response => response.json()) // se funcionar
        .then(response => {
            listaProfessores.push(response);
            preencherTabela(listaProfessores);
            //obterProfessoresDaAPI()
            limparCampos();
            toast("Professor cadastrado com sucesso!");
        })
        .catch(erro => { //se não funcionar
            toast("Algo deu errado. Tente cadastrar novamente.")
        })
};
function editarProfessorAPI(professor) {
    fetch("http://localhost:3000/professores/" + professor.id, {
        headers: {
            "Content-Type": "application/json",
        },
        method: "PUT",
        body: JSON.stringify(professor)
    })
        .then(response => response.json()) // se funcionar 
        .then(response => {
        console.log(response)
            toast("Dados atualizados, com sucesso!");
            limparCampos();
            atualizarProfessorNaLista(response);
        })
        .catch(erro => { //se não funcionar
            toast("Erro na atualizaçao!")
        })
};
function deletarProfessorAPI(professor) {
    fetch("http://localhost:3000/professores/" + professor.id, {
        method: "DELETE",
    })
        .then(response => {
            toast("Professor " + professor.nome + " foi deletado!")
            obterProfessoresDaAPI();
        })
        .catch(erro => {
            toast("Erro na hora de deletar!")
        })
};
function obterProfessoresDaAPI() {
    fetch("http://localhost:3000/professores")
        .then(response => response.json())
        .then(response => {
            listaProfessores = response;
            preencherTabela(listaProfessores);
        })
        .catch(erro => {
            toast("Erro em obter os dados!")
        })
};

function atualizarProfessorNaLista(professor){
    let indice = listaProfessores.findIndex(p => p.id == professor.id);
    listaProfessores.splice(indice, 1, professor);
    preencherTabela(listaProfessores);
}
function preencherTabela(professores) {
    tbody.textContent = ""; //Limpa a tabela
    professores.map(professor => {
        var tr = document.createElement("tr");
        var th = document.createElement("th");
        var div = document.createElement("span");
        var tdNome = document.createElement("td");
        var tdEmail = document.createElement("td");
        var tdSalario = document.createElement("td");
        var tdDataAdmissao = document.createElement("td");
        var tdDataCadastro = document.createElement("td");
        var tdBtnEditar = document.createElement("button");
        var tdBtnExcluir = document.createElement("button");

        th.textContent = professor.id;
        th.setAttribute("scope", "row");
        tdNome.textContent = professor.nome;
        tdEmail.textContent = professor.email;
        tdSalario.textContent = aplicarMascaraMoeda(parseInt(professor.salario));
        tdDataAdmissao.textContent = aplicarMascaraEmDataIso(professor.dataAdmissao);
        tdDataCadastro.textContent = aplicarMascaraEmDataIso(professor.dataCadastro);
   
        // Cria o botão de editar dinamicamente
        tdBtnEditar.setAttribute("type", "button");
        tdBtnEditar.setAttribute("class", "btn btn-outline-primary");
        tdBtnEditar.setAttribute("data-bs-toggle", "modal");
        tdBtnEditar.setAttribute("data-bs-target", "#modal-professores");
        tdBtnEditar.innerHTML = 'Editar';
        tdBtnEditar.onclick = function () {
            preencherCampos(professor)
            modoEdicao = true;
            atualizartextoModal(modoEdicao);
        };
        // Cria o botão de Deletar dinamicamente
        tdBtnExcluir.style.margin = "5px 10px 5px 5px";
        tdBtnExcluir.setAttribute("type", "button");
        tdBtnExcluir.setAttribute("class", "btn btn-outline-danger");
        tdBtnExcluir.innerHTML = 'Deletar';
        tdBtnExcluir.onclick = function () {
            deletarProfessorAPI(professor);
        };

        tr.appendChild(th);
        tr.appendChild(tdNome);
        tr.appendChild(tdEmail);
        tr.appendChild(tdSalario);
        tr.appendChild(tdDataAdmissao);
        tr.appendChild(tdDataCadastro);
        div.appendChild(tdBtnEditar);
        div.appendChild(tdBtnExcluir);
        tr.appendChild(div);
        tbody.appendChild(tr);
    });
};

function limparCampos() {
    form.nome.value = "";
    form.email.value = "";
    form.salario.value = "";
    form.dataAdmissao.value = "";
    form.dataCadastro.value = "";
}

function preencherCampos(professor) {
    form.id.value = professor.id;
    form.nome.value = professor.nome;
    form.email.value = professor.email;
    form.salario.value = professor.salario;
    form.dataAdmissao.value = aplicarMascaraParaDataIso(professor.dataAdmissao);
    form.dataCadastro.value = aplicarMascaraParaDataIso(professor.dataCadastro);
}

function atualizartextoModal(modoEdicao) {
    (modoEdicao) ?
        form.titulo.textContent = "Editar Professores" :
        form.titulo.textContent = "Cadastrar Professores"
}

function toast(message) {
    //Cria uma nova toast
    new bs5.Toast({
        body: message,
    }).show();
}
obterProfessoresDaAPI();
limparCampos();