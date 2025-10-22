import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
export const validateDTO = (dtoClass) => async (req, res, next) => {
    const dtoObj = plainToInstance(dtoClass, req.body);
    const errors = await validate(dtoObj);
    if (errors.length > 0) {
        return res.status(400).json({ success: false, errors });
    }
    req.body = dtoObj;
    next();
};
