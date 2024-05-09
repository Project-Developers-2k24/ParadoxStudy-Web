import { lazy } from 'react';

// project imports
import MainLayout from '../layout/MainLayout';
import Loadable from '../ui-component/Loadable';
<<<<<<< HEAD
import Profile from 'views/profile/Profile';
import YearSelectionPage from 'views/dashboard/Default/yearSelection';
import NotesComponent from 'views/dashboard/Default/Notehandle';
import PDFViewer from 'views/dashboard/Default/PDFViewer';
import ProtectedRoute from './ProtectedRoute';
=======
//import YearSelectionPage from 'views/dashboard/Default/yearSelection';
import PassportPDFViewer from 'views/dashboard/Default/PDFViewer';

import Year from 'views/dashboard/Default/Year';
import Semester from 'views/dashboard/Default/Semester';
import Branch from 'views/dashboard/Default/Branch';
import Subject from 'views/dashboard/Default/Subjects';
import ChatBot from 'views/dashboard/Default/PrepParadoxBot';
import Data from 'views/dashboard/Default/PdfData';

>>>>>>> 16c068ae1a1895058ea1a0a2f0a80fe6a067b786

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
<<<<<<< HEAD
      path: 'year-selection',
      element: <YearSelectionPage />
=======
      path:'year',
      element:<Year/>
    },  
    {
      path:'year/:year',
      element:<Semester/>
>>>>>>> 16c068ae1a1895058ea1a0a2f0a80fe6a067b786
    },
    {
      path:'year/:year/semester/:semester',
      element:<Branch/>
    },
    {
<<<<<<< HEAD
=======
      path:'year/:year/semester/:semester/branch/:branch',
      element:<Subject/>
    },
    {
      path:'year/:year/semester/:semester/branch/:branch/subject/:subject',
      element:<Data/>
    },
    {
      path:'pdf',
      element:<PassportPDFViewer/>
    },   
    {
      path:'chatbot',
      element:<ChatBot/>
    },
    {
>>>>>>> 16c068ae1a1895058ea1a0a2f0a80fe6a067b786
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
