import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { SidebarInset, SidebarProvider } from "../ui/sidebar";
import AppSidebar from "../template/app-sidebar";
import { useAuth } from "@/hooks/use-auth";

const ProtectedDashboard = () => {
  const auth = useAuth();
  return auth.isLoggedIn ? (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <main className="relative p-4">
          <Outlet />
        </main>
      </SidebarInset>
    </SidebarProvider>
  ) : (
    <Navigate to="/" replace />
  );
};

export default ProtectedDashboard;
