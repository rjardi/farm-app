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

/**
 * Rutas relacionadas con la gestión de granjas.
 * Incluyen operaciones CRUD: listar, obtener, crear, actualizar y eliminar granjas.
 */

// Obtener todas las granjas
farmRoutes.get('/', getAllFarms);

// Obtener una granja por su ID
farmRoutes.get('/:id', getFarmById);

// Crear una nueva granja (con validación previa)
farmRoutes.post('/', validateFarm, createFarm);

// Actualizar una granja existente (con validación previa)
farmRoutes.put('/:id', validateFarm, updateFarm);

// Eliminar una granja por su ID
farmRoutes.delete('/:id', deleteFarm);

export default farmRoutes;
