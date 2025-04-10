import sequelize from '../config/database';
import Farm from '../models/farm.model';
import Animal from '../models/animal.model';

const seedDatabase = async () => {
  try {
    await sequelize.sync({ force: true }); // Borra y vuelve a crear las tablas

    // Luego reseteamos los IDs
    await sequelize.query('ALTER TABLE animals AUTO_INCREMENT = 1');
    await sequelize.query('ALTER TABLE farms AUTO_INCREMENT = 1');

    // 🌱 Crear granjas
    await Farm.bulkCreate([
        { name: 'Granja Montseny', location: 'Barcelona' },
        { name: 'Granja del Ebro', location: 'Zaragoza' },
        { name: 'Masía Vall Fosca', location: 'Lleida' },
        { name: 'Finca Bajo Aragón', location: 'Teruel' },
        { name: 'Can Girona', location: 'Tarragona' },
        { name: 'Granja Pirineu', location: 'Girona' },
        { name: 'Mas de la Ribera', location: 'Huesca' },
        { name: 'Granja Delta', location: 'Delta del Ebro' },
        { name: 'Masía Sobrarbe', location: 'Aínsa-Sobrarbe' },
        { name: 'Granja Vall d’Aran', location: 'Vielha' }
      ]);

    // 🐄 Crear animales
    await Animal.bulkCreate([
        { name: 'Lola', breed: 'Oveja Manchega', id_farm: 1 },
        { name: 'Toro', breed: 'Toro Bravo', id_farm: 1 },
        { name: 'Clara', breed: 'Cabra Payoya', id_farm: 1 },
        { name: 'Blanca', breed: 'Vaca Frisona', id_farm: 1 },
        { name: 'Roc', breed: 'Cerdo Ibérico', id_farm: 1 },
        { name: 'Manolo', breed: 'Toro de Lidia', id_farm: 2 },
        { name: 'Lucía', breed: 'Vaca Morucha', id_farm: 2 },
        { name: 'Pedro', breed: 'Caballo Hispano-Árabe', id_farm: 2 },
        { name: 'Tula', breed: 'Gallina Castellana', id_farm: 2 },
        { name: 'Nino', breed: 'Burro Catalán', id_farm: 2 },
        { name: 'Meritxell', breed: 'Cabra Catalana', id_farm: 3 },
        { name: 'Paco', breed: 'Cerdo Blanco', id_farm: 3 },
        { name: 'Nuria', breed: 'Vaca Bruna dels Pirineus', id_farm: 3 },
        { name: 'Trueno', breed: 'Caballo Pura Raza Española', id_farm: 3 },
        { name: 'Boni', breed: 'Gallina Empordanesa', id_farm: 3 },
        { name: 'Dora', breed: 'Oveja Xisqueta', id_farm: 3 }
    ]);

    console.log('✅ Base de datos poblada con datos de prueba.');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error al poblar la base de datos:', error);
    process.exit(1);
  }
};

seedDatabase();
