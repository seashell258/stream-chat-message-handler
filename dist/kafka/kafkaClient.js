// kafka/kafkaClient.ts
import { Kafka } from 'kafkajs';
export const kafka = new Kafka({
    clientId: 'speedpasta-service',
    brokers: ['localhost:9092'], // 若 Kafka 在 Docker，可改成宿主IP或 docker-compose service name
});
