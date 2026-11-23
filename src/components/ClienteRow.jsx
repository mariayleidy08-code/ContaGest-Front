// Fila de la tabla: datos de un cliente y sus acciones (ver, editar, eliminar).
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

function ClienteRow({ cliente, onEliminar }) {
  return (
    <tr>
      <td>{cliente.nit}</td>
      <td>{cliente.razonSocial}</td>
      <td>{cliente.tipoPersona === "JURIDICA" ? "Jurídica" : "Natural"}</td>
      <td>{cliente.correo}</td>
      <td>
        <span className={`badge ${cliente.activo ? "bg-success" : "bg-secondary"}`}>
          {cliente.activo ? "Activo" : "Inactivo"}
        </span>
      </td>
      <td className="text-end text-nowrap">
        <Link className="btn btn-sm btn-outline-secondary me-1" to={`/clientes/${cliente.id}`}>
          Ver
        </Link>
        <Link className="btn btn-sm btn-outline-primary me-1" to={`/clientes/${cliente.id}/editar`}>
          Editar
        </Link>
        <button className="btn btn-sm btn-outline-danger" onClick={() => onEliminar(cliente)}>
          Eliminar
        </button>
      </td>
    </tr>
  );
}

ClienteRow.propTypes = {
  cliente: PropTypes.object.isRequired,
  onEliminar: PropTypes.func.isRequired,
};

export default ClienteRow;
