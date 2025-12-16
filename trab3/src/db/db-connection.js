import pkg from '@prisma/client';
const { PrismaClient } = pkg;

// inicializa o client do ORM
export const db = new PrismaClient({
    // mostra no console as queries feitas
    log: ['query', 'info', 'warn', 'error'],
});