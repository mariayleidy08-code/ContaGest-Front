// Caja de búsqueda. Es un componente "controlado": el texto vive en la página.
import PropTypes from "prop-types";

function SearchBar({ valor, onCambio }) {
  return (
    <input
      type="search"
      className="form-control"
      placeholder="Buscar por razón social o NIT..."
      value={valor}
      onChange={(evento) => onCambio(evento.target.value)}
      aria-label="Buscar clientes"
    />
  );
}

SearchBar.propTypes = {
  valor: PropTypes.string.isRequired,
  onCambio: PropTypes.func.isRequired,
};

export default SearchBar;
