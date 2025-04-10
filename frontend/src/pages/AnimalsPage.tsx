// src/pages/AnimalsPage.tsx
import { useEffect, useState } from 'react';
import axios from 'axios';
import { AnimalModel } from '../models/animalModel.ts';
import { API_URL } from '../config.ts';
import { List, LayoutGrid } from 'lucide-react';
import Spinner from '../components/ui/Spinner.tsx';
import ModalPortal from '../components/layout/ModalPortal.tsx';
import { showConfirmDialog } from '../utils/confirmDialog.ts';
import { toast } from 'react-toastify';
import { deleteById } from '../services/api.service.ts';
import Card from '../components/layout/Card.tsx';
import DataList from '../components/layout/DataList.tsx';
import AnimalForm from '../components/animal/AnimalForm.tsx';
import { FieldDefinition } from '../models/fieldDefinitionModel.ts';
import { AnimalWithFarmName } from '../models/animalWithFarm.ts';
import { FarmModel } from '../models/farmModel.ts';
import SelectBox from '../components/ui/SelectBox.tsx';

/**
 * Página principal para gestionar animales dentro de la aplicación.
 * 
 * 🧠 Decisiones técnicas destacadas:
 * 
 * 1. Modal emergente para formulario de animal (`ModalPortal`):
 *    Mejora la UX permitiendo editar/crear sin abandonar la vista principal.
 * 
 * 2. Todavía no se ha implementado `useContext`:
 *    Se reconoce que sería más óptimo para evitar `prop drilling` y mejorar
 *    la eficiencia general de la gestión de estado, pero no se ha incluido por falta de tiempo.
 * 
 * 3. Futuro refactor para centralizar peticiones:
 *    Idealmente, todas las llamadas a la API se moverán a servicios
 *    reutilizables en `/services`, mejorando la escalabilidad.
 */

const animalFields: FieldDefinition<AnimalWithFarmName>[] = [
  { key: 'id', label: 'ID' },
  { key: 'name', label: 'Nombre' },
  { key: 'breed', label: 'Raza' },
  { key: 'farmName', label: 'Granja' },
  { key: 'id_farm', label: 'IdGranja' },
];

const AnimalsPage = () => {
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState<'card' | 'list'>('list');
  const [showModal, setShowModal] = useState(false);
  const [selectedAnimal, setSelectedAnimal] = useState<AnimalModel | null>(null);
  const [animals, setAnimals] = useState<AnimalWithFarmName[]>([]);
  const [farms, setFarms] = useState<FarmModel[]>([]);
  const [selectedFarmId, setSelectedFarmId] = useState<string | number>('');

  /**
   * Carga animales y granjas desde la API
   * Enlaza cada animal con el nombre de su granja
   */
  const fetchAnimals = async () => {
    setLoading(true);
    try {
      const [animalRes, farmRes] = await Promise.all([
        axios.get(`${API_URL}/api/animals`),
        axios.get(`${API_URL}/api/farms`)
      ]);

      // Crear un mapa id -> nombre para las granjas
      const farmsMap = farmRes.data.reduce((acc: Record<number, string>, farm: FarmModel) => {
        acc[Number(farm.id)] = farm.name;
        return acc;
      }, {});

      // Asignar el nombre de la granja a cada animal
      const animalsWithFarmName: AnimalWithFarmName[] = animalRes.data.map((animal: AnimalModel) => ({
        ...animal,
        farmName: farmsMap[animal.id_farm] || 'Desconocida'
      }));

      setAnimals(animalsWithFarmName);
      setFarms(farmRes.data);
    } catch (error) {
      console.error('Error al cargar animales y granjas:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAnimals();
  }, []);

  /**
   * Cierra el modal y recarga los datos
   */
  const closeModal = () => {
    setShowModal(false);
    fetchAnimals();
  };

  /**
   * Abre el formulario para añadir un nuevo animal
   */
  const handleAdd = () => {
    setSelectedAnimal(null);
    setShowModal(true);
  };

  /**
   * Abre el formulario para editar un animal existente
   * @param animal Animal a editar
   */
  const handleEdit = (animal: AnimalModel) => {
    setSelectedAnimal(animal);
    setShowModal(true);
  };

  /**
   * Elimina un animal previa confirmación del usuario
   * @param animal Animal a eliminar
   */
  const handleDelete = (animal: AnimalModel) => {
    showConfirmDialog(
      '¿Estás seguro de que deseas eliminar este animal?',
      '',
      async () => {
        try {
          await deleteById(Number(animal.id), "animals");
          toast.success('Animal eliminado correctamente', { autoClose: 2000 });
          fetchAnimals();
        } catch (err) {
          toast.error('Error al eliminar el animal', { autoClose: 2000 });
        }
      }
    );
  };

  // 🔍 Filtro aplicado al seleccionar una granja específica
  const filteredAnimals = animals.filter(animal =>
    selectedFarmId === '' || animal.id_farm === Number(selectedFarmId)
  );

  return (
    <section className="p-6">
      <div className="flex justify-between mb-10 items-center">
        <h1 className="text-2xl font-bold">Listado de Animales</h1>
      </div>

      <div className="flex gap-5 flex-row-reverse mb-4">
        <SelectBox
          value={selectedFarmId}
          onChange={setSelectedFarmId}
          options={[{ value: '', label: 'Todas las granjas' }, ...farms.map(f => ({ value: f.id!, label: f.name }))]}
        />
        <button className="text-green-500 hover:underline mr-2" onClick={handleAdd}>
          + Agregar Animal
        </button>
        <button
          onClick={() => setViewMode('card')}
          className={`px-4 py-1 rounded ${viewMode === 'card' ? 'bg-blue-500 !border-white' : ''}`}
        >
          <LayoutGrid />
        </button>
        <button
          onClick={() => setViewMode('list')}
          className={`px-4 py-1 rounded ${viewMode === 'list' ? 'bg-blue-500 !border-white' : ''}`}
        >
          <List />
        </button>
      </div>

      {/* 🦊 Renderiza spinner, tabla o tarjetas según el estado */}
      {animals.length === 0 && !loading ? (
        <p><strong>No hay elementos en la lista</strong></p>
      ) : viewMode === 'card' ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {animals.map((animal) => (
            <Card
              key={animal.id}
              data={animal}
              fields={animalFields}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          ))}
        </div>
      ) : loading ? (
        <Spinner />
      ) : (
        <DataList
          data={filteredAnimals}
          columns={animalFields}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      )}

      {/* 🧩 Modal reutilizable con el formulario */}
      {showModal && (
        <ModalPortal onClose={closeModal}>
          <AnimalForm initialData={selectedAnimal ?? undefined} />
        </ModalPortal>
      )}
    </section>
  );
};

export default AnimalsPage;
