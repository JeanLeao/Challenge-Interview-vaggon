import { Router } from "express";
import { deleteActivies, getActivities, getUniqueActivities, registrerActivities, updateActivies, updateStatusActivies } from "./Controllers/ActivityController.js";
import { loginUser, registerUser, Token } from "./Controllers/UserController.js";
import { auth } from "./Middleware/Auth.js";

const router = Router();

// Usuarios
router.post("/user", registerUser)
router.patch('/user',  loginUser);

// Tabelas
router.post('/activity',auth, registrerActivities);
router.get('/activities/:slug',auth, getActivities);
router.get('/activities/:slug/:title',auth, getUniqueActivities);
router.delete('/activity/:id',auth, deleteActivies);
router.patch('/activity/:id',auth, updateActivies);
router.post('/activitype/:idl',auth, updateStatusActivies);

router.post('/token', Token)
export default router;