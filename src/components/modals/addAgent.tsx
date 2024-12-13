import { Dialog, DialogContent, DialogHeader } from "@/components/ui/dialog";

import { DialogDescription, DialogTitle } from "@radix-ui/react-dialog";
import { AddAgentForm } from "@/components/forms/addAgent";

export const AddAgentModal = ({
  appid,
  isOpen,
  onClose,
}: {
  appid: string;
  isOpen: boolean;
  onClose: () => void;
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-2xl font-poppinsMedium">
            Criar agente
          </DialogTitle>
          <DialogDescription>
            Adicione um agente ao seu sistema
          </DialogDescription>
        </DialogHeader>
        <AddAgentForm appid={appid} onClose={onClose} />
      </DialogContent>
    </Dialog>
  );
};
