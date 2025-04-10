import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import FarmsPage from './pages/FarmsPage';
import Navbar from './components/nav/Navbar';
import AnimalsPage from './pages/AnimalsPage';

/**
 * Componente principal de la aplicación.
 * Define el enrutamiento general y estructura básica con navegación.
 * 
 */
function App() {
  return (
    <Router>
      {/* Barra de navegación persistente */}
      <Navbar />

      {/* Contenido principal de cada ruta */}
      <main className="p-6">
        <Routes>
          {/* Página de gestión de granjas */}
          <Route path="/" element={<FarmsPage />} />

          {/* Página de gestión de animales */}
          <Route path="/animals" element={<AnimalsPage />} />
        </Routes>
      </main>
    </Router>
  );
}

export default App;
