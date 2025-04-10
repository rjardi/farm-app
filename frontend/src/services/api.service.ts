// src/services/api.service.ts
import axios from 'axios';
import { API_URL } from '../config.ts';

/**
 * Elimina un recurso por su ID en una ruta específica de la API.
 * 
 * @param id - Identificador del recurso a eliminar
 * @param route - Ruta del recurso en la API (por ejemplo, 'farms', 'animals')
 * @returns Promesa que se resuelve si la eliminación es exitosa
 * 
 * 📌 Esta función está pensada para usarse en operaciones genéricas de eliminación
 * desde el frontend, como eliminar animales o granjas.
 */
export const deleteById = async (id: number, route: string) => {
  return await axios.delete(`${API_URL}/api/${route}/${id}`);
};
