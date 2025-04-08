import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/database'; // Importa la configuración de la base de datos
import Farm from './farm.model';

// Definimos el modelo para la entidad 'Animal'
class Animal extends Model {
  public id!: number;
  public name!: string;
  public breed!: string;
  public id_farm!: number; // Relación con la granja (foránea)

  // Timestamps
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Animal.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    breed: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    id_farm: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      references: {
        model: 'farms', // El modelo relacionado (granja)
        key: 'id', // La clave primaria de la granja
      },
      onDelete: 'CASCADE',
    },
  },
  {
    sequelize, // Pasamos la conexión a la base de datos
    modelName: 'Animal',
    tableName: 'animals', // Nombre de la tabla en la base de datos
    timestamps: false,
  }
);

export default Animal;
