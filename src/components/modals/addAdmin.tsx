import { Dialog, DialogContent, DialogHeader } from "@/components/ui/dialog";

import { AddAdminForm } from "@/components/forms/addAdmin";
import { DialogDescription, DialogTitle } from "@radix-ui/react-dialog";

export const AddAdminModal = ({
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
            Criar admin
          </DialogTitle>
          <DialogDescription>
            Adicione um admin ao seu sistema
          </DialogDescription>
        </DialogHeader>
        <AddAdminForm appid={appid} onClose={onClose} />
      </DialogContent>
    </Dialog>
  );
};
