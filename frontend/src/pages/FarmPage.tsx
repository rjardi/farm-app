// src/pages/FarmPage.tsx
import { useEffect, useState } from 'react';
import axios from 'axios';
import { FarmModel } from '../models/farmModel';
import FarmList from '../components/FarmList';
import { Link } from 'react-router-dom';
import {API_URL} from '../config.ts';
import { List, LayoutGrid } from 'lucide-react';
import Spinner from '../components/Spinner';


const FarmPage = () => {
  const [farms, setFarms] = useState<FarmModel[]>([]);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState<'card' | 'list'>('list');

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

  return (
    <section className="p-6">
      <div className="flex justify-between mb-10 items-center mb-4">
        <h1 className="text-2xl font-bold">Listado de Granjas</h1>
      </div>

      <div className="flex gap-5 flex-row-reverse mb-4">
        <Link
          to="/farms/new"
          className="text-blue-500 hover:underline"
        >
          <button className="text-green-500 hover:underline mr-2">+ Agregar Granja</button>
           
        </Link>
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
        loading ? <Spinner /> : <FarmList farms={farms} viewMode={viewMode} onDelete={fetchFarms}/>
      )}

    </section>
  );
};

export default FarmPage;
