/**
 * Representa una opción del select con un valor y una etiqueta visible.
 */
interface Option {
  value: string | number;
  label: string;
}

/**
 * Props para el componente SelectBox.
 */
interface SelectBoxProps {
  /** Opciones a mostrar en el select */
  options: Option[];
  /** Valor actualmente seleccionado */
  value: string | number;
  /** Función que se llama cuando cambia el valor */
  onChange: (value: string | number) => void;
  /** Etiqueta opcional para mostrar sobre el select */
  label?: string;
  /** Nombre del input para formularios */
  name?: string;
  /** Define si el campo es obligatorio */
  required?: boolean;
}

/**
 * Componente reutilizable que renderiza un campo de selección (select).
 * Ideal para usar en formularios donde se requiere elegir entre varias opciones.
 */
const SelectBox = ({
  options,
  value,
  onChange,
  label,
  name,
  required = false,
}: SelectBoxProps) => {
  return (
    <div className="mb-4">
      {/* Mostrar la etiqueta si está definida */}
      {label && <label className="block mb-1">{label}</label>}

      <select
        name={name}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required={required}
        className="w-full p-2 border rounded bg-gray-500"
      >
        {/* Renderizar cada opción pasada por props */}
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SelectBox;
