import { Request, Response, NextFunction } from 'express';

/**
 * Middleware para validar los datos de una granja antes de crearla o actualizarla.
 * Verifica que 'name' y 'location' sean strings no vacíos.
 */
export const validateFarm = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { name, location } = req.body;

  // Validar que el nombre sea una cadena no vacía
  if (!name || typeof name !== 'string' || name.trim() === '') {
    res.status(400).json({ message: 'Name is required' });
  }

  // Validar que la ubicación sea una cadena no vacía
  if (!location || typeof location !== 'string' || location.trim() === '') {
    res.status(400).json({ message: 'Location is required' });
  }

  // Si todo está correcto, continuar con el siguiente middleware o controlador
  next();
};
