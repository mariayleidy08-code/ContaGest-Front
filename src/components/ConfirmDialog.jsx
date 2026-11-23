// Ventana de confirmación (por ejemplo, antes de eliminar un cliente).
// Se construye con las clases de Bootstrap, sin necesidad de su JavaScript.
import PropTypes from "prop-types";

function ConfirmDialog({ visible, mensaje, onConfirmar, onCancelar }) {
  if (!visible) return null;

  return (
    <>
      <div className="modal d-block" tabIndex="-1" role="dialog" aria-modal="true">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Confirmar eliminación</h5>
            </div>
            <div className="modal-body">
              <p className="mb-0">{mensaje}</p>
            </div>
            <div className="modal-footer">
              <button className="btn btn-outline-secondary" onClick={onCancelar}>Cancelar</button>
              <button className="btn btn-danger" onClick={onConfirmar}>Eliminar</button>
            </div>
          </div>
        </div>
      </div>
      {/* Fondo oscuro detrás de la ventana */}
      <div className="modal-backdrop show" />
    </>
  );
}

ConfirmDialog.propTypes = {
  visible: PropTypes.bool.isRequired,
  mensaje: PropTypes.string.isRequired,
  onConfirmar: PropTypes.func.isRequired,
  onCancelar: PropTypes.func.isRequired,
};

export default ConfirmDialog;
