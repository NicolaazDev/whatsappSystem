"use client";

import CtaButton from "@/components/cta";
import { CheckIcon, CircleCheck, XCircle } from "lucide-react";
import React from "react";

export default function PricingSection() {
  return (
    <section id="precos" className="bg-background w-full py-16 text-foreground">
      <div className=" mx-auto text-center px-6 center-col">
        <div className="w-full center-col container">
          <h2 className="text-center title-section font-bold mb-6 text-foreground">
            Tenha acesso a plataforma
          </h2>
          <p className="text-center text-foreground opacity-80 text-lg w-[70%]">
            Selecione um plano de acordo com sua necessidade
          </p>
        </div>
        <div className="w-[75%] grid grid-cols-3 mt-10 gap-x-3">
          <div className="px-2 border border-solid border-gray-900 hover:border-[1px] transition-all hover:border-green-500 rounded-2xl relative">
            <div className="bg-white/20 p-4 rounded-2xl">
              <div className="center w-full space-x-2 !justify-start">
                <span className="bg-green-200 text-green-500 font-poppinsRegular text-[16px] whitespace-nowrap px-4 py-1 rounded-3xl">
                  20% OFF
                </span>
                <span className="bg-gray-800 text-gray-200 font-poppinsRegular text-[16px] whitespace-nowrap px-4 py-1 rounded-3xl">
                  Suporte Mensal
                </span>
              </div>
              <div className="center-col w-full !items-start">
                <h2 className="text-3xl mt-5 font-poppinsBlack uppercase text-foreground">
                  Plano Basic
                </h2>
                <h1 className="center-col !items-start text-accent my-5">
                  <span className="text-[18px] uppercase">Por</span>
                  <span className="text-5xl  font-sans font-black text-accent">
                    R$ 29,00
                  </span>
                </h1>
              </div>
              <div className="w-full center-col !justify-start">
                <p className="text-start">
                  Plano ideal para quem deseja criar um sistema inicial.
                </p>
              </div>
              <div className="w-full h-[1px] bg-gray-300 my-5"></div>
              <ul className="w-full center-col !items-start space-y-2">
                <li className="center space-x-2">
                  <CircleCheck
                    className="text-green-500 min-h-[27px] min-w-[27px]"
                    fill="#8ff8a6"
                    strokeWidth={1}
                    size={27}
                  />
                  <p className="text-start">5 Agentes</p>
                </li>
                <li className="center space-x-2">
                  <CircleCheck
                    className="text-green-500 min-h-[27px] min-w-[27px]"
                    fill="#8ff8a6"
                    strokeWidth={1}
                    size={27}
                  />
                  <p className="text-start">Backup automático</p>
                </li>
                <li className="center space-x-2">
                  <CircleCheck
                    className="text-green-500 min-h-[27px] min-w-[27px]"
                    fill="#8ff8a6"
                    strokeWidth={1}
                    size={27}
                  />
                  <p className="text-start">Equipes Ilimitadas</p>
                </li>
                <li className="center space-x-2">
                  <CircleCheck
                    className="text-green-500 min-h-[27px] min-w-[27px]"
                    fill="#8ff8a6"
                    strokeWidth={1}
                    size={27}
                  />
                  <p className="text-start">Admins e Supervisores Ilimitados</p>
                </li>
                <li className="center space-x-2">
                  <XCircle
                    className="text-red-500 min-h-[27px] min-w-[27px]"
                    fill="#f88f8f"
                    strokeWidth={1}
                    size={27}
                  />
                  <p className="text-start">Suporte via e-mail​</p>
                </li>
              </ul>
            </div>
          </div>
          <div className="px-2 border border-solid border-gray-900 hover:border-[1px] transition-all hover:border-green-500 rounded-2xl relative">
            <div className="bg-white/20 p-4 rounded-2xl">
              <div className="center w-full space-x-2 !justify-start">
                <span className="bg-green-200 text-green-500 font-poppinsRegular text-[16px] whitespace-nowrap px-4 py-1 rounded-3xl">
                  20% OFF
                </span>
                <span className="bg-gray-800 text-gray-200 font-poppinsRegular text-[16px] whitespace-nowrap px-4 py-1 rounded-3xl">
                  Suporte Mensal
                </span>
              </div>
              <div className="center-col w-full !items-start">
                <h2 className="text-3xl mt-5 font-poppinsBlack uppercase text-foreground">
                  Plano Pro
                </h2>
                <h1 className="center-col !items-start text-accent my-5">
                  <span className="text-[18px] uppercase">Por</span>
                  <span className="text-5xl  font-sans font-black text-accent">
                    R$ 79,00
                  </span>
                </h1>
              </div>
              <div className="w-full center-col !justify-start">
                <p className="text-start">
                  Plano ideal para quem já possui uma equipe de agentes média.
                </p>
              </div>
              <div className="w-full h-[1px] bg-gray-300 my-5"></div>
              <ul className="w-full center-col !items-start space-y-2">
                <li className="center space-x-2">
                  <CircleCheck
                    className="text-green-500 min-h-[27px] min-w-[27px]"
                    fill="#8ff8a6"
                    strokeWidth={1}
                    size={27}
                  />
                  <p className="text-start">10 Agentes</p>
                </li>
                <li className="center space-x-2">
                  <CircleCheck
                    className="text-green-500 min-h-[27px] min-w-[27px]"
                    fill="#8ff8a6"
                    strokeWidth={1}
                    size={27}
                  />
                  <p className="text-start">Backup automático</p>
                </li>
                <li className="center space-x-2">
                  <CircleCheck
                    className="text-green-500 min-h-[27px] min-w-[27px]"
                    fill="#8ff8a6"
                    strokeWidth={1}
                    size={27}
                  />
                  <p className="text-start">Equipes Ilimitadas</p>
                </li>
                <li className="center space-x-2">
                  <CircleCheck
                    className="text-green-500 min-h-[27px] min-w-[27px]"
                    fill="#8ff8a6"
                    strokeWidth={1}
                    size={27}
                  />
                  <p className="text-start">Admins e Supervisores Ilimitados</p>
                </li>
                <li className="center space-x-2">
                  <CircleCheck
                    className="text-green-500 min-h-[27px] min-w-[27px]"
                    fill="#8ff8a6"
                    strokeWidth={1}
                    size={27}
                  />
                  <p className="text-start">Suporte via e-mail​</p>
                </li>
              </ul>
            </div>
          </div>
          <div className="px-2 border border-solid border-gray-900 hover:border-[1px] transition-all hover:border-green-500 rounded-2xl relative">
            <div className="bg-white/20 p-4 rounded-2xl">
              <div className="center w-full space-x-2 !justify-start">
                <span className="bg-green-200 text-green-500 font-poppinsRegular text-[16px] whitespace-nowrap px-4 py-1 rounded-3xl">
                  20% OFF
                </span>
                <span className="bg-gray-800 text-gray-200 font-poppinsRegular text-[16px] whitespace-nowrap px-4 py-1 rounded-3xl">
                  Suporte Mensal
                </span>
              </div>
              <div className="center-col w-full !items-start">
                <h2 className="text-3xl mt-5 font-poppinsBlack uppercase text-foreground">
                  Plano Enterprise
                </h2>
                <h1 className="center-col !items-start text-accent my-5">
                  <span className="text-[18px] uppercase">Por</span>
                  <span className="text-5xl  font-sans font-black text-accent">
                    R$ 129,00
                  </span>
                </h1>
              </div>
              <div className="w-full center-col !justify-start">
                <p className="text-start">
                  Plano ideal para quem possui uma equipe de agentes grande.
                </p>
              </div>
              <div className="w-full h-[1px] bg-gray-300 my-5"></div>
              <ul className="w-full center-col !items-start space-y-2">
                <li className="center space-x-2">
                  <CircleCheck
                    className="text-green-500 min-h-[27px] min-w-[27px]"
                    fill="#8ff8a6"
                    strokeWidth={1}
                    size={27}
                  />
                  <p className="text-start">20 Agentes</p>
                </li>
                <li className="center space-x-2">
                  <CircleCheck
                    className="text-green-500 min-h-[27px] min-w-[27px]"
                    fill="#8ff8a6"
                    strokeWidth={1}
                    size={27}
                  />
                  <p className="text-start">Backup automático</p>
                </li>
                <li className="center space-x-2">
                  <CircleCheck
                    className="text-green-500 min-h-[27px] min-w-[27px]"
                    fill="#8ff8a6"
                    strokeWidth={1}
                    size={27}
                  />
                  <p className="text-start">Equipes Ilimitadas</p>
                </li>
                <li className="center space-x-2">
                  <CircleCheck
                    className="text-green-500 min-h-[27px] min-w-[27px]"
                    fill="#8ff8a6"
                    strokeWidth={1}
                    size={27}
                  />
                  <p className="text-start">Admins e Supervisores Ilimitados</p>
                </li>
                <li className="center space-x-2">
                  <CircleCheck
                    className="text-green-500 min-h-[27px] min-w-[27px]"
                    fill="#8ff8a6"
                    strokeWidth={1}
                    size={27}
                  />
                  <p className="text-start">Suporte via e-mail e whatsapp​</p>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <CtaButton className="!w-[50%] mx-auto !h-[64px] " />
      </div>
    </section>
  );
}
