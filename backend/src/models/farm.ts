import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/db'; // Importa la configuración de la base de datos

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
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    location: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize, // Pasamos la conexión a la base de datos
    modelName: 'Farm',
    tableName: 'farms', // Nombre de la tabla en la base de datos
  }
);

export default Farm;
