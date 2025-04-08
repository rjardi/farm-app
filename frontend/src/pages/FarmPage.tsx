// src/pages/FarmPage.tsx
import { useEffect, useState } from 'react';
import axios from 'axios';
import { FarmModel } from '../models/farmModel';
import FarmList from '../components/FarmList';
import { Link } from 'react-router-dom';
import {API_URL} from '../config.ts';
import { List, LayoutGrid } from 'lucide-react';


const FarmPage = () => {
  const [farms, setFarms] = useState<FarmModel[]>([]);
  const [viewMode, setViewMode] = useState<'card' | 'list'>('card');

  useEffect(() => {
    axios
      .get(`${API_URL}/api/farms`)
      .then((res) => setFarms(res.data))
      .catch((err) => console.error('Error al obtener granjas', err));
  }, []);

  return (
    <section className="p-6">
      <div className="flex justify-between mb-10 items-center mb-4">
        <h1 className="text-2xl font-bold">Listado de Granjas</h1>
      </div>

      <div className="flex gap-5 flex-row-reverse mb-4" items-end>
        <Link
          to="/farms/new"
          className="bg-green-900 text-white hover:bg-green-600 px-4 py-2 rounded"
        >
           ➕ Agregar Granja
        </Link>
        <button
          onClick={() => setViewMode('card')}
          className={`px-4 py-1 rounded ${
            viewMode === 'card' ? 'bg-blue-500 text-white' : 'bg-gray-200'
          }`}
        >
          {<LayoutGrid />}
        </button>
        <button
          onClick={() => setViewMode('list')}
          className={`px-4 py-1 rounded ${
            viewMode === 'list' ? 'bg-blue-500 text-white' : 'bg-gray-200'
          }`}
        >
          {<List />}
        </button>

      </div>

      <FarmList farms={farms} viewMode={viewMode} />
    </section>
  );
};

export default FarmPage;
