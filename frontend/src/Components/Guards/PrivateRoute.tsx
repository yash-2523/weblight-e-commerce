import React from 'react';
import { Route, Navigate, Outlet} from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/configureStore';
interface PrivateRouteProps {
    Component: React.FC;
}


const PrivateRoute = ({Component}: PrivateRouteProps) => {
    const isAuthenticated = useSelector((state: RootState) => state.user.user !== null);
  
    return isAuthenticated ? <Component /> : <Navigate to="/login" />;
  };
  
  export default PrivateRoute;