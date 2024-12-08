"use client";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import InputField from "@/components/inputField";

import api from "@/services/api";
import { saveToLocalStorage } from "@/services/storage";
import { useRouter } from "next/navigation";

const schema = z.object({
  name: z.string().min(2, "Nome deve ter pelo menos 2 caracteres"),
  password: z.string().min(6, "A senha deve ter pelo menos 6 caracteres"),
});

type FormData = z.infer<typeof schema>;

export default function UserPage({ params }: { params: { appid: string } }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  const { appid } = params;

  const router = useRouter();

  const onSubmit = async (data: FormData) => {
    const response = await api.post("/admin/login", {
      username: data.name,
      password: data.password,
    });

    saveToLocalStorage("user", {
      id: response.data.admin._id,
      username: response.data.admin.username,
      authorization: "admin",
    });

    saveToLocalStorage("cargo", "admin");

    alert("Admin logado com sucesso!");

    router.replace(`/${appid}`);
  };

  return (
    <main className="overflow-hidden hero">
      <div className="max-w-[1440px] relative mx-auto py-4 h-screen center-col">
        <div className="w-full center">
          <div className=" px-4 py-10 w-full center-col">
            <h1 className="font-poppinsBold max-w-[50%] text-center text-5xl">
              Entrar como Administrador.
            </h1>
            <p className="font-poppinsLight text-xl">
              Para entrar como um administrador, preencha os campos abaixo.
            </p>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="w-full max-w-2xl mt-6 py-4"
            >
              <InputField
                label="Username"
                id="name"
                type="text"
                register={register}
                error={errors.name}
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
                Entrar
              </button>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
}
