import api from "@/services/api";

const getAgent = async (username: string) => {
  const response = await api.get(`/agent/${username}`);

  return response.data;
};

const getQrCode = async () => {
  const response = await api.get(`/whatsapp/generate-qrcode`);

  return response.data;
};

type tParams = Promise<{ agent: string }>;

export default async function AgentPage(props: { params: tParams }) {
  const { agent: agentName } = await props.params;

  const agent = await getAgent(agentName);
  const qrCode = await getQrCode();

  console.log(agent);
  console.log(qrCode);

  return (
    <main className="hero w-full h-screen center-col">
      <h1 className="text-5xl font-poppinsBold mb-4">Conecte seu agente</h1>
      <p className="text-xl font-poppinsLight mb-8">
        Escanei o QR Code para se conectar ao agente
      </p>
      <div className="grid grid-cols-2 gap-4 mt-4">
        <div className="center-col border border-solid h-[500px] border-gray-200 rounded-lg p-4">
          <div className="w-48 h-48 rounded-full overflow-hidden">
            <img
              src="https://ionicframework.com/docs/img/demos/avatar.svg"
              alt="Avatar"
              className="w-full h-full object-cover"
            />
          </div>
          <h2 className="text-2xl font-bold mt-4">{agent.agent.username}</h2>
          <p className="text-lg">{agent.agent.email}</p>
        </div>
        <div className="border border-solid border-gray-200 rounded-lg p-4">
          <img
            src={qrCode.qrCodeBase64}
            alt="QR Code"
            className="w-full h-full object-contain"
          />
        </div>
      </div>
    </main>
  );
}
