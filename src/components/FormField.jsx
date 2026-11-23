// Campo de formulario reutilizable: etiqueta + control + mensaje de error.
// Soporta tipo texto, lista desplegable ("select") y casilla ("checkbox").
import PropTypes from "prop-types";

function FormField({ etiqueta, nombre, tipo = "text", valor, onCambio, error, maxLength, opciones = [] }) {
  const id = `campo-${nombre}`;
  const claseError = error ? "is-invalid" : "";

  // Casilla de verificación (ej. cliente activo)
  if (tipo === "checkbox") {
    return (
      <div className="form-check mb-3">
        <input
          id={id}
          name={nombre}
          type="checkbox"
          className="form-check-input"
          checked={valor}
          onChange={onCambio}
        />
        <label htmlFor={id} className="form-check-label">{etiqueta}</label>
      </div>
    );
  }

  return (
    <div className="mb-3">
      <label htmlFor={id} className="form-label fw-semibold">{etiqueta}</label>

      {tipo === "select" ? (
        <select id={id} name={nombre} className={`form-select ${claseError}`} value={valor} onChange={onCambio}>
          <option value="">Seleccione...</option>
          {opciones.map((op) => (
            <option key={op.valor} value={op.valor}>{op.texto}</option>
          ))}
        </select>
      ) : (
        <input
          id={id}
          name={nombre}
          type={tipo}
          className={`form-control ${claseError}`}
          value={valor}
          onChange={onCambio}
          maxLength={maxLength}
        />
      )}

      {/* Mensaje de error debajo del campo */}
      {error && <div className="invalid-feedback">{error}</div>}
    </div>
  );
}

FormField.propTypes = {
  etiqueta: PropTypes.string.isRequired,
  nombre: PropTypes.string.isRequired,
  tipo: PropTypes.string,
  valor: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]).isRequired,
  onCambio: PropTypes.func.isRequired,
  error: PropTypes.string,
  maxLength: PropTypes.number,
  opciones: PropTypes.array,
};

export default FormField;
