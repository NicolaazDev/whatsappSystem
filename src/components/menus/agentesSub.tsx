import { useEffect, useState } from "react";

import { Button, Prompt } from "@medusajs/ui";

import api from "@/services/api";

import { ColumnDef } from "@tanstack/react-table";
import { EyeIcon, MoreHorizontal, TrashIcon } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Checkbox } from "@/components/ui/checkbox";

import { DataTableAgents } from "@/components/tables/agents";
import { AddAgentModal } from "@/components/modals/addAgent";
import { AddNumberModal } from "@/components/modals/addNumber";
import { loadFromLocalStorage } from "@/services/storage";

type User = {
  _id: string;
  username: string;
  password: string;
  urlConnection: string;
};

export default function AgentsSub({ appid }: { appid: string }) {
  const [data, setData] = useState<[any] | []>([]);

  const [openPrompt, setOpenPrompt] = useState(false);
  const [selectedAgentId, setSelectedAgentId] = useState<string>("");
  const [selectedAgentId2, setSelectedAgentId2] = useState<string>("");

  const [isOpen, setIsOpen] = useState(false);
  const [isOpenNumber, setIsOpenNumber] = useState(false);

  const onClose = () => {
    setIsOpen(false);
    fetchAgents();
  };

  const getSub = async () => {
    const subId = await loadFromLocalStorage("user");

    return subId.id;
  };

  const onCloseNumber = () => {
    setIsOpenNumber(false);
    fetchAgents();
  };

  useEffect(() => {
    fetchAgents();
  }, []);

  const fetchAgents = async () => {
    const sub = await getSub();

    const res = await api.get(`equipe/sub-agents/${sub}`);

    console.log(res.data);
    setData(res.data.agents);
  };

  const handleDelete = async (agentId: string) => {
    try {
      await api.post(`/application/${appid}/agent`, { agentId });

      fetchAgents();
    } catch (err) {
      console.error(err);
    }
  };

  const columns: ColumnDef<User>[] = [
    {
      id: "select",
      header: ({ table }) => (
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && "indeterminate")
          }
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
        />
      ),
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: "_id",
      header: () => <div className="">#ID</div>,
      cell: ({ row }) => {
        const id: string = row.getValue("_id");
        const formatted = id.slice(-5);

        return <div className="">#{formatted}</div>;
      },
    },
    {
      accessorKey: "username",
      header: "Usuário",
    },
    {
      accessorKey: "email",
      header: "Email",
    },
    {
      accessorKey: "password",
      header: "Senha",
      cell: ({ row }) => {
        const [showPassword, setShowPassword] = useState(false);

        return (
          <div className="flex items-center">
            <span
              style={{ width: "100px" }} // Define uma largura fixa
              className="block text-ellipsis overflow-hidden whitespace-nowrap"
            >
              {showPassword
                ? row.getValue("password") // Mostra a senha
                : "••••••••••••"}
            </span>
            <button
              type="button"
              className="ml-2"
              onClick={() => setShowPassword((prevState) => !prevState)}
            >
              <EyeIcon className="h-4 w-4" />
            </button>
          </div>
        );
      },
    },
    {
      id: "actions",
      cell: ({ row }) => {
        const user = row.original;

        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="secondary" className="h-8 w-8 p-0">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Ações</DropdownMenuLabel>
              <DropdownMenuItem
                onClick={() => navigator.clipboard.writeText(user._id)}
              >
                Copiar ID
              </DropdownMenuItem>

              <DropdownMenuItem
                onClick={() =>
                  navigator.clipboard.writeText(user.urlConnection)
                }
              >
                Copiar Url
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() => {
                  setSelectedAgentId2(user._id);
                  setIsOpenNumber(true);
                }}
              >
                Adicionar número
              </DropdownMenuItem>

              <DropdownMenuSeparator />
              <DropdownMenuItem
                className="text-red-500"
                onClick={() => {
                  setSelectedAgentId(user._id);
                  setOpenPrompt(true);
                }}
              >
                <TrashIcon strokeWidth={1} /> Deletar agente
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];

  return (
    <section className="w-full h-screen  py-5 px-3">
      <Prompt open={openPrompt} onOpenChange={setOpenPrompt}>
        <Prompt.Content>
          <Prompt.Header>
            <Prompt.Title>Deseja deletar?</Prompt.Title>
            <Prompt.Description>
              Você tem certeza que deseja deletar este agente?
            </Prompt.Description>
          </Prompt.Header>
          <Prompt.Footer>
            <Prompt.Cancel onClick={() => setOpenPrompt(false)}>
              Cancelar
            </Prompt.Cancel>
            <Prompt.Action onClick={() => handleDelete(selectedAgentId)}>
              Deletar
            </Prompt.Action>
          </Prompt.Footer>
        </Prompt.Content>
      </Prompt>

      <AddAgentModal appid={appid} isOpen={isOpen} onClose={onClose} />

      {selectedAgentId2 && (
        <AddNumberModal
          agentId={selectedAgentId2}
          isOpen={isOpenNumber}
          onClose={onCloseNumber}
        />
      )}

      <div className="center-col w-full !items-start">
        <h1 className="text-3xl font-poppinsBold">Agentes ( Supervisor )</h1>
        <p className="text-[18px] opacity-80 font-poppinsLight">
          Gerencie, adicione e exclua agentes
        </p>
        <div className="w-full h-[1px] bg-gray-300 mt-2"></div>
      </div>
      <main>
        <div className="w-full center-col mt-8">
          {data && (
            <DataTableAgents
              appId={appid}
              columns={columns}
              data={data}
              setIsOpen={setIsOpen}
              isOpen={isOpen}
            />
          )}
        </div>
      </main>
    </section>
  );
}
