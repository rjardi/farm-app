import { ReactNode, useEffect } from 'react';
import ReactDOM from 'react-dom';

interface ModalPortalProps {
  /** Contenido del modal */
  children: ReactNode;
  /** Función que se ejecuta al cerrar el modal */
  onClose: () => void;
}

/**
 * Componente que renderiza un modal en un portal fuera del árbol principal de React.
 * Detecta la tecla Escape para cerrar el modal y se monta en el nodo con id `modal-root`.
 */
const ModalPortal = ({ children, onClose }: ModalPortalProps) => {
  const modalRoot = document.getElementById('modal-root');

  useEffect(() => {
    // Escucha la tecla Escape para cerrar el modal
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  // Si el nodo modal-root no existe, no se renderiza nada
  if (!modalRoot) return null;

  return ReactDOM.createPortal(
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-gray-600 rounded-xl shadow-lg p-6 min-w-[300px] max-w-[500px] relative">
        <button
          className="absolute top-2 right-3 hover:text-red-500"
          onClick={onClose}
        >
          ✕
        </button>
        {children}
      </div>
    </div>,
    modalRoot
  );
};

export default ModalPortal;
