import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import { AnimalModel } from '../../models/animalModel.ts';
import { API_URL } from '../../config.ts';
import { deleteById } from '../../services/api.service.ts';
import { showConfirmDialog } from '../../utils/confirmDialog.ts';
import { FarmModel } from '../../models/farmModel.ts';
import SelectBox from '../ui/SelectBox.tsx';

interface AnimalFormProps {
  initialData?: AnimalModel;
}

const AnimalForm = ({ initialData }: AnimalFormProps) => {
  const id = initialData?.id;
  const navigate = useNavigate();
  const isEditMode = !!initialData?.id;

  const [animal, setAnimal] = useState<AnimalModel>({
    name: '',
    breed: '',
    id_farm: 0,
  });

  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [farms, setFarms] = useState<FarmModel[]>([]);

  // Al montar el componente, obtenemos las granjas disponibles
  // y si estamos en modo edición, cargamos los datos iniciales del animal
  useEffect(() => {
    fetchFarms();
    if (initialData) {
      setLoading(true);
      setAnimal(initialData);
      setLoading(false);
    }
  }, [initialData]);

  /**
   * Obtiene la lista de granjas desde la API
   */
  const fetchFarms = async () => {
    axios
      .get(`${API_URL}/api/farms`)
      .then((res) => setFarms(res.data))
      .catch((err) => console.error('Error al obtener granjas', err));
  };

  /**
   * Maneja el cambio de valores del formulario
   * @param e Evento de cambio de un input
   */
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setAnimal({ ...animal, [name]: name === 'id_farm' ? Number(value) : value });
  };

  /**
   * Valida si el valor recibido es un número entero válido
   * @param value Valor a validar
   * @returns true si es número entero válido
   */
  const isValidNumber = (value: any): boolean => {
    return !isNaN(Number(value)) && Number.isInteger(Number(value));
  };

  /**
   * Maneja el envío del formulario, tanto para crear como para editar un animal
   * Incluye validación de campos y muestra mensajes toast
   * @param e Evento de envío del formulario
   */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isValidNumber(animal.id_farm)) {
      toast.error('El ID de la granja debe ser un número válido', { autoClose: 2000 });
      return;
    }

    setSubmitting(true);
    try {
      if (isEditMode) {
        await axios.put(`${API_URL}/api/animals/${id}`, animal);
        toast.success('Animal actualizado con éxito', { autoClose: 2000 });
      } else {
        await axios.post(`${API_URL}/api/animals`, animal);
        toast.success('Animal creado con éxito', { autoClose: 2000 });
      }
    } catch (err) {
      console.error('Error al guardar el animal', err);
      toast.error('Error al guardar el animal', { autoClose: 2000 });
    } finally {
      setSubmitting(false);
    }
  };

  /**
   * Maneja la eliminación del animal actual (modo edición)
   * Muestra un diálogo de confirmación antes de eliminar
   */
  const handleDelete = async () => {
    showConfirmDialog(
      '¿Estás seguro de que deseas eliminar este animal?',
      '',
      async () => {
        try {
          await deleteById(Number(id), 'animal');
          toast.success('Animal eliminado correctamente', { autoClose: 2000 });
          navigate('/animals');
        } catch (err) {
          toast.error('Error al eliminar el animal', { autoClose: 2000 });
        }
      }
    );
  };

  return (
    <section className="max-w-xl mx-auto mt-10 p-6 rounded shadow">
      <h1 className="text-2xl font-bold mb-4">
        {isEditMode ? 'Editar Animal' : 'Nuevo Animal'}
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
              value={animal.name}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label>Raza</label>
            <input
              type="text"
              name="breed"
              value={animal.breed}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>

          <SelectBox
            label="Granja"
            name="id_farm"
            value={animal.id_farm}
            onChange={(val) => setAnimal({ ...animal, id_farm: Number(val) })}
            options={[{ value: '', label: 'Selecciona una Granja' }, ...farms.map(f => ({ value: f.id!, label: f.name }))]}
            required
          />

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

export default AnimalForm;
