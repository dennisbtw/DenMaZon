import { createBrowserRouter } from 'react-router-dom';
import LoginFormPage from '../components/LoginFormPage';
import SignupFormPage from '../components/SignupFormPage';
import Layout from './Layout';
import HomePage from '../components/HomePage/HomePage';
import ProductDetail from '../components/ProductDetail/ProductDetail';
import CreateProduct from '../components/CreateProduct/CreateProduct';
import UpdateProduct from '../components/UpdateProduct/UpdateProduct';
import ManageProducts from '../components/ManageProducts/ManageProducts';
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
      },
      {
        path: "products/:productId/edit",
        element: <UpdateProduct/>
      }, 
      {
        path: '/products/current',
        element: <ManageProducts />
      },
      {
        path: '*',
        element: <h2>Page Not Found</h2>
      }
    ],
  },
]);