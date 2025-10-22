import { Kafka } from 'kafkajs';
const kafka = new Kafka({ brokers: ["localhost:9094"], clientId: "seashell-consumer" });
const consumer = kafka.consumer({ groupId: "messages-group-correct-topic" });
async function run() {
    await consumer.connect();
    await consumer.subscribe({ topic: "chat_messages", fromBeginning: true });
    await consumer.run({
        eachMessage: async ({ partition, message }) => {
            if (message.value != null) {
                console.log({
                    partition,
                    offset: message.offset,
                    value: message.value.toString(),
                });
            }
        },
    });
}
run();
