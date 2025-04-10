import { Request, Response } from 'express';
import * as animalService from './animal.service';

/**
 * Controlador para obtener todos los animales.
 * Llama al servicio correspondiente y devuelve un array JSON con los datos.
 */
export const getAllAnimals = async (_req: Request, res: Response) => {
  const animals = await animalService.findAll();
  res.json(animals);
};

/**
 * Controlador para obtener un animal por ID.
 * Si el animal no se encuentra, devuelve un 404.
 */
export const getAnimalById = async (req: Request, res: Response): Promise<void> => {
  const animal = await animalService.findById(+req.params.id); // Se convierte el ID a número
  if (!animal) {
    res.status(404).json({ message: 'Animal not found' });
    return;
  }
  res.json(animal);
};

/**
 * Controlador para crear un nuevo animal.
 * Toma los datos desde el body de la petición.
 */
export const createAnimal = async (req: Request, res: Response) => {
  const animal = await animalService.create(req.body);
  res.status(201).json(animal); // 201 indica que el recurso fue creado correctamente
};

/**
 * Controlador para actualizar un animal por ID.
 * Si no se encuentra, se devuelve un 404.
 */
export const updateAnimal = async (req: Request, res: Response) => {
  const updated = await animalService.update(+req.params.id, req.body);
  if (!updated) {
    res.status(404).json({ message: 'Animal not found' });
    return;
  }
  res.json(updated);
};

/**
 * Controlador para eliminar un animal por ID.
 * Devuelve un 204 sin contenido si se elimina correctamente.
 */
export const deleteAnimal = async (req: Request, res: Response) => {
  const deleted = await animalService.remove(+req.params.id);
  if (!deleted) {
    res.status(404).json({ message: 'Animal not found' });
    return;
  }
  res.status(204).send(); // 204 = No Content
};
