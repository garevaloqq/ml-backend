import dotenv from 'dotenv';

dotenv.config();

const SERVER_PORT = process.env.SERVER_PORT ? Number(process.env.SERVER_PORT) : 1130;
const EXTERNAL_API = process.env.EXTERNAL_API ? process.env.EXTERNAL_API : 'https://api.mercadolibre.com';

export const config = {
    externalApi: {
        url: EXTERNAL_API
    },
    server: {
        port: SERVER_PORT
    }
};
