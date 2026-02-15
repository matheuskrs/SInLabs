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

export async function getActiveSessions() {
  // const response = await axios.get("api/active-sessions");
  // return response.data;

  return [
    {
      id: 1,
      user: "João Silva",
      device: "Windows PC",
      startTime: "10:30",
      duration: "1h30min",
      ip: "192.168.1.10",
      status: { id: 1, name: "Ativa", color: "#24b92b" },
    },
    {
      id: 2,
      user: "Maria Santos",
      device: "MacBook",
      startTime: "11:00",
      duration: "1h00min",
      ip: "192.168.1.15",
      status: { id: 1, name: "Ativa", color: "#24b92b" },
    },
  ];
}

export async function getDownloadsWeek() {
  // const response = await axios.get("api/downloads/week");
  // return response.data;

  return [
    { day: "Segunda", value: 10 },
    { day: "Terça", value: 20 },
    { day: "Quarta", value: 15 },
    { day: "Quinta", value: 28 },
    { day: "Sexta", value: 25 },
    { day: "Sábado", value: 7 },
    { day: "Domingo", value: 5 },
  ];
}

export async function getDownloadsHistory() {
  // const response = await axios.get("api/downloads/history");
  // return response.data;

  return [
    {
      id: 1,
      user: "João Silva",
      system: "KinesiOS 360",
      dateTime: "2025-10-22 10:35",
      size: "125 MB",
      status: { id: 1, name: "Completo", color: "#24b92b" },
    },
    {
      id: 2,
      user: "Maria Santos",
      system: "KinesiOS One",
      dateTime: "2025-10-21 15:20",
      size: "85 MB",
      status: { id: 1, name: "Completo", color: "#24b92b" },
    },
    {
      id: 3,
      user: "Pedro Costa",
      system: "KinesiOS Azure",
      dateTime: "2025-10-20 09:10",
      size: "95 MB",
      status: { id: 2, name: "Falhou", color: "#fd2a2a" },
    },
  ];
}

export async function getLabsMap() {
  // const response = await axios.get("api/labs-map");
  // return response.data;

  return [
    {
      id: 1,
      name: "Laboratório Central",
      city: "São Paulo",
      status: { id: 1, name: "Ativo", color: "#24b92b" },
      activeUsers: 12,
    },
    {
      id: 2,
      name: "Laboratório Norte",
      city: "Rio de Janeiro",
      status: { id: 2, name: "Inativo", color: "#fd2a2a" },
      activeUsers: 0,
    },
    {
      id: 3,
      name: "Laboratório Minas",
      city: "Belo Horizonte",
      status: { id: 1, name: "Ativo", color: "#24b92b" },
      activeUsers: 5,
    },
    {
      id: 4,
      name: "Laboratório Sul",
      city: "Porto Alegre",
      status: { id: 1, name: "Ativo", color: "#24b92b" },
      activeUsers: 3,
    },
    {
      id: 5,
      name: "Laboratório Nordeste",
      city: "Salvador",
      status: { id: 2, name: "Inativo", color: "#fd2a2a" },
      activeUsers: 0,
    },
    {
      id: 6,
      name: "Laboratório Centro-Oeste",
      city: "Brasília",
      status: { id: 1, name: "Ativo", color: "#24b92b" },
      activeUsers: 7,
    },
  ];
}
