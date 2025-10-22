import { prisma } from '../prismaClient.js';
import { CreateMessageDTO } from '../dtos/message.dto.js';
import { kafka } from '../kafka/kafkaClient.js';

export class MessageService {
  async create(data: CreateMessageDTO) {
    console.log('messageService  create called')
    return prisma.message.create({ data });
  }

  async findAll() {
    return prisma.message.findMany();
  }
}
