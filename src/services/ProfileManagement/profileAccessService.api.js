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
    {
      id: 4,
      name: "Analista",
      description: "Acompanha métricas e relatórios",
      creationDate: "2025-03-18",
      profileStatusId: 1, // Ativo
      permissions: [3, 6],
    },
    {
      id: 5,
      name: "Supervisor",
      description: "Supervisiona operações laboratoriais",
      creationDate: "2025-04-02",
      profileStatusId: 1, // Ativo
      permissions: [1, 2, 4],
    },
    {
      id: 6,
      name: "Pesquisador",
      description: "Consulta dados e utiliza sistemas específicos",
      creationDate: "2025-04-20",
      profileStatusId: 1, // Ativo
      permissions: [2, 3],
    },
    {
      id: 7,
      name: "Visitante",
      description: "Acesso restrito para visualização",
      creationDate: "2025-05-01",
      profileStatusId: 2, // Inativo
      permissions: [3],
    },
    {
      id: 8,
      name: "Operador",
      description: "Opera sistemas e executa tarefas rotineiras",
      creationDate: "2025-05-14",
      profileStatusId: 1, // Ativo
      permissions: [2, 4, 5],
    },
    {
      id: 9,
      name: "Auditor",
      description: "Acompanha registros e conformidade",
      creationDate: "2025-06-03",
      profileStatusId: 1, // Ativo
      permissions: [3, 6],
    },
    {
      id: 10,
      name: "Gerente de Unidade",
      description: "Gerencia usuários, laboratórios e relatórios",
      creationDate: "2025-06-21",
      profileStatusId: 1, // Ativo
      permissions: [1, 3, 4, 6],
    },
    {
      id: 11,
      name: "Assistente",
      description: "Auxilia nas operações administrativas",
      creationDate: "2025-07-08",
      profileStatusId: 1, // Ativo
      permissions: [1, 3],
    },
    {
      id: 12,
      name: "Consultor",
      description: "Acesso temporário para apoio especializado",
      creationDate: "2025-07-19",
      profileStatusId: 2, // Inativo
      permissions: [2, 6],
    },
    {
      id: 13,
      name: "Monitor",
      description: "Monitora atividades e status dos sistemas",
      creationDate: "2025-08-04",
      profileStatusId: 1, // Ativo
      permissions: [3, 5],
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
