import { Navigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';

export function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const user = supabase.auth.getUser();

  if (!user) {
    return <Navigate to="/" replace />;
  }

  return children;
}