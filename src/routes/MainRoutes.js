import { lazy } from 'react';

// project imports
import MainLayout from '../layout/MainLayout';
import Loadable from '../ui-component/Loadable';
import Profile from 'views/profile/Profile';
// import YearSelectionPage from 'views/dashboard/Default/yearSelection';
// import NotesComponent from 'views/dashboard/Default/Notehandle';

import ProtectedRoute from './ProtectedRoute';
//import YearSelectionPage from 'views/dashboard/Default/yearSelection';
import PassportPDFViewer from 'views/dashboard/Default/PDFViewer';

import Year from 'views/dashboard/Default/Year';
import Semester from 'views/dashboard/Default/Semester';
import Branch from 'views/dashboard/Default/Branch';
import Subject from 'views/dashboard/Default/Subjects';
import ChatBot from 'views/dashboard/Default/PrepParadoxBot';
import Data from 'views/dashboard/Default/PdfData';
import ResourceViewer from 'views/resources/ResourceViewer';

// dashboard routing
const DashboardDefault = Loadable(lazy(() => import('../views/dashboard/Default')));

// utilities routing
const UtilsTypography = Loadable(lazy(() => import('../views/utilities/Typography')));
const UtilsColor = Loadable(lazy(() => import('../views/utilities/Color')));
const UtilsShadow = Loadable(lazy(() => import('../views/utilities/Shadow')));
const UtilsMaterialIcons = Loadable(lazy(() => import('../views/utilities/MaterialIcons')));
const UtilsTablerIcons = Loadable(lazy(() => import('../views/utilities/TablerIcons')));

// sample page routing
const SamplePage = Loadable(lazy(() => import('views/sample-page')));

// ==============================|| MAIN ROUTING ||============================== //

const token = localStorage.getItem('token');
const isAuthorized = !!token;
const MainRoutes = {
  path: '/',
  element: <MainLayout />,
  children: [
    {
      path: '/',
      element: <DashboardDefault />
    },
    {
      path: 'profile',
      children: [
        {
          path: 'user-profile',
          element: (
            <ProtectedRoute isAuthorized={isAuthorized}>
              <Profile />
            </ProtectedRoute>
          )
        }
      ]
    },
    {
      path: 'dashboard',
      children: [
        {
          path: 'default',
          element: <DashboardDefault />
        }
      ]
    },
    {
      path: 'resources',
      children: [
        {
          path: 'view-resource',
          element: <ResourceViewer />
        }
      ]
    },
    {
      path: 'year',
      element: (
        <ProtectedRoute isAuthorized={isAuthorized}>
          <Year />
        </ProtectedRoute>
      )
    },
    {
      path: 'year/:year',
      element: (
        <ProtectedRoute isAuthorized={isAuthorized}>
          <Semester />
        </ProtectedRoute>
      )
    },
    {
      path: 'year/:year/semester/:semester',
      element: (
        <ProtectedRoute isAuthorized={isAuthorized}>
          {' '}
          <Branch />
        </ProtectedRoute>
      )
    },
    {
      path: 'year/:year/semester/:semester/branch/:branch',
      element: (
        <ProtectedRoute isAuthorized={isAuthorized}>
          <Subject />
        </ProtectedRoute>
      )
    },
    {
      path: 'year/:year/semester/:semester/branch/:branch/subject/:subject',
      element: (
        <ProtectedRoute isAuthorized={isAuthorized}>
          <Data />
        </ProtectedRoute>
      )
    },
    {
      path: 'pdf',
      element: (
        <ProtectedRoute isAuthorized={isAuthorized}>
          <PassportPDFViewer />
        </ProtectedRoute>
      )
    },
    {
      path: 'chatbot',
      element: (
        <ProtectedRoute isAuthorized={isAuthorized}>
          <ChatBot />
        </ProtectedRoute>
      )
    },
    {
      path: 'utils',
      children: [
        {
          path: 'util-typography',
          element: <UtilsTypography />
        }
      ]
    },
    {
      path: 'utils',
      children: [
        {
          path: 'util-color',
          element: <UtilsColor />
        }
      ]
    },

    {
      path: 'utils',
      children: [
        {
          path: 'util-shadow',
          element: <UtilsShadow />
        }
      ]
    },
    {
      path: 'icons',
      children: [
        {
          path: 'tabler-icons',
          element: <UtilsTablerIcons />
        }
      ]
    },
    {
      path: 'icons',
      children: [
        {
          path: 'material-icons',
          element: <UtilsMaterialIcons />
        }
      ]
    },
    {
      path: 'sample-page',
      element: <SamplePage />
    }
  ]
};

export default MainRoutes;
