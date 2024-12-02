import { Home, Users } from "lucide-react";

export const sidebarData = {
  navMain: [
    { title: "Home", url: "/dashboard", icon: Home, isActive: true },
    {
      title: "Patient",
      url: "/dashboard/patient",
      icon: Users,
      isActive: false,
    },
  ],
};
