import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import InputField from "@/components/inputField";
import { Button, toast } from "@medusajs/ui";

import api from "@/services/api";

const schema = z.object({
  phoneNumber: z.string().min(6, "O numero deve ter pelo menos 6 caracteres"),
});

type FormData = z.infer<typeof schema>;

export const AddNumberForm = ({
  agentId,
  onClose,
}: {
  agentId: string;
  onClose: () => void;
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: FormData) => {
    const response = await api.post("/agent/add-phone-number", {
      phoneNumber: data.phoneNumber,
      agentId: agentId,
    });

    console.log(response);

    if (response.status !== 200) {
      toast.error("Error", {
        description: "Erro ao adicionar um numero",
      });
    }

    toast.success("Successo", {
      description: "Numero adicionado com sucesso!",
    });

    onClose();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-2xl py-4">
      <InputField
        label="Numero"
        id="phoneNumber"
        placeholder="Numero"
        register={register}
        error={errors.phoneNumber}
      />

      <Button type="submit" className="font-poppinsLight w-full mt-5 h-[55px]">
        Adicionar
      </Button>
    </form>
  );
};
