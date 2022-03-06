import fs from 'fs';

const readDBPassword = () => {
    const { DB_PASSWORD, DB_PASSWORD_FILE } = process.env;
    if (DB_PASSWORD) {
        return DB_PASSWORD;
    }
    if (DB_PASSWORD_FILE) {
        return fs.readFileSync(DB_PASSWORD_FILE, 'utf8');
    }
    throw new Error('Either DB_PASSWORD or DB_PASSWORD_FILE must be defined');
};

const readDBUser = () => {
    const { DB_USER, DB_USER_FILE } = process.env;
    if (DB_USER) {
        return DB_USER;
    }
    if (DB_USER_FILE) {
        return fs.readFileSync(DB_USER_FILE, 'utf8');
    }
    throw new Error('Either DB_USER or DB_USER_FILE must be defined');
};

export const Credentials = {
    host: process.env.DB_HOST || '127.0.0.1',
    port: process.env.DB_PORT || 3307,
    user: readDBUser(),
    password: readDBPassword(),
    namedPlaceholders: true,
};
export const Schemas = {
    TV: 'tv',
    KAREOKE: 'kareoke',
    TO_DO_LIST: 'to_do_list',
    READINGS: 'climate',
    RECIPES: 'recipes',
};
export const ConnectionPoolSettings = {
    namedPlaceholders: true,
};
