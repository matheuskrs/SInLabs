// import axios from "axios";

export async function getAccessProfiles() {
  // const response = await axios.get("url");
  // return response.data;

  return [
    {
      id: 1,
      name: "Administrador",
      description: "Acesso total ao sistema",
      creationDate: "2025-01-15",
      profileStatusId: 1, // Ativo
      permissions: [1, 2, 3, 4, 5, 6],
    },
    {
      id: 2,
      name: "Coordenador",
      description: "Gerencia Laboratórios e usuários",
      creationDate: "2025-02-10",
      profileStatusId: 1, // Ativo
      permissions: [1, 4],
    },
    {
      id: 3,
      name: "Técnico",
      description: "Acesso aos sistemas e downloads",
      creationDate: "2025-03-05",
      profileStatusId: 2, // Inativo
      permissions: [2, 5],
    },
  ];
}

export async function getAccessPermissions() {
  return [
    { id: 1, name: "Gestão de usuários" },
    { id: 2, name: "Gestão de sistemas" },
    { id: 3, name: "Feed de notícias" },
    { id: 4, name: "Gestão de laboratórios" },
    { id: 5, name: "Downloads" },
    { id: 6, name: "Gestão de acessos" },
  ];
}

export async function getProfileStatus() {
  return [
    { id: 1, name: "Ativo", color: "#24b92b" },
    { id: 2, name: "Inativo", color: "#fd2a2a" },
  ];
}
