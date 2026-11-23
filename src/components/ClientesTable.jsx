// Tabla con la lista de clientes. Si no hay resultados muestra un mensaje.
import PropTypes from "prop-types";
import ClienteRow from "./ClienteRow.jsx";

function ClientesTable({ clientes, onEliminar }) {
  if (clientes.length === 0) {
    return <p className="text-center text-muted py-4">No se encontraron clientes.</p>;
  }

  return (
    <div className="table-responsive">
      <table className="table table-hover align-middle bg-white">
        <thead className="table-light">
          <tr>
            <th>NIT</th>
            <th>Razón social</th>
            <th>Tipo</th>
            <th>Correo</th>
            <th>Estado</th>
            <th />
          </tr>
        </thead>
        <tbody>
          {/* key ayuda a React a identificar cada fila de forma única */}
          {clientes.map((cliente) => (
            <ClienteRow key={cliente.id} cliente={cliente} onEliminar={onEliminar} />
          ))}
        </tbody>
      </table>
    </div>
  );
}

ClientesTable.propTypes = {
  clientes: PropTypes.array.isRequired,
  onEliminar: PropTypes.func.isRequired,
};

export default ClientesTable;
