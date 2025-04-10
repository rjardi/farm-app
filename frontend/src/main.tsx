import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

/**
 * Punto de entrada principal de la aplicación React.
 * Renderiza la app dentro del contenedor con id "root".
 */
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />

    {/* 
      Se añade ToastContainer para permitir notificaciones tipo "toast" en la aplicación.
      Esto mejora la experiencia del usuario proporcionando retroalimentación inmediata 
      ante acciones como guardar, editar o eliminar.
    */}
    <ToastContainer position="top-right" autoClose={3000} />
  </StrictMode>,
);
