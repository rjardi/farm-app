import sequelize from './config/database';
import { config } from 'dotenv';
import app from './app';
import Farm from "./models/farm.model";
import Animal from "./models/animal.model";

// config(); // Cargar variables del .env

const syncDataBase=async () =>{
  // Sincronizar con la base de datos
  sequelize.sync({ alter: true }).then(() => {
    console.log('✅ Base de datos sincronizada');
});}

// Relaciones de la base de datos
Farm.hasMany(Animal, { foreignKey: "id_farm", onDelete: "CASCADE" });
Animal.belongsTo(Farm, { foreignKey: "id_farm" });

const DB_PORT = process.env.DB_PORT || 3000;

const startServer = async () => {
  try {
    await sequelize.authenticate();
    console.log('✅ Conexión a la base de datos establecida correctamente.');

    app.listen(DB_PORT, () => {
      console.log(`🚀 Servidor escuchando en el puerto ${DB_PORT}`);
    });
  } catch (error) {
    console.error('❌ No se pudo conectar a la base de datos:', error);
    process.exit(1);
  }
};

syncDataBase() // Solo en desarrollo para sincronizar las tablas
startServer();