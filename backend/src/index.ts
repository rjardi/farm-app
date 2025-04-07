import express from 'express';
import sequelize from './config/db';
import router from './routes/farmRoutes';

const app = express();
app.use(express.json());

// Sincronizar con la base de datos
sequelize.sync({ force: false }).then(() => {
  console.log('Base de datos sincronizada');
});

// Usar rutas para las granjas
app.use('/api/farms', router);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});