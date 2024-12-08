export const MocksChat = {
  agents: [
    {
      id: "agent_1",
      name: "João Silva",
      phoneNumber: "+5511999999999",
      messages: [
        {
          id: "msg_1",
          from: "+5511988888888",
          to: "+5511999999999",
          type: "text",
          content: "Olá, tudo bem?",
          status: "received",
          timestamp: "2024-12-01T14:30:00Z",
        },
        {
          id: "msg_2",
          from: "+5511999999999",
          to: "+5511988888888",
          type: "text",
          content: "Tudo ótimo, e você?",
          status: "sent",
          timestamp: "2024-12-01T14:31:00Z",
        },
        {
          id: "msg_3",
          from: "+5511988888888",
          to: "+5511999999999",
          type: "image",
          content: "https://example.com/image.jpg",
          status: "received",
          timestamp: "2024-12-01T14:35:00Z",
        },
      ],
    },
    {
      id: "agent_2",
      name: "Maria Oliveira",
      phoneNumber: "+5511977777777",
      messages: [
        {
          id: "msg_4",
          from: "+5511966666666",
          to: "+5511977777777",
          type: "text",
          content: "Oi, já chegou o pedido?",
          status: "received",
          timestamp: "2024-12-01T14:00:00Z",
        },
        {
          id: "msg_5",
          from: "+5511977777777",
          to: "+5511966666666",
          type: "text",
          content: "Sim, chegou agora mesmo!",
          status: "sent",
          timestamp: "2024-12-01T14:02:00Z",
        },
      ],
    },
  ],
};
