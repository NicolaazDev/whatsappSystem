"use client";

import { loadFromLocalStorage } from "@/services/storage";
import {
  BoltIcon,
  MessageCircleIcon,
  ShieldBan,
  SquareUser,
  User,
} from "lucide-react";

import { useEffect, useState } from "react";

export default function HomePage({ params }: { params: { appid: string } }) {
  const { appid } = params;

  const [userPerm, setUserPerm] = useState<any>(null);

  const getPerm = async () => {
    const perm = await loadFromLocalStorage("cargo");

    if (perm === "admin" || perm === "sub") {
      return true;
    } else {
      return false;
    }
  };

  useEffect(() => {
    (async () => {
      const perm = await getPerm();
      setUserPerm(perm);

      console.log(perm);
    })();
  }, []);

  return (
    <main className="flex flex-col items-center justify-center py-10 min-h-screen bg-background">
      <h1 className="text-5xl font-poppinsBold mb-4">Bem-vindo ao Sistema</h1>
      <p className="text-xl font-poppinsLight mb-8">
        Escolha como deseja logar para continuar
      </p>
      <div className="grid grid-cols-2 gap-8 pb-10">
        {userPerm && (
          <a
            href={`${appid}/admin`}
            className="bg-white col-span-2 cursor-pointer hover:shadow-md transition-all hover:border-green-400 rounded-lg shadow-sm border border-gray-200 border-solid p-14 flex flex-col items-center"
          >
            <BoltIcon size={70} strokeWidth={1} />
            <h2 className="text-2xl font-poppinsSemiBold mt-5">Admin</h2>
            <p className="text-center mt-2">Acesse o painel de admin</p>
          </a>
        )}
        <a
          href={`${appid}/agents-chat`}
          className="bg-white cursor-pointer hover:shadow-md transition-all hover:border-green-400 rounded-lg shadow-sm border border-gray-200 border-solid p-14 flex flex-col items-center"
        >
          <MessageCircleIcon size={70} strokeWidth={1} />
          <h2 className="text-2xl font-poppinsSemiBold mt-5">Conversas</h2>
          <p className="text-center mt-2">Acesse as conversas com os agentes</p>
        </a>

        {[
          {
            role: "Admin",
            href: "/login-admin",
            description: "Acesse como administrador",
            icon: <ShieldBan size={100} strokeWidth={1} />,
          },
          {
            role: "Supervisão",
            href: "/login-super",
            description: "Acesse como supervisão",
            icon: <SquareUser size={100} strokeWidth={1} />,
          },
          {
            role: "Agente",
            href: "/login-agent",
            description: "Acesse como agente",
            icon: <User size={100} strokeWidth={1} />,
          },
        ].map((card, index) => (
          <a
            href={`${appid}${card.href}`}
            key={index}
            className="bg-white cursor-pointer hover:shadow-md transition-all hover:border-green-400 rounded-lg shadow-sm border border-gray-200 border-solid p-14 flex flex-col items-center"
          >
            {card.icon}
            <h2 className="text-2xl font-poppinsSemiBold mt-5">{card.role}</h2>
            <p className="text-center mt-2">{card.description}</p>
          </a>
        ))}
      </div>
    </main>
  );
}
