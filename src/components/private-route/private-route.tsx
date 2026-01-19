import { Navigate } from 'react-router-dom';

interface PrivateRouteProps {
  children: JSX.Element;
}

function PrivateRoute({ children }: PrivateRouteProps): JSX.Element {
  const isAuth = false;

  return isAuth ? children : <Navigate to="/login" />;
}

export default PrivateRoute;
