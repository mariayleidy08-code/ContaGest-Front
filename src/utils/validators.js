// Validaciones del formulario de clientes.
// Replican las reglas del back-end (Bean Validation); el servidor sigue siendo
// la validación definitiva.

/** NIT: de 5 a 12 dígitos, con un dígito de verificación opcional (900123456-7). */
const PATRON_NIT = /^\d{5,12}(-\d)?$/;
/** Correo: formato básico usuario@dominio.ext */
const PATRON_CORREO = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
/** Teléfono: solo dígitos, de 7 a 15 */
const PATRON_TELEFONO = /^\d{7,15}$/;

export const MAX_RAZON_SOCIAL = 150;

/**
 * Valida los datos del formulario.
 * @param {object} datos - valores actuales del formulario
 * @returns {object} errores por campo; vacío si todo es válido
 */
export function validarCliente(datos) {
  const errores = {};

  const nit = datos.nit.trim();
  if (!nit) {
    errores.nit = "El NIT es obligatorio";
  } else if (!PATRON_NIT.test(nit)) {
    errores.nit = "El NIT debe tener entre 5 y 12 dígitos, con dígito de verificación opcional (ej. 900123456-7)";
  }

  const razon = datos.razonSocial.trim();
  if (!razon) {
    errores.razonSocial = "La razón social es obligatoria";
  } else if (razon.length > MAX_RAZON_SOCIAL) {
    errores.razonSocial = `La razón social no puede superar ${MAX_RAZON_SOCIAL} caracteres`;
  }

  if (!datos.tipoPersona) {
    errores.tipoPersona = "Seleccione el tipo de persona";
  }

  const correo = datos.correo.trim();
  if (!correo) {
    errores.correo = "El correo es obligatorio";
  } else if (!PATRON_CORREO.test(correo)) {
    errores.correo = "Ingrese un correo válido (ej. contacto@empresa.com)";
  }

  // El teléfono es opcional: solo se valida si se escribió algo
  const telefono = datos.telefono.trim();
  if (telefono && !PATRON_TELEFONO.test(telefono)) {
    errores.telefono = "El teléfono debe tener solo números (de 7 a 15 dígitos)";
  }

  return errores;
}
