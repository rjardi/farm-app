import { NavLink } from 'react-router-dom';

/**
 * Componente Navbar que muestra la navegación principal de la aplicación.
 * Incluye enlaces a las páginas de granjas y animales.
 */
const Navbar = () => {
  return (
    <nav className="bg-gray-500 text-white px-6 py-4 flex justify-between items-center gap-15">
      <h2 className="text-xl font-bold">FarmApp</h2>
      <div className="space-x-4">
        {/* NavLink aplica estilos dinámicos según si la ruta está activa */}
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive ? '!underline !text-white' : '!text-white'
          }
        >
          Granjas
        </NavLink>
        <NavLink
          to="/animals"
          className={({ isActive }) =>
            isActive ? '!underline !text-white' : '!text-white'
          }
        >
          Animales
        </NavLink>
      </div>
    </nav>
  );
};

export default Navbar;
