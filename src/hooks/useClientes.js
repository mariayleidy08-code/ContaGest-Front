// Hook personalizado: carga la lista de clientes y maneja los estados
// de carga y error, para que las páginas no repitan esta lógica.
import { useCallback, useEffect, useState } from "react";
import { listarClientes } from "../services/clienteService.js";

export function useClientes() {
  const [clientes, setClientes] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  /** Consulta la API y actualiza el estado. Se puede llamar para recargar. */
  const recargar = useCallback(async () => {
    setCargando(true);
    setError(null);
    try {
      setClientes(await listarClientes());
    } catch {
      setError("No se pudo cargar la lista de clientes. Verifique que el servidor esté en ejecución.");
    } finally {
      setCargando(false);
    }
  }, []);

  // Carga inicial al mostrar la pantalla
  useEffect(() => {
    recargar();
  }, [recargar]);

  return { clientes, cargando, error, recargar };
}
