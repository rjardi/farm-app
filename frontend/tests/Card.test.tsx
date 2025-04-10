import { describe, test, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import React from "react";
import Card from "../src/components/layout/Card";
import { FieldDefinition } from "../src/models/fieldDefinitionModel";
import "@testing-library/jest-dom";


/**
 * Pruebas unitarias para el componente <Card />.
 * 
 * Se valida que:
 * - Los campos definidos se renderizan correctamente.
 * - Los botones "Editar" y "Eliminar" están presentes.
 * - Las funciones `onEdit` y `onDelete` se llaman con los datos correctos al hacer clic.
 */
describe('<Card />', () => {
  const farmMock = {
    id: 1,
    name: 'Granja del Segre',
    location: 'Lleida',
  };

  const fields: FieldDefinition<typeof farmMock>[] = [
    { key: 'name', label: 'Nombre' },
    { key: 'location', label: 'Ubicación' },
  ];

  test('debería mostrar los campos de datos y los botones de acción', async () => {
    const user = userEvent.setup();
    const onEdit = vi.fn();
    const onDelete = vi.fn();

    render(<Card data={farmMock} fields={fields} onEdit={onEdit} onDelete={onDelete} />);

    // Verificamos que se renderiza la imagen por defecto
    const img = screen.getByRole('img');
    expect(img).toHaveAttribute('src', 'https://placehold.co/300x200');

    // Verificamos que se muestran correctamente los campos definidos
    expect(screen.getByText(/Nombre:/)).toBeDefined();
    expect(screen.getByText('Granja del Segre')).toBeDefined();
    expect(screen.getByText(/Ubicación:/)).toBeDefined();
    expect(screen.getByText('Lleida')).toBeDefined();

    // Verificamos que los botones de acción existen
    const editButton = screen.getByText('Editar');
    const deleteButton = screen.getByText('Eliminar');
    expect(editButton).toBeDefined();
    expect(deleteButton).toBeDefined();

    // Simulamos clics en los botones de acción
    await user.click(editButton);
    await user.click(deleteButton);

    // Verificamos que se ejecutan los callbacks con los datos correctos
    expect(onEdit).toHaveBeenCalledWith(farmMock);
    expect(onDelete).toHaveBeenCalledWith(farmMock);
  });
});
