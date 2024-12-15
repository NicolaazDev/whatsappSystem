import { Dialog, DialogContent, DialogHeader } from "@/components/ui/dialog";
import { DialogDescription, DialogTitle } from "@radix-ui/react-dialog";
import { useEffect, useState } from "react";

import api from "@/services/api";
import { Button } from "@medusajs/ui";

export const AgentsList = ({
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

  const handleDeleteAgent = async (agentId: string) => {
    try {
      // Fazer a requisição para deletar o agente
      await api.delete(`equipe/${data._id}/agent/${agentId}`);
      // Atualizar o estado local removendo o agente deletado
      setAgents(agents.filter((agent: any) => agent._id !== agentId));
    } catch (error) {
      console.error("Erro ao deletar o agente:", error);
    }
  };

  useEffect(() => {
    if (agents && agents.length === 0) {
      console.log(agents);
      fetchData();
      onClose();
    }
  }, [agents]);

  useEffect(() => {
    console.log(data);
  }, [data]);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-2xl font-poppinsMedium">
            Agentes da equipe {data.name}
          </DialogTitle>
          <DialogDescription>Gerencie a lista de agentes</DialogDescription>
        </DialogHeader>

        <div className="mt-4">
          <ul>
            {agents.map((agent: any) => (
              <li
                key={agent._id}
                className="flex my-2 py-2 px-2 rounded-lg border border-solid border- justify-between items-center"
              >
                <span>{agent.username}</span>
                <Button
                  variant="danger"
                  onClick={() => handleDeleteAgent(agent._id)}
                  className="font-poppinsLight"
                >
                  ❌ Remover
                </Button>
              </li>
            ))}
          </ul>
        </div>
      </DialogContent>
    </Dialog>
  );
};
