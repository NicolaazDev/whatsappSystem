"use client";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

import { NavUser } from "@/components/navUser";

import { loadFromLocalStorage } from "@/services/storage";

import {
  User,
  SquareUser,
  Users,
  Bolt,
  LayoutDashboard,
  MessageCircle,
  UsersRound,
  QrCode,
} from "lucide-react";

import { useEffect, useState } from "react";

type MenuItem = {
  title: string;
  url: string;
  icon: React.ComponentType<{ className?: string }>;
};

export function AppSidebar({
  onMenuChange,
}: {
  onMenuChange: (menu: string) => void;
}) {
  const [menuItems, setMenuItems] = useState<MenuItem[] | null>(null);

  const [user, setUser] = useState<any>(null);

  const determineMenu = (cargo: string | null): MenuItem[] => {
    switch (cargo) {
      case "admin":
        return [
          { title: "Dashboard", url: "dashboard", icon: LayoutDashboard },
          { title: "Admins", url: "admin", icon: User },
          { title: "Equipes", url: "equipes", icon: UsersRound },
          { title: "Supervisores", url: "supervisor", icon: SquareUser },
          { title: "Agentes", url: "agente", icon: Users },
        ];
      case "sub":
        return [
          // { title: "Dashboard", url: "dashboard", icon: LayoutDashboard },
          { title: "Equipes", url: "equipesSub", icon: UsersRound },
          { title: "Agentes", url: "agenteSub", icon: Users },
        ];

      default:
        return [];
    }
  };

  useEffect(() => {
    const cargo = loadFromLocalStorage("cargo");
    const userInfo = loadFromLocalStorage("user");

    setUser(userInfo);
    setMenuItems(determineMenu(cargo));
  }, []);

  return (
    <Sidebar className="!bg-transparent">
      <SidebarHeader>
        <div className="center space-x-4  w-full">
          <img
            src="https://res.cloudinary.com/do9d7j6b3/image/upload/v1733814269/WhatsSystem_4_weu7o4.png"
            className="h-[90px] w-[90px] object-contain opacity-80"
          />
        </div>
      </SidebarHeader>
      {menuItems && (
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel>Menu</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {menuItems.map((item: any) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      asChild
                      onClick={() => onMenuChange(item.url)}
                      className="!py-6 !transition-all !duration-300"
                    >
                      <button>
                        <item.icon
                          size={30}
                          strokeWidth={1}
                          className="min-h-[22px] min-w-[22px]"
                        />
                        <span className="text-[16px]">{item.title}</span>
                      </button>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
      )}
      <SidebarFooter>{user && <NavUser user={user} />}</SidebarFooter>
    </Sidebar>
  );
}
