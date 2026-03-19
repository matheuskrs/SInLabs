// import axios from "axios";

export async function getLoginHistory() {
  // const response = await axios.get("api/login-history");
  // return response.data;

  return [
    {
      id: 1,
      user: "Ana Beatriz",
      date: "2026-03-18",
      time: "08:12",
      ip: "10.0.0.21",
      device: "Windows PC",
      status: {
        id: 1,
        name: "Sucesso",
        color: "#24b92b",
      },
    },
    {
      id: 2,
      user: "Carlos Eduardo",
      date: "2026-03-18",
      time: "08:47",
      ip: "10.0.0.34",
      device: "MacBook Pro",
      status: {
        id: 1,
        name: "Sucesso",
        color: "#24b92b",
      },
    },
    {
      id: 3,
      user: "Fernanda Lima",
      date: "2026-03-18",
      time: "09:03",
      ip: "10.0.0.45",
      device: "Ubuntu Desktop",
      status: {
        id: 2,
        name: "Falhou",
        color: "#fd2a2a",
      },
    },
    {
      id: 4,
      user: "Rafael Souza",
      date: "2026-03-17",
      time: "17:26",
      ip: "10.0.0.18",
      device: "Windows Notebook",
      status: {
        id: 1,
        name: "Sucesso",
        color: "#24b92b",
      },
    },
    {
      id: 5,
      user: "Juliana Martins",
      date: "2026-03-17",
      time: "14:11",
      ip: "10.0.0.52",
      device: "iPad",
      status: {
        id: 2,
        name: "Falhou",
        color: "#fd2a2a",
      },
    },
    {
      id: 6,
      user: "Lucas Almeida",
      date: "2026-03-16",
      time: "11:39",
      ip: "10.0.0.61",
      device: "Android Tablet",
      status: {
        id: 1,
        name: "Sucesso",
        color: "#24b92b",
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
      user: "Ana Beatriz",
      device: "Windows PC",
      startTime: "08:12",
      duration: "2h14min",
      ip: "10.0.0.21",
      status: { id: 1, name: "Ativa", color: "#24b92b" },
    },
    {
      id: 2,
      user: "Carlos Eduardo",
      device: "MacBook Pro",
      startTime: "08:47",
      duration: "1h39min",
      ip: "10.0.0.34",
      status: { id: 1, name: "Ativa", color: "#24b92b" },
    },
    {
      id: 3,
      user: "Lucas Almeida",
      device: "Android Tablet",
      startTime: "09:25",
      duration: "56min",
      ip: "10.0.0.61",
      status: { id: 1, name: "Ativa", color: "#24b92b" },
    },
    {
      id: 4,
      user: "Patrícia Rocha",
      device: "Linux PC",
      startTime: "07:58",
      duration: "2h31min",
      ip: "10.0.0.72",
      status: { id: 1, name: "Ativa", color: "#24b92b" },
    },
    {
      id: 5,
      user: "Mariana Souza",
      device: "Windows 11",
      startTime: "09:03",
      duration: "1h12min",
      ip: "10.0.0.18",
      status: { id: 1, name: "Ativa", color: "#24b92b" },
    },
    {
      id: 6,
      user: "Fernando Lima",
      device: "iPad",
      startTime: "08:29",
      duration: "1h54min",
      ip: "10.0.0.43",
      status: { id: 1, name: "Ativa", color: "#24b92b" },
    },
    {
      id: 7,
      user: "Juliana Martins",
      device: "MacBook Air",
      startTime: "09:41",
      duration: "38min",
      ip: "10.0.0.57",
      status: { id: 1, name: "Ativa", color: "#24b92b" },
    },
    {
      id: 8,
      user: "Ricardo Nunes",
      device: "Windows PC",
      startTime: "07:45",
      duration: "2h46min",
      ip: "10.0.0.66",
      status: { id: 1, name: "Ativa", color: "#24b92b" },
    },
    {
      id: 9,
      user: "Camila Ferreira",
      device: "Android Phone",
      startTime: "09:12",
      duration: "49min",
      ip: "10.0.0.79",
      status: { id: 1, name: "Ativa", color: "#24b92b" },
    },
    {
      id: 10,
      user: "Bruno Carvalho",
      device: "Ubuntu Desktop",
      startTime: "08:05",
      duration: "2h06min",
      ip: "10.0.0.84",
      status: { id: 1, name: "Ativa", color: "#24b92b" },
    },
    {
      id: 11,
      user: "Aline Gomes",
      device: "Windows Notebook",
      startTime: "09:27",
      duration: "44min",
      ip: "10.0.0.91",
      status: { id: 1, name: "Ativa", color: "#24b92b" },
    },
    {
      id: 12,
      user: "Thiago Pereira",
      device: "Linux Notebook",
      startTime: "08:54",
      duration: "1h21min",
      ip: "10.0.0.103",
      status: { id: 1, name: "Ativa", color: "#24b92b" },
    },
  ];
}

export async function getDownloadsWeek() {
  // const response = await axios.get("api/downloads/week");
  // return response.data;

  return [
    { day: "Segunda", value: 14 },
    { day: "Terça", value: 18 },
    { day: "Quarta", value: 22 },
    { day: "Quinta", value: 19 },
    { day: "Sexta", value: 31 },
    { day: "Sábado", value: 9 },
    { day: "Domingo", value: 6 },
  ];
}

export async function getDownloadsHistory() {
  // const response = await axios.get("api/downloads/history");
  // return response.data;

  return [
    {
      id: 1,
      user: "Ana Beatriz",
      system: "KinesiOS 360",
      dateTime: "2026-03-18 08:20",
      size: "125 MB",
      status: { id: 1, name: "Completo", color: "#24b92b" },
    },
    {
      id: 2,
      user: "Carlos Eduardo",
      system: "KinesiOS Azure",
      dateTime: "2026-03-18 09:02",
      size: "95 MB",
      status: { id: 1, name: "Completo", color: "#24b92b" },
    },
    {
      id: 3,
      user: "Fernanda Lima",
      system: "KinesiOS One",
      dateTime: "2026-03-18 09:07",
      size: "85 MB",
      status: { id: 2, name: "Falhou", color: "#fd2a2a" },
    },
    {
      id: 4,
      user: "Rafael Souza",
      system: "KinesiOS Balance",
      dateTime: "2026-03-17 16:48",
      size: "78 MB",
      status: { id: 1, name: "Completo", color: "#24b92b" },
    },
    {
      id: 5,
      user: "Juliana Martins",
      system: "KinesiOS Reports",
      dateTime: "2026-03-17 14:25",
      size: "67 MB",
      status: { id: 1, name: "Completo", color: "#24b92b" },
    },
    {
      id: 6,
      user: "Lucas Almeida",
      system: "KinesiOS Neuro",
      dateTime: "2026-03-16 11:44",
      size: "101 MB",
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
      coordinates: "-23.55052,-46.633308",
      status: { id: 1, name: "Ativo", color: "#24b92b" },
      activeUsers: 15,
    },
    {
      id: 2,
      name: "Laboratório Norte",
      city: "Rio de Janeiro",
      coordinates: "-22.906847,-43.172897",
      status: { id: 1, name: "Ativo", color: "#24b92b" },
      activeUsers: 6,
    },
    {
      id: 3,
      name: "Laboratório Minas",
      city: "Belo Horizonte",
      coordinates: "-19.916681,-43.934493",
      status: { id: 1, name: "Ativo", color: "#24b92b" },
      activeUsers: 8,
    },
    {
      id: 4,
      name: "Laboratório Sul",
      city: "Porto Alegre",
      coordinates: "-30.034647,-51.217658",
      status: { id: 2, name: "Inativo", color: "#fd2a2a" },
      activeUsers: 0,
    },
    {
      id: 5,
      name: "Laboratório Nordeste",
      city: "Salvador",
      coordinates: "-12.977749,-38.501629",
      status: { id: 1, name: "Ativo", color: "#24b92b" },
      activeUsers: 4,
    },
    {
      id: 6,
      name: "Laboratório Centro-Oeste",
      city: "Brasília",
      coordinates: "-15.793889,-47.882778",
      status: { id: 1, name: "Ativo", color: "#24b92b" },
      activeUsers: 9,
    },
  ];
}