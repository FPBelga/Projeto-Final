
const Professor = require('../model/Professor');
const serviceProfessor = require('../service/servicoProfessor');

module.exports = class ProfessorController {

    async obterTodos(req, res) {
        try {
            let professores = serviceProfessor.obterTodos();
            return res.json(professores);
        } catch (error) {
            console.log(error);
            return res.json({ mensagem: error.message })
        }
    }

    async obterPorId(req, res) {
        try {
            var id = req.params.id;

            let professor = serviceProfessor.obterPorId(id);
            return res.json(professor);

        } catch (error) {
            console.log(error);
            return res.json({ mensagem: error.message })
        }
    }

    async cadastrar(req, res) {
        try {
            let professor = serviceProfessor.cadastrar(req.body);
            return res.json(professor);

        } catch (error) {
            console.log(error);
            return res.json({ mensagem: error.message })
        }
    }

    async atualizar(req, res) {
        try {
            console.log(req.body);
            var id = req.params.id;
            var professor = req.body || {};

            professor.id = parseInt(id);

            let professorAtualizado = serviceProfessor.atualizar(professor);
            return res.json(professorAtualizado);

        } catch (error) {
            console.log(error);
            return res.json({ mensagem: error.message })
        }
    }

    async deletar(req, res) {
        try {
            var id = req.params.id;
            let professorAtualizado = serviceProfessor.deletar(id);
            return res.json(professorAtualizado);

        } catch (error) {
            console.log(error);
            return res.json({ mensagem: error.message })
        }
    }
}