const Professor = require('../model/Professor');
var idAtual = 2;

var listaDeProfessores = [
    new Professor({
        id: 1,
        nome: "PROFESSOR TESTE 01",
        email: "testedecadastro01@unifaa.com.br",
        salario: 8500,
        dataAdmissao: "01/01/2022",
        dataCadastro: new Date().toISOString()

    }),
    new Professor({
        id: 2,
        nome: "PROFESSOR TESTE 02",
        email: "testedecadastro02@unifaa.com.br",
        salario: 9500,
        dataAdmissao: "01/01/2022",
        dataCadastro: new Date().toISOString()
    })
];

function obterTodos() {
    return listaDeProfessores;
}

function obterPorId(id) {
    return listaDeProfessores.find(p => p.id == id);
}

function cadastrar(obj) {
    var professor = new Professor(obj);
    idAtual++;
    professor.id = idAtual;
    professor.dataCadastro = new Date().toISOString();
    listaDeProfessores.push(professor);
    return professor;
}

function atualizar(professor) {

    var indice = listaDeProfessores.findIndex(p => p.id == professor.id);

    if (indice < 0) {
        return;
    }
    listaDeProfessores.splice(indice, 1, professor);
    return professor;
}

function deletar(id) {
    var indice = listaDeProfessores.findIndex(p => p.id == id);
    if (indice < 0) {
        return;
    }
    // Deleta de dentro do array a posicição especifica
    listaDeProfessores.splice(indice, 1);
}
module.exports = {
    obterTodos,
    obterPorId,
    cadastrar,
    atualizar,
    deletar
}