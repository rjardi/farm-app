/**
 * URL base para las peticiones a la API.
 * 
 * Se obtiene desde las variables de entorno definidas en el archivo `.env`, 
 * usando la convención de Vite (`import.meta.env`).
 * 
 * Es importante que la variable esté definida como `VITE_API_BASE_URL` en el entorno.
 */
export const API_URL = import.meta.env.VITE_API_BASE_URL;
