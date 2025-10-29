// kafka/kafkaClient.ts
import { Kafka } from 'kafkajs';
import { prisma } from '../prismaClient.js';
import { addMessageToDB } from '../services/messageConsumer.service.js';

const kafka = new Kafka({
  clientId: 'stream-service',
  brokers: ['127.0.0.1:9094'], // 若 Kafka 在 Docker，可改成宿主IP或 docker-compose service name
});


export const producer = kafka.producer();
export const consumer = kafka.consumer({ groupId: 'message-group-1' });

export async function connectKafkaProducer() {

  await producer.connect();
  console.log('Kafka producer connected');
}

export async function shutdownKafkaProducer() {
  await producer.disconnect();
  console.log('Kafka producer disconnected from my shutdown');
}


export async function connectConsumer() {
  await consumer.connect();
  await consumer.subscribe({ topic: 'chat_messages', fromBeginning: true });
  console.log('Kafka Consumer connected and subscribed');
}

export async function runConsumer() {
  await consumer.run({
    eachMessage: async ({ message }) => {
      try {
        console.log("get one message")
        await addMessageToDB(message.value);
        console.log("finish one message")
      } catch (error) {
        console.error(error)
      }
    },
  });
}

export async function stopKafkaConsumer() {
  await consumer.disconnect();
  console.log('Kafka Consumer disconnected');
}