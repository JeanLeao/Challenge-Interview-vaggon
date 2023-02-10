import { Router } from "express";
import { deleteActivies, getActivities, getUniqueActivities, registrerActivities, updateActivies, updateStatusActivies } from "./Controllers/ActivityController.js";
import { loginUser, registerUser } from "./Controllers/UserController.js";

const router = Router();

// Usuarios
router.post("/user", registerUser)
router.patch('/user',  loginUser);

// Tabelas
router.post('/activity', registrerActivities);
router.get('/activities/:slug', getActivities);
router.get('/activities/:slug/:title', getUniqueActivities);
router.delete('/activity/:id', deleteActivies);
router.patch('/activity/:id', updateActivies);
router.patch('/activitype/:id', updateStatusActivies);

export default router;