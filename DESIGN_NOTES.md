# 🧠 DECISIONES DE DISEÑO

Este archivo describe las decisiones clave de diseño y arquitectura tomadas en el desarrollo del proyecto **Farm App**, y plantea mejoras futuras.

---

## 📐 Arquitectura general

Se ha optado por una arquitectura **desacoplada** dividiendo el proyecto en:

- **Frontend** (React + Vite): Enfocado en una SPA moderna y rápida.
- **Backend** (Express + Sequelize): Una API RESTful clara y escalable.

Esta separación permite desplegar cada parte de forma independiente y escalar según necesidades futuras.

---

## 💡 Observaciones del diseño de UI y experiencia de usuario

- Se crea una **página inicial con el listado de granjas**, que incluye todas las operaciones CRUD.
- Se dispone de un **navbar** para navegar entre las distintas secciones de la app.
- Las **listas están contenidas en páginas** (como `FarmsPage` y `AnimalsPage`), que actúan como controladores de estado y comportamiento. Esta elección facilita la escalabilidad del proyecto y la separación de responsabilidades.
- En cada pagina se añade una opción de **vista tipo card y tipo list** utilizando para ello componentes de layout para dar estructura a la información mostrada. De esta forma se le da un mayor control de visualización al usuario.
- En la vista **card** se deja preparada para poder escalar añadiendo imagnes para cada granja/animal para una mayor identificación visual.
- En la **página de animales**, se permite filtrar los animales por granja, lo cual mejora la usabilidad y relevancia de la información mostrada.
- Para añadir o editar tanto granjas como animales, se reutiliza un mismo **componente modal** que incluye como `children` los formularios `FarmForm` o `AnimalForm` según el caso. Esto permite una gran eficiencia en el código y una experiencia consistente para el usuario.
- Se implementa lógica condicional para permitir tanto la **edición como la creación** desde el mismo formulario (`FarmForm`, `AnimalForm`).
- Se utilizan **toasts** (notificaciones tipo `react-toastify`) para mejorar el feedback al usuario durante operaciones como guardar o eliminar.
- Los **servicios de acceso a datos** (`animal.service.ts` y `farm.service.ts`) están separados de los controladores y podrían factorizarse aún más para crear servicios reutilizables genéricos.
- La lógica de validación se encuentra en **middlewares** dedicados, permitiendo mantener los controladores limpios.
- Se podría implementar `useContext` (o incluso `Zustand` o `Redux`) para evitar el prop drilling entre componentes y facilitar el consumo de datos compartidos entre vistas.

---

## 🧰 Justificación del stack y herramientas elegidas

### 🔧 Frontend

- **[React](https://reactjs.org/)** como librería principal para construir interfaces reactivas y componibles.
- **[TailwindCSS](https://tailwindcss.com/)**: Permite aplicar estilos de forma rápida, sin salir del HTML.
- **[React Toastify](https://fkhadra.github.io/react-toastify/)**: Mejora la experiencia de usuario con notificaciones visuales claras.
- **[Vite](https://vitejs.dev/)**: Desarrollo ultrarrápido y compilación moderna para React.

### 🛠️ Backend

- **[Sequelize](https://sequelize.org/)**: ORM que permite abstracción sobre SQL para facilitar el mantenimiento y escalabilidad.
- **Middlewares personalizados**: Separan la validación del flujo principal de control.
- Estructura funcional basada en carpetas `features`, que separan cada dominio.

---

## 🗂️ Estructura del proyecto

```
farm-app/
├─ backend/
│  ├─ src/
│  │  ├─ config/         # Configuración base de datos
│  │  ├─ features/       # Dominios funcionales (animal, farm)
│  │  ├─ models/         # Definiciones Sequelize
│  │  ├─ scripts/        # Scripts utilitarios como seed
│  │  └─ server.ts       # Arranque del backend
├─ frontend/
│  ├─ src/
│  │  ├─ components/     # Componentes agrupados por dominio
│  │  ├─ models/         # Tipos y estructuras TypeScript
│  │  ├─ pages/          # Vistas principales
│  │  ├─ services/       # Lógica de conexión API
│  │  └─ utils/          # Utilidades generales como confirmaciones
└─ .vscode/
   └─ tasks.json         # Tareas para ejecutar ambos entornos
```

### 💡 Notas sobre la estructura

- Cada dominio funcional (como `farm` o `animal`) se encuentra completamente separado, permitiendo escalar o añadir más dominios fácilmente.
- El uso de modelos en el frontend permite una mejor validación de tipos y contratos con la API.

---