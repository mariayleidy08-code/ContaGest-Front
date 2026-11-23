// Servicio de acceso a la API REST de clientes (Spring Boot).
// Ningún componente escribe URLs: todos usan estas funciones.

// Ruta base. En desarrollo Vite la redirige al puerto 8080 (ver vite.config.js).
const API = "/api/clientes";

/**
 * Error propio que conserva el código HTTP y el cuerpo de la respuesta,
 * para que las pantallas puedan mostrar los errores junto a cada campo.
 */
export class ApiError extends Error {
  constructor(status, cuerpo) {
    super(`Error ${status}`);
    this.status = status;
    this.cuerpo = cuerpo;
  }
}

/** Intenta leer el cuerpo JSON de una respuesta; devuelve null si no hay. */
async function leerCuerpo(respuesta) {
  try {
    return await respuesta.json();
  } catch {
    return null;
  }
}

/** Lanza ApiError si la respuesta no fue exitosa (código fuera de 200-299). */
async function verificar(respuesta) {
  if (!respuesta.ok) {
    throw new ApiError(respuesta.status, await leerCuerpo(respuesta));
  }
  return respuesta;
}

/** GET /api/clientes → lista de clientes. */
export async function listarClientes() {
  const respuesta = await verificar(await fetch(API));
  return respuesta.json();
}

/** GET /api/clientes/{id} → un cliente. */
export async function obtenerCliente(id) {
  const respuesta = await verificar(await fetch(`${API}/${id}`));
  return respuesta.json();
}

/** POST /api/clientes → crea un cliente (201). */
export async function crearCliente(cliente) {
  const respuesta = await verificar(
    await fetch(API, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(cliente),
    })
  );
  return respuesta.json();
}

/** PUT /api/clientes/{id} → actualiza un cliente (200). */
export async function actualizarCliente(id, cliente) {
  const respuesta = await verificar(
    await fetch(`${API}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(cliente),
    })
  );
  return respuesta.json();
}

/** DELETE /api/clientes/{id} → elimina un cliente (204, sin cuerpo). */
export async function eliminarCliente(id) {
  await verificar(await fetch(`${API}/${id}`, { method: "DELETE" }));
}
