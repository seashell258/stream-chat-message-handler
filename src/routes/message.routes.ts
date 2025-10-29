///  post/messages will get direct to here
import { Router } from 'express';
import { MessageProducerController } from '../controllers/message.controller.js';
import { validateDTO } from '../middlewares/validation.middleware.js';
import { CreateMessageDTO } from '../dtos/messageProducer.dto.js';

const router = Router();
const controller = new MessageProducerController();

router.post('/', validateDTO(CreateMessageDTO), controller.handleMessageController.bind(controller));

export default router;
