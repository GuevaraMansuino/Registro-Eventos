import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthProvider';
import type { UserRole } from '../context/AuthContext';

interface PrivateRouteProps {
  children: React.ReactNode;
  rol?: UserRole;
}

export default function PrivateRoute({ children, rol }: PrivateRouteProps) {
  const { isRestoring, isAuthenticated, user } = useAuth();

  if (isRestoring) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500 text-lg">Cargando...</p>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (rol && user?.rol !== rol) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
}
