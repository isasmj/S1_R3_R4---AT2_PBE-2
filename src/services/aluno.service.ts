import { AlunoRepository } from "../repository/aluno.repository";
import { Aluno } from "../models/pessoa.model";

export class AlunoService {
    constructor(private _repository = new AlunoRepository()) { }

    async selecionarTodos(): Promise<Aluno[]> {
        return await this._repository.findAll();
    }
    async criar(nome: string, email: string, matricula: string, curso: string, mediaFinal: number) {
        const aluno = new Aluno(nome, email, matricula, curso, mediaFinal);
        return await this._repository.insert(aluno);
    }
    async editar(idAluno: number, nome: string, email: string, matricula: string, curso: string, mediaFinal: number) {
        const aluno = new Aluno(nome, email, matricula, curso, mediaFinal);
        return await this._repository.change(idAluno, aluno);
    }
    async deletar(idAluno: number) {
        return await this._repository.delete(idAluno);
    }
}