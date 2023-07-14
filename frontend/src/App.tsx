// App.tsx
import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fetchUser } from './store/actions/userActions';

import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';

import GlobalLoader from './Components/Common/GlobalLoader';
import PrivateRoute from './Components/Guards/PrivateRoute';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import { fetchCartItems } from './store/actions/cartItemsActions';
import ProductPage from './pages/ProductPage';
import CartPage from './pages/CartPage';
import OrdersPage from './pages/OrdersPage';
// import { setAuthToken } from './utils/api';

// import { AdminRoute } from './components/AdminRoute';



// import ProductDetailPage from './pages/ProductDetailPage';

// import AdminCategoriesPage from './pages/AdminCategoriesPage';
// import AdminProductsPage from './pages/AdminProductsPage';

const queryClient = new QueryClient();

const App: React.FC = () => {

  const user = useSelector((state: any) => state.user.user);
  const loading = useSelector((state: any) => state.loading.loading);
  const dispatch = useDispatch<any>();

  useEffect(() => {
    dispatch(fetchUser());
  }, [])

  useEffect(() => {
    if(user!==null && user!=="loading"){
      dispatch(fetchCartItems())
    }
  }, [user])
  return (
   <>
      {(user==="loading" || loading!==0) && <GlobalLoader />}                          
      {(user!=="loading") && <QueryClientProvider client={queryClient}>
        <Router>
          <Routes>
            <Route path="/login" Component={LoginPage} />
            <Route path="/register" Component={RegisterPage} />
            <Route path="/product" element={<PrivateRoute Component={ProductPage} />} >
            </Route>
            <Route path="/" element={<Navigate to={"/product"} />}  />
            
            <Route path="/cart" element={<PrivateRoute Component={CartPage} />} />
            <Route path="/orders" element={<PrivateRoute Component={OrdersPage} />} />
            {/* <AdminRoute path="/admin/categories" component={AdminCategoriesPage} />
            <AdminRoute path="/admin/products" component={AdminProductsPage} /> */}
          </Routes>
        </Router>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>}
    </>
  );
};

export default App;
