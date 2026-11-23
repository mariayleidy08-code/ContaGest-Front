// Pantalla principal: listado, búsqueda y eliminación de clientes.
import { useState } from "react";
import { Link } from "react-router-dom";
import { useClientes } from "../hooks/useClientes.js";
import { eliminarCliente } from "../services/clienteService.js";
import { useNotification } from "../context/NotificationContext.jsx";
import SearchBar from "../components/SearchBar.jsx";
import ClientesTable from "../components/ClientesTable.jsx";
import ConfirmDialog from "../components/ConfirmDialog.jsx";
import Spinner from "../components/Spinner.jsx";

function ClientesPage() {
  const { clientes, cargando, error, recargar } = useClientes();
  const { notificar } = useNotification();
  const [busqueda, setBusqueda] = useState("");
  const [aEliminar, setAEliminar] = useState(null); // cliente pendiente de confirmar

  // Filtro por razón social o NIT, sin distinguir mayúsculas
  const texto = busqueda.trim().toLowerCase();
  const filtrados = clientes.filter(
    (c) => c.razonSocial.toLowerCase().includes(texto) || c.nit.toLowerCase().includes(texto)
  );

  /** Elimina el cliente confirmado y recarga la lista. */
  const confirmarEliminacion = async () => {
    try {
      await eliminarCliente(aEliminar.id);
      notificar("success", "Cliente eliminado correctamente.");
      await recargar();
    } catch {
      notificar("danger", "No se pudo eliminar el cliente.");
    } finally {
      setAEliminar(null);
    }
  };

  return (
    <>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h1 className="h3 titulo-pagina mb-0">Clientes</h1>
        <Link to="/clientes/nuevo" className="btn btn-contagest">+ Nuevo cliente</Link>
      </div>

      <div className="mb-3">
        <SearchBar valor={busqueda} onCambio={setBusqueda} />
      </div>

      {cargando && <Spinner mensaje="Cargando clientes..." />}
      {error && <div className="alert alert-danger">{error}</div>}

      {!cargando && !error && (
        <>
          <ClientesTable clientes={filtrados} onEliminar={setAEliminar} />
          <p className="text-muted small">Total: {filtrados.length} cliente(s)</p>
        </>
      )}

      <ConfirmDialog
        visible={aEliminar !== null}
        mensaje={aEliminar ? `¿Desea eliminar a "${aEliminar.razonSocial}"? Esta acción no se puede deshacer.` : ""}
        onConfirmar={confirmarEliminacion}
        onCancelar={() => setAEliminar(null)}
      />
    </>
  );
}

export default ClientesPage;
