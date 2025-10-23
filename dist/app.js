import express from 'express';
import messageRoutes from './routes/message.routes.js'; //import啥隨便選 
// 只要message.routes 有export router。 
// 這邊命名的東西就能refer to 那個 router
//import giftRoutes from './routes/gift.routes';
import { errorHandler } from './middlewares/error.middleware.js';
console.log('App.ts loaded');
const app = express();
app.use(express.json());
app.use('/messages', messageRoutes);
//app.use('/gifts', giftRoutes);
app.use(errorHandler);
export default app;
