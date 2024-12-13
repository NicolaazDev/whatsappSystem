"use client";

import { Button } from "@/components/ui/button";
import { Button as ButtonUI } from "@medusajs/ui";

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { useState } from "react";

import { Input } from "@medusajs/ui";

import { AnimatePresence, motion } from "framer-motion";
import api from "@/services/api";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  setIsOpen: any;
  isOpen: boolean;
}

export function DataTableEquipes<TData, TValue>({
  columns,
  data,
  isOpen,
  setIsOpen,
}: DataTableProps<TData, TValue>) {
  const [rowSelection, setRowSelection] = useState({});

  console.log(data);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    onRowSelectionChange: setRowSelection,
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
    state: {
      rowSelection,
    },
  });

  const downloadBackupAgents = async (selectedAgent: any) => {
    if (selectedAgent.length < 2) {
      console.log(selectedAgent);

      try {
        const agent = await api.get(`/agent/id/${selectedAgent[0]}`);

        const response = await api.get(`/agent/${selectedAgent[0]}/backup`, {
          responseType: "blob",
        });

        console.log(agent);

        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute(
          "download",
          `backup_agent_${agent.data.agent.phoneNumbers[0]}.zip`
        );
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        console.log("Backup baixado com sucesso.");
      } catch (error) {
        console.error("Erro ao baixar o backup:", error);
      }
    } else {
      try {
        const response = await api.post(
          "/agent/multiple-backup",
          { ids: selectedAgent },
          { responseType: "blob" }
        );

        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", "conversas.zip");
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        console.log("Backup baixado com sucesso.");
      } catch (error) {
        console.error("Erro ao baixar o backup:", error);
      }
    }
  };

  return (
    <div className="w-full">
      <div className="flex-1 text-sm text-muted-foreground">
        {table.getFilteredSelectedRowModel().rows.length} de{" "}
        {table.getFilteredRowModel().rows.length} colunas(s) selecionados.
      </div>
      <div className="w-full mt-5 mb-5 center !justify-start space-x-2 relative">
        <div className="w-[400px]">
          <Input
            placeholder="Pesquisar equipe"
            type="search"
            className="font-poppinsRegular"
            value={
              (table.getColumn("username")?.getFilterValue() as string) ?? ""
            }
            onChange={(event) =>
              table.getColumn("username")?.setFilterValue(event.target.value)
            }
          />
        </div>
        <div className="space-x-2 center">
          <ButtonUI
            onClick={() => setIsOpen(true)}
            className="font-poppinsRegular px-5"
          >
            Adicionar equipe
          </ButtonUI>
          <AnimatePresence>
            {table.getFilteredSelectedRowModel().rows.length > 0 ? (
              <motion.div
                key="download-report"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ duration: 0.3 }}
                className="absolute right-0"
              >
                <ButtonUI
                  variant="secondary"
                  className="bg-blue-300 text-blue-800 hover:!bg-blue-300 border border-solid border-blue-400 font-poppinsRegular px-5"
                  onClick={() => {
                    // Função que faz o merge dos agentes
                    const mergeAgents = () => {
                      const allAgents = new Set<string>();

                      data.forEach((team: any) => {
                        team.agents.forEach((agentId: string) => {
                          allAgents.add(agentId);
                        });
                      });

                      return Array.from(allAgents);
                    };

                    // Chama a função para obter todos os agentes únicos
                    const uniqueAgents = mergeAgents();

                    console.log(uniqueAgents); // Aqui você pode verificar os IDs de agentes únicos

                    // Agora você pode usar uniqueAgents para o que precisar, por exemplo:
                    downloadBackupAgents(uniqueAgents); // Se você precisar passar os agentes para uma função de download
                  }}
                >
                  Baixar Relatório
                </ButtonUI>
              </motion.div>
            ) : null}
          </AnimatePresence>
        </div>
      </div>
      <div className="rounded-md border w-full">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  Sem resultados.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="center !justify-start space-x-2 py-4">
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          Anterior
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          Próxima
        </Button>
      </div>
    </div>
  );
}