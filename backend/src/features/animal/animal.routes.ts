import { Router } from 'express';
import {
  getAllAnimals,
  getAnimalById,
  createAnimal,
  updateAnimal,
  deleteAnimal,
} from './animal.controller';
import { validateAnimal } from './animal.middleware';

// Crear una instancia del enrutador de Express
const animalRoutes = Router();

/**
 * Ruta GET /
 * Obtiene todos los animales registrados.
 */
animalRoutes.get('/', getAllAnimals);

/**
 * Ruta GET /:id
 * Obtiene un animal específico por su ID.
 */
animalRoutes.get('/:id', getAnimalById);

/**
 * Ruta POST /
 * Crea un nuevo animal. Usa middleware para validar los datos antes de crear.
 */
animalRoutes.post('/', validateAnimal, createAnimal);

/**
 * Ruta PUT /:id
 * Actualiza un animal existente. Usa middleware para validar los datos antes de actualizar.
 */
animalRoutes.put('/:id', validateAnimal, updateAnimal);

/**
 * Ruta DELETE /:id
 * Elimina un animal por su ID.
 */
animalRoutes.delete('/:id', deleteAnimal);

// Exportar el conjunto de rutas para animales
export default animalRoutes;
