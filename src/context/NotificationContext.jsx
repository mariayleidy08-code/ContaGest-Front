// Contexto de notificaciones: permite mostrar un mensaje de éxito o error
// desde cualquier página sin pasar funciones por varios niveles de componentes.
import { createContext, useCallback, useContext, useState } from "react";

const NotificationContext = createContext(null);

export function NotificationProvider({ children }) {
  const [notificacion, setNotificacion] = useState(null);

  /** Muestra un mensaje. tipo: "success" | "danger" */
  const notificar = useCallback((tipo, mensaje) => {
    setNotificacion({ tipo, mensaje });
  }, []);

  const cerrarNotificacion = useCallback(() => setNotificacion(null), []);

  return (
    <NotificationContext.Provider
      value={{ notificacion, notificar, cerrarNotificacion }}
    >
      {children}
    </NotificationContext.Provider>
  );
}

/** Hook para usar el contexto de notificaciones. */
export function useNotification() {
  const contexto = useContext(NotificationContext);
  if (!contexto) {
    throw new Error("useNotification debe usarse dentro de NotificationProvider");
  }
  return contexto;
}
