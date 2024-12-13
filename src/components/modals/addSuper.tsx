import { Dialog, DialogContent, DialogHeader } from "@/components/ui/dialog";

import { DialogDescription, DialogTitle } from "@radix-ui/react-dialog";
import { AddSuperForm } from "../forms/addSuper";

export const AddSuperModal = ({
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
            Criar supervisor
          </DialogTitle>
          <DialogDescription>
            Adicione um supervisor ao seu sistema
          </DialogDescription>
        </DialogHeader>
        <AddSuperForm appid={appid} onClose={onClose} />
      </DialogContent>
    </Dialog>
  );
};
