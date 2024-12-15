import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { useRouter } from "next/navigation";

import InputField from "@/components/inputField";
import { Button, toast } from "@medusajs/ui";

import api from "@/services/api";

const schema = z.object({
  name: z
    .string()
    .min(2, { message: "Usuário deve ter pelo menos 5 caracteres" })
    .max(22, { message: "Usuário não pode ter mais de 22 caracteres" })
    .regex(/^[a-záàãâäéèêëíìîïóòôöõúùûüç]+$/i, {
      message:
        "Usuário não pode conter espaços, caracteres especiais ou letras maiúsculas",
    }),
  email: z.string().email("Email inválido"),
  password: z.string().min(6, "A senha deve ter pelo menos 6 caracteres"),
});

type FormData = z.infer<typeof schema>;

export const AddSuperForm = ({
  appid,
  onClose,
}: {
  appid: string;
  onClose: () => void;
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const router = useRouter();

  const onSubmit = async (data: FormData) => {
    const response = await api.post("/sub/register", {
      username: data.name,
      password: data.password,
    });

    await api.post(`/application/${appid}/add-sub`, {
      subId: response.data.sub._id,
    });

    if (response.status !== 201) {
      toast.error("Error", {
        description: "Erro ao criar supervisor",
      });
    }

    toast.success("Successo", {
      description: "Supervisor criado com sucesso!",
    });

    onClose();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-2xl py-4">
      <InputField
        label="Usuário"
        id="name"
        placeholder="Usuário"
        register={register}
        error={errors.name}
      />

      <InputField
        label="Email"
        id="email"
        placeholder="email@email.com"
        type="email"
        register={register}
        error={errors.email}
      />
      <InputField
        label="Senha"
        id="password"
        type="password"
        placeholder="**********"
        register={register}
        error={errors.password}
      />
      <Button type="submit" className="font-poppinsLight w-full mt-5 h-[55px]">
        Registrar
      </Button>
    </form>
  );
};
