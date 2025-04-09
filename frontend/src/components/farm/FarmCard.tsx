import { FarmModel } from '../../models/farmModel';

interface Props {
  farm: FarmModel;
  onEdit: (farm:FarmModel)=> void;
  onDelete: (farm: FarmModel) => void;
}

const FarmCard = ({ farm, onEdit, onDelete}: Props) => {
  return (
    <div className="border rounded-xl p-4 shadow">
      <h3 className="text-lg font-semibold">{farm.name}</h3>
      <p className="text-gray-600">{farm.location}</p>
      <div className="mt-4">
        <button className="text-blue-500 hover:underline mr-2" onClick={() => onEdit(farm)}>Editar</button>
        <button onClick={()=> onDelete(farm)} className="text-red-500 hover:underline">Eliminar</button>
      </div>
    </div>
  );
};

export default FarmCard;
