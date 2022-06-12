const express = require("express");
const routes = express.Router();
const ProfessorController = require('./src/controllers/ProfessorController');
const professorController = new ProfessorController();

//professor
routes.get("/Professores", professorController.obterTodos);
routes.get("/Professores/:id", professorController.obterPorId);
routes.post('/Professores', professorController.cadastrar);
routes.put("/Professores/:id", professorController.atualizar);
routes.delete("/Professores/:id", professorController.deletar);

module.exports = routes;