import crypto from 'node:crypto';

// Estrutura em memória mantendo o estado dos usuários
export const users = [];

// Função auxiliar para criar IDs únicos universais
export const generateId = () => crypto.randomUUID();