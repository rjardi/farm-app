import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/database'; // Importa la configuración de la base de datos
import Farm from './farm.model'; // Importamos el modelo de granja por si se quiere asociar luego

/**
 * Modelo Sequelize para representar la entidad "Animal"
 */
class Animal extends Model {
  public id!: number;
  public name!: string;
  public breed!: string;
  public id_farm!: number; // Clave foránea que referencia a la granja

  // Timestamps de Sequelize
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

// Inicializamos el modelo definiendo sus atributos y configuraciones
Animal.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      primaryKey: true,
      autoIncrement: true, // Generación automática del ID
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false, // No se permite nulo
    },
    breed: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    id_farm: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      references: {
        model: 'farms', // El nombre de la tabla relacionada
        key: 'id', // La clave primaria a la que se asocia
      },
      onDelete: 'CASCADE', // Si se elimina la granja, también se eliminan los animales asociados
    },
  },
  {
    sequelize, // Instancia de conexión a la base de datos
    modelName: 'Animal', // Nombre del modelo a nivel de Sequelize
    tableName: 'animals', // Nombre real de la tabla en la base de datos
    timestamps: false, // No se manejan automáticamente createdAt y updatedAt
  }
);

export default Animal;
