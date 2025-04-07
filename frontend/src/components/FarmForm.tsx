
import  '../tailwindcss.css';
import React, { useState } from 'react';
import axios from 'axios';
import { FarmModel } from '../models/farmModel';

const FarmForm: React.FC = () => {
  const [farmData, setFarmData] = useState<FarmModel>({
    name: '',
    location: '',
  });

  // Maneja el cambio de datos en el formulario
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFarmData({ ...farmData, [name]: value });
  };

  // Maneja el envío del formulario
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newFarm:FarmModel={
      name: farmData.name,
      location: farmData.location
    }
    try {
      const response = await axios.post('http://localhost:3000/api/farms', newFarm);
      console.log('Granja creada:', response.data);
    } catch (error) {
      console.error('Error creando la granja', error);
    }
  };

  return (
    <div className="m-10">
      <h2 className="text-center text-xl ">Agregar Nueva Granja</h2>
      <form className="text-left w-80 mx-auto p-6 rounded-lg shadow-lg" onSubmit={handleSubmit}>
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
    </div>
  );
};

export default FarmForm;
