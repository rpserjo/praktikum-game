import { Client } from 'pg';
import dotenv from 'dotenv';

dotenv.config({ path: '../../.env' });

const { POSTGRES_HOST, POSTGRES_USER, POSTGRES_PASSWORD, POSTGRES_DB, POSTGRES_PORT } = process.env;

//  eslint-disable-next-line
export const createClientAndConnect = async (): Promise<Client | null> => {
    try {
        const client = new Client({
            user: POSTGRES_USER,
            host: POSTGRES_HOST,
            database: POSTGRES_DB,
            password: POSTGRES_PASSWORD,
            port: Number(POSTGRES_PORT),
        });

        await client.connect();

        const res = await client.query('SELECT NOW()');
        console.log('  ➜ 🎸 Connected to the database at:', res?.rows?.[0].now);
        client.end();

        return client;
    } catch (e) {
        console.error(e);
    }

    return null;
};
