"use client";

import {
  Area,
  AreaChart,
  CartesianGrid,
  Tooltip,
  XAxis,
  YAxis,
  Legend,
} from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

// Mapeia os nomes para cores específicas
const colorMapping: { [key: string]: string } = {
  Agentes: "#4ade80", // Verde
  Administradores: "#f87171", // Vermelho
  Supervisores: "#38bdf8", // Azul
  Equipes: "#fbbf24", // Amarelo
  Mensagens: "#e5e7eb", // Cinza
};

export function UsersAreaChart({ chartData }: { chartData: any }) {
  console.log(chartData);

  const totalValue = chartData.reduce((acc: number, curr: any) => {
    const values = Object.keys(curr)
      .filter((key) => colorMapping[key]) // Filtra apenas as chaves mapeadas
      .map((key) => curr[key]); // Obtém os valores dessas chaves

    return acc + values.reduce((sum, value) => sum + value, 0); // Soma os valores filtrados
  }, 0);

  return (
    <Card className="px-5 py-4 w-full mt-3 overflow-hidden">
      <CardHeader className="!p-0 !py-3">
        <CardTitle>Consumo do sistema</CardTitle>
        <CardDescription>Veja o consumo do sistema</CardDescription>
      </CardHeader>
      <CardContent className="w-full  !p-0 !my-3">
        <AreaChart
          width={1300}
          height={300}
          data={chartData}
          style={{ width: "100%" }}
          margin={{ top: 20, right: 20, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          {chartData.map((entry: any) => (
            <Area
              key={entry.name}
              type="monotone"
              dataKey={entry.name}
              stroke={colorMapping[entry.name] || "#ccc"}
              fill={colorMapping[entry.name] || "#ccc"}
              name={entry.name}
            />
          ))}
        </AreaChart>
      </CardContent>
      <CardFooter className="center text-sm !p-0 !py-4 border border-gray-200 border-solid rounded-md">
        <h2 className="">Total de usuários: {totalValue}</h2>
      </CardFooter>
    </Card>
  );
}
