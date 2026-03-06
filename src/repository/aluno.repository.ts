import { db } from "../database/connection.database";
import { Aluno } from "../models/pessoa.model";
import { ResultSetHeader, RowDataPacket } from "mysql2/promise";

export class AlunoRepository {

    async findAll(): Promise<Aluno[]> {
        const [rows] = await db.execute<RowDataPacket[]>(
            "select * from alunos;");
        return rows.map(row => new Aluno(row.nome, row.email, row.matricula, row.curso, Number(row.mediaFinal)));
    }

    async insert(dados: Aluno): Promise<ResultSetHeader> {
        const sql = "insert into alunos (nome, email, matricula, curso, mediaFinal) values (?,?,?,?,?);";
        const values = [dados.nome, dados.email, dados.matricula, dados.curso, dados.mediaFinal];
        const [result] = await db.execute<ResultSetHeader>(sql, values);
        return result;
    }

    async change(idAluno: number, dados: Aluno): Promise<ResultSetHeader> {
        const sql = "update alunos set nome=?, email=?, matricula=?, curso=?, mediaFinal=? where idAluno=?;";
        const values = [dados.nome, dados.email, dados.matricula, dados.curso, dados.mediaFinal, idAluno];
        const [result] = await db.execute<ResultSetHeader>(sql, values);
        return result;
    }

    async delete(idAluno: number): Promise<ResultSetHeader> {
        const [result] = await db.execute<ResultSetHeader>("delete from alunos where idAluno=?;", [idAluno]);
        return result;
    }
}