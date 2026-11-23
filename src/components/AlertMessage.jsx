// Mensaje breve de resultado (éxito o error). Se oculta solo a los 5 segundos.
import { useEffect } from "react";
import PropTypes from "prop-types";

function AlertMessage({ tipo, mensaje, onCerrar }) {
  // Temporizador de cierre automático; se limpia si el componente se desmonta
  useEffect(() => {
    const temporizador = setTimeout(onCerrar, 5000);
    return () => clearTimeout(temporizador);
  }, [mensaje, onCerrar]);

  return (
    <div className={`alert alert-${tipo} alert-dismissible`} role="alert">
      {mensaje}
      <button
        type="button"
        className="btn-close"
        aria-label="Cerrar"
        onClick={onCerrar}
      />
    </div>
  );
}

AlertMessage.propTypes = {
  tipo: PropTypes.oneOf(["success", "danger", "warning", "info"]).isRequired,
  mensaje: PropTypes.string.isRequired,
  onCerrar: PropTypes.func.isRequired,
};

export default AlertMessage;
