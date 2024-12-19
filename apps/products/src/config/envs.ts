import { configDotenv } from 'dotenv';
import * as joi from 'joi'

configDotenv({ path: 'apps/products/.env' })

interface EnvVars {
    PORT: number,
    DATABASE_URL: string
}

const envsSchema = joi.object({
    PORT: joi.number().required(),
    DATABASE_URL: joi.string().required()
}).unknown(true)

const { error, value } = envsSchema.validate(process.env);

if (error) {
    throw new Error(`Config validation error: ${error.message}`);
}

const envVars: EnvVars = value as EnvVars;

export const envs = {
    port: envVars.PORT,
    databaseUrl: envVars.DATABASE_URL
}

