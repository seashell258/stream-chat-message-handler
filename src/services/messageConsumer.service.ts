// message.service.ts
import { getMessageDTO } from '../dtos/messageConsumer.dto.js';
import { prisma } from '../prismaClient.js';
import { validateConsumerDTO } from '../validators/consumerValidator.js';


export async function addMessageToDB(messageValue: Buffer | null) { //kafka拉下來的訊息是二進制的，所以用buffer。 要 
  // toString轉回普通object

  if (!messageValue) return;
  const payload = JSON.parse(messageValue.toString());
  const data = validateConsumerDTO(getMessageDTO, payload);
  if (!data) return;
  console.log('palyloadata', {
    userId: payload.userId,
    roomId: payload.roomId,
    content: payload.content,
  })
  try {
    await prisma.message.create({
      data: {
        userId: payload.userId,
        roomId: payload.roomId,
        content: payload.content,
      }

    });

  } catch (error) {
    console.error('DB insert error:', error);
  }

}
