import { Router } from 'express';
import { MessageController } from '../controllers/message.controller.js';
import { validateDTO } from '../middlewares/validation.middleware.js';
import { CreateMessageDTO } from '../dtos/message.dto.js';

const router = Router();
const controller = new MessageController();

router.post('/', validateDTO(CreateMessageDTO), controller.create.bind(controller));
router.get('/', controller.list.bind(controller));

export default router;
