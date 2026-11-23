// Pantalla para modificar un cliente existente.
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ClienteForm from "../components/ClienteForm.jsx";
import Spinner from "../components/Spinner.jsx";
import NotFoundPage from "./NotFoundPage.jsx";
import { actualizarCliente, obtenerCliente } from "../services/clienteService.js";
import { useNotification } from "../context/NotificationContext.jsx";
import { traducirErrorApi } from "../utils/erroresApi.js";

function ClienteEditarPage() {
  const { id } = useParams(); // el id viene de la URL: /clientes/:id/editar
  const navigate = useNavigate();
  const { notificar } = useNotification();
  const [cliente, setCliente] = useState(null);
  const [noEncontrado, setNoEncontrado] = useState(false);
  const [erroresServidor, setErroresServidor] = useState({});
  const [errorGeneral, setErrorGeneral] = useState(null);
  const [guardando, setGuardando] = useState(false);

  // Consulta el cliente al abrir la pantalla
  useEffect(() => {
    obtenerCliente(id)
      .then(setCliente)
      .catch(() => setNoEncontrado(true));
  }, [id]);

  /** Envía los cambios; conserva los campos que el formulario no edita (id, fechaRegistro). */
  const guardar = async (datos) => {
    setGuardando(true);
    setErroresServidor({});
    setErrorGeneral(null);
    try {
      await actualizarCliente(id, { ...cliente, ...datos });
      notificar("success", "Cliente actualizado correctamente.");
      navigate("/clientes");
    } catch (error) {
      const { campos, general } = traducirErrorApi(error);
      setErroresServidor(campos);
      setErrorGeneral(general);
      setGuardando(false);
    }
  };

  if (noEncontrado) return <NotFoundPage mensaje="El cliente que intenta editar no existe." />;
  if (!cliente) return <Spinner mensaje="Cargando cliente..." />;

  return (
    <div className="col-lg-8 mx-auto">
      <h1 className="h3 titulo-pagina mb-3">Editar cliente</h1>
      {errorGeneral && <div className="alert alert-danger">{errorGeneral}</div>}
      <ClienteForm
        valoresIniciales={cliente}
        onGuardar={guardar}
        erroresServidor={erroresServidor}
        textoBoton="Guardar cambios"
        guardando={guardando}
      />
    </div>
  );
}

export default ClienteEditarPage;
