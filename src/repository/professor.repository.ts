import { db } from "../database/connection.database";
import { Professor } from "../models/pessoa.model";
import { ResultSetHeader, RowDataPacket } from "mysql2/promise";

export class ProfessorRepository {
    async findAll(): Promise<Professor[]> {
        const [rows] = await db.execute<RowDataPacket[]>(
            "select * from professores;");
        return rows.map(row => new Professor(row.nome, row.email, row.disciplina, Number(row.cargaHoraria)));
    }

    async insert(dados: Professor): Promise<ResultSetHeader> {
        const sql = `insert into professores (nome, email, disciplina, cargaHoraria) values (?, ?, ?, ?); `;
        const values = [dados.nome, dados.email, dados.disciplina, dados.cargaHoraria];
        const [result] = await db.execute<ResultSetHeader>(sql, values);
        return result;
    }

    async change(idProfesso: number, dados: Professor): Promise<ResultSetHeader> {
        const sql = "update professores set nome = ?, email = ?, disciplina = ?, cargaHoraria = ? where idProfesso = ?";
        const values = [dados.nome, dados.email, dados.disciplina, dados.cargaHoraria, idProfesso];
        const [result] = await db.execute<ResultSetHeader>(sql, values);
        return result;
    }

    async delete(idProfesso: number): Promise<ResultSetHeader> {
        const sql = "delete from professores where idProfesso=?;";
        const [result] = await db.execute<ResultSetHeader>(sql, [idProfesso]);
        return result;
    }
}