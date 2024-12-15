import { Dialog, DialogContent, DialogHeader } from "@/components/ui/dialog";
import { DialogDescription, DialogTitle } from "@radix-ui/react-dialog";
import { useEffect, useState } from "react";

import api from "@/services/api";
import { Button } from "@medusajs/ui";

export const AgentsListAdd = ({
  appid,
  isOpen,
  onClose,
  data,
  fetchData,
}: {
  appid: string;
  isOpen: boolean;
  onClose: () => void;
  data: any;
  fetchData: any;
}) => {
  const [agents, setAgents] = useState(data.agents);

  const handleAddAgent = async (agentId: string) => {
    try {
      // Fazer a requisição para deletar o agente
      await api.put(`equipe/${data._id}/agent/`, { agentId: agentId });
      // Atualizar o estado local removendo o agente deletado
      setAgents(agents.filter((agent: any) => agent._id !== agentId));
    } catch (error) {
      console.error("Erro ao adicionar o agente:", error);
    }
  };

  useEffect(() => {
    if (agents && agents.length === 0) {
      console.log(agents);
      fetchData();
      onClose();
    }
  }, [agents]);

  const getAgents = async () => {
    const res = await api.get(`application/${appid}/agents`);

    console.log(res.data);

    setAgents(res.data);
  };

  useEffect(() => {
    getAgents();
    console.log(data);
  }, [data]);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-2xl font-poppinsMedium">
            Agentes da equipe {data.name}
          </DialogTitle>
          <DialogDescription>
            Adicione um agente a essa equipe
          </DialogDescription>
        </DialogHeader>

        <div className="mt-4">
          <ul>
            {agents &&
              agents.map((agent: any) => (
                <li
                  key={agent._id}
                  className="flex my-2 py-2 px-2 rounded-lg border border-solid border- justify-between items-center"
                >
                  <span>{agent.username}</span>
                  <Button
                    variant="primary"
                    onClick={() => handleAddAgent(agent._id)}
                    className="font-poppinsLight bg-green-400 after:!hidden hover:bg-green-500 border border-solid border-green-300 !outline-none !ring-transparent text-green-50 hover:text-green-100 transition-all"
                  >
                    ✅ Adicionar
                  </Button>
                </li>
              ))}
          </ul>
        </div>
      </DialogContent>
    </Dialog>
  );
};
