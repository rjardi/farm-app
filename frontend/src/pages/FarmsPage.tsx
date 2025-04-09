// src/pages/FarmsPage.tsx
import { useEffect, useState } from 'react';
import axios from 'axios';
import { FarmModel } from '../models/farmModel.ts';
import FarmList from '../components/farm/FarmList.tsx';
// import { Link } from 'react-router-dom';
import {API_URL} from '../config.ts';
import { List, LayoutGrid } from 'lucide-react';
import Spinner from '../components/ui/Spinner.tsx';
import ModalPortal from '../components/layout/ModalPortal';
import FarmForm from '../components/farm/FarmForm.tsx';
import FarmCard from '../components/farm/FarmCard.tsx';
import { showConfirmDialog } from '../utils/confirmDialog.ts';
import { deleteFarm } from '../services/farm.service.ts';
import { toast } from 'react-toastify';



const FarmsPage = () => {
  const [farms, setFarms] = useState<FarmModel[]>([]);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState<'card' | 'list'>('list');
  const [showModal, setShowModal] = useState(false);
  const [selectedFarm, setSelectedFarm] = useState<FarmModel | null>(null);

  const fetchFarms = async ()=>{
    setLoading(true);
    axios
      .get(`${API_URL}/api/farms`)
      .then((res) => setFarms(res.data))
      .catch((err) => console.error('Error al obtener granjas', err))
      .finally(() => setLoading(false));
  }
  
  useEffect(() => {
    fetchFarms();
  }, []);

  const closeModal = () => {
    setShowModal(false);
    fetchFarms();
  }

  const handleAdd = () => {
    setSelectedFarm(null);
    setShowModal(true);
  };

  const handleEdit = (farm: FarmModel) => {
    setSelectedFarm(farm);
    setShowModal(true);
  };

  const handleDelete = (farm: FarmModel) => {
    // setSelectedFarm(farm);
    showConfirmDialog(
      '¿Estás seguro de que deseas eliminar esta granja?',
      '',
      async ()=>{
        // Acción al confirmar
        try {
          await deleteFarm(Number(farm.id));
          toast.success('Granja eliminada correctamente', {autoClose:2000});
          fetchFarms();
        } catch (err) {
          toast.error('Error al eliminar la granja', {autoClose:2000});
        }
      }
    )
  };

  return (
    <section className="p-6">
      <div className="flex justify-between mb-10 items-center mb-4">
        <h1 className="text-2xl font-bold">Listado de Granjas</h1>
      </div>

      <div className="flex gap-5 flex-row-reverse mb-4">

        <button className="text-green-500 hover:underline mr-2" onClick={handleAdd}>+ Agregar Granja</button>
           
        <button
          onClick={() => setViewMode('card')}
          className={`px-4 py-1 rounded ${
            viewMode === 'card' ? 'bg-blue-500 !border-white' : ''
          }`}
        >
          {<LayoutGrid />}
        </button>
        <button
          onClick={() => setViewMode('list')}
          className={`px-4 py-1 rounded ${
            viewMode === 'list' ? 'bg-blue-500 !border-white' : ''
          }`}
        >
          {<List />}
        </button>

      </div>
      
      {farms.length==0 && !loading? (
          <p><strong>No hay elementos en la lista</strong></p>
      ):(
        viewMode === 'card'? (
          // return (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {farms.map((farm) => (
                <FarmCard onEdit={handleEdit} onDelete={handleDelete} key={farm.id} farm={farm} />
              ))}
            </div>
        ):(
          loading ? <Spinner /> : <FarmList farms={farms} onEdit={handleEdit} onDelete={handleDelete}/>
        )
      )}

      {showModal && (
        <ModalPortal onClose={closeModal}>
          {/* <h2 className="text-xl font-semibold">Este es un modal 🎉</h2>
          <p>Puedes poner aquí el formulario, texto, etc.</p> */}
          <FarmForm initialData={selectedFarm ?? undefined}/>
        </ModalPortal>
      )}

    </section>
  );
};

export default FarmsPage;
