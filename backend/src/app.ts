import express from 'express';
// import farmRoutes from './features/farm/farm.routes';
import farmRoutes from './features/farm/farm.routes';
import cors from "cors";

const app = express();

// ✅ Middleware CORS para permitir peticiones desde el frontend
app.use(cors({
    origin: 'http://localhost:5173', // Permite el origen de Vite (React)
    credentials: true,
  }));

app.use(express.json());

// Usar rutas para las granjas
app.use('/api/farms', farmRoutes);

export default app;
