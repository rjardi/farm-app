import Animal from '../../models/animal.model';

/**
 * Obtiene todos los animales de la base de datos.
 * @returns Promesa con un array de animales.
 */
export const findAll = () => Animal.findAll();

/**
 * Busca un animal por su ID.
 * @param id - ID del animal.
 * @returns Promesa con el animal encontrado o `null` si no existe.
 */
export const findById = (id: number) => Animal.findByPk(id);

/**
 * Crea un nuevo animal en la base de datos.
 * @param data - Datos del nuevo animal (nombre, raza e id de la granja).
 * @returns Promesa con el animal creado.
 */
export const create = (data: { name: string; breed: string; id_farm: number }) =>
  Animal.create(data);

/**
 * Actualiza un animal existente por su ID.
 * @param id - ID del animal a actualizar.
 * @param data - Nuevos datos del animal.
 * @returns Promesa con el animal actualizado o `null` si no se encuentra.
 */
export const update = async (
  id: number,
  data: { name: string; breed: string; id_farm: number }
) => {
  const animal = await Animal.findByPk(id); // Buscar animal por ID
  if (!animal) return null; // Si no existe, devolver null
  return animal.update(data); // Actualizar y devolver
};

/**
 * Elimina un animal por su ID.
 * @param id - ID del animal a eliminar.
 * @returns `true` si se eliminó correctamente o `null` si no se encontró.
 */
export const remove = async (id: number) => {
  const animal = await Animal.findByPk(id); // Buscar animal por ID
  if (!animal) return null; // Si no existe, devolver null
  await animal.destroy(); // Eliminar el registro
  return true; // Confirmar que se eliminó
};
