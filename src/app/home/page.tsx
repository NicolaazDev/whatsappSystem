import CtaButton from "@/components/cta";
import { CheckIcon, CircleCheck, CircleX, XIcon } from "lucide-react";

export default function Home() {
  return (
    <main className="overflow-hidden hero">
      <div className="max-w-[1440px] relative mx-auto py-4 h-screen center-col">
        <div className="w-full">
          <div className="center-col mt-10">
            {/* <h1 className="font-futuraExtraBold uppercase text-[70px] leading-[1] text-center">
              Faça<span className="text-green-500"> Backup</span> de suas
              mensagens, conecte WhatsApp ao seu serviço.
            </h1> */}

            <div className="h-[400px] mt-10 w-full gap-4  grid grid-cols-3">
              <div className="bg-white rounded-[10px] overflow-hidden shadow-sm">
                <div className="w-full bg-foreground text-white px-5 py-5">
                  <h3 className="font-poppinsSemiBold text-2xl">Básico</h3>
                </div>

                <div className="w-full  text-green-500 px-5 py-5 center !justify-start !items-end">
                  <h3 className="font-poppinsSemiBold text-5xl">R$ 29,00</h3>
                  <span className="ml-2">Mensais</span>
                </div>

                <ul className="p-5 text-[16px]">
                  <li className="flex items-center gap-2 py-2 font-poppinsLight">
                    <CircleCheck className="text-green-500" />
                    <span>5 Agentes</span>
                  </li>
                  {/* <li className="flex items-center gap-2 py-2 font-poppinsLight">
                    <CircleCheck className="text-green-500" />
                    <span>Até 500 mensagens por dia</span>
                  </li> */}
                  <li className="flex items-center gap-2 py-2 font-poppinsLight">
                    <CircleCheck className="text-green-500" />
                    <span>Backup automático</span>
                  </li>
                  <li className="flex items-center gap-2 py-2 font-poppinsLight">
                    <CircleX className="text-red-500" />
                    <span>Suporte via e-mail</span>
                  </li>
                </ul>
              </div>

              <div className="bg-white rounded-[10px] overflow-hidden shadow-sm">
                <div className="w-full bg-foreground text-white px-5 py-5">
                  <h3 className="font-poppinsSemiBold text-2xl">Pro</h3>
                </div>

                <div className="w-full  text-green-500 px-5 py-5 center !justify-start !items-end">
                  <h3 className="font-poppinsSemiBold text-5xl">R$ 49,00</h3>
                  <span className="ml-2">Mensais</span>
                </div>

                <ul className="p-5 text-[16px]">
                  <li className="flex items-center gap-2 py-2 font-poppinsLight">
                    <CircleCheck className="text-green-500" />
                    <span>10 Agentes</span>
                  </li>
                  {/* <li className="flex items-center gap-2 py-2 font-poppinsLight">
                    <CircleCheck className="text-green-500" />
                    <span>Até 1.500 mensagens por dia</span>
                  </li> */}
                  <li className="flex items-center gap-2 py-2 font-poppinsLight">
                    <CircleCheck className="text-green-500" />
                    <span>Backup automático</span>
                  </li>
                  <li className="flex items-center gap-2 py-2 font-poppinsLight">
                    <CircleCheck className="text-green-500" />
                    <span>Suporte via e-mail</span>
                  </li>
                </ul>
              </div>

              <div className="bg-white rounded-[10px] overflow-hidden shadow-sm">
                <div className="w-full bg-foreground text-white px-5 py-5">
                  <h3 className="font-poppinsSemiBold text-2xl">Enterprise</h3>
                </div>

                <div className="w-full  text-green-500 px-5 py-5 center !justify-start !items-end">
                  <h3 className="font-poppinsSemiBold text-5xl">R$ 199,00</h3>
                  <span className="ml-2">Mensais</span>
                </div>

                <ul className="p-5 text-[16px]">
                  <li className="flex items-center gap-2 py-2 font-poppinsLight">
                    <CircleCheck className="text-green-500" />
                    <span>20 Agentes</span>
                  </li>
                  {/* <li className="flex items-center gap-2 py-2 font-poppinsLight">
                    <CircleCheck className="text-green-500" />
                    <span>Até 5.000 mensagens por dia</span>
                  </li> */}
                  <li className="flex items-center gap-2 py-2 font-poppinsLight">
                    <CircleCheck className="text-green-500" />
                    <span>Backup automático</span>
                  </li>
                  <li className="flex items-center gap-2 py-2 font-poppinsLight">
                    <CircleCheck className="text-green-500" />
                    <span>Suporte via e-mail e whatsapp</span>
                  </li>
                </ul>
              </div>
            </div>

            <CtaButton />
          </div>
        </div>
      </div>
    </main>
  );
}
