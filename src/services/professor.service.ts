import { ProfessorRepository } from "../repository/professor.repository";
import { Professor } from "../models/pessoa.model";

export class ProfessorService {
    constructor(private _repository = new ProfessorRepository()) { }

    async selecionarTodos(): Promise<Professor[]> {
        return await this._repository.findAll();
    }
    async criar(nome: string, email: string, disciplina: string, cargaHoraria: number) {
        const aluno = new Professor(nome, email, disciplina, cargaHoraria);
        return await this._repository.insert(aluno);
    }
    async editar(idProfesso: number, nome: string, email: string, disciplina: string, cargaHoraria: number) {
        const aluno = new Professor(nome, email, disciplina, cargaHoraria);
        return await this._repository.change(idProfesso, aluno);
    }
    async deletar(idProfesso: number) {
        return await this._repository.delete(idProfesso);
    }
};