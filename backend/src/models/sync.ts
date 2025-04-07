import sequelize from '../config/db'; // Configuración de la conexión
import Farm from './farm'; // Importar el modelo 'Farm'
import Animal from './animal'; // Importar el modelo 'Animal'

async function syncModels() {
  try {
    await sequelize.sync({ force: true }); // Crea las tablas y las actualiza si es necesario
    console.log('Las tablas se han sincronizado correctamente.');
  } catch (error) {
    console.error('Error al sincronizar las tablas:', error);
  }
}

syncModels();
