//# messageProducerService
import { prisma } from '../prismaClient.js';
import { CreateMessageDTO } from '../dtos/messageProducer.dto.js';
import { producer } from '../kafka/kafkaClient.js';
// service 最好都有 return 值。無論controller使不使用，都可以提升可觀測性 + 到時候不依賴controller 也能進行單元測試
export class MessageProducerService {
    async handleMessage(data) {
        console.log('handle messaged called. position:before send to producer');
        try {
            await producer.send({
                topic: 'chat_messages',
                messages: [
                    { key: String(data.userId), value: JSON.stringify(data) },
                ]
            });
            console.log('to kafka message. key :', String(data.userId), 'value:', JSON.stringify(data));
            return {
                success: true,
                message: `Sent message to Kafka`,
                key: data.userId,
            };
        }
        catch (error) {
            console.log("handleMessages producer error position idnetifiererrrrrrrrrrrrrrrrrrrrrrrrrrrr", error);
            return {
                success: false,
                message: 'Unknown error',
                key: data.userId,
            };
        }
    }
}
