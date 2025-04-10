import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FarmModel } from '../../models/farmModel.ts';
import { API_URL } from '../../config.ts';
import { toast } from 'react-toastify';
import { deleteById } from '../../services/api.service.ts';
import { showConfirmDialog } from '../../utils/confirmDialog.ts';

interface FarmFormProps {
  initialData?: FarmModel;
}

const FarmForm = ({ initialData }: FarmFormProps) => {
  const id = initialData?.id;
  const navigate = useNavigate();
  const isEditMode = !!initialData?.id;

  const [farm, setFarm] = useState<FarmModel>({ name: '', location: '' });
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  // Al cargar el formulario, si hay datos iniciales se rellenan
  useEffect(() => {
    if (initialData) {
      setLoading(true);
      setFarm(initialData);
      setLoading(false);
    }
  }, [initialData]);

  /**
   * Maneja el cambio en los campos del formulario
   * @param e Evento de cambio de input
   */
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFarm({ ...farm, [name]: value });
  };

  /**
   * Maneja el envío del formulario para crear o editar una granja
   * @param e Evento de formulario
   */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      if (isEditMode) {
        await axios.put(`${API_URL}/api/farms/${id}`, farm);
        toast.success('Granja actualizada con éxito', { autoClose: 2000 });
      } else {
        await axios.post(`${API_URL}/api/farms`, farm);
        toast.success('Granja creada con éxito', { autoClose: 2000 });
      }
    } catch (err) {
      console.error('Error al guardar la granja', err);
      toast.error('Error al guardar la granja', { autoClose: 2000 });
    } finally {
      setSubmitting(false);
    }
  };

  /**
   * Muestra confirmación y elimina la granja si se acepta
   */
  const handleDelete = async () => {
    showConfirmDialog(
      '¿Estás seguro de que deseas eliminar esta granja?',
      '',
      async () => {
        try {
          await deleteById(Number(id), 'farm');
          toast.success('Granja eliminada correctamente', { autoClose: 2000 });
          navigate('/');
        } catch (err) {
          toast.error('Error al eliminar la granja', { autoClose: 2000 });
        }
      }
    );
  };

  return (
    <section className="max-w-xl mx-auto mt-10 p-6 rounded shadow">
      <h1 className="text-2xl font-bold mb-4">
        {isEditMode ? 'Editar Granja' : 'Nueva Granja'}
      </h1>
      {loading ? (
        <p>Cargando...</p>
      ) : (
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label>Nombre</label>
            <input
              type="text"
              name="name"
              value={farm.name}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label>Ubicación</label>
            <input
              type="text"
              name="location"
              value={farm.location}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div className="flex gap-4">
            <button
              type="submit"
              disabled={submitting}
              className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
            >
              {isEditMode ? 'Actualizar' : 'Crear'}
            </button>
            {isEditMode && (
              <button
                type="button"
                onClick={handleDelete}
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
              >
                Eliminar
              </button>
            )}
          </div>
        </form>
      )}
    </section>
  );
};

export default FarmForm;
