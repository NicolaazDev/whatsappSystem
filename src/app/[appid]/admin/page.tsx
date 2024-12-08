import { ShieldBan, SquareUser, User } from "lucide-react";
import { use } from "react";

export default function AdminPage({
  params,
}: {
  params: Promise<{ appid: string }>;
}) {
  const { appid } = use(params);

  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-background">
      <h1 className="text-5xl font-poppinsBold mb-4">Painel de Admin</h1>
      <p className="text-xl font-poppinsLight mb-8">
        Escolha o tipo de usu&aacute;rio que deseja adicionar
      </p>
      <div className="flex gap-8">
        <a
          href={`add-admin`}
          className="bg-white cursor-pointer hover:shadow-md transition-all hover:border-green-400 rounded-lg shadow-sm border border-gray-200 border-solid p-14 flex flex-col items-center"
        >
          <ShieldBan size={100} strokeWidth={1} />
          <h2 className="text-2xl font-poppinsSemiBold mt-5">
            Adicionar Admin
          </h2>
          <p className="text-center mt-2">Adicione um novo admin ao sistema</p>
        </a>
        <a
          href={`add-super`}
          className="bg-white cursor-pointer hover:shadow-md transition-all hover:border-green-400 rounded-lg shadow-sm border border-gray-200 border-solid p-14 flex flex-col items-center"
        >
          <SquareUser size={100} strokeWidth={1} />
          <h2 className="text-2xl font-poppinsSemiBold mt-5">
            Adicionar Supervisor
          </h2>
          <p className="text-center mt-2">
            Adicione um novo supervisor ao sistema
          </p>
        </a>
        <a
          href={`add-agent`}
          className="bg-white cursor-pointer hover:shadow-md transition-all hover:border-green-400 rounded-lg shadow-sm border border-gray-200 border-solid p-14 flex flex-col items-center"
        >
          <User size={100} strokeWidth={1} />
          <h2 className="text-2xl font-poppinsSemiBold mt-5">
            Adicionar Agente
          </h2>
          <p className="text-center mt-2">Adicione um novo agente ao sistema</p>
        </a>
      </div>
    </main>
  );
}
