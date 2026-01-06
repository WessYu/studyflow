import { Navigate } from 'react-router-dom'
import { auth } from '../features/auth/auth'

export function ProtectedRoute({ children }: { children: JSX.Element }) {
  const user = auth.get()
  if (!user) return <Navigate to="/login" replace />
  return children
}
