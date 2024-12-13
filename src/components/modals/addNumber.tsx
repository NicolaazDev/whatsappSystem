import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
} from "@/components/ui/dialog";

import { DialogDescription, DialogTitle } from "@radix-ui/react-dialog";

import { AddNumberForm } from "@/components/forms/addNumberAgent";
import { useEffect, useState } from "react";
import api from "@/services/api";

export const AddNumberModal = ({
  agentId,
  isOpen,
  onClose,
}: {
  agentId: string;
  isOpen: boolean;
  onClose: () => void;
}) => {
  const [agent, setAgent] = useState<any>(null);

  const fetchAgent = async (agentId: string) => {
    try {
      const response = await api.get(`/agent/id/${agentId}`);
      setAgent(response.data.agent);

      console.log(agentId);
    } catch (error) {
      console.error("Error fetching agent:", error);
      return null;
    }
  };

  const onCloseMod = () => {
    setAgent(null);
    onClose();
  };

  useEffect(() => {
    fetchAgent(agentId);
  }, [isOpen]);

  return (
    <Dialog open={isOpen} onOpenChange={onCloseMod}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-2xl font-poppinsMedium">
            Adicionar telefone
          </DialogTitle>
          <DialogDescription>
            Adicione um numero a esse agente
          </DialogDescription>
        </DialogHeader>
        <div className="border border-solid mt-4 border-gray-300 rounded-xl center-col space-y-2 py-5 px-2">
          <h1 className="font-poppinsLight text-[18px]">Historico</h1>
          {agent && agent.phoneNumbers.length > 0 && (
            <ul className="list-disc pl-4 text-sm text-muted-foreground">
              {agent.phoneNumbers.map((phoneNumber: string) => (
                <li key={phoneNumber}>{phoneNumber}</li>
              ))}
            </ul>
          )}
        </div>
        <AddNumberForm agentId={agentId} onClose={onClose} />
      </DialogContent>
    </Dialog>
  );
};
