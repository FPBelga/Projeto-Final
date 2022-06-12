var tbody = document.querySelector("table>tbody");

let btnAdicionar = document.getElementById("btn-adicionar");

let form = {

    id: document.getElementById("id"),
    nome: document.getElementById("nome"),
    email: document.getElementById("email"),
    salario: document.getElementById("salario"),
    dataAdmissao: document.getElementById("dataAdmissao"),
    btnsalvar: document.getElementById("btn-salvar"),
    btncancelar: document.getElementById("btn-cancelar"),
    titulo: document.getElementById("titulo")
}

let modoEdicao =false;

let textoModal = "Adicionar professor";

 btnAdicionar.addEventListener('click', () => {
    
     limparCampos();
     modoEdicao = false;
     atualizartextoModal(modoEdicao);   

 }); 

form.btnsalvar.addEventListener('click', () => {
    
    // var professor = { 
        
    //     nome: form.nome.value,
    //     email: form.email.value,
    //     salario : form.salario.value,
    //     dataAdmissao: form.dataAdmissao.value,
    // };
        //Aqui preciso verificar se os campos foram preenchidos
    //     if(!form.nome || !professor.email || !professor.salario || !professor.dataAdmissao){
    //         //Se não foi, mandar mensagem para o usuário preencher
    //         alert ("Os campos Nome, E-mail, Salário e Data Admissão são obrigatórios");
    //     return;
    //  }
      
       if (modoEdicao){
        
        var professor = {
            id: form.id.value,
            nome: form.nome.value,
            email: form.email.value,
            salario : form.salario.value,
            dataAdmissao: form.dataAdmissao.value,
        }; 
        console.log(professor.id) 
        editarProfessorAPI(professor)          
       } else {
        var professor = {
        
            nome: form.nome.value,
            email: form.email.value,
            salario : form.salario.value,
            dataAdmissao: form.dataAdmissao.value,
        };
        cadastrarProfessorAPI(professor);
       }

    //   (modoEdicao) ? 
    //       editarProfessorAPI(professor):
    //       cadastrarProfessorAPI(professor);
});

function cadastrarProfessorAPI(professor){
    alert("cadastro");
    console.log(professor);
    fetch("http://localhost:3000/professores",{
        headers: {
            "Content-Type": "application/json",
        },
        method: "POST",
        body:JSON.stringify(professor)
    })
    .then(response => response.json()) // se funcionar
    .then(response => {
        obterProfessoresDaAPI() 
        
    })
    .catch( erro => { //se não funcionar
        console.log(erro);
        alert("Algo deu errado. Tente cadastrar novamente")
    })
}

function editarProfessorAPI(professor){
    
    console.log("professor", professor.id) 
   

    fetch("http://localhost:3000/professores/" + professor.id,{
        headers: {
            "Content-Type": "application/json",
        },
        method: "PUT",
        body:JSON.stringify(professor)
    })
    
    .then(response => response.json()) // se funcionar
    .then(response => {
                
        alert("Dados atualizados")
        limparCampos();
        console.log(response);
        obterProfessoresDaAPI();

    })
    .catch( erro => { //se não funcionar
        console.log(erro);
        alert("Algo deu errado")
    })

}

function deletarProfessorAPI(professor){
     
    fetch("http://localhost:3000/professores/" + professor.id,{
        method: "DELETE",
    })
    .then(response => {
        
        alert("Professor: " + professor.id + " " + professor.nome + " Foi deletado")
        obterProfessoresDaAPI();
    })
    .catch( erro => { //se não funcionar
        console.log(erro);
       
    })
}

function obterProfessoresDaAPI(){

    fetch("http://localhost:3000/professores")
    .then(response => response.json()) // se funcionar
    .then(response => {
        
        preencherTabela(response);       
        
    })
    .catch( erro => console.log(erro))//se não funcionar
}

function preencherTabela(professores){
    tbody.textContent=""; //Limpando a tabela
    professores.map(professor =>{

        var tr = document.createElement("tr");
        var tdId = document.createElement("td");
        var tdNome = document.createElement("td");
        var tdEmail = document.createElement("td");
        var tdSalario = document.createElement("td");
        var tdDataAdmissao = document.createElement("td");
        var tdDatacadastro = document.createElement("td");
        var tdBtnExcluir = document.createElement("button");
        var tdBtnEditar = document.createElement("button");

        
        tdId.textContent = professor.id;
        tdNome.textContent = professor.nome;
        tdEmail.textContent = professor.email;
        tdSalario.textContent = professor.salario;
        tdDataAdmissao.textContent = professor.dataAdmissao;
        tdDatacadastro.textContent = aplicarMascaraEmDataIso(professor.dataCadastro); //Aplicar mascara na data
        tdBtnExcluir.innerHTML = 'Deletar';
        tdBtnExcluir.onclick = function(){
            deletarProfessorAPI(professor);
        };
        tdBtnEditar.setAttribute("class","btn btn-danger")
        tdBtnEditar.setAttribute("data-toggle","modal")
        tdBtnEditar.setAttribute("class","btn btn-success")
        tdBtnEditar.setAttribute("data-target","#modal-professores")
        tdBtnEditar.innerHTML = 'Editar';
        tdBtnEditar.onclick = function(){
            preencherCampos(professor)
            modoEdicao = true
            atualizartextoModal(modoEdicao);
        };
        //tdBtnEditar = 'data-toggle="modal" data-target="#modal-professores"'

        tr.appendChild(tdId);
        tr.appendChild(tdNome);
        tr.appendChild(tdEmail);
        tr.appendChild(tdSalario);
        tr.appendChild(tdDataAdmissao);
        tr.appendChild(tdDatacadastro);
        tr.appendChild(tdBtnExcluir);
        tr.appendChild(tdBtnEditar);
        
        tbody.appendChild(tr);
    })
}
    function limparCampos(){
        
        form.nome.value = "";
        form.email.value = "";
        form.salario.value = "";
        form.dataAdmissao.value = "";
    }
    
    function preencherCampos(professor){
        
        form.nome.value = professor.nome;
        form.email.value =professor.email;
        form.salario.value = professor.salario;
        form.dataAdmissao.value = professor.dataAdmissao;
    }
   
    function atualizartextoModal(modoEdicao){
       // modoEdicao = form.titulo.setAttribute = "modal-title"
        (modoEdicao) ?
            form.titulo.textContent = "Editar Professores":
            form.titulo.textContent = "Cadastrar Professores"

    }
    atualizartextoModal()
    obterProfessoresDaAPI();
    limparCampos();