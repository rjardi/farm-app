import Farm from '../../models/farm.model';

/**
 * Obtiene todas las granjas registradas en la base de datos.
 * @returns {Promise<Farm[]>} Lista de granjas
 */
export const findAll = () => Farm.findAll();

/**
 * Busca una granja por su identificador primario.
 * @param {number} id - ID de la granja a buscar
 * @returns {Promise<Farm | null>} Granja encontrada o null si no existe
 */
export const findById = (id: number) => Farm.findByPk(id);

/**
 * Crea una nueva granja con los datos proporcionados.
 * @param {{ name: string; location: string }} data - Datos de la nueva granja
 * @returns {Promise<Farm>} Granja creada
 */
export const create = (data: { name: string; location: string }) =>
  Farm.create(data);

/**
 * Actualiza una granja existente con nuevos datos.
 * Si no se encuentra la granja, devuelve null.
 * @param {number} id - ID de la granja a actualizar
 * @param {{ name: string; location: string }} data - Nuevos datos
 * @returns {Promise<Farm | null>} Granja actualizada o null si no se encuentra
 */
export const update = async (
  id: number,
  data: { name: string; location: string }
) => {
  const farm = await Farm.findByPk(id);
  if (!farm) return null;
  return farm.update(data); // Actualización de la entidad con Sequelize
};

/**
 * Elimina una granja por su ID.
 * Si no se encuentra, devuelve null.
 * @param {number} id - ID de la granja a eliminar
 * @returns {Promise<boolean | null>} true si se eliminó, null si no existe
 */
export const remove = async (id: number) => {
  const farm = await Farm.findByPk(id);
  if (!farm) return null;
  await farm.destroy(); // Eliminación física del registro en la base de datos
  return true;
};
