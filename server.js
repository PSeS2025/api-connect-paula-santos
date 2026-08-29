import express from 'express';
import cors from 'cors';
import userRoutes from './src/routes/userRoutes.js';

const app = express();

// Middlewares Globais
app.use(express.json());
app.use(cors());

// Roteador da aplicação
app.use(userRoutes);

app.use('/usuarios', userRoutes);

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Servidor escutando em http://localhost:${PORT}`);
});