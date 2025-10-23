import { Router } from 'express';
import { MessageProducerController } from '../controllers/message.controller.js';
import { validateDTO } from '../middlewares/validation.middleware.js';
import { CreateMessageDTO } from '../dtos/message.dto.js';

const router = Router();
const controller = new MessageProducerController();

router.post('/', validateDTO(CreateMessageDTO), controller.handleMessage.bind(controller));

export default router;
