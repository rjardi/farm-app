
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FarmModel } from '../models/farmModel';

const FarmForm: React.FC = () => {

  const DB_HOST = import.meta.env.DB_HOST;

  const [farmData, setFarmData] = useState<FarmModel>({
    name: '',
    location: '',
  });

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Maneja el cambio de datos en el formulario
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFarmData({ ...farmData, [name]: value });
  };

  // Maneja el envío del formulario
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validación básica
    if (!farmData.name.trim() || !farmData.location.trim()) {
      setError('Todos los campos son obligatorios');
      setSuccess('');
      return;
    }

    // const newFarm:FarmModel={
    //   name: farmData.name,
    //   location: farmData.location
    // }
    console.log('Enviando datos:', farmData);
    try {
      const response = await axios.post(`${DB_HOST}/api/farms`, farmData);
      console.log('Granja creada:', response.data);
      setSuccess('Granja creada exitosamente ✅');
      setError('');
      setFarmData({ name: '', location: '' }); // Reset form
    } catch (error) {
      console.error('Error creando la granja', error);
      setError('Error creando la granja');
      setSuccess('');
    }
  };

  return (
    <div className="m-10">
      <h2 className="text-center text-xl mb-5 ">Agregar Nueva Granja:</h2>
      <form className="text-left w-80 mx-auto p-6 rounded-lg shadow-lg bg-black mb-5" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Nombre de la Granja:</label>
          <input className="w-full p-3 mb-4 border border-gray-300 rounded-md"
            type="text" 
            id="name" 
            name="name" 
            value={farmData.name} 
            onChange={handleChange} 
          />
        </div>
        <div>
          <label htmlFor="location">Ubicación:</label>
          <input className="w-full p-3 mb-4 border border-gray-300 rounded-md" 
            type="text" 
            id="location" 
            name="location" 
            value={farmData.location} 
            onChange={handleChange} 
          />
        </div>
        <button className="w-full p-3 bg-green-500 text-white rounded-md hover:bg-green-400" type="submit">Agregar Granja</button>
      </form>
      {error && <p className="text-red-600 text-center mb-4">{error}</p>}
      {success && <p className="text-green-600 text-center mb-4">{success}</p>}
    </div>
  );
};

export default FarmForm;
