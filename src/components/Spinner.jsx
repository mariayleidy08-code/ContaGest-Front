// Indicador de carga mientras se espera la respuesta de la API.
import PropTypes from "prop-types";

function Spinner({ mensaje = "Cargando..." }) {
  return (
    <div className="text-center py-5" role="status">
      <div className="spinner-border text-success" />
      <p className="mt-2 text-muted">{mensaje}</p>
    </div>
  );
}

Spinner.propTypes = { mensaje: PropTypes.string };

export default Spinner;
