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
    .min(5, { message: "Nome deve ter pelo menos 5 caracteres" })
    .max(22, { message: "Nome não pode ter mais de 22 caracteres" })
    .regex(/^[a-záàãâäéèêëíìîïóòôöõúùûüç]+$/i, {
      message:
        "Nome não pode conter espaços, caracteres especiais ou letras maiúsculas",
    }),
  desc: z
    .string()
    .min(15, { message: "Nome deve ter pelo menos 15 caracteres" })
    .max(140, { message: "Nome não pode ter mais de 140 caracteres" }),
  super: z.string(),
});

type FormData = z.infer<typeof schema>;

export const AddEquipeForm = ({
  appid,
  onClose,
}: {
  appid: string;
  onClose: () => void;
}) => {
  const [supers, setSupers] = useState([]);

  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const fetchSupers = async () => {
    const res = await api.get(`application/${appid}/subs`);

    const options = res.data.map((equipe: any) => ({
      value: equipe._id,
      label: equipe.username,
    }));

    setSupers(options);
  };

  useEffect(() => {
    fetchSupers();
  }, []);

  const onSubmit = async (data: FormData) => {
    console.log(data);

    const response = await api.post("/equipe", {
      name: data.name,
      description: data.desc,
      sub: data.super,
    });

    await api.post(`/application/${appid}/add-equipe`, {
      equipeId: response.data.equipe._id,
    });

    if (response.status !== 201) {
      toast.error("Error", {
        description: "Erro ao criar equipe",
      });
    }

    toast.success("Successo", {
      description: "Equipe criada com sucesso!",
    });

    onClose();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-2xl py-4">
      <InputField
        label="Nome da equipe"
        id="name"
        placeholder="Nome da equipe"
        register={register}
        error={errors.name}
      />

      <InputField
        label="Descrição"
        id="desc"
        placeholder="Minha equipe de vendas"
        type="text"
        register={register}
        error={errors.desc}
      />

      {supers && (
        <SelectField
          label="Supervisor designado"
          id="super"
          placeholder="Selecione"
          options={supers}
          error={errors.super}
          onValueChange={(value) => setValue("super", value as any)}
          tooltip="Escolha um supervisor que irá gerenciar essa equipe"
          register={register}
        />
      )}

      <Button type="submit" className="font-poppinsLight w-full mt-5 h-[55px]">
        Criar
      </Button>
    </form>
  );
};
