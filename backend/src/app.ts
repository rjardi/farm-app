import express from 'express';
import cors from 'cors';

import farmRoutes from './features/farm/farm.routes';
import animalRoutes from './features/animal/animal.routes'; // Corrección aquí

const app = express();

// ✅ Middleware CORS para permitir peticiones desde el frontend
app.use(cors({
  origin: 'http://localhost:5173', // Permite el origen de Vite (React)
  credentials: true,
}));

// ✅ Middleware para parsear JSON
app.use(express.json());

// ✅ Rutas para las granjas
app.use('/api/farms', farmRoutes);

// ✅ Rutas para los animales
app.use('/api/animals', animalRoutes);

export default app;
