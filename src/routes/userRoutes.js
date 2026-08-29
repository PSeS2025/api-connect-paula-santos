import { Router } from 'express';
import {
    getUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser
} from '../controllers/userController.js';

const router = Router();

// Rotas de criação e consulta
router.get('/usuarios', getUsers);
router.get('/usuarios/:id', getUserById); // Nova rota: Busca individualizada por parâmetro de URL (GET -> /usuarios/:id)
router.post('/usuarios', createUser);

// Rotas de alteração (PUT) e remoção (DELETE)
router.put('/usuarios/:id', updateUser);
router.delete('/usuarios/:id', deleteUser);

export default router;