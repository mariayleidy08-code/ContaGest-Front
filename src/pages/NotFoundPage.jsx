// Pantalla para rutas inexistentes o clientes que no se encuentran (404).
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

function NotFoundPage({ mensaje = "La página que busca no existe." }) {
  return (
    <div className="text-center py-5">
      <h1 className="display-4 titulo-pagina">404</h1>
      <p className="lead">{mensaje}</p>
      <Link to="/clientes" className="btn btn-contagest">Volver al listado</Link>
    </div>
  );
}

NotFoundPage.propTypes = { mensaje: PropTypes.string };

export default NotFoundPage;
