import { configDotenv } from 'dotenv';
import * as joi from 'joi'

configDotenv({ path: 'apps/orders/.env' })

interface EnvVars {
    PORT2: number
    PRODUCTS_MS_HOST: string;
    PRODUCTS_MS_PORT: number;
    DATABASE_URL: string;
}

const envsSchema = joi.object({
    PORT: joi.number().required(),
    PORT2: joi.number().required(),
    DATABASE_URL: joi.string().required(),
    PRODUCTS_MS_HOST: joi.string().required(),
    PRODUCTS_MS_PORT: joi.number().required(),
}).unknown(true)

console.log('process.env.PORT', process.env.PORT)
console.log('process.env.PORT', process.env.PORT2)

const { error, value } = envsSchema.validate(process.env);

if (error) {
    throw new Error(`Config validation error: ${error.message}`);
}
const { PORT, DATABASE_URL, PRODUCTS_MS_PORT } = process.env;
const envVars: EnvVars = value as EnvVars;

export const envs = {
    port: envVars.PORT2,
    DATABASE_URL: envVars.DATABASE_URL,
    productMsPort: envVars.PRODUCTS_MS_PORT,
    productMsHost: envVars.PRODUCTS_MS_HOST,
}

