// src/components/FarmList.tsx
import { Link } from 'react-router-dom';
import { FarmModel } from '../models/farmModel';
import FarmCard from './FarmCard';
import { deleteFarm } from '../services/farm.service';
import { toast } from 'react-toastify';
import { showConfirmDialog } from '../utils/confirmDialog';

interface Props {
  farms: FarmModel[];
  viewMode: 'card' | 'list';
  onDelete: () => void
}

const FarmList = ({ farms, viewMode, onDelete }: Props) => {

  const handleDelete = (id:number) => async () => {
    showConfirmDialog(
      '¿Estás seguro de que deseas eliminar esta granja?',
      '',
      async ()=>{
        // Acción al confirmar
        try {
          await deleteFarm(Number(id));
          toast.success('Granja eliminada correctamente', {autoClose:2000});
          onDelete();
        } catch (err) {
          toast.error('Error al eliminar la granja', {autoClose:2000});
        }
      }
    )
  };
  
  
  if (viewMode === 'card') {
    return (
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {farms.map((farm) => (
          <FarmCard key={farm.id} farm={farm} />
        ))}
      </div>
    );
  }

  return (
    <div className="overflow-x-auto rounded-xl shadow-md border border-gray-500">
      <table className="min-w-full divide-y divide-gray-500">
        <thead className="bg-gray-600">
          <tr className="divide-x divide-gray-500">
            <th className="px-4 py-2">ID</th>
            <th className="px-4 py-2">Nombre</th>
            <th className="px-4 py-2">Ubicación</th>
            <th className="px-4 py-2">Acciones</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-500">
          {farms.map((farm) => (
            <tr key={farm.id} className="divide-x divide-gray-500">
              <td className="px-4 py-2">{farm.id}</td>
              <td className="px-4 py-2">{farm.name}</td>
              <td className="px-4 py-2">{farm.location}</td>
              <td className="px-4 py-2">
                {/* Aquí luego podrías añadir botones de editar/eliminar */}
                <Link
                  to={`/farms/edit/${farm.id}`}
                  className="text-blue-500 hover:underline"
                >
                   <button className="text-blue-500 hover:underline mr-2">Editar</button>
                </Link>
               
                <button onClick={handleDelete(Number(farm.id))} className="text-red-500 hover:underline">Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default FarmList;
