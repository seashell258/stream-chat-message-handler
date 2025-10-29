// 雖然在 middleware 已經有資料驗證的邏輯。 但 consumer 不是由 api 來獲得資料的// validators/consumerValidator.ts
import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
export async function validateConsumerDTO(dtoClass, data) {
    const dtoObj = plainToInstance(dtoClass, data);
    const errors = await validate(dtoObj);
    if (errors.length > 0) {
        console.error('Invalid consumer message:', errors);
        return null;
    }
    return dtoObj;
}
