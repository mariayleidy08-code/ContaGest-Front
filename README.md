# ContaGest Front – Módulo de clientes (React)

Front-end en **React** del módulo de clientes de ContaGest, software para despacho contable.
Consume la API REST de Spring Boot del repositorio
[ContaGest-Spring1](https://github.com/leidyyethcenia-bit/ContaGest-Spring1).

- **Evidencia:** GA7-220501096-AA4-EV03 – Componente front-end del proyecto formativo
- **Aprendiz:** Leidy Yethcenia Muñoz Rodríguez
- **Tecnologías:** React 18, Vite, React Router 6, Bootstrap 5, fetch

## Funcionalidades
Listar, buscar (por razón social o NIT), ver detalle, registrar, editar y eliminar clientes,
con validaciones en el formulario (NIT, razón social, tipo de persona, correo y teléfono)
y mensajes de confirmación.

## Cómo ejecutarlo
Se necesitan **dos terminales**: una para el back-end y otra para el front-end.

**Terminal 1 – Back-end (Spring Boot, puerto 8080)**
```bash
cd ContaGest-Spring1
./ejecutar.sh
```

**Terminal 2 – Front-end (React, puerto 5173)**
```bash
cd contagest-front
npm install
npm run dev
```
Abra `http://localhost:5173`. En Codespaces use la pestaña **Puertos** → puerto 5173 → ícono del globo.

> Las peticiones a `/api` se redirigen al puerto 8080 mediante el *proxy* de Vite
> (`vite.config.js`), por lo que no se necesita configurar CORS en el back-end.

## Estructura
```
src/
├── main.jsx                 punto de entrada
├── App.jsx                  diseño general y rutas
├── components/              piezas reutilizables (Navbar, Footer, FormField, ClienteForm, ...)
├── pages/                   pantallas (listado, nuevo, editar, detalle, 404)
├── hooks/useClientes.js     carga de la lista de clientes
├── services/clienteService.js   llamadas a la API REST
├── context/NotificationContext.jsx  mensajes de éxito/error
└── utils/                   validaciones y traducción de errores de la API
```

## Estándares de codificación
- Componentes y archivos de componentes en `PascalCase`; funciones y variables en `camelCase`.
- Un componente por archivo, con `PropTypes` para documentar sus propiedades.
- Comentarios en español que explican la función de cada archivo, componente y función.
- La lógica de acceso a datos está en `services/` y `hooks/`, separada de la presentación.
