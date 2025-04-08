import { Router } from 'express';
import {
  getAllFarms,
  getFarmById,
  createFarm,
  updateFarm,
  deleteFarm,
} from './farm.controller';
import { validateFarm } from './farm.middleware';

const farmRoutes = Router();

farmRoutes.get('/', getAllFarms);
farmRoutes.get('/:id', getFarmById);
farmRoutes.post('/', validateFarm, createFarm);
farmRoutes.put('/:id', validateFarm, updateFarm);
farmRoutes.delete('/:id', deleteFarm);

export default farmRoutes;

// import express from 'express';
// import { getAllFarms, createFarm, updateFarm, deleteFarm } from '../controllers/farmController';

// const router = express.Router();

// // Obtener todas las granjas
// router.get('/', getAllFarms);

// // Crear una nueva granja
// router.post('/', createFarm);

// // Actualizar una granja
// // router.put('/:id', updateFarm);

// // Eliminar una granja
// // router.delete('/:id', deleteFarm);

// export default router;

