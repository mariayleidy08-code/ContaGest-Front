// Componente raíz: define el diseño general y las rutas de la aplicación.
import { Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";
import AlertMessage from "./components/AlertMessage.jsx";
import ClientesPage from "./pages/ClientesPage.jsx";
import ClienteNuevoPage from "./pages/ClienteNuevoPage.jsx";
import ClienteEditarPage from "./pages/ClienteEditarPage.jsx";
import ClienteDetallePage from "./pages/ClienteDetallePage.jsx";
import NotFoundPage from "./pages/NotFoundPage.jsx";
import { useNotification } from "./context/NotificationContext.jsx";

function App() {
  // Mensaje global de éxito o error (por ejemplo "Cliente registrado")
  const { notificacion, cerrarNotificacion } = useNotification();

  return (
    <div className="d-flex flex-column min-vh-100">
      <Navbar />

      <main className="container py-4 flex-grow-1">
        {notificacion && (
          <AlertMessage
            tipo={notificacion.tipo}
            mensaje={notificacion.mensaje}
            onCerrar={cerrarNotificacion}
          />
        )}

        <Routes>
          <Route path="/" element={<Navigate to="/clientes" replace />} />
          <Route path="/clientes" element={<ClientesPage />} />
          <Route path="/clientes/nuevo" element={<ClienteNuevoPage />} />
          <Route path="/clientes/:id" element={<ClienteDetallePage />} />
          <Route path="/clientes/:id/editar" element={<ClienteEditarPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>

      <Footer />
    </div>
  );
}

export default App;
