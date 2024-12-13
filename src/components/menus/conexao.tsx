import { useEffect, useState } from "react";

import api from "@/services/api";

export default function QrConnection({ appid }: { appid: string }) {
  const [data, setData] = useState<[any] | []>([]);

  useEffect(() => {
    fetchAdmins();
  }, []);

  const fetchAdmins = async () => {
    const res = await api.get(`application/${appid}/admins`);
    setData(res.data);
  };

  return (
    <section className="w-full h-screen  py-5 px-3">
      <div className="center-col w-full !items-start">
        <h1 className="text-3xl font-poppinsBold">Admins</h1>
        <p className="text-[18px] opacity-80 font-poppinsLight">
          Gerencie, adicione e exclua admins
        </p>
        <div className="w-full h-[1px] bg-gray-300 mt-2"></div>
      </div>
      <main></main>
    </section>
  );
}
