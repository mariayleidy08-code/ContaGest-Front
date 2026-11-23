// Pantalla de solo lectura con toda la información de un cliente.
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Spinner from "../components/Spinner.jsx";
import NotFoundPage from "./NotFoundPage.jsx";
import { obtenerCliente } from "../services/clienteService.js";

function ClienteDetallePage() {
  const { id } = useParams();
  const [cliente, setCliente] = useState(null);
  const [noEncontrado, setNoEncontrado] = useState(false);

  useEffect(() => {
    obtenerCliente(id)
      .then(setCliente)
      .catch(() => setNoEncontrado(true));
  }, [id]);

  if (noEncontrado) return <NotFoundPage mensaje="El cliente consultado no existe." />;
  if (!cliente) return <Spinner mensaje="Cargando cliente..." />;

  return (
    <div className="col-lg-8 mx-auto">
      <h1 className="h3 titulo-pagina mb-3">Detalle del cliente</h1>
      <div className="card card-body shadow-sm">
        <dl className="row mb-0">
          <dt className="col-sm-4">NIT</dt>
          <dd className="col-sm-8">{cliente.nit}</dd>
          <dt className="col-sm-4">Razón social</dt>
          <dd className="col-sm-8">{cliente.razonSocial}</dd>
          <dt className="col-sm-4">Tipo de persona</dt>
          <dd className="col-sm-8">{cliente.tipoPersona === "JURIDICA" ? "Jurídica" : "Natural"}</dd>
          <dt className="col-sm-4">Correo</dt>
          <dd className="col-sm-8">{cliente.correo}</dd>
          <dt className="col-sm-4">Teléfono</dt>
          <dd className="col-sm-8">{cliente.telefono || "No registrado"}</dd>
          <dt className="col-sm-4">Estado</dt>
          <dd className="col-sm-8">{cliente.activo ? "Activo" : "Inactivo"}</dd>
          <dt className="col-sm-4">Fecha de registro</dt>
          <dd className="col-sm-8">{cliente.fechaRegistro}</dd>
        </dl>
      </div>
      <div className="d-flex gap-2 mt-3">
        <Link to={`/clientes/${cliente.id}/editar`} className="btn btn-contagest">Editar</Link>
        <Link to="/clientes" className="btn btn-outline-secondary">Volver al listado</Link>
      </div>
    </div>
  );
}

export default ClienteDetallePage;
