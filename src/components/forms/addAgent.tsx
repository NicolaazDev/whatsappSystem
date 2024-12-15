import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import InputField from "@/components/inputField";
import SelectField from "@/components/selectField";

import { Button, toast } from "@medusajs/ui";

import api from "@/services/api";
import { useEffect, useState } from "react";

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
  phoneNumber: z.string().min(6, "Telefone deve ter pelo menos 10 caracteres"),
  equipe: z.string(),
});

type FormData = z.infer<typeof schema>;

export const AddAgentForm = ({
  appid,
  onClose,
}: {
  appid: string;
  onClose: () => void;
}) => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const [equipes, setEquipes] = useState([]);

  const fetchEquipes = async () => {
    const res = await api.get(`application/${appid}/equipes`);

    const options = res.data.map((equipe: any) => ({
      value: equipe._id,
      label: equipe.name,
    }));

    setEquipes(options);
  };

  useEffect(() => {
    fetchEquipes();
  }, []);

  const onSubmit = async (data: FormData) => {
    const response = await api.post("/agent/register", {
      username: data.name,
      appId: appid,
      email: data.email,
      password: data.password,
      phoneNumber: data.phoneNumber,
    });

    await api.post(`/application/${appid}/add-agent`, {
      agentId: response.data.agent._id,
    });

    await api.put(`/equipe/${data.equipe}/agent`, {
      agentId: response.data.agent._id,
    });

    if (response.status !== 201) {
      toast.error("Error", {
        description: "Erro ao criar Agente",
      });
    }

    toast.success("Successo", {
      description: "Agente criado com sucesso!",
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
        label="Numero de telefone"
        id="phoneNumber"
        tooltip={"Colocar Código do pais com DDD sem o 9 adicional"}
        register={register}
        error={errors.phoneNumber}
      />

      <InputField
        label="Senha"
        id="password"
        type="password"
        placeholder="**********"
        register={register}
        error={errors.password}
      />

      {equipes && (
        <SelectField
          label="Equipe designado"
          id="equipe"
          placeholder="Selecione"
          options={equipes}
          error={errors.equipe}
          onValueChange={(value) => setValue("equipe", value as any)}
          tooltip="Escolha uma equipe para o agente"
          register={register}
        />
      )}
      <Button type="submit" className="font-poppinsLight w-full mt-5 h-[55px]">
        Registrar
      </Button>
    </form>
  );
};
