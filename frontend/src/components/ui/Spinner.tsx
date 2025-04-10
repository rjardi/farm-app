/**
 * Componente Spinner
 * 
 * Muestra un spinner animado (círculo giratorio) centrado vertical y horizontalmente.
 * Útil para indicar que una operación está en curso (cargando datos, esperando respuesta, etc.).
 */
const Spinner = () => {
  return (
    <div className="flex justify-center items-center h-40">
      {/* Spinner circular con animación de giro */}
      <div className="animate-spin rounded-full h-10 w-10 border-t-4 border-blue-500 border-solid"></div>
    </div>
  );
};

export default Spinner;
