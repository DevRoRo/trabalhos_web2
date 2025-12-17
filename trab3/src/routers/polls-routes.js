import { Router } from 'express';
import { db } from '../db/db-connection.js';
import { PollsRepository } from '../Repositories/poll-repository.js';
import { pollService } from '../Services/poll-services.js';
import { pollController } from '../Controllers/poll-controller.js';
import { authenticateToken } from '../Middlewares/token-auth.js';
import { UsersRepository } from '../Repositories/users-repository.js';


const router = Router();

router.use(authenticateToken)

const pollRepository = new PollsRepository(db)
const userRepository = new UsersRepository(db)
const service = new pollService(pollRepository, userRepository)
const controller = new pollController(service)

router.post('/create', (req, res) => controller.create(req, res))
router.post('/:pollId/close', (req, res) => controller.updatePoll(req, res))
router.post('/:pollId/extend', (req, res) => controller.updatePoll(req, res))
router.post('/:pollId/votes', (req, res) => controller.votar(req, res))
router.get('/:pollId/results', (req, res) => controller.showPartials(req, res))

export default router;