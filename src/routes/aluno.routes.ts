import { Router } from "express";
import { AlunoController } from "../controllers/aluno.controller";

const router = Router();
const controller = new AlunoController();
router.get("/alunos", controller.selecionarTodos);
router.post("/alunos", controller.inseir);
router.put("/alunos", controller.alterar);
router.delete("/alunos", controller.deletar);

export default router;