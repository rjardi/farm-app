// src/utils/confirmDialog.ts
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';

/**
 * Muestra un cuadro de diálogo de confirmación reutilizable en toda la aplicación.
 *
 * @param title - Título del cuadro de diálogo
 * @param message - Mensaje o contenido del cuadro de diálogo
 * @param onConfirm - Función a ejecutar si el usuario confirma
 * @param onCancel - (Opcional) Función a ejecutar si el usuario cancela
 *
 * ✅ Utiliza la librería `react-confirm-alert` para estandarizar el comportamiento
 * de confirmación en acciones críticas como eliminar recursos.
 */
export const showConfirmDialog = (
  title: string,
  message: string,
  onConfirm: () => void,
  onCancel?: () => void
) => {
  confirmAlert({
    title,
    message,
    buttons: [
      {
        label: 'Sí',
        onClick: onConfirm,
      },
      {
        label: 'No',
        onClick: onCancel || (() => {}),
      },
    ],
  });
};
