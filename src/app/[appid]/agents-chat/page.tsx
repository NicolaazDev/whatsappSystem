"use client";

import api from "@/services/api";
import { loadFromLocalStorage } from "@/services/storage";
import { Button } from "@medusajs/ui";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { useEffect, useState } from "react";

export default function ChatPage({ params }: { params: { appid: string } }) {
  const { appid } = params;

  const [agents, setAgents] = useState<any>([]); // Lista de agentes
  const [filteredAgents, setFilteredAgents] = useState<any>([]); // Agentes filtrados pela pesquisa
  const [searchQuery, setSearchQuery] = useState(""); // Valor da barra de pesquisa
  const [selectedAgent, setSelectedAgent] = useState<any>(null); // Agente selecionado

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
      setFilteredAgents(data); // Inicializa a lista filtrada

      const perm = await getPerm();
      setUserPerm(perm);

      console.log(perm);
    })();
  }, []);

  // Função para filtrar agentes com base na pesquisa
  const handleSearch = () => {
    const query = searchQuery.toLowerCase();
    const filtered = agents.filter(
      (agent: any) =>
        agent.username.toLowerCase().includes(query) ||
        agent.phoneNumbers[0].toLowerCase().includes(query)
    );
    setFilteredAgents(filtered);
  };

  const downloadBackupAgents = async (selectedAgent: any) => {
    console.log(selectedAgent);

    try {
      const agent = await api.get(`/agent/id/${selectedAgent}`);

      const response = await api.get(`/agent/${selectedAgent}/backup`, {
        responseType: "blob",
      });

      console.log(agent);

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute(
        "download",
        `backup_agent_${agent.data.agent.phoneNumbers[0]}.zip`
      );
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      console.log("Backup baixado com sucesso.");
    } catch (error) {
      console.error("Erro ao baixar o backup:", error);
    }
  };

  return (
    <main className="overflow-hidden hero w-full">
      <div className="w-full relative mx-auto py-4 px-4 h-screen grid grid-cols-[370px_1fr]">
        {/* Lista de Agentes */}
        <div className="agents w-full border-r px-3 border-gray-200 rounded-xl shadow-lg border border-solid overflow-y-auto">
          <div className="w-full mt-6 mb-6 border-b border-gray-300 flex items-center space-x-2">
            <Input
              type="search"
              className="pl-4 w-full border border-solid border-gray-400 h-[45px] rounded-md  text-sm"
              placeholder="Pesquisar"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Button
              onClick={handleSearch}
              className="bg-blue-500 !border-blue-500 !ring-0 !outline-none min-w-[42px] h-[42px] text-white px-4 py-2 rounded-md text-sm hover:bg-blue-600 transition-all"
            >
              <Search size={19} strokeWidth={1} />
            </Button>
          </div>

          {filteredAgents.length > 0 ? (
            filteredAgents.map((agent: any) => (
              <div
                key={agent._id}
                className={`p-4 py-2 cursor-pointer my-2 rounded-xl border transition-all duration-700 border-solid  ${
                  selectedAgent?._id === agent._id
                    ? " border-green-300 bg-green-50 text-green-800"
                    : " border-green-400 bg-transparent text-neutral-900"
                } hover:bg-gray-200 flex items-center`}
              >
                <div
                  onClick={() => setSelectedAgent(agent)}
                  className="flex-1 cursor-pointer"
                >
                  <h3 className="font-poppinsRegular text-[20px]">
                    {agent.username}
                  </h3>
                  <p className="text-sm opacity-80">+{agent.phoneNumbers[0]}</p>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-500 text-center mt-4">
              Nenhum agente encontrado.
            </p>
          )}
        </div>

        {/* Chat do Agente Selecionado */}
        <div className="!w-full p-4 overflow-y-auto">
          {selectedAgent ? (
            <>
              <h2 className="text-xl w-full font-poppinsLight mb-4 center !justify-between px-5">
                Mensagens de {selectedAgent.username}
                {userPerm && (
                  <Button
                    onClick={() => {
                      console.log("Baixando conversas...");
                      downloadBackupAgents(selectedAgent._id);
                    }}
                    className="text-blue-500 font-poppinsLight transition-all hover:text-blue-700 text-[15px] underline cursor-pointer"
                  >
                    Baixar conversas de {selectedAgent.username}
                  </Button>
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
