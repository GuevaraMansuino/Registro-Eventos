import { useState } from "react";
import { Link, NavLink, Route, Routes, useNavigate } from "react-router-dom";
import { useAuth } from "./context/AuthProvider";
import PrivateRoute from "./routes/PrivateRoute";
import Home from "./pages/Home";
import FormularioPage from "./pages/FormularioPage";
import EditarPage from "./pages/EditarPage";
import LoginPage from "./pages/LoginPage";
import PublicaPage from "./pages/PublicaPage";
import CursosPage from "./pages/CursosPage";
import PagoSuccess from "./pages/PagoSuccess";
import PagoPending from "./pages/PagoPending";
import PagoFailure from "./pages/PagoFailure";

function App() {
  const { isAuthenticated, user, logout } = useAuth();
  const [menuAbierto, setMenuAbierto] = useState(false);
  const navigate = useNavigate();

  const cerrarMenu = () => setMenuAbierto(false);

  const handleLogout = () => {
    logout();
    cerrarMenu();
    navigate("/", { replace: true });
  };

  const linkClass = ({ isActive }: { isActive: boolean }) =>
    `px-4 py-2 rounded-lg font-semibold transition-all ${
      isActive
        ? "bg-blue-600 text-white shadow"
        : "text-gray-700 hover:bg-blue-50 hover:text-blue-700"
    }`;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      <header className="bg-white/90 shadow border-b border-gray-100 sticky top-0 z-10">
        <nav className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between gap-4">
            <Link
              to="/"
              onClick={cerrarMenu}
              className="text-2xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent"
            >
              Registro de Participantes
            </Link>

            <button
              type="button"
              onClick={() => setMenuAbierto(!menuAbierto)}
              className="md:hidden bg-blue-600 text-white px-3 py-2 rounded-lg font-semibold shadow"
              aria-label="Abrir menú"
              aria-expanded={menuAbierto}
            >
              ☰
            </button>

            <div className="hidden md:flex items-center gap-2">
              <NavLink to="/" className={linkClass}>
                Participantes
              </NavLink>
              <NavLink to="/cursos" className={linkClass}>
                Cursos
              </NavLink>
              {user?.rol === "ADMIN" && (
                <NavLink to="/nuevo" className={linkClass}>
                  Nuevo participante
                </NavLink>
              )}
              {isAuthenticated && (
                <button
                  onClick={handleLogout}
                  className="px-4 py-2 rounded-lg font-semibold transition-all text-red-600 hover:bg-red-50 hover:text-red-700"
                >
                  Cerrar Sesión
                </button>
              )}
            </div>
          </div>

          {menuAbierto ? (
            <div className="md:hidden grid gap-2 mt-4">
              <NavLink to="/" onClick={cerrarMenu} className={linkClass}>
                Participantes
              </NavLink>
              <NavLink to="/cursos" onClick={cerrarMenu} className={linkClass}>
                Cursos
              </NavLink>
              {user?.rol === "ADMIN" && (
                <NavLink to="/nuevo" onClick={cerrarMenu} className={linkClass}>
                  Nuevo participante
                </NavLink>
              )}
              {isAuthenticated && (
                <button
                  onClick={handleLogout}
                  className="text-left px-4 py-2 rounded-lg font-semibold transition-all text-red-600 hover:bg-red-50 hover:text-red-700"
                >
                  Cerrar Sesión
                </button>
              )}
            </div>
          ) : null}
        </nav>
      </header>

      <div className="max-w-6xl mx-auto p-6">
        <Routes>
          <Route
            path="/"
            element={
              <PrivateRoute>
                <Home />
              </PrivateRoute>
            }
          />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/publica" element={<PublicaPage />} />
          <Route
            path="/nuevo"
            element={
              <PrivateRoute rol="ADMIN">
                <FormularioPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/editar/:id"
            element={
              <PrivateRoute rol="ADMIN">
                <EditarPage />
              </PrivateRoute>
            }
          />
          <Route path="/cursos" element={<CursosPage />} />
          <Route path="/pago/success" element={<PagoSuccess />} />
          <Route path="/pago/pending" element={<PagoPending />} />
          <Route path="/pago/failure" element={<PagoFailure />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
