import Farm from '../../models/farm.model';

export const findAll = () => Farm.findAll();

export const findById = (id: number) => Farm.findByPk(id);

export const create = (data: { name: string; location: string }) =>
  Farm.create(data);

export const update = async (
  id: number,
  data: { name: string; location: string }
) => {
  const farm = await Farm.findByPk(id);
  if (!farm) return null;
  return farm.update(data);
};

export const remove = async (id: number) => {
  const farm = await Farm.findByPk(id);
  if (!farm) return null;
  await farm.destroy();
  return true;
};
