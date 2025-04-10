import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

// Cargar variables de entorno desde el archivo .env
dotenv.config();

// Se define el tipo de base de datos a partir de la variable de entorno DB_DIALECT.
// Sequelize soporta distintos dialectos, por eso se tipa de forma específica.
const dialect = process.env.DB_DIALECT as 'mysql' | 'postgres' | 'mssql' | 'sqlite' | undefined;

// Crear una instancia de Sequelize con la configuración necesaria
// Estas opciones se definen a partir de variables de entorno para mantener la seguridad y flexibilidad
const sequelize = new Sequelize({
  dialect: dialect, // Motor de base de datos a utilizar
  host: process.env.DB_HOST, // Dirección del host de la base de datos
  username: process.env.DB_USER, // Usuario autorizado
  password: process.env.DB_PASSWORD, // Contraseña del usuario
  database: process.env.DB_NAME, // Nombre de la base de datos
  // puerto no especificado explícitamente, Sequelize toma el valor por defecto según el dialecto
});

// Exportamos la instancia de Sequelize para usarla en modelos y otros módulos de base de datos.
export default sequelize;
