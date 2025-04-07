import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/db'; // Importa la configuración de la base de datos
import Farm from './farm';

// Definimos el modelo para la entidad 'Animal'
class Animal extends Model {
  public id!: number;
  public name!: string;
  public breed!: string;
  public farmId!: number; // Relación con la granja (foránea)

  // Timestamps
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Animal.init(
  {
    id: {
      type: DataTypes.INTEGER,
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
    farmId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'farms', // El modelo relacionado (granja)
        key: 'id', // La clave primaria de la granja
      },
    },
  },
  {
    sequelize, // Pasamos la conexión a la base de datos
    modelName: 'Animal',
    tableName: 'animals', // Nombre de la tabla en la base de datos
  }
);

// Establecer la relación entre 'Animal' y 'Farm'
Animal.belongsTo(Farm, { foreignKey: 'farmId' });

export default Animal;
