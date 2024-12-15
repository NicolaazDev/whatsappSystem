import { useEffect, useState } from "react";

import { differenceInDays } from "date-fns";

import api from "@/services/api";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Badge } from "@medusajs/ui";
import { UsersAreaChart } from "../charts/pieChart";

type AppData = {
  _id: string;
  username: string;
  password: string;
  plan: string;
  email: string;
  limitAgents: number;
  admins: Array<{
    _id: string;
    username: string;
    desativated: boolean;
    password: string;
  }>;
  equipes: Array<{
    _id: string;
    name: string;
    description: string;
    sub: string;
    agents: Array<string>;
  }>;
  agents: Array<{
    _id: string;
    username: string;
    desativated: boolean;
    password: string;
    email: string;
    urlConnection: string;
    qrCode: string;
    phoneNumbers: Array<string>;
    connectedAt: string;
    messages: Array<any>;
  }>;
  subs: Array<{
    _id: string;
    username: string;
    desativated: boolean;
    password: string;
  }>;
  document: string;
  enterprise: string;
  phoneNumber: string;
  planningType: string;
  status: string;
  contract_at: string;
  expires_in: string;
  __v: number;
};

export default function Dashboard({ appid }: { appid: string }) {
  const [app, setApp] = useState<AppData | null>(null);

  const getApp = async () => {
    try {
      const res = await api.get(`application/${appid}`);

      console.log(res.data);
      setApp(res.data);
    } catch (error) {
      console.error("Failed to fetch app data:", error);
    }
  };

  useEffect(() => {
    getApp();
  }, [appid]);

  if (!app) {
    return <div>Loading...</div>;
  }

  const metrics = {
    numberOfAgents: app.agents.length,
    numberOfAdmins: app.admins.length,
    numberOfSupervisors: app.subs.length,
    numberOfTeams: app.equipes.length,
    numberOfMessages: app.agents.reduce(
      (sum, agent) => sum + agent.messages.length,
      0
    ),
  };

  const lineChartData = [
    {
      name: "Agentes",
      Agentes: metrics.numberOfAgents,
      Administradores: 0,
      Supervisores: 0,
      Equipes: 0,
      Mensagens: 0,
    },
    {
      name: "Administradores",
      Agentes: 0,
      Administradores: metrics.numberOfAdmins,
      Supervisores: 0,
      Equipes: 0,
      Mensagens: 0,
    },
    {
      name: "Supervisores",
      Agentes: 0,
      Administradores: 0,
      Supervisores: metrics.numberOfSupervisors,
      Equipes: 0,
      Mensagens: 0,
    },
    {
      name: "Equipes",
      Agentes: 0,
      Administradores: 0,
      Supervisores: 0,
      Equipes: metrics.numberOfTeams,
      Mensagens: 0,
    },
    {
      name: "Mensagens",
      Agentes: 0,
      Administradores: 0,
      Supervisores: 0,
      Equipes: 0,
      Mensagens: metrics.numberOfMessages,
    },
  ];

  return (
    <div className="w-full h-screen bg-gray-100 p-4">
      <div className="center-col w-full !items-start">
        <h1 className="text-3xl font-poppinsBold">Dashboard</h1>
        <p className="text-[18px] opacity-80 font-poppinsLight">
          Veja as informações do seu sistema
        </p>
        <div className="w-full h-[1px] bg-gray-300 mt-2"></div>
      </div>

      <div className="center-col  mt-5">
        <div className="w-full !justify-between px-0 border border-gray-300 py-3 border-solid rounded-xl center bg-white">
          <div className="flex items-center gap-2 py-1.5 text-left text-sm transition-all duration-700 hover:border-gray-200 rounded-xl px-4 border border-transparent border-solid">
            <Avatar className="h-14 w-14 rounded-lg">
              <AvatarImage src={""} alt={app.enterprise} />
              <AvatarFallback className="rounded-lg">{`${app.enterprise
                .charAt(0)
                .toUpperCase()}${app.enterprise
                .charAt(1)
                .toUpperCase()}`}</AvatarFallback>
            </Avatar>
            <div className="grid flex-1 text-left text-sm leading-tight">
              <span className="truncate font-semibold">{app.enterprise}</span>
              <span className="truncate text-xs">{app.email}</span>
            </div>
          </div>
          <Badge
            color={(() => {
              const expiresIn = parseInt("1736545583876", 10);
              const expirationDate = new Date(expiresIn);
              const now = new Date();

              const daysRemaining = differenceInDays(expirationDate, now);

              if (daysRemaining > 3) {
                return "green"; // Seguro
              } else if (daysRemaining > 0) {
                return "red"; // Perto de expirar
              } else {
                return "grey"; // Já expirou
              }
            })()}
            className="font-poppinsMedium mx-4 py-4"
          >
            {(() => {
              const expiresIn = parseInt("1736545583876", 10);
              const expirationDate = new Date(expiresIn);
              const now = new Date();

              const daysRemaining = differenceInDays(expirationDate, now);

              if (daysRemaining > 0) {
                return `Expira em ${daysRemaining} ${
                  daysRemaining === 1 ? "dia" : "dias"
                }`;
              } else {
                return "Já expirou";
              }
            })()}
          </Badge>
        </div>
        <div className="w-full h-bg-gray-300 mt-2 grid grid-cols-3 gap-4">
          <Card className="group px-5 hover:[&>img]:opacity-[0.18] hover:border-green-300 border-transparent border-solid border transition-all duration-700 py-4 overflow-hidden relative">
            <img
              src="https://res.cloudinary.com/do9d7j6b3/image/upload/v1734049745/pngegg_idpx9v.png"
              className="absolute bottom-[-50%] transition-all duration-700 opacity-[0.06] right-[-50%]  group-hover:opacity-[0.18]"
            />
            <CardHeader className="!p-0  !py-3">
              <CardTitle className="font-poppinsLight text-[20px]">
                Adminstradores
              </CardTitle>
              <CardDescription>
                Veja a quantidade de adminstradores
              </CardDescription>
            </CardHeader>
            <CardContent className="center min-h-[100px] !p-0">
              <div className="font-poppinsBold text-5xl">
                {metrics.numberOfAdmins}
              </div>
            </CardContent>
          </Card>
          <Card className=" group px-5 hover:[&>img]:opacity-[0.18] hover:border-green-300 border-transparent border-solid border transition-all duration-700 py-4 overflow-hidden relative">
            <img
              src="https://res.cloudinary.com/do9d7j6b3/image/upload/v1734050097/pngegg_2_lkifmk.png"
              className="absolute bottom-[-20%] transition-all duration-700 opacity-[0.06] right-[-50%]  group-hover:opacity-[0.18]"
            />
            <CardHeader className="!p-0  !py-3">
              <CardTitle className="font-poppinsLight text-[20px]">
                Supervisores
              </CardTitle>
              <CardDescription>
                Veja a quantidade de supervisores
              </CardDescription>
            </CardHeader>
            <CardContent className="center min-h-[100px] !p-0">
              <div className="font-poppinsBold text-5xl">
                {metrics.numberOfSupervisors}
              </div>
            </CardContent>
          </Card>
          <Card className="group px-5 hover:[&>img]:opacity-[0.18] hover:border-green-300 border-transparent border-solid border transition-all duration-700 py-4 overflow-hidden relative">
            <img
              src="https://res.cloudinary.com/do9d7j6b3/image/upload/v1734050206/pngegg_3_nsryzj.png"
              className="absolute bottom-[-40%] transition-all duration-700 scale-[0.7] opacity-[0.06] right-[-45%]  group-hover:opacity-[0.18]"
            />
            <CardHeader className="!p-0  !py-3">
              <CardTitle className="font-poppinsLight text-[20px]">
                Agentes
              </CardTitle>
              <CardDescription>Veja a quantidade de agentes</CardDescription>
            </CardHeader>
            <CardContent className="center min-h-[100px] !p-0">
              <div className="font-poppinsMedium text-[42px]">
                <span className="font-poppinsRegular text-4xl">
                  {metrics.numberOfAgents}
                </span>

                <span>/{app.limitAgents}</span>
              </div>
            </CardContent>
          </Card>
        </div>
        <UsersAreaChart chartData={lineChartData} />
      </div>
    </div>
  );
}
