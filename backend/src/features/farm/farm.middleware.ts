import { Request, Response, NextFunction } from 'express';

export const validateFarm = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { name, location } = req.body;

  if (!name || typeof name !== 'string' || name.trim() === '') {
    res.status(400).json({ message: 'Name is required' });
  }

  if (!location || typeof location !== 'string' || location.trim() === '') {
    res.status(400).json({ message: 'Location is required' });
  }

  next();
};
