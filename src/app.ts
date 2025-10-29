//#app.ts
import express from 'express';
import messageRoutes from './routes/message.routes.js'; //import啥隨便選 
// 只要message.routes 有export router。 
// 這邊命名的東西就能refer to 那個 router
//import giftRoutes from './routes/gift.routes';
import { errorHandler } from './middlewares/error.middleware.js';
import { connectKafkaProducer, shutdownKafkaProducer, connectConsumer, runConsumer, stopKafkaConsumer, producer } from './kafka/kafkaClient.js';

import http from 'http';


let server: http.Server; // 模組層級變數

console.log('App.ts loaded');

const app = express();

app.use(express.json());

app.use('/messages', messageRoutes);
//app.use('/gifts', giftRoutes);

app.use(errorHandler);


async function gracefulShutdown(server: http.Server, signal: string) {
  console.log(`${signal} received`);

  // 1. 先停止接收新請求
  server.close(async (err) => {
    if (err) {
      console.error('Error closing server:', err);
      process.exit(1);
    }

    try {
      await shutdownKafkaProducer();
      await stopKafkaConsumer();
      console.log('Graceful shutdown completed');
      process.exit(0);
    } catch (error) {
      console.error('Error during Kafka shutdown:', error);
      process.exit(1);
    }
  });
}

async function bootstrap() {
  await connectKafkaProducer();
  producer.on('producer.disconnect', event => console.error('Producer disconnected', event));
  await connectConsumer();
  await runConsumer();
  server = app.listen(3000, () => console.log('Server running'));

  process.on('SIGINT', () => gracefulShutdown(server,'SIGINT'));
  process.on('SIGTERM', () => gracefulShutdown(server,'SIGTERM'));
}

bootstrap().catch(console.error);

export default app;
