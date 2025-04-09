import { FarmModel } from '../../models/farmModel';

interface Props {
  farms: FarmModel[];
  onEdit: (farm: FarmModel) => void;
  onDelete: (farm: FarmModel) => void;
}

const FarmList = ({ farms, onEdit, onDelete}: Props) => {

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

                <button className="text-blue-500 hover:underline mr-2" onClick={() => onEdit(farm)}>Editar</button>

                <button onClick={()=> onDelete(farm)} className="text-red-500 hover:underline">Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default FarmList;
