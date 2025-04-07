import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

// Cargar las variables de entorno desde el archivo .env
dotenv.config();

const dialect = process.env.DB_DIALECT as 'mysql' | 'postgres' | 'mssql' | 'sqlite' | undefined;
// Establecer la conexión con la base de datos
const sequelize = new Sequelize({
  dialect: dialect, // Puedes usar 'postgres', 'mariadb', etc.
  host: process.env.DB_HOST, // La dirección del servidor de la base de datos
  username: process.env.DB_USER, // El usuario de la base de datos
  password: process.env.DB_PASSWORD, // La contraseña del usuario
  database: process.env.DB_NAME, // El nombre de la base de datos
});

// Verificar si la conexión se establece correctamente
sequelize.authenticate()
  .then(() => {
    console.log('Conexión establecida correctamente.');
  })
  .catch((error) => {
    console.error('Error al conectar a la base de datos:', error);
  });

export default sequelize;
