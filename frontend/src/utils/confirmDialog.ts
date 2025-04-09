import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';

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
