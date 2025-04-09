// // services/farm_service.ts
// import Farm from '../../../backend/src/models/farm';

// class FarmService {
//   // Crear una nueva granja
//   public static async createFarm(name: string, location: string) {
//     try {
//       const farm = await Farm.create({ name, location });
//       return farm;
//     } catch (error) {
//       const err = error as Error;
//       throw new Error(`Error creando la granja: ${err.message}`);
//     }
//   }

//   // Obtener todas las granjas
//   public static async getAllFarms() {
//     try {
//       const farms = await Farm.findAll();
//       return farms;
//     } catch (error) {
//         const err = error as Error;
//         throw new Error(`Error obteniendo las granjas: ${err.message}`);
//     }
//   }

//   // Obtener una granja por ID
//   public static async getFarmById(id: number) {
//     try {
//       const farm = await Farm.findByPk(id);
//       if (!farm) {
//         throw new Error('Granja no encontrada');
//       }
//       return farm;
//     } catch (error) {
//         const err = error as Error;
//         throw new Error(`Error obteniendo la granja: ${err.message}`);
//     }
//   }

//   // Actualizar una granja
//   public static async updateFarm(id: number, name: string, location: string) {
//     try {
//       const farm = await Farm.findByPk(id);
//       if (!farm) {
//         throw new Error('Granja no encontrada');
//       }
//       farm.name = name;
//       farm.location = location;
//       await farm.save();
//       return farm;
//     } catch (error) {
//         const err = error as Error;
//         throw new Error(`Error actualizando la granja: ${err.message}`);
//     }
//   }

//   // Eliminar una granja
//   public static async deleteFarm(id: number) {
//     try {
//       const farm = await Farm.findByPk(id);
//       if (!farm) {
//         throw new Error('Granja no encontrada');
//       }
//       await farm.destroy();
//       return `Granja con ID ${id} eliminada correctamente`;
//     } catch (error) {
//         const err = error as Error;
//         throw new Error(`Error eliminando la granja: ${err.message}`);
//     }
//   }
// }

// export default FarmService;

import axios from 'axios';

import {API_URL} from '../config.ts';

export const deleteFarm = async (id: number) => {
  return await axios.delete(`${API_URL}/api/farms/${id}`);
};

