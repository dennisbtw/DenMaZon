import { createBrowserRouter } from 'react-router-dom';
import LoginFormPage from '../components/LoginFormPage';
import SignupFormPage from '../components/SignupFormPage';
import Layout from './Layout';
import HomePage from '../components/HomePage/HomePage';
import ProductDetail from '../components/ProductDetail/ProductDetail';
import CreateProduct from '../components/CreateProduct/CreateProduct';
export const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "login",
        element: <LoginFormPage />,
      },
      {
        path: "signup",
        element: <SignupFormPage />,
      },
      {
        path: "products/:productId",
        element: <ProductDetail />
      },
      {
        path: "new-product",
        element: <CreateProduct />
      }
    ],
  },
]);