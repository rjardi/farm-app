import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/database'; // Importa la configuración de la base de datos
import Animal from './animal.model'; // Puede utilizarse para definir relaciones si se desea

/**
 * Modelo Sequelize que representa la entidad "Farm"
 */
class Farm extends Model {
  public id!: number;
  public name!: string;
  public location!: string;

  // Timestamps (aunque no los usamos porque están desactivados)
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

// Inicialización del modelo con sus atributos y configuración
Farm.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      primaryKey: true, // Establece el campo como clave primaria
      autoIncrement: true, // El valor se autoincrementa
    },
    name: {
      type: DataTypes.STRING(100), // Limita el tamaño del nombre a 100 caracteres
      allowNull: false, // Campo obligatorio
    },
    location: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
  },
  {
    sequelize, // Instancia de Sequelize configurada
    modelName: 'Farm', // Nombre interno del modelo
    tableName: 'farms', // Nombre de la tabla real en la base de datos
    timestamps: false, // No se generan automáticamente campos createdAt y updatedAt
  }
);

export default Farm;
