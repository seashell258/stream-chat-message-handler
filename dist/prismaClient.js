import { PrismaClient } from '../src/prismaGenerated/client/index.js'; //用@是指向 nodemodules裡面 
// @prisma資料夾/client資料夾的 /index.js 與 index.d.ts 。 
// 利用這兩個檔案來得到 prismaClient 的 class 然後進行 import
export const prisma = new PrismaClient();
// 建立單例讓其他檔案都共用這個連線
