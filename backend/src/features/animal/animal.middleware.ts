import { Request, Response, NextFunction } from 'express';

/**
 * Middleware para validar los datos de entrada al crear o actualizar un animal.
 * Verifica que 'name', 'breed' e 'id_farm' estén presentes y sean del tipo correcto.
 */
export const validateAnimal = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { name, breed, id_farm } = req.body;

  // Validación del campo 'name'
  if (!name || typeof name !== 'string' || name.trim() === '') {
    res.status(400).json({ message: 'Name is required' });
  }

  // Validación del campo 'breed'
  if (!breed || typeof breed !== 'string' || breed.trim() === '') {
    res.status(400).json({ message: 'Breed is required' });
  }

  // Validación del campo 'id_farm' (debe ser numérico)
  if (typeof id_farm !== 'number' || isNaN(id_farm)) {
    res.status(400).json({ message: 'Farm is required and must be a number' });
  }

  // Si todo es válido, pasa al siguiente middleware o controlador
  next();
};
