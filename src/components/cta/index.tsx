"use client";

import { ZapIcon } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

const CtaButton = ({ className }: any) => {
  const [hovered, setHovered] = useState(false);

  return (
    <a
      href={`https://api.whatsapp.com/send?phone=+557931423677&text=Ol%C3%A1%2C+estou+interessado+em+conhecer+mais+sobre+a+plataforma.`}
      target="_blank"
      className={`relative bg-green-500 text-background font-poppinsMedium w-[20%] mt-8 py-2 px-8 text-[18px] rounded-[80px] border-green-500 border-[2px] border-solid h-[75px] center hover:border-white transition-all group overflow-hidden ${className}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="absolute inset-0 z-0 left-[50%] translate-x-[-50%] top-[100%] bg-white rounded-full opacity-0 h-[290px] w-[60%] blur-[20px] transition-all duration-1000 group-hover:opacity-100"></div>
      <div className="relative cursor-pointer z-10 w-full flex items-center justify-center h-full overflow-hidden">
        <AnimatePresence mode="wait">
          {hovered ? (
            <motion.div
              key="hovered-text"
              initial={{ y: "100%", opacity: 0 }}
              animate={{ y: "0%", opacity: 1 }}
              exit={{ y: "-100%", opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="absolute cursor-pointer flex items-center font-poppinsRegular"
            >
              <ZapIcon fill="white" className="mr-5 cursor-pointer" />
              Fale Conosco
            </motion.div>
          ) : (
            <motion.div
              key="default-text"
              initial={{ y: "-100%", opacity: 0 }}
              animate={{ y: "0%", opacity: 1 }}
              exit={{ y: "100%", opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="absolute flex font-poppinsRegular cursor-pointer"
            >
              <ZapIcon className="mr-5 cursor-pointer" />
              Pedir um plano
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </a>
  );
};

export default CtaButton;
