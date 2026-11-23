// Formulario reutilizable para crear y editar un cliente.
// Valida los datos antes de enviarlos y muestra los errores junto a cada campo.
import { useState } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import FormField from "./FormField.jsx";
import { validarCliente, MAX_RAZON_SOCIAL } from "../utils/validators.js";

// Valores de un formulario vacío (modo "crear")
export const CLIENTE_VACIO = {
  nit: "",
  razonSocial: "",
  tipoPersona: "",
  correo: "",
  telefono: "",
  activo: true,
};

const TIPOS_PERSONA = [
  { valor: "NATURAL", texto: "Persona natural" },
  { valor: "JURIDICA", texto: "Persona jurídica" },
];

function ClienteForm({ valoresIniciales = CLIENTE_VACIO, onGuardar, erroresServidor = {}, textoBoton, guardando = false }) {
  // Estado del formulario: un solo objeto con todos los campos
  const [valores, setValores] = useState({
    ...CLIENTE_VACIO,
    ...valoresIniciales,
    telefono: valoresIniciales.telefono ?? "", // el API puede devolver null
  });
  const [errores, setErrores] = useState({});

  /** Actualiza el campo que cambió (maneja texto, lista y casilla). */
  const manejarCambio = (evento) => {
    const { name, value, type, checked } = evento.target;
    setValores((anterior) => ({
      ...anterior,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  /** Valida y, si todo está bien, entrega los datos a la página. */
  const manejarEnvio = (evento) => {
    evento.preventDefault(); // evita recargar la página
    const erroresEncontrados = validarCliente(valores);
    setErrores(erroresEncontrados);
    if (Object.keys(erroresEncontrados).length > 0) return;

    onGuardar({
      ...valores,
      nit: valores.nit.trim(),
      razonSocial: valores.razonSocial.trim(),
      correo: valores.correo.trim(),
      telefono: valores.telefono.trim() || null, // vacío se envía como null
    });
  };

  // Los errores locales tienen prioridad; luego los que devuelve el servidor
  const errorDe = (campo) => errores[campo] || erroresServidor[campo];

  return (
    <form onSubmit={manejarEnvio} noValidate className="card card-body shadow-sm">
      <FormField etiqueta="NIT" nombre="nit" valor={valores.nit} onCambio={manejarCambio} error={errorDe("nit")} maxLength={14} />
      <FormField etiqueta="Razón social" nombre="razonSocial" valor={valores.razonSocial} onCambio={manejarCambio} error={errorDe("razonSocial")} maxLength={MAX_RAZON_SOCIAL} />
      <FormField etiqueta="Tipo de persona" nombre="tipoPersona" tipo="select" opciones={TIPOS_PERSONA} valor={valores.tipoPersona} onCambio={manejarCambio} error={errorDe("tipoPersona")} />
      <FormField etiqueta="Correo electrónico" nombre="correo" tipo="email" valor={valores.correo} onCambio={manejarCambio} error={errorDe("correo")} />
      <FormField etiqueta="Teléfono (opcional)" nombre="telefono" valor={valores.telefono} onCambio={manejarCambio} error={errorDe("telefono")} maxLength={15} />
      <FormField etiqueta="Cliente activo" nombre="activo" tipo="checkbox" valor={valores.activo} onCambio={manejarCambio} />

      <div className="d-flex gap-2">
        <button type="submit" className="btn btn-contagest" disabled={guardando}>
          {guardando ? "Guardando..." : textoBoton}
        </button>
        <Link to="/clientes" className="btn btn-outline-secondary">Cancelar</Link>
      </div>
    </form>
  );
}

ClienteForm.propTypes = {
  valoresIniciales: PropTypes.object,
  onGuardar: PropTypes.func.isRequired,
  erroresServidor: PropTypes.object,
  textoBoton: PropTypes.string.isRequired,
  guardando: PropTypes.bool,
};

export default ClienteForm;
