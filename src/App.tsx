import Footer from './components/Footer';
import Navbar from './components/Navbar';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import ProductDetails from './pages/ProductDetails';
import Login from './pages/Login';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import { SnackbarProvider } from 'notistack';
import { useSelector } from 'react-redux';
import { PropsWithChildren } from 'react';
import { RootState } from './third-party/redux/store';

const PrivateRoute = ({ children }: PropsWithChildren) => {
  const { token } = useSelector((state: RootState) => state.auth);
  return token ? children : <Navigate to="/login" />;
};

function App() {
  return (
    <>
      <Router>
        <SnackbarProvider>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/products/:id" element={<ProductDetails />} />
            <Route path="/login" element={<Login />} />
            <Route
              path="/cart"
              element={
                <PrivateRoute>
                  <Cart />
                </PrivateRoute>
              }
            />
            <Route
              path="/checkout"
              element={
                <PrivateRoute>
                  <Checkout />
                </PrivateRoute>
              }
            />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </SnackbarProvider>
      </Router>
      <Footer />
    </>
  );
}

export default App;
