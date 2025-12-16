import { Router } from 'express';
import { db } from '../db/db-connection.js';
import { pollsRepository } from '../Repositories/poll-repository.js';
import { pollService } from '../Services/poll-services.js';
import { pollController } from '../Controllers/poll-controller.js';

const router = Router();

const repository = new pollsRepository(db)
const service = new pollService(repository)
const controller = new pollController(service)

router.post('/polls', (req, res) => controller.create(req, res))

export default router;