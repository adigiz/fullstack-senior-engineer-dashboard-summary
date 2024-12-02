import React from "react";
import { type LucideIcon } from "lucide-react";

import {
  SidebarGroup,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Link } from "react-router-dom";

type TItems = {
  title: string;
  url: string;
  icon?: LucideIcon;
  isActive?: boolean;
};

type TSidebarNavMainProps = {
  items: TItems[];
};
const SidebarNavMain: React.FC<TSidebarNavMainProps> = ({ items }) => {
  return (
    <SidebarGroup>
      <SidebarMenu>
        {items.map((item, idx) => (
          <SidebarMenuItem key={`${item.title}-${idx}`}>
            <SidebarMenuButton asChild tooltip={item.title}>
              <Link to={item.url}>
                {item.icon && <item.icon />}
                <span>{item.title}</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  );
};

export default SidebarNavMain;
