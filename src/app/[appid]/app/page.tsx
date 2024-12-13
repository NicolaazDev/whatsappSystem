"use client";

import { useState } from "react";

import { AppSidebar } from "@/components/sidebar";
import { SidebarInset } from "@/components/ui/sidebar";

import { motion } from "framer-motion";
import Admins from "@/components/menus/admins";
import Dashboard from "@/components/menus/dashboard";
import Supers from "@/components/menus/super";
import Equipes from "@/components/menus/equipes";
import Agents from "@/components/menus/agentes";
import EquipesSub from "@/components/menus/equipesSub";
import AgentsSub from "@/components/menus/agentesSub";

export default function AdminPage({ params }: { params: { appid: string } }) {
  const { appid } = params;

  const [activeMenu, setActiveMenu] = useState<string>("dashboard");

  const renderContent = () => {
    switch (activeMenu) {
      case "dashboard":
        return <Dashboard appid={appid} />;
      case "admin":
        return <Admins appid={appid} />;
      case "supervisor":
        return <Supers appid={appid} />;
      case "agente":
        return <Agents appid={appid} />;
      case "equipes":
        return <Equipes appid={appid} />;
      case "equipesSub":
        return <EquipesSub appid={appid} />;
      case "agenteSub":
        return <AgentsSub appid={appid} />;

      default:
        return (
          <div className="w-full h-screen center bg-red-500">
            Página não encontrada
          </div>
        );
    }
  };

  return (
    <main className="center w-full min-h-screen bg-background">
      <AppSidebar onMenuChange={setActiveMenu} />
      <SidebarInset>
        <motion.div
          key={activeMenu}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          {renderContent()}
        </motion.div>
      </SidebarInset>
    </main>
  );
}
