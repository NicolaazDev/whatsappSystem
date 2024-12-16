"use client";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import InputField from "@/components/inputField";
import SelectField from "@/components/selectField";
import { Button, toast } from "@medusajs/ui";

import { FaWhatsapp } from "react-icons/fa";

import api from "@/services/api";
import { saveToLocalStorage } from "@/services/storage";

import { useRouter } from "next/navigation";

const schema = z.object({
  name: z.string().min(2, "Nome deve ter pelo menos 2 caracteres"),
  password: z.string().min(6, "A senha deve ter pelo menos 6 caracteres"),
  cargo: z.enum(["admin", "agent", "sub"], {
    required_error: "O cargo é obrigatório",
  }),
});

type FormData = z.infer<typeof schema>;

export default function UserPage({ params }: { params: { appid: string } }) {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  const { appid } = params;

  const router = useRouter();

  const onSubmit = async (data: FormData) => {
    const routes = {
      admin: { route: "/admin/login", key: "admin" },
      agent: { route: "/agent/login", key: "agent" },
      sub: { route: "/sub/login", key: "sub" },
    };

    const { route, key } = routes[data.cargo];

    try {
      const response = await api.post(route, {
        username: data.name,
        password: data.password,
      });

      const userData = response.data[key];

      if (userData.desativated) {
        toast.error("Este usuário está desativado");

        return;
      }

      saveToLocalStorage("user", {
        id: userData._id,
        username: userData.username,
        authorization: key,
      });

      saveToLocalStorage("cargo", key);

      router.replace(`/${appid}`);
    } catch (error) {
      console.error("Erro ao fazer login:", error);
      toast.error("Erro ao fazer login. Verifique suas credenciais.");
    }
  };

  return (
    <main className="max-h-screen w-full max-w-[100vw] overflow-hidden h-screen">
      <div className="w-full h-full grid grid-cols-[1.2fr_1fr] gap-4 py-5 px-4">
        <div className="w-full h-full rounded-3xl overflow-hidden ">
          <div className="w-full h-full relative overflow-hidden bg-red-50">
            <div className="w-full h-full absolute top-0 !justify-end py-10 center-col">
              <img
                src="https://res.cloudinary.com/do9d7j6b3/image/upload/v1733803912/WhatsSystem_2_kavgqp.png"
                className="opacity-80 h-[90px] w-auto absolute top-5 left-5"
              />
              <div className="w-full px-5 h-auto center-col space-y-4 mb-5 !items-start text-neutral-300">
                <h2 className="font-poppinsSemiBold text-5xl text-neutral-50">
                  Gerencie sua equipe
                </h2>
                <p className="font-poppinsLight text-[18px] w-[80%] opacity-90">
                  Acesse a nossa plataforma e gerencie suas mensagens de forma
                  eficiente
                </p>
              </div>
            </div>
            <img
              src="https://res.cloudinary.com/do9d7j6b3/image/upload/v1733797376/aaabstract_w6pj7m.jpg"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
        <div className="w-full h-full center">
          <div className="w-[90%] center-col">
            <h1 className="font-poppinsSemiBold text-center text-[44px]">
              Bem vindo à plataforma
            </h1>
            <p className="font-poppinsLight text-center mb-5 mt-3 opacity-90 text-[18px]">
              Por favor, faça login para continuar
            </p>
            <a
              href={`https://api.whatsapp.com/send?phone=557931423677`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full max-w-2xl cursor-pointer shadow-lg mt-7 shadow-gray-100 hover:border-green-500 hover:shadow-green-200 transition-all h-[65px] bg-green-50 rounded-3xl border-green-300 duration-700 border border-solid center space-x-3"
            >
              <FaWhatsapp
                size={34}
                strokeWidth={1}
                className="text-green-900 opacity-75"
              />
              <span className="font-poppinsRegular text-green-900 text-[18px]">
                Solicitar acesso à plataforma
              </span>
            </a>

            <div className="w-full h-[1px] bg-gray-200 my-6 mt-[40px] center">
              <span className="px-2 bg-background">ou</span>
            </div>

            <form
              onSubmit={handleSubmit(onSubmit)}
              className="w-full max-w-2xl mt-6 py-4"
            >
              <SelectField
                label="Entrar como:"
                id="cargo"
                placeholder="Selecione"
                options={[
                  { value: "sub", label: "Supervisão" },
                  { value: "admin", label: "Admin" },
                ]}
                error={errors.cargo}
                onValueChange={(value) =>
                  setValue("cargo", value as "admin" | "agent" | "sub")
                }
                tooltip="Escolha um tipo de usuário"
                onClickTooltip={() =>
                  alert("Mais informações sobre este campo.")
                }
                register={register}
              />
              <InputField
                label="Usuário"
                id="name"
                placeholder="usuário"
                type="text"
                register={register}
                error={errors.name}
              />
              <InputField
                label="Senha"
                id="password"
                placeholder="**********"
                type="password"
                register={register}
                error={errors.password}
              />
              <Button
                type="submit"
                className="w-full p-2 mt-4 text-white h-[55px] rounded-xl font-poppinsLight transition-all"
              >
                Entrar
              </Button>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
}
