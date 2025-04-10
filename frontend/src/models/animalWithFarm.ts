import { AnimalModel } from "./animalModel";

/**
 * Extiende `AnimalModel` incluyendo el nombre de la granja a la que pertenece el animal.
 * Útil para vistas donde se quiere mostrar directamente `farmName` sin hacer múltiples consultas.
 */
export interface AnimalWithFarmName extends AnimalModel {
  /** Nombre de la granja asociada al animal (opcional) */
  farmName?: string;
}
