"use client";

import api from "@/services/api";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import { useEffect, useState } from "react";

import { Button } from "@medusajs/ui";
import { ArrowPath, Spinner } from "@medusajs/icons";
import { Skeleton } from "@/components/ui/skeleton";
import { useRouter } from "next/navigation";

export default function AgentPage(props: {
  params: { agent: string; appid: string };
}) {
  const [qrCodeAgent, setQrCode] = useState<any>(null);
  const [agentUser, setAgentUser] = useState<any>(null);

  const router = useRouter();

  const { agent: agentName } = props.params;

  const getAgent = async () => {
    try {
      const response = await api.get(`/whatsapp/generate-qrcode`);
      return response.data;
    } catch (error: any) {
      console.log("Error fetching QR code:", error.message);
      return null;
    }
  };

  const getQrCode = async () => {
    try {
      const response = await api.get(`/agent/${agentName}`);
      return response.data;
    } catch (error: any) {
      console.log("Error fetching agent:", error.message);
      return null;
    }
  };

  useEffect(() => {
    (async () => {
      const agent = await getQrCode();
      setAgentUser(agent);

      const qrCode = await getAgent();
      setQrCode(qrCode);
    })();
  }, []);

  const reloadQrCode = async () => {
    setQrCode(null);

    const qrCode = await getAgent();
    setQrCode(qrCode);
  };

  const backToHome = () => {
    console.log(props.params.appid);
    router.replace(`/${props.params.appid}/app`);
  };

  return (
    <main className="hero w-full h-screen center-col">
      <Card className="px-5 py-8">
        <CardHeader>
          <CardTitle className="text-4xl text-center uppercase font-poppinsBold ">
            Conecte seu agente
          </CardTitle>
          <CardDescription className="text-[18px] font-poppinsLight mb-8">
            Escanei o QR Code para se conectar ao agente
          </CardDescription>
        </CardHeader>
        <CardContent>
          {agentUser && (
            <div className="flex items-center mb-4 gap-2 px-1 py-1.5 text-left text-sm w-full border border-solid border-gray-200 rounded-lg p-4">
              <Avatar className="h-16 w-16 rounded-lg ml-1">
                <AvatarImage src={""} alt={agentUser.agent.username} />
                <AvatarFallback className="rounded-lg text-[18px]">{`${agentUser.agent.username
                  .charAt(0)
                  .toUpperCase()}${agentUser.agent.username
                  .charAt(1)
                  .toUpperCase()}`}</AvatarFallback>
              </Avatar>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate text-[15px] font-semibold">
                  {agentUser.agent.username}
                </span>
                <span className="truncate text-xs">
                  {agentUser.agent.email}
                </span>
              </div>
            </div>
          )}

          {qrCodeAgent ? (
            <div className="border border-solid border-gray-200 rounded-lg p-4">
              <img
                src={qrCodeAgent.qrCodeBase64}
                alt="QR Code"
                className="w-full h-full object-contain"
              />
            </div>
          ) : (
            <div className="border relative center border-solid border-gray-200 rounded-lg p-4">
              <Skeleton
                className="w-full h-full"
                style={{ height: "300px", width: "100%" }}
              />

              <Spinner className="absolute text-[32px] animate-spin" />
            </div>
          )}
        </CardContent>
        <CardFooter className="grid grid-cols-[1fr_0.3fr] gap-x-3">
          <Button
            onClick={backToHome}
            className="w-full text-[17px] font-poppinsRegular h-[55px]"
          >
            Já conectei
          </Button>
          <Button
            variant="secondary"
            onClick={reloadQrCode}
            className="w-full text-[17px] font-poppinsRegular h-[55px]"
          >
            <ArrowPath />
          </Button>
        </CardFooter>
      </Card>
    </main>
  );
}
