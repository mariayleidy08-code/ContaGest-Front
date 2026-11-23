// Convierte un error de la API (ApiError) en mensajes que el formulario
// pueda mostrar junto a cada campo o como mensaje general.

/**
 * @param {Error} error - error capturado al llamar al servicio
 * @returns {{campos: object, general: string|null}}
 */
export function traducirErrorApi(error) {
  // Sin código HTTP: el servidor no respondió (caído o sin conexión)
  if (!error || typeof error.status !== "number") {
    return {
      campos: {},
      general: "No se pudo conectar con el servidor. Verifique que esté en ejecución.",
    };
  }

  // 409 Conflict: el NIT ya existe
  if (error.status === 409) {
    return { campos: { nit: "Ya existe un cliente registrado con ese NIT" }, general: null };
  }

  // 400 Bad Request: datos inválidos según el servidor
  if (error.status === 400) {
    const cuerpo = error.cuerpo;
    const campos = {};

    // Formato 1: lista de errores [{ field, defaultMessage }]
    if (cuerpo && Array.isArray(cuerpo.errors)) {
      cuerpo.errors.forEach((e) => {
        if (e.field) campos[e.field] = e.defaultMessage || "Dato inválido";
      });
    }
    // Formato 2: objeto { campo: "mensaje" }
    else if (cuerpo && typeof cuerpo === "object") {
      Object.entries(cuerpo).forEach(([clave, valor]) => {
        if (typeof valor === "string") campos[clave] = valor;
      });
    }

    if (Object.keys(campos).length > 0) return { campos, general: null };
    return { campos: {}, general: "El servidor rechazó los datos enviados. Revise el formulario." };
  }

  return { campos: {}, general: `Error inesperado del servidor (código ${error.status}).` };
}
