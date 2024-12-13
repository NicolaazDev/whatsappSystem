import { useEffect, useState } from "react";

import { Button, Prompt } from "@medusajs/ui";

import { AddSuperModal } from "@/components/modals/addSuper";
import { DataTableSupers } from "@/components/tables/supers";

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

type User = {
  _id: string;
  username: string;
  password: string;
};

export default function Supers({ appid }: { appid: string }) {
  const [data, setData] = useState<[any] | []>([]);

  const [openPrompt, setOpenPrompt] = useState(false);
  const [SelectSubId, setSelectSubId] = useState<string>("");
  const [isOpen, setIsOpen] = useState(false);

  const onClose = () => {
    setIsOpen(false);
    fetchSubs();
  };

  useEffect(() => {
    fetchSubs();
  }, []);

  const fetchSubs = async () => {
    const res = await api.get(`application/${appid}/subs`);
    setData(res.data);
  };

  const handleDelete = async (subId: string) => {
    try {
      await api.post(`application/${appid}/sub`, { subId });

      fetchSubs();
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
                onClick={() => navigator.clipboard.writeText(user.password)}
              >
                Copiar senha
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                className="text-red-500"
                onClick={() => {
                  setSelectSubId(user._id);
                  setOpenPrompt(true);
                }}
              >
                <TrashIcon strokeWidth={1} /> Deletar supervisor
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
              Você tem certeza que deseja deletar este supervisor?
            </Prompt.Description>
          </Prompt.Header>
          <Prompt.Footer>
            <Prompt.Cancel onClick={() => setOpenPrompt(false)}>
              Cancelar
            </Prompt.Cancel>
            <Prompt.Action onClick={() => handleDelete(SelectSubId)}>
              Deletar
            </Prompt.Action>
          </Prompt.Footer>
        </Prompt.Content>
      </Prompt>

      <AddSuperModal appid={appid} isOpen={isOpen} onClose={onClose} />

      <div className="center-col w-full !items-start">
        <h1 className="text-3xl font-poppinsBold">Supervisores</h1>
        <p className="text-[18px] opacity-80 font-poppinsLight">
          Gerencie, adicione e exclua supervisores
        </p>
        <div className="w-full h-[1px] bg-gray-300 mt-2"></div>
      </div>
      <main>
        <div className="w-full center-col mt-8">
          {data && (
            <DataTableSupers
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
