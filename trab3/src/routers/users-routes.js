import { Router } from 'express';
import { UserController } from '../Controllers/users-controller.js';
import { UserService } from '../Services/users-services.js';
import { UsersRepository } from '../Repositories/users-repository.js';
import { db } from '../db/db-connection.js';
import { AuthController } from '../Controllers/auth-controller.js';

const router = Router();

const repository = new UsersRepository(db)
const service = new UserService(repository)
const userController = new UserController(service);
const authController = new AuthController(service);

router.get('/profile', (req, res) => userController.getProfile(req, res))
router.post('/', (req, res) => userController.create(req, res));
router.post('/auth', (req, res) => authController.login(req, res));

export default router;