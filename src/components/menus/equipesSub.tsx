import { useEffect, useState } from "react";

import { Button, Prompt } from "@medusajs/ui";

import { AddEquipeModal } from "@/components/modals/addEquipe";
import { DataTableEquipes } from "@/components/tables/equipes";

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
import { loadFromLocalStorage } from "@/services/storage";
type User = {
  _id: string;
  username: string;
  password: string;
};

export default function EquipesSub({ appid }: { appid: string }) {
  const [data, setData] = useState<[any] | []>([]);

  const [openPrompt, setOpenPrompt] = useState(false);
  const [selectEquipesId, setSelectEquipesId] = useState<string>("");
  const [isOpen, setIsOpen] = useState(false);

  const onClose = () => {
    setIsOpen(false);
    fetchEquipes();
  };

  const getSub = async () => {
    const subId = await loadFromLocalStorage("user");

    return subId.id;
  };

  useEffect(() => {
    fetchEquipes();
  }, []);

  const fetchEquipes = async () => {
    const sub = await getSub();

    const res = await api.get(`equipe/sub/${sub}`);
    console.log(res.data);
    setData(res.data.equipes);
  };

  const handleDelete = async (equipeId: string) => {
    try {
      await api.post(`application/${appid}/equipe`, { equipeId });

      fetchEquipes();
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
      accessorKey: "name",
      header: "Nome",
    },
    {
      accessorKey: "agents.length",
      header: "Agentes",
    },
    {
      accessorKey: "description",
      header: "Descrição",
    },
    {
      accessorKey: "sub.username",
      header: "Supervisor",
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

              <DropdownMenuSeparator />
              {/* <DropdownMenuItem
                className="text-red-500"
                onClick={() => {
                  setSelectEquipesId(user._id);
                  setOpenPrompt(true);
                }}
              >
                <TrashIcon strokeWidth={1} /> Deletar equipe
              </DropdownMenuItem> */}
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
              Você tem certeza que deseja deletar esta equipe?
            </Prompt.Description>
          </Prompt.Header>
          <Prompt.Footer>
            <Prompt.Cancel onClick={() => setOpenPrompt(false)}>
              Cancelar
            </Prompt.Cancel>
            <Prompt.Action onClick={() => handleDelete(selectEquipesId)}>
              Deletar
            </Prompt.Action>
          </Prompt.Footer>
        </Prompt.Content>
      </Prompt>

      <AddEquipeModal appid={appid} isOpen={isOpen} onClose={onClose} />

      <div className="center-col w-full !items-start">
        <h1 className="text-3xl font-poppinsBold">Equipes ( Supervisor )</h1>
        <p className="text-[18px] opacity-80 font-poppinsLight">
          Gerencie, adicione e exclua equipes
        </p>
        <div className="w-full h-[1px] bg-gray-300 mt-2"></div>
      </div>
      <main>
        <div className="w-full center-col mt-8">
          {data && (
            <DataTableEquipes
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
