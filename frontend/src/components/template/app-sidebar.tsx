import React from "react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "../ui/sidebar";
import SidebarNavMain from "../organisms/sidebar-nav-main";
import { sidebarData } from "@/constants/sidebar";
import { LogOut } from "lucide-react";
import { useAuth } from "@/hooks/use-auth";

const AppSidebar = ({ ...props }: React.ComponentProps<typeof Sidebar>) => {
  const auth = useAuth();
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>{/* <TeamSwitcher teams={data.teams} /> */}</SidebarHeader>
      <SidebarContent>
        <SidebarNavMain items={sidebarData.navMain} />
        {/* <NavProjects projects={data.projects} /> */}
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild tooltip={"Logout"} onClick={auth.logout}>
              <div className="text-red-500 hover:cursor-pointer hover:text-red-600">
                <LogOut />
                <span>Logout</span>
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
};

export default AppSidebar;
