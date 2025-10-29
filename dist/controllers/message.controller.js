// message.controller.ts
import { MessageProducerService } from '../services/messageProducer.service.js';
import { producer } from '../kafka/kafkaClient.js';
const service = new MessageProducerService();
export class MessageProducerController {
    async handleMessageController(req, res) {
        console.log('controller create calledeeeeeeeeee');
        try {
            console.log('before handle');
            const result = await service.handleMessage(req.body);
            console.log('12313111111111111111111111', result);
            res.json(result);
        }
        catch (error) {
            console.log('12313111111111111111111111', error);
            res.json({ success: false, data: 'unknow error, check error in log' });
        }
    }
}
