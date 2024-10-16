import { createBrowserRouter, Navigate } from "react-router-dom";
import {
  AdminPage,
  Dashboard,
  Home,
  SignIn,
  SignUp,
  VerifyAccount,
} from "./pages";
import ErrorPage from "./error-page";
import NavbarWrapper from "./components/Navbar";
import { useAuthStore } from "./store/authStore";

// protect routes that require authentication
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, user } = useAuthStore();

  if (!isAuthenticated) {
    return <Navigate to="/sign-in" replace />;
  }

  if (!user.isVerified) {
    return <Navigate to="/verify" replace />;
  }

  return children;
};

// redirect authenticated users to the home page
const RedirectAuthenticatedUser = ({ children }) => {
  const { isAuthenticated, user } = useAuthStore();

  if (isAuthenticated && user.isVerified) {
    return <Navigate to="/" replace />;
  }

  return children;
};

// Redirect unauthorized users from accessing the admin route
const RedirectUnautorized = ({ children }) => {
  const { isAuthenticated, user } = useAuthStore();
  if (!isAuthenticated) {
    return <Navigate to="/sign-in" replace />;
  }
  if (!user.isVerified) {
    return <Navigate to="/verify" replace />;
  }

  if (user.role !== "admin") {
    return <Navigate to={"/"} />;
  }
  return children;
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <NavbarWrapper />,
    children: [
      {
        path: "/",
        element: <Home />,
        errorElement: <ErrorPage />,
      },

      {
        path: "/dashboard",
        element: (
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        ),
      },
    ],
  },
  {
    path: "/sign-up",
    element: (
      <RedirectAuthenticatedUser>
        <SignUp />
      </RedirectAuthenticatedUser>
    ),
  },
  {
    path: "/sign-in",
    element: (
      <RedirectAuthenticatedUser>
        <SignIn />
      </RedirectAuthenticatedUser>
    ),
  },
  {
    path: "/verify",
    element: <VerifyAccount />,
  },
  {
    path: "/admin",
    element: (
      <RedirectUnautorized>
        <AdminPage />
      </RedirectUnautorized>
    ),
  },
]);

export default router;
