import { FieldDefinition } from "../../models/fieldDefinitionModel";

interface Props<T> {
  /** Lista de datos que se van a renderizar como filas */
  data: T[];
  /** Columnas a renderizar, definidas por llave y etiqueta */
  columns: FieldDefinition<T>[];
  /** Función opcional para editar un elemento */
  onEdit?: (item: T) => void;
  /** Función opcional para eliminar un elemento */
  onDelete?: (item: T) => void;
}

/**
 * Componente genérico que renderiza una tabla con datos del tipo T.
 * Soporta columnas dinámicas y acciones de edición y eliminación.
 * 
 * @template T Tipo de los objetos a listar (debe incluir opcionalmente una propiedad `id`)
 */
function DataList<T extends { id?: number }>({
  data,
  columns,
  onEdit,
  onDelete
}: Props<T>) {
  return (
    <div className="overflow-x-auto rounded-xl shadow-md border border-gray-500">
      <table className="min-w-full divide-y divide-gray-500">
        <thead className="bg-gray-600">
          <tr className="divide-x divide-gray-500">
            {/* Renderizado dinámico de encabezados de columna */}
            {columns.map((col) => (
              <th key={String(col.key)} className="px-4 py-2">
                {col.label}
              </th>
            ))}
            {/* Columna adicional si hay acciones habilitadas */}
            {(onEdit || onDelete) && <th className="px-4 py-2">Acciones</th>}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-500">
          {/* Renderizado dinámico de filas */}
          {data.map((item) => (
            <tr key={item.id ?? JSON.stringify(item)} className="divide-x divide-gray-500">
              {columns.map((col) => (
                <td key={String(col.key)} className="px-4 py-2">
                  {String(item[col.key])}
                </td>
              ))}
              {/* Renderizado condicional de botones de acción */}
              {(onEdit || onDelete) && (
                <td className="px-4 py-2">
                  {onEdit && (
                    <button
                      onClick={() => onEdit(item)}
                      className="text-blue-500 hover:underline mr-2"
                    >
                      Editar
                    </button>
                  )}
                  {onDelete && (
                    <button
                      onClick={() => onDelete(item)}
                      className="text-red-500 hover:underline"
                    >
                      Eliminar
                    </button>
                  )}
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default DataList;
