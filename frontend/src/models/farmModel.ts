/**
 * Representa una granja dentro del sistema.
 */
export interface FarmModel {
    /** Identificador único de la granja (opcional, ya que puede no estar definido al crearla) */
    id?: number;
  
    /** Nombre de la granja */
    name: string;
  
    /** Ubicación física de la granja */
    location: string;
  }
  