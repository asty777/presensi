import { createBrowserRouter } from "react-router-dom";
import { commonPage, privatePage } from "../pages";
import ProtectedRoute from './ProtectedRoute';
import UnauthorizedPage from "../pages/UnauthorizedPage";
import RequireAuth from "./utils/requireAuth";
import { isAuthenticated } from "./utils/auth";

const router = createBrowserRouter([
  {
    path: "/",
    element: commonPage.landingpage,
  },
  {
    path: "/Login",
    element: commonPage.loginPage,
  },
 
  {
    path: "/Register",
    element: commonPage.registerPage,
  },

  {
    path: "/ForgotPassword",
    element: commonPage.forgotpassword,
  },

  {
    path: "/",
    element: <RequireAuth redirectPath="/Login" />,
    children: [

      {
        path: "/Dashboard",
        element: (
          <ProtectedRoute allowedRoles={['Admin Company', 'Super Admin']}>
            {privatePage.dashboard}
          </ProtectedRoute>
        ),
      },
      {
        path: "/User",
        element: (
          <ProtectedRoute allowedRoles={['Admin Company']}>
            {privatePage.userPage}
          </ProtectedRoute>
        ),
      },
      {
        path: "/AddUser",
        element: (
          <ProtectedRoute allowedRoles={['Admin Company']}>
            {privatePage.addUserPage}
          </ProtectedRoute>
        ),
      },
      {
        path: "/Unit",
        element: (
          <ProtectedRoute allowedRoles={['Admin Company']}>
            {privatePage.unitPage}
          </ProtectedRoute>
        ),
      },
      {
        path: "/AddUnit",
        element: (
          <ProtectedRoute allowedRoles={['Admin Company']}>
            {privatePage.addUnitPage}
          </ProtectedRoute>
        ),
      },
      {
        path: "/DetailPresence/:guid_user",
        element: (
          <ProtectedRoute allowedRoles={['Admin Company']}>
            {privatePage.detailpresence}
          </ProtectedRoute>
        ),
      },

      {
        path: "/DetailUnit/:guid_unit",
        element: (
          <ProtectedRoute allowedRoles={['Admin Company']}>
            {privatePage.detailunit}
          </ProtectedRoute>
        ),
      },

      {
        path: "/Profile",
        element: (
          <ProtectedRoute allowedRoles={['Admin Company']}>
            {privatePage.profilecompany}
          </ProtectedRoute>
        ),
      },
      {
        path: "/UpdateProfile/:id",
        element: (
          <ProtectedRoute allowedRoles={['Admin Company']}>
            {privatePage.UpdateProfile}
          </ProtectedRoute>
        ),
      },
      {
        path: "/ReadCompany",
        element: (
          <ProtectedRoute allowedRoles={['Super Admin']}>
            {privatePage.readcompany}
          </ProtectedRoute>
        ),
      },
      {
        path: "/CreateCompany",
        element: (
          <ProtectedRoute allowedRoles={['Super Admin']}>
            {privatePage.createcompany}
          </ProtectedRoute>
        ),
      },
      {
        path: "/UpdateCompany/:id",
        element: (
          <ProtectedRoute allowedRoles={['Super Admin']}>
            {privatePage.updatecompany}
          </ProtectedRoute>
        ),
      },
    
      {
        path: "/DetailCompany/:id",
        element: (
          <ProtectedRoute allowedRoles={['Super Admin']}>
            {privatePage.detailcompany}
          </ProtectedRoute>
        ),
      },
      // Add the Unauthorized route
      {
        path: "/unauthorized",
        element: <UnauthorizedPage />,
      },
  ]}

]);

export default router;

