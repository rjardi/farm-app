// src/pages/FarmsPage.tsx
import { useEffect, useState } from 'react';
import axios from 'axios';
import { FarmModel } from '../models/farmModel.ts';
import { API_URL } from '../config.ts';
import { List, LayoutGrid } from 'lucide-react';
import Spinner from '../components/ui/Spinner.tsx';
import ModalPortal from '../components/layout/ModalPortal';
import FarmForm from '../components/farm/FarmForm.tsx';
import { showConfirmDialog } from '../utils/confirmDialog.ts';
import { deleteById } from '../services/api.service.ts';
import { toast } from 'react-toastify';
import DataList from '../components/layout/DataList.tsx';
import Card from '../components/layout/Card.tsx';
import { FieldDefinition } from '../models/fieldDefinitionModel.ts';

/**
 * Página principal para gestionar granjas dentro de la aplicación.
 * 
 * 🧠 Decisiones técnicas destacadas:
 * 
 * 1. Se utiliza un componente de tipo modal (`ModalPortal`) para mostrar el formulario de edición/creación sin abandonar la vista principal.
 * 
 * 2. El estado local gestiona la lista de granjas y su visualización.
 * 
 * 3. En el futuro podría optimizarse el control de estado y carga de datos con un `useContext` o una librería como `React Query` o `Zustand`.
 */

// Definición de columnas/propiedades a mostrar en cada vista
const farmFields: FieldDefinition<FarmModel>[] = [
  { key: 'id', label: 'ID' },
  { key: 'name', label: 'Nombre' },
  { key: 'location', label: 'Ubicación' },
];

const FarmsPage = () => {
  const [farms, setFarms] = useState<FarmModel[]>([]);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState<'card' | 'list'>('list');
  const [showModal, setShowModal] = useState(false);
  const [selectedFarm, setSelectedFarm] = useState<FarmModel | null>(null);

  /**
   * Carga la lista de granjas desde la API
   */
  const fetchFarms = async () => {
    setLoading(true);
    axios
      .get(`${API_URL}/api/farms`)
      .then((res) => setFarms(res.data))
      .catch((err) => console.error('Error al obtener granjas', err))
      .finally(() => setLoading(false));
  }

  // Carga inicial de datos
  useEffect(() => {
    fetchFarms();
  }, []);

  /**
   * Cierra el modal y actualiza la lista de granjas
   */
  const closeModal = () => {
    setShowModal(false);
    fetchFarms();
  };

  /**
   * Muestra el formulario para añadir una nueva granja
   */
  const handleAdd = () => {
    setSelectedFarm(null);
    setShowModal(true);
  };

  /**
   * Muestra el formulario para editar una granja existente
   * @param farm Granja seleccionada
   */
  const handleEdit = (farm: FarmModel) => {
    setSelectedFarm(farm);
    setShowModal(true);
  };

  /**
   * Elimina una granja previa confirmación del usuario
   * @param farm Granja a eliminar
   */
  const handleDelete = (farm: FarmModel) => {
    showConfirmDialog(
      '¿Estás seguro de que deseas eliminar esta granja?',
      '',
      async () => {
        try {
          await deleteById(Number(farm.id), "farms");
          toast.success('Granja eliminada correctamente', { autoClose: 2000 });
          fetchFarms();
        } catch (err) {
          toast.error('Error al eliminar la granja', { autoClose: 2000 });
        }
      }
    );
  };

  return (
    <section className="p-6">
      <div className="flex justify-between mb-10 items-center mb-4">
        <h1 className="text-2xl font-bold">Listado de Granjas</h1>
      </div>

      {/* 🔘 Controles: Añadir + cambiar modo de vista */}
      <div className="flex gap-5 flex-row-reverse mb-4">
        <button className="text-green-500 hover:underline mr-2" onClick={handleAdd}>
          + Agregar Granja
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

      {/* 🧾 Contenido principal según estado y vista */}
      {farms.length === 0 && !loading ? (
        <p><strong>No hay elementos en la lista</strong></p>
      ) : viewMode === 'card' ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {farms.map((farm) => (
            <Card
              key={farm.id}
              data={farm}
              fields={farmFields}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          ))}
        </div>
      ) : loading ? (
        <Spinner />
      ) : (
        <DataList
          data={farms}
          columns={farmFields}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      )}

      {/* 📦 Modal con el formulario para crear/editar */}
      {showModal && (
        <ModalPortal onClose={closeModal}>
          <FarmForm initialData={selectedFarm ?? undefined} />
        </ModalPortal>
      )}
    </section>
  );
};

export default FarmsPage;
