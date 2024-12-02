import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AuthPage from "./components/pages/auth";
import ProtectedDashboard from "./components/atom/protected-dashboard";
import Dashboard from "./components/pages/dashboard";
import PatientDashboard from "./components/pages/patient-dashboard";
import DiagnosesDashboard from "./components/pages/diagnoses-dashboard";
import AppointmentDashboard from "./components/pages/appointment-dashboard";
import UnauthorizedPage from "./components/pages/unauthorized-page";
import CreateEditPatient from "./components/pages/create-edit-patient";
import { Toaster } from "sonner";
import { AuthProvider } from "./providers/AuthProvider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import NotFoundPage from "./components/pages/not-found-page";

const router = createBrowserRouter([
  {
    path: "/",
    element: <AuthPage />,
  },
  {
    path: "/dashboard",
    element: <ProtectedDashboard />,
    children: [
      {
        index: true,
        element: <Dashboard />,
      },
      {
        path: "patient",
        children: [
          {
            index: true,
            element: <PatientDashboard />,
          },
          {
            path: "edit/:id",
            element: <CreateEditPatient />,
          },
          {
            path: "add",
            element: <CreateEditPatient />,
          },
        ],
      },
      {
        path: "diagnoses",
        element: <DiagnosesDashboard />,
      },
      {
        path: "appointments",
        element: <AppointmentDashboard />,
      },
    ],
  },
  {
    path: "/unauthorized",
    element: <UnauthorizedPage />,
  },
  {
    path: "*",
    element: <NotFoundPage />,
  },
]);

function App() {
  const queryClient = new QueryClient();

  return (
    <>
      <AuthProvider>
        <QueryClientProvider client={queryClient}>
          <RouterProvider router={router} />
        </QueryClientProvider>
      </AuthProvider>
      <Toaster richColors position="bottom-center" />
    </>
  );
}

export default App;
