// import axios from "axios";
import Avatar from "~/assets/Users/Avatar.jpg";
import Avatar1 from "~/assets/Users/Avatar1.jpg";
import Avatar2 from "~/assets/Users/Avatar2.jpg";
import Default from "~/assets/Users/Default.png";

export async function getUsers() {
  // const response = await axios.get("url");
  // return response.data;

  return [
    {
      id: 1,
      name: "Camila Alves",
      avatarUrl: Avatar,
      email: "camila.alves@unesp.com.br",
      profile: "Administrador",
      profileId: 1,
      laboratories: [
        { id: 1, name: "Laboratório Central" },
        { id: 3, name: "Laboratório Minas" },
      ],
      status: { id: 1, name: "Ativo", color: "#24b92b" },
      lastAccess: "2025-01-15",
    },
    {
      id: 2,
      name: "Thais Morais",
      avatarUrl: Avatar1,
      email: "thais.morais@unesp.com.br",
      profile: "Coordenador",
      profileId: 2,
      laboratories: [{ id: 2, name: "Laboratório Norte" }],
      status: { id: 2, name: "Inativo", color: "#fd2a2a" },
      lastAccess: "2025-02-10",
    },
    {
      id: 3,
      name: "Ana Antunes",
      avatarUrl: Avatar2,
      email: "ana.antunes@unesp.com.br",
      profile: "Técnico",
      profileId: 3,
      laboratories: [
        { id: 3, name: "Laboratório Minas" },
        { id: 6, name: "Laboratório Centro-Oeste" },
      ],
      status: { id: 1, name: "Ativo", color: "#24b92b" },
      lastAccess: "2025-03-05",
    },
    {
      id: 4,
      name: "Bruno Ferreira",
      avatarUrl: Default,
      email: "bruno.ferreira@unesp.com.br",
      profile: "Analista",
      profileId: 4,
      laboratories: [{ id: 4, name: "Laboratório Sul" }],
      status: { id: 1, name: "Ativo", color: "#24b92b" },
      lastAccess: "2025-03-18",
    },
    {
      id: 5,
      name: "Juliana Rocha",
      avatarUrl: Default,
      email: "juliana.rocha@unesp.com.br",
      profile: "Supervisor",
      profileId: 5,
      laboratories: [
        { id: 1, name: "Laboratório Central" },
        { id: 5, name: "Laboratório Nordeste" },
      ],
      status: { id: 1, name: "Ativo", color: "#24b92b" },
      lastAccess: "2025-04-02",
    },
    {
      id: 6,
      name: "Marcos Vinicius",
      avatarUrl: Default,
      email: "marcos.vinicius@unesp.com.br",
      profile: "Pesquisador",
      profileId: 6,
      laboratories: [{ id: 6, name: "Laboratório Centro-Oeste" }],
      status: { id: 1, name: "Ativo", color: "#24b92b" },
      lastAccess: "2025-04-20",
    },
    {
      id: 7,
      name: "Fernanda Lima",
      avatarUrl: Default,
      email: "fernanda.lima@unesp.com.br",
      profile: "Visitante",
      profileId: 7,
      laboratories: [{ id: 2, name: "Laboratório Norte" }],
      status: { id: 2, name: "Inativo", color: "#fd2a2a" },
      lastAccess: "2025-05-01",
    },
    {
      id: 8,
      name: "Ricardo Souza",
      avatarUrl: Default,
      email: "ricardo.souza@unesp.com.br",
      profile: "Operador",
      profileId: 8,
      laboratories: [
        { id: 3, name: "Laboratório Minas" },
        { id: 4, name: "Laboratório Sul" },
      ],
      status: { id: 1, name: "Ativo", color: "#24b92b" },
      lastAccess: "2025-05-14",
    },
    {
      id: 9,
      name: "Patricia Gomes",
      avatarUrl: Default,
      email: "patricia.gomes@unesp.com.br",
      profile: "Auditor",
      profileId: 9,
      laboratories: [{ id: 1, name: "Laboratório Central" }],
      status: { id: 1, name: "Ativo", color: "#24b92b" },
      lastAccess: "2025-06-03",
    },
    {
      id: 10,
      name: "Eduardo Martins",
      avatarUrl: Default,
      email: "eduardo.martins@unesp.com.br",
      profile: "Gerente de Unidade",
      profileId: 10,
      laboratories: [
        { id: 5, name: "Laboratório Nordeste" },
        { id: 6, name: "Laboratório Centro-Oeste" },
      ],
      status: { id: 1, name: "Ativo", color: "#24b92b" },
      lastAccess: "2025-06-21",
    },
    {
      id: 11,
      name: "Larissa Mendes",
      avatarUrl: Default,
      email: "larissa.mendes@unesp.com.br",
      profile: "Assistente",
      profileId: 11,
      laboratories: [{ id: 2, name: "Laboratório Norte" }],
      status: { id: 1, name: "Ativo", color: "#24b92b" },
      lastAccess: "2025-07-08",
    },
    {
      id: 12,
      name: "Gustavo Nunes",
      avatarUrl: Default,
      email: "gustavo.nunes@unesp.com.br",
      profile: "Consultor",
      profileId: 12,
      laboratories: [{ id: 4, name: "Laboratório Sul" }],
      status: { id: 2, name: "Inativo", color: "#fd2a2a" },
      lastAccess: "2025-07-19",
    }
  ];
}

export async function getUserStatus() {
  // const response = await axios.get("url");
  // return response.data;
  return [
    { id: 1, name: "Ativo" },
    { id: 2, name: "Inativo" },
  ];
}
