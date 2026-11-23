// Pantalla para registrar un cliente nuevo.
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ClienteForm from "../components/ClienteForm.jsx";
import { crearCliente } from "../services/clienteService.js";
import { useNotification } from "../context/NotificationContext.jsx";
import { traducirErrorApi } from "../utils/erroresApi.js";

function ClienteNuevoPage() {
  const navigate = useNavigate();
  const { notificar } = useNotification();
  const [erroresServidor, setErroresServidor] = useState({});
  const [errorGeneral, setErrorGeneral] = useState(null);
  const [guardando, setGuardando] = useState(false);

  /** Envía el cliente a la API; en caso de éxito vuelve al listado. */
  const guardar = async (datos) => {
    setGuardando(true);
    setErroresServidor({});
    setErrorGeneral(null);
    try {
      await crearCliente(datos);
      notificar("success", "Cliente registrado correctamente.");
      navigate("/clientes");
    } catch (error) {
      const { campos, general } = traducirErrorApi(error);
      setErroresServidor(campos);
      setErrorGeneral(general);
      setGuardando(false);
    }
  };

  return (
    <div className="col-lg-8 mx-auto">
      <h1 className="h3 titulo-pagina mb-3">Nuevo cliente</h1>
      {errorGeneral && <div className="alert alert-danger">{errorGeneral}</div>}
      <ClienteForm
        onGuardar={guardar}
        erroresServidor={erroresServidor}
        textoBoton="Registrar cliente"
        guardando={guardando}
      />
    </div>
  );
}

export default ClienteNuevoPage;
