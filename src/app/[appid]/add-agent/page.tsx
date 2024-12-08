"use client";

import { use, useEffect, useState } from "react";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import InputField from "@/components/inputField";
import api from "@/services/api";
import { useRouter } from "next/navigation";
import { loadFromLocalStorage } from "@/services/storage";

const schema = z.object({
  name: z.string().min(2, "Nome deve ter pelo menos 2 caracteres"),
  email: z.string().email("Email inválido"),
  password: z.string().min(6, "A senha deve ter pelo menos 6 caracteres"),
  phoneNumber: z.string().min(6, "Telefone deve ter pelo menos 10 caracteres"),
});

type FormData = z.infer<typeof schema>;

export default function UserPage({
  params,
}: {
  params: Promise<{ appid: string }>;
}) {
  const { appid } = use(params);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  const router = useRouter();

  const [userPerm, setUserPerm] = useState<any>(null);

  const getPerm = async () => {
    const perm = await loadFromLocalStorage("cargo");

    if (perm === "admin" || perm === "sub") {
      return true;
    } else {
      return false;
    }
  };

  useEffect(() => {
    (async () => {
      const perm = await getPerm();
      setUserPerm(perm);

      console.log(perm);
    })();
  }, []);

  const onSubmit = async (data: FormData) => {
    if (!userPerm) {
      alert("Sem permissão!");
      return;
    }

    const response = await api.post("/agent/register", {
      username: data.name,
      email: data.email,
      password: data.password,
      phoneNumber: data.phoneNumber,
    });

    console.log(response);

    await api.post(`/application/${appid}/add-agent`, {
      agentId: response.data.agent._id,
    });

    alert("Agent criado com sucesso!");

    router.replace(`/${appid}`);
  };

  return (
    <main className="overflow-hidden hero">
      <div className="max-w-[1440px] relative mx-auto py-4 h-screen center-col">
        <div className="w-full center">
          <div className=" px-4 py-10 w-full center-col">
            <h1 className="font-poppinsBold max-w-[50%] text-center text-5xl">
              Criando um agente.
            </h1>
            <p className="font-poppinsLight text-xl">
              Para criar um agente, preencha os campos abaixo.
            </p>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="w-full max-w-2xl mt-6 py-4"
            >
              <InputField
                label="Usuário"
                id="name"
                register={register}
                error={errors.name}
              />
              <InputField
                label="Numero de telefone"
                id="phoneNumber"
                register={register}
                error={errors.phoneNumber}
              />
              <InputField
                label="Email"
                id="email"
                type="email"
                register={register}
                error={errors.email}
              />
              <InputField
                label="Senha"
                id="password"
                type="password"
                register={register}
                error={errors.password}
              />
              <button
                type="submit"
                className="w-full p-2 mt-4 text-white h-[55px] rounded-xl bg-blue-500 hover:bg-blue-600 transition-all"
              >
                Cadastrar
              </button>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
}
