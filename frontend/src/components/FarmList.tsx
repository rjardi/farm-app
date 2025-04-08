// src/components/FarmList.tsx
import { FarmModel } from '../models/farmModel';
import FarmCard from './FarmCard';

interface Props {
  farms: FarmModel[];
  viewMode: 'card' | 'list';
}

const FarmList = ({ farms, viewMode }: Props) => {
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
    <div className="overflow-x-auto">
      <table className="min-w-full bg rounded shadow">
        <thead className="text-left">
          <tr>
            <th className="px-4 py-2">ID</th>
            <th className="px-4 py-2">Nombre</th>
            <th className="px-4 py-2">Ubicación</th>
            <th className="px-4 py-2">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {farms.map((farm) => (
            <tr key={farm.id} className="border-t">
              <td className="px-4 py-2">{farm.id}</td>
              <td className="px-4 py-2">{farm.name}</td>
              <td className="px-4 py-2">{farm.location}</td>
              <td className="px-4 py-2">
                {/* Aquí luego podrías añadir botones de editar/eliminar */}
                <button className="text-blue-500 hover:underline mr-2">Editar</button>
                <button className="text-red-500 hover:underline">Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default FarmList;
