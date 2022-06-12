module.exports = class Professor {
    constructor(obj){
        obj = obj || {};
        this.id = obj.id;
        this.nome = obj.nome;
        this.email = obj.email;
        this.salario = obj.salario;
        this.dataAdmissao = obj.dataAdmissao;
        this.dataCadastro = obj.dataCadastro;
    }
}