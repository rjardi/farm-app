import { Request, Response } from 'express';
import * as farmService from './farm.service';

export const getAllFarms = async (_req: Request, res: Response) => {
  const farms = await farmService.findAll();
  res.json(farms);
};

export const getFarmById = async (req: Request, res: Response):Promise<void> => {
  const farm = await farmService.findById(+req.params.id);
  if (!farm) res.status(404).json({ message: 'Farm not found' });
  res.json(farm);
};

export const createFarm = async (req: Request, res: Response) => {
  const farm = await farmService.create(req.body);
  res.status(201).json(farm);
};

export const updateFarm = async (req: Request, res: Response) => {
  const updated = await farmService.update(+req.params.id, req.body);
  if (!updated) res.status(404).json({ message: 'Farm not found' });
  res.json(updated);
};

export const deleteFarm = async (req: Request, res: Response) => {
  const deleted = await farmService.remove(+req.params.id);
  if (!deleted) res.status(404).json({ message: 'Farm not found' });
  res.status(204).send();
};


// import { Request, Response } from 'express';
// import Farm from '../models/farm';

// export const createFarm = async (req: Request, res: Response) => {
//   try {
//     const { name, location } = req.body;
//     const farm = await Farm.create({ name, location });
//     res.status(201).json(farm);
//   } catch (error) {
//     res.status(500).json({ message: 'Error creando la granja', error });
//   }
// };

// export const getAllFarms = async (req: Request, res: Response) => {
// try {
//     const farms = await Farm.findAll();
//     res.status(200).json(farms);
// } catch (error) {
//     res.status(500).json({ message: 'Error obteniendo las granjas', error });
// }
// };

// export const updateFarm = async (req: Request, res: Response) => {
// try {
//     const { id } = req.params;
//     const { name, location } = req.body;

//     const farm = await Farm.findByPk(id);
//     if (!farm) {
//     return res.status(404).json({ message: 'Granja no encontrada' });
//     }

//     farm.name = name;
//     farm.location = location;
//     await farm.save();

//     res.status(200).json(farm);
// } catch (error) {
//     res.status(500).json({ message: 'Error actualizando la granja', error });
// }
// };

// export const deleteFarm = async (req: Request, res: Response) => {
// try {
//     const { id } = req.params;

//     const farm = await Farm.findByPk(id);
//     if (!farm) {
//     return res.status(404).json({ message: 'Granja no encontrada' });
//     }

//     await farm.destroy();
//     res.status(200).json({ message: 'Granja eliminada' });
// } catch (error) {
//     res.status(500).json({ message: 'Error eliminando la granja', error });
// }
// };
  

