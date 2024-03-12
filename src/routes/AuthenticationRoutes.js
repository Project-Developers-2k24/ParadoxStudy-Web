import { lazy } from 'react';

// project imports
import Loadable from 'ui-component/Loadable';
import MinimalLayout from 'layout/MinimalLayout';

// login option 3 routing
const AuthLogin3 = Loadable(lazy(() => import('views/pages/authentication/authentication3/Login3')));
const AuthRegister3 = Loadable(lazy(() => import('views/pages/authentication/authentication3/Register3')));

import ForgotPassword from 'views/pages/authentication/authentication3/ForgotPassword';
import ResetPassword from 'views/pages/authentication/authentication3/ResetPassword';

// ==============================|| AUTHENTICATION ROUTING ||============================== //

const AuthenticationRoutes = {
  path: '/',
  element: <MinimalLayout />,
  children: [
    {
      path: '/pages/login/login3',
      element: <AuthLogin3 />
    },
    {
      path: '/pages/register/register3',
      element: <AuthRegister3 />
    },
    {
      path: '/pages/register/ForgotPassword',
      element: <ForgotPassword />
    },
    {
      path: '/pages/register/resetpassword',
      element: <ResetPassword />
    }
  ]
};

export default AuthenticationRoutes;
