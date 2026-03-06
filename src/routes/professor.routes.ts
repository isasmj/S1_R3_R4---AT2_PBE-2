import { Router } from "express";
import { ProfessorController } from "../controllers/professor.controller";

const router = Router();
const controller = new ProfessorController();
router.get("/professores", controller.selecionarTodos);
router.post("/professores", controller.inserir);
router.put("/professores", controller.alterar);
router.delete("/professores", controller.deletar);

export default router;