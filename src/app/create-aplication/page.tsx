"use client";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import InputField from "@/components/inputField";
import api from "@/services/api";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useState } from "react";

const schema = z.object({
  name: z
    .string({ required_error: "O nome é obrigatorio" })
    .min(2, "Nome deve ter pelo menos 2 caracteres"),
  email: z
    .string({ required_error: "O email é obrigatorio" })
    .email("Email inválido"),
  password: z
    .string({ required_error: "A senha é obrigatorio" })
    .min(6, "A senha deve ter pelo menos 6 caracteres"),
  plan: z.enum(["basic", "pro", "enterprise"], {
    required_error: "Selecione um plano",
  }),
  phoneNumber: z
    .string({ required_error: "O telefone é obrigatorio" })
    .min(6, "Telefone deve ter pelo menos 10 caracteres"),
  enterprise: z.string({ required_error: "O nome da empresa é obrigatorio" }),
  document: z
    .string({ required_error: "O CNPJ/CPF é obrigatorio" })
    .min(14, "CNPJ deve ter pelo menos 14 caracteres"),
  planningType: z.string({ required_error: "O Tempo do plano é obrigatorio" }),
  status: z.string({ required_error: "O status do plano é obrigatorio" }),
});

type FormData = z.infer<typeof schema>;

export default function UserPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  const [open, setOpen] = useState(false);
  const [url, setUrl] = useState("");
  const [data, setData] = useState<any>({});

  const onSubmit = async (data: FormData) => {
    const response = await api.post("/application", {
      username: data.name,
      password: data.password,
      plan: data.plan,
      email: data.email,
      phoneNumber: data.phoneNumber,
      enterprise: data.enterprise,
      document: data.document,
      planningType: data.planningType,
      status: data.status,
      admins: [],
      agents: [],
      subs: [],
    });

    setOpen(true);
    setUrl(response.data.url);
    setData(response.data.application);

    console.log(response);
  };

  return (
    <main className="min-h-screen bg-gray-50 w-full">
      <AlertDialog open={open} onOpenChange={setOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{data.name}</AlertDialogTitle>
            <AlertDialogDescription>
              <div className="p-5 rounded-xl border border-solid border-gray-200">
                <input
                  type="text"
                  value={url}
                  className="w-full p-2 text-center bg-transparent outline-none"
                  readOnly
                />
              </div>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction
              onClick={() => {
                navigator.clipboard.writeText(url);
              }}
            >
              Copiar URL
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <div className="max-w-[1440px] relative mx-auto py-4 h-auto center-col">
        <div className="w-full center">
          <div className=" px-4 py-10 w-full center-col">
            <h1 className="font-poppinsBold max-w-[50%] text-center text-5xl">
              Criando uma Aplicação.
            </h1>
            <p className="font-poppinsLight text-xl">
              Para criar um aplicação, preencha os campos abaixo.
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
                label="Senha"
                id="password"
                type="password"
                register={register}
                error={errors.password}
              />
              <InputField
                label="Email"
                id="email"
                type="email"
                register={register}
                error={errors.email}
              />
              <InputField
                label="Telefone"
                id="phoneNumber"
                register={register}
                error={errors.phoneNumber}
              />
              <InputField
                label="Empresa"
                id="enterprise"
                register={register}
                error={errors.enterprise}
              />
              <InputField
                label="CNPJ/CPF"
                id="document"
                register={register}
                error={errors.document}
              />

              <div className="my-4">
                <label htmlFor="plan" className="block text-gray-700 mb-2">
                  Tipo de Plano
                </label>
                <select
                  id="planningType"
                  {...register("planningType")}
                  className={`w-full p-3 bg-[#f1f1f1] rounded-lg border border-solid h-[55px] ${
                    errors.planningType ? "border-red-500" : "border-gray-400"
                  }`}
                >
                  <option value="">Selecione um plano</option>
                  <option value="mensal">Mensal</option>
                  <option value="trimensal">Trimensal</option>
                  <option value="anual">Anual</option>
                </select>
                {errors.planningType && (
                  <span className="text-red-500 text-sm mt-1">
                    {errors.planningType.message}
                  </span>
                )}
              </div>
              <div className="my-4">
                <label htmlFor="plan" className="block text-gray-700 mb-2">
                  Status
                </label>
                <select
                  id="status"
                  {...register("status")}
                  className={`w-full p-3 bg-[#f1f1f1] rounded-lg border border-solid h-[55px] ${
                    errors.status ? "border-red-500" : "border-gray-400"
                  }`}
                >
                  <option value="">Selecione um plano</option>
                  <option value="active">Ativo</option>
                  <option value="disabled">Desativado</option>
                </select>
                {errors.status && (
                  <span className="text-red-500 text-sm mt-1">
                    {errors.status.message}
                  </span>
                )}
              </div>
              <div className="my-4">
                <label htmlFor="plan" className="block text-gray-700 mb-2">
                  Plano
                </label>
                <select
                  id="plan"
                  {...register("plan")}
                  className={`w-full p-3 bg-[#f1f1f1] rounded-lg border border-solid h-[55px] ${
                    errors.plan ? "border-red-500" : "border-gray-400"
                  }`}
                >
                  <option value="">Selecione um plano</option>
                  <option value="basic">Basic</option>
                  <option value="pro">Pro</option>
                  <option value="enterprise">Enterprise</option>
                </select>
                {errors.plan && (
                  <span className="text-red-500 text-sm mt-1">
                    {errors.plan.message}
                  </span>
                )}
              </div>
              <button
                type="submit"
                className="w-full p-2 mt-4 text-white h-[55px] rounded-xl bg-blue-500 hover:bg-blue-600 transition-all"
              >
                Registrar
              </button>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
}
