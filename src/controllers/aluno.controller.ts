import { Request, Response } from "express";
import { AlunoService } from "../services/aluno.service";

export class AlunoController {
    constructor(private _service = new AlunoService()) { }
    selecionarTodos = async (req: Request, res: Response) => {
        try {
            const alunos = await this._service.selecionarTodos();
            res.status(200).json({ alunos })
        } catch (error: unknown) {
            console.error(error)
            if (error instanceof Error) {
                res.status(500).json({ message: 'Ocorreu um erro no servidor', errorMessage: error.message })
            }
            res.status(500).json({ message: 'Ocorreu um erro no servidor', errorMessage: 'Erro desconhecido' })
        }
    };

    inseir = async (req: Request, res: Response) => {
        try {
            const { nome, email, matricula, curso, mediaFinal } = req.body;
            const novo = await this._service.criar(nome, email, matricula, curso, mediaFinal);
            res.status(201).json({ novo })
        } catch (error: unknown) {
            console.error(error)
            if (error instanceof Error) {
                res.status(500).json({ message: 'Ocorreu um erro no servidor', errorMessage: error.message })
            }
            res.status(500).json({ message: 'Ocorreu um erro no servidor', errorMessage: 'Erro desconhecido' })
        }
    }

    alterar = async (req: Request, res: Response) => {
        try {
            const idAluno = Number(req.query.idAluno)
            if (!idAluno) {
                return res.status(400).json({ message: "ID inválido"});
            }
            const { nome, email, matricula, curso, mediaFinal } = req.body;
            const alterado = await this._service.editar(idAluno, nome, email, matricula, curso, mediaFinal);
            res.status(200).json({ alterado })
        } catch (error: unknown) {
            console.error(error)
            if (error instanceof Error) {
                res.status(500).json({ message: 'Ocorreu um erro no servidor', errorMessage: error.message })
            }
            res.status(500).json({ message: 'Ocorreu um erro no servidor', errorMessage: 'Erro desconhecido' })
        }
    };

    deletar = async (req: Request, res: Response) => {
        try {
            const idAluno = Number(req.query.idAluno)
            const deletado = await this._service.deletar(idAluno);
            if (deletado.affectedRows === 0) {
                return res.status(404).json({ message: "aluno não encontrado" });
            }
            res.status(200).json({ deletado })
        } catch (error: unknown) {
            console.error(error)
            if (error instanceof Error) {
                res.status(500).json({ message: 'Ocorreu um erro no servidor', errorMessage: error.message })
            }
            res.status(500).json({ message: 'Ocorreu um erro no servidor', errorMessage: 'Erro desconhecido' })
        }
    };
};