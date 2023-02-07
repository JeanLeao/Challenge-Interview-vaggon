import { Router } from "express";
import { loginUser, registerUser } from "./Controllers/Users/UserController.js";

const router = Router();

// Usuarios
router.post("/user", registerUser)
router.patch('/user',  loginUser);

// Tabelas
    //router.get('/olaa', jsonOla);

export default router;