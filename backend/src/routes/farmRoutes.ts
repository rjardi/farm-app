import express from 'express';
import { getAllFarms, createFarm, updateFarm, deleteFarm } from '../controllers/farmController';

const router = express.Router();

// Obtener todas las granjas
router.get('/', getAllFarms);

// Crear una nueva granja
router.post('/', createFarm);

// Actualizar una granja
// router.put('/:id', updateFarm);

// Eliminar una granja
// router.delete('/:id', deleteFarm);

export default router;
