import { config } from 'dotenv';
config(); // ✅ Cargar variables del .env

import sequelize from './config/database';
import app from './app';
import Farm from './models/farm.model';
import Animal from './models/animal.model';

// ✅ Definir relaciones antes de sincronizar
Farm.hasMany(Animal, { foreignKey: "id_farm", onDelete: "CASCADE" });
Animal.belongsTo(Farm, { foreignKey: "id_farm" });

// ✅ Sincronizar base de datos
const syncDatabase = async () => {
  await sequelize.sync({ alter: true }); // alter: true solo en desarrollo
  console.log('✅ Base de datos sincronizada');
};

const startServer = async () => {
  try {
    await sequelize.authenticate();
    console.log('✅ Conexión a la base de datos establecida correctamente.');

    const DB_PORT = process.env.DB_PORT || 3000;
    app.listen(DB_PORT, () => {
      console.log(`🚀 Servidor escuchando en el puerto ${DB_PORT}`);
    });
  } catch (error) {
    console.error('❌ No se pudo conectar a la base de datos:', error);
    process.exit(1);
  }
};

syncDatabase();
startServer();
