import { prisma } from '../prismaClient.js';
import { CreateMessageDTO } from '../dtos/message.dto.js';
import { producer } from '../kafka/kafkaClient.js';


export class MessageProducerService {

  async handleMessage(data: CreateMessageDTO): Promise<void> {

    await producer.send({
      topic: 'chat_messages',
      messages: [
        { key: String(data.userId), value: JSON.stringify(data) },
      ]
    });
    console.log(`Sent message to kafka key ${data.userId}`);
  }


}