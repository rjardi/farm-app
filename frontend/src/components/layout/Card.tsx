import { FieldDefinition } from "../../models/fieldDefinitionModel";

interface CardProps<T> {
  /** Objeto de datos que se va a mostrar en la tarjeta */
  data: T;
  /** Lista de campos que define qué propiedades del objeto mostrar y cómo etiquetarlas */
  fields: FieldDefinition<T>[];
  /** Función que se ejecuta al hacer clic en el botón de editar */
  onEdit: (item: T) => void;
  /** Función que se ejecuta al hacer clic en el botón de eliminar */
  onDelete: (item: T) => void;
}

/**
 * Componente genérico para renderizar una tarjeta visual con los datos de cualquier tipo T.
 * @template T - Tipo de datos que representa el contenido de la tarjeta
 */
const Card = <T,>({ data, fields, onEdit, onDelete }: CardProps<T>) => {
  return (
    <div className="border rounded-xl p-4 shadow">
      {/* Imagen superior genérica para todas las tarjetas */}
      <img
        src={'https://placehold.co/300x200'}
        className="w-full h-40 object-cover"
      />

      {/* Renderizado dinámico de los campos definidos */}
      {fields.map((field) => (
        <p key={String(field.key)} className="text-gray-700">
          <strong>{String(field.label)}:</strong> {String(data[field.key])}
        </p>
      ))}

      {/* Botones de acción */}
      <div className="mt-4">
        <button
          className="text-blue-500 hover:underline mr-2"
          onClick={() => onEdit(data)}
        >
          Editar
        </button>
        <button
          onClick={() => onDelete(data)}
          className="text-red-500 hover:underline"
        >
          Eliminar
        </button>
      </div>
    </div>
  );
};

export default Card;
