import { Kafka } from 'kafkajs';
const kafka = new Kafka({
    clientId: 'my-producer',
    brokers: ['localhost:9094']
});
const producer = kafka.producer();
const run = async () => {
    await producer.connect();
    for (let i = 0; i < 10; i++) {
        await producer.send({
            topic: 'chat_messages',
            messages: [
                { key: `key-${i}`, value: `message-${i}` }
            ]
        });
        console.log(`Sent message ${i}`);
    }
    await producer.disconnect();
};
run().catch((err) => {
    console.error(err);
});
