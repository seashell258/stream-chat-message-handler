// kafka/kafkaClient.ts
import { Kafka } from 'kafkajs';

const kafka = new Kafka({
  clientId: 'speedpasta-service',
  brokers: ['localhost:9092'], // 若 Kafka 在 Docker，可改成宿主IP或 docker-compose service name
});


export const producer = kafka.producer();
export const consumer = kafka.consumer({ groupId: 'my-group' });

export async function connectKafkaProducer() {
  await producer.connect();  
  console.log('Kafka producer connected');
}

export async function shutdownKafkaProducer() {
  await producer.disconnect();
  console.log('Kafka producer disconnected');
}