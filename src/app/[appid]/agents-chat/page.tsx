"use client";

import { MocksChat } from "@/mocks/agents-chat";
import api from "@/services/api";
import { loadFromLocalStorage } from "@/services/storage";
import { useEffect, useState } from "react";

export default function ChatPage({ params }: { params: { appid: string } }) {
  const { appid } = params;

  const [agents, setAgents] = useState<any>(MocksChat.agents); // Lista de agentes
  const [selectedAgent, setSelectedAgent] = useState<any>(null); // Agente selecionado
  const [selectedAgents, setSelectedAgents] = useState<string[]>([]); // IDs dos agentes selecionados

  const [userPerm, setUserPerm] = useState<any>(null);

  const getPerm = async () => {
    const perm = await loadFromLocalStorage("cargo");

    if (perm === "admin" || perm === "sub") {
      return true;
    } else {
      return false;
    }
  };

  const getAgents = async () => {
    const response = await api.get(`/application/${appid}/agents`);

    return response.data;
  };

  useEffect(() => {
    (async () => {
      const data = await getAgents();
      setAgents(data);

      const perm = await getPerm();
      setUserPerm(perm);

      console.log(perm);
    })();
  }, []);

  // Função para lidar com a seleção/deseleção de agentes
  const handleSelectAgent = (agentId: string) => {
    setSelectedAgents(
      (prev) =>
        prev.includes(agentId)
          ? prev.filter((id) => id !== agentId) // Remove se já estiver selecionado
          : [...prev, agentId] // Adiciona se não estiver
    );
  };

  // Função para selecionar todos os agentes
  const handleSelectAll = () => {
    if (selectedAgents.length === agents.length) {
      setSelectedAgents([]); // Deseleciona todos
    } else {
      setSelectedAgents(agents.map((agent: any) => agent)); // Seleciona todos
    }
  };

  const downloadBackupAgents = async () => {
    console.log(selectedAgent);

    try {
      const response = await api.get(`/agent/${selectedAgent._id}/backup`, {
        responseType: "blob",
      });

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute(
        "download",
        `backup_agent_${selectedAgent.phoneNumber}.zip`
      );
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      console.log("Backup baixado com sucesso.");
    } catch (error) {
      console.error("Erro ao baixar o backup:", error);
    }
  };

  const downloadSelectedAgents = async () => {
    try {
      const response = await api.post(
        `/agent/multiple-backup`,
        { ids: selectedAgents },
        { responseType: "blob" }
      );

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "conversas.zip");
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      console.log("Backup baixado com sucesso.");
    } catch (error) {
      console.error("Erro ao baixar o backup:", error);
    }
  };

  return (
    <main className="overflow-hidden hero">
      <div className="w-full relative mx-auto py-4 px-4 h-screen grid grid-cols-[370px_1fr]">
        {/* Lista de Agentes */}
        <div className="agents w-full border-r px-3 border-gray-200 rounded-3xl shadow-lg border border-solid overflow-y-auto">
          <div className="w-full p-4 border-b border-gray-300 center text-xl">
            Agentes
          </div>
          {agents &&
            agents.map((agent: any) => (
              <div
                key={agent._id}
                className={`p-4 cursor-pointer my-2 rounded-xl transition-all ${
                  selectedAgent?.id === agent.id ? "bg-gray-200" : ""
                } hover:bg-gray-200 flex items-center`}
              >
                <input
                  type="checkbox"
                  className="mr-3"
                  checked={selectedAgents.includes(agent._id)}
                  onChange={() => handleSelectAgent(agent._id)}
                />
                <div
                  onClick={() => setSelectedAgent(agent)}
                  className="flex-1 cursor-pointer"
                >
                  <h3 className="font-semibold">{agent.username}</h3>
                  <p className="text-sm text-gray-500">{agent.phoneNumber}</p>
                </div>
              </div>
            ))}
          {userPerm && (
            <div className="w-full p-4 border-t space-x-2 border-gray-300 center justify-between">
              <button
                onClick={handleSelectAll}
                className="bg-blue-500 text-white px-4 py-2 rounded-md text-sm hover:bg-blue-600 transition-all"
              >
                {selectedAgents.length === agents.length
                  ? "Deselecionar Todos"
                  : "Selecionar Todos"}
              </button>
              <button
                onClick={() => downloadSelectedAgents()}
                className="bg-green-500 text-white px-4 py-2 rounded-md text-sm hover:bg-green-600 transition-all"
              >
                Baixar Conversas
              </button>
            </div>
          )}
        </div>

        {/* Chat do Agente Selecionado */}
        <div className="chat w-full p-4 overflow-y-auto">
          {selectedAgent ? (
            <>
              <h2 className="text-xl font-bold mb-4 w-full center !justify-between px-5">
                Mensagens de {selectedAgent.name}
                {userPerm && (
                  <button
                    onClick={downloadBackupAgents}
                    className="text-blue-500 transition-all hover:text-blue-700 text-[15px] underline cursor-pointer"
                  >
                    Baixar conversas de {selectedAgent.username}
                  </button>
                )}
              </h2>
              <ul className="space-y-3">
                {selectedAgent.messages.map((msg: any) => (
                  <li
                    key={msg.id}
                    className={`p-3 rounded-lg center-col ${
                      msg.status === "sent"
                        ? "bg-blue-100 self-end !items-end text-right"
                        : "bg-gray-100 self-start !items-start text-left"
                    }`}
                  >
                    {msg.type === "text" ? (
                      msg.content
                    ) : msg.type === "image" ? (
                      <img
                        src={`data:image/jpeg;base64,${msg.content}`}
                        className="h-auto w-[300px] object-contain rounded-lg"
                      />
                    ) : msg.type === "audio" ? (
                      <audio controls className="w-full">
                        <source
                          src={`data:audio/mpeg;base64,${msg.content}`}
                          type="audio/mpeg"
                        />
                        Your browser does not support the audio element.
                      </audio>
                    ) : null}
                    <div className="text-xs text-gray-400 mt-1">
                      {new Date(msg.timestamp).toLocaleTimeString()}
                    </div>
                  </li>
                ))}
              </ul>
            </>
          ) : (
            <p className="text-gray-500 text-center h-full center">
              Selecione um agente para visualizar as mensagens.
            </p>
          )}
        </div>
      </div>
    </main>
  );
}
