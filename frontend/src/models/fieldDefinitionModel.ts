/**
 * Define una columna o campo a mostrar en componentes dinámicos como tablas o tarjetas.
 * 
 * @template T - Tipo de dato que se va a representar (por ejemplo, `FarmModel` o `AnimalModel`).
 */
export interface FieldDefinition<T> {
    /**
     * Clave del objeto `T` que se va a mostrar (por ejemplo, 'name' o 'location').
     */
    key: keyof T;
  
    /**
     * Etiqueta que se mostrará al usuario en la UI, normalmente como encabezado o título del campo.
     */
    label: string;
  }
  