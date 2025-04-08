// src/components/FarmListItem.tsx
import { FarmModel } from '../models/farmModel';

interface Props {
  farm: FarmModel;
}

const FarmListItem = ({ farm }: Props) => (
  <div className="flex justify-between items-center p-4 border-b">
    <span className="font-semibold">{farm.name}</span>
    <span className="text-gray-500">{farm.location}</span>
  </div>
);

export default FarmListItem;
