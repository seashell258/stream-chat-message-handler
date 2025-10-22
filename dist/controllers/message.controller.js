import { MessageService } from '../services/messageProducer.service.js';
const service = new MessageService();
export class MessageController {
    async create(req, res) {
        console.log('controller create called');
        const message = await service.create(req.body);
        res.json({ success: true, data: message });
    }
    async list(req, res) {
        const messages = await service.findAll();
        res.json({ success: true, data: messages });
    }
}
