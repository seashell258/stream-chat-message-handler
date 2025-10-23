import type { Request, Response } from 'express';
import { MessageProducerService } from '../services/messageProducer.service.js';

const service = new MessageProducerService();

export class MessageProducerController { 
  
  async handleMessage(req: Request, res: Response) {
    console.log('controller create called')
    const message = await service.handleMessage(req.body);
    res.json({ success: true, data: message });
  }


}
