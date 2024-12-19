import { configDotenv } from 'dotenv';
import * as joi from 'joi'

configDotenv({ path: 'apps/client-gateway/.env' })

interface EnvVars {
    PORT: number;
    PRODUCTS_MS_HOST: string;
    PRODUCTS_MS_PORT: number;
    ORDERS_MS_HOST: string;
    ORDERS_MS_PORT: number;
}

const envsSchema = joi.object({
    PORT: joi.number().required(),
    PRODUCTS_MS_HOST: joi.string().required(),
    PRODUCTS_MS_PORT: joi.number().required(),
    ORDERS_MS_HOST: joi.string().required(),
    ORDERS_MS_PORT: joi.number().required()
}).unknown(true)

const { error, value } = envsSchema.validate(process.env);

if (error) {
    throw new Error(`Config validation error: ${error.message}`);
}

const envVars: EnvVars = value as EnvVars;

export const envs = {
    port: envVars.PORT,
    productMsPort: envVars.PRODUCTS_MS_PORT,
    productMsHost: envVars.PRODUCTS_MS_HOST,
    orderMsPort: envVars.ORDERS_MS_PORT,
    orderMsHost: envVars.ORDERS_MS_HOST,
}

