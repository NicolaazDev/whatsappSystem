import { Dialog, DialogContent, DialogHeader } from "@/components/ui/dialog";

import { DialogDescription, DialogTitle } from "@radix-ui/react-dialog";

import { AddEquipeForm } from "@/components/forms/addEquipe";

export const AddEquipeModal = ({
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
            Criar Equipe
          </DialogTitle>
          <DialogDescription>
            Adicione um equipe ao seu sistema
          </DialogDescription>
        </DialogHeader>
        <AddEquipeForm appid={appid} onClose={onClose} />
      </DialogContent>
    </Dialog>
  );
};
