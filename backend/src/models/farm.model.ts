import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/database'; // Importa la configuración de la base de datos
import Animal from './animal.model';

// Definimos el modelo para la entidad 'Farm'
class Farm extends Model {
  public id!: number;
  public name!: string;
  public location!: string;

  // Timestamps
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Farm.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    location: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
  },
  {
    sequelize, // Pasamos la conexión a la base de datos
    modelName: 'Farm',
    tableName: 'farms', // Nombre de la tabla en la base de datos
    timestamps: false,
  }
);

export default Farm;
