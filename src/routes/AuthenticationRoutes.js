import { lazy } from 'react';

// project imports
import Loadable from 'ui-component/Loadable';
import MinimalLayout from 'layout/MinimalLayout';

// login option 3 routing
const AuthLogin3 = Loadable(lazy(() => import('views/pages/authentication/authentication3/Login3')));
const AuthRegister3 = Loadable(lazy(() => import('views/pages/authentication/authentication3/Register3')));

import ForgotPassword from 'views/pages/authentication/authentication3/ForgotPassword';
import ResetPassword from 'views/pages/authentication/authentication3/ResetPassword';
import Verified from 'views/pages/authentication/Verified';
import UnauthorizedRoute from './UnAuthorizedRoutes';

// ==============================|| AUTHENTICATION ROUTING ||============================== //
const token = localStorage.getItem('token');
const isAuthorized = !!token;
const AuthenticationRoutes = {
  path: '/',
  element: (
    <UnauthorizedRoute isAuthorized={isAuthorized}>
      <MinimalLayout />
    </UnauthorizedRoute>
  ),
  children: [
    {
      path: '/pages/login/login3',
      element: (
        <UnauthorizedRoute isAuthorized={isAuthorized}>
          <AuthLogin3 />
        </UnauthorizedRoute>
      )
    },
    {
      path: '/pages/register/register3',
      element: (
        <UnauthorizedRoute isAuthorized={isAuthorized}>
          <AuthRegister3 />
        </UnauthorizedRoute>
      )
    },
    {
      path: '/pages/register/ForgotPassword',
      element: <ForgotPassword />
    },
    {
      path: '/pages/resetpassword/:id/:token',
      element: <ResetPassword />
    },
    {
      path: '/pages/register/verified/:id',
      element: <Verified />
    }
  ]
};

export default AuthenticationRoutes;
