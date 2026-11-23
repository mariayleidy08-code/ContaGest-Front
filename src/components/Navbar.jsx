// Barra de navegación superior con el nombre del software y los enlaces principales.
import { NavLink, Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="navbar navbar-expand navbar-dark navbar-contagest">
      <div className="container">
        <Link className="navbar-brand fw-bold" to="/clientes">
          ContaGest
        </Link>
        <ul className="navbar-nav ms-auto">
          <li className="nav-item">
            <NavLink className="nav-link" to="/clientes" end>
              Clientes
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="/clientes/nuevo">
              Nuevo cliente
            </NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
