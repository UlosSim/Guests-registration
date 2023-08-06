import PageTemplate from './layouts/page-template/PageTemplate';
import Register from './pages/register-page/Register';
import { createBrowserRouter } from 'react-router-dom';
import Login from './pages/login-page/Login';
import Guests from './pages/guests-page/Guests';
import RegisterUser from './pages/register-user/RegisterUser';
import FrontPage from './pages/front-page/FrontPage';

export const routes = createBrowserRouter([
  {
    path: '/',
    element: <PageTemplate />,
    children: [
      {
        path: '/',
        element: <FrontPage />,
      },
      {
        path: '/register',
        element: <Register />,
      },
      {
        path: '/login',
        element: <Login />,
      },
      {
        path: '/guests',
        element: <Guests />,
      },
      {
        path: '/register-user',
        element: <RegisterUser />,
      },
      {
        path: '/guests/:id',
        element: <Guests />,
      },
    ],
  },
]);
