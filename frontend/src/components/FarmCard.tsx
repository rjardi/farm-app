// src/components/FarmCard.tsx
import { FarmModel } from '../models/farmModel';
import { Link } from 'react-router-dom';

interface Props {
  farm: FarmModel;
}

const FarmCard = ({ farm }: Props) => {
  return (
    <div className="border rounded-xl p-4 shadow">
      <h3 className="text-lg font-semibold">{farm.name}</h3>
      <p className="text-gray-600">{farm.location}</p>
      <div className="mt-4">
        <Link
          to={`/farms/edit/${farm.id}`}
          className="text-blue-500 hover:underline"
        >
          Editar
        </Link>
      </div>
    </div>
  );
};

export default FarmCard;
