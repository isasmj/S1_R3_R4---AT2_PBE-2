import { Request, Response } from "express";
import { ProfessorService } from "../services/professor.service";

export class ProfessorController {
    constructor(private _service = new ProfessorService()) { }
    selecionarTodos = async (req: Request, res: Response) => {
        try {
            const professores = await this._service.selecionarTodos();
            res.status(200).json({ professores })
        } catch (error: unknown) {
            console.error(error)
            if (error instanceof Error) {
                res.status(500).json({ message: 'Ocorreu um erro no servidor', errorMessage: error.message })
            }
            res.status(500).json({ message: 'Ocorreu um erro no servidor', errorMessage: 'Erro desconhecido' })
        }
    };
    inserir = async (req: Request, res: Response) => {
        try {
            const { nome, email, disciplina, cargaHoraria } = req.body;
            const novo = await this._service.criar(nome, email, disciplina, cargaHoraria);
            res.status(201).json({ novo })
        } catch (error: unknown) {
            console.error(error)
            if (error instanceof Error) {
                res.status(500).json({ message: 'Ocorreu um erro no servidor', errorMessage: error.message })
            }
            res.status(500).json({ message: 'Ocorreu um erro no servidor', errorMessage: 'Erro desconhecido' })
        }
    };

    alterar = async (req: Request, res: Response) => {
        try {
            const idProfesso = Number(req.query.idProfesso)
            if (!idProfesso) {
                return res.status(400).json({ message: "ID inválido"});
            }
            const { nome, email, disciplina, cargaHoraria } = req.body;
            const alterado = await this._service.editar(idProfesso, nome, email, disciplina, cargaHoraria);
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
            const idProfesso = Number(req.query.idProfesso)
            const deletado = await this._service.deletar(idProfesso);
            if (deletado.affectedRows === 0) {
                return res.status(404).json({ message: "proessor não encontrado" });
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