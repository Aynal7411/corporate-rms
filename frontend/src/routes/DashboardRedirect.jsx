import { Navigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore.js';

export default function DashboardRedirect() {
  const user = useAuthStore((state) => state.user);

  if (!user) return <Navigate to="/login" replace />;
  if (user.role === 'candidate') return <Navigate to="/candidate" replace />;

  return <Navigate to="/admin" replace />;
}
