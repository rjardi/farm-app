/**
 * Representa un animal en la aplicación.
 */
export interface AnimalModel {
    /** ID único del animal (opcional al crear) */
    id?: number;
  
    /** Nombre del animal */
    name: string;
  
    /** Raza del animal */
    breed: string;
  
    /** ID de la granja a la que pertenece el animal */
    id_farm: number;
  }
  