import { Request, Response } from 'express';
import * as farmService from './farm.service';

/**
 * Obtiene todas las granjas.
 * @route GET /api/farms
 */
export const getAllFarms = async (_req: Request, res: Response) => {
  const farms = await farmService.findAll();
  res.json(farms);
};

/**
 * Obtiene una granja por su ID.
 * @route GET /api/farms/:id
 */
export const getFarmById = async (req: Request, res: Response): Promise<void> => {
  const farm = await farmService.findById(+req.params.id);
  if (!farm) {
    res.status(404).json({ message: 'Farm not found' });
    return;
  }
  res.json(farm);
};

/**
 * Crea una nueva granja.
 * @route POST /api/farms
 */
export const createFarm = async (req: Request, res: Response) => {
  const farm = await farmService.create(req.body);
  res.status(201).json(farm);
};

/**
 * Actualiza una granja existente por ID.
 * @route PUT /api/farms/:id
 */
export const updateFarm = async (req: Request, res: Response) => {
  const updated = await farmService.update(+req.params.id, req.body);
  if (!updated) {
    res.status(404).json({ message: 'Farm not found' });
    return;
  }
  res.json(updated);
};

/**
 * Elimina una granja por su ID.
 * @route DELETE /api/farms/:id
 */
export const deleteFarm = async (req: Request, res: Response) => {
  const deleted = await farmService.remove(+req.params.id);
  if (!deleted) {
    res.status(404).json({ message: 'Farm not found' });
    return;
  }
  res.status(204).send(); // Respuesta sin contenido
};
