// import axios from "axios";

export async function getLoginHistory() {
  // const response = await axios.get("api/login-history");
  // return response.data;

  return [
    {
      id: 1,
      user: "João Silva",
      date: "2025-10-22",
      time: "10:30",
      ip: "192.168.1.10",
      device: "Windows PC",
      status: {
        id: 1,
        name: "Sucesso",
        color: "#24b92b",
      },
    },
    {
      id: 2,
      user: "Maria Santos",
      date: "2025-10-22",
      time: "09:15",
      ip: "192.168.1.15",
      device: "MacBook",
      status: {
        id: 1,
        name: "Sucesso",
        color: "#24b92b",
      },
    },
    {
      id: 3,
      user: "Pedro Costa",
      date: "2025-10-21",
      time: "16:45",
      ip: "192.168.1.20",
      device: "Linux PC",
      status: {
        id: 2,
        name: "Falhou",
        color: "#fd2a2a",
      },
    },
  ];
}

export async function getLoginStatus() {
  // const response = await axios.get("api/login-status");
  // return response.data;

  return [
    { id: 1, name: "Sucesso", color: "#24b92b" },
    { id: 2, name: "Falhou", color: "#fd2a2a" },
  ];
}
