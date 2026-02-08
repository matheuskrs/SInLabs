// feedService.api.js
// import axios from "axios";

import Avatar from "~/assets/Users/Avatar.jpg";
import Avatar1 from "~/assets/Users/Avatar1.jpg";
import Avatar2 from "~/assets/Users/Avatar2.jpg";
import postImg1 from "~/assets/Feed/Post1.jpg";
export async function getFeedCategories() {
  return [
    { id: 1, name: "Anúncio" },
    { id: 2, name: "Atualização" },
    { id: 3, name: "Evento" },
    { id: 4, name: "Aviso" },
  ];
}

export async function getFeed() {
  // const response = await axios.get("url");
  // return response.data;

  return [
    {
      id: 1,
      creatorId: 2,
      creatorName: "Thais Morais",
      creatorProfile: "Coordenador",
      userAvatarUrl: Avatar1,
      targetedLaboratory: { id: 1, name: "Laboratório Central" },
      category: { id: 2, name: "Atualização" },
      createdAt: "2026-02-07 09:15",
      text: "Atualização aplicada no módulo de downloads: melhorias de estabilidade e correção de falhas intermitentes no carregamento.",
      postImg: postImg1,
      likesCount: 18,
      commentsCount: 3,
      isLikedByMe: false,
    },
    {
      id: 2,
      creatorId: 1,
      creatorName: "Camila Alves",
      creatorProfile: "Administrador",
      userAvatarUrl: Avatar,
      targetedLaboratory: { id: 3, name: "Laboratório Minas" },
      category: { id: 1, name: "Anúncio" },
      createdAt: "2026-02-06 16:40",
      text: "Novo sistema disponível para testes no ambiente interno. Caso identifique qualquer comportamento inesperado, reporte para a equipe técnica.",
      postImg: null,
      likesCount: 42,
      commentsCount: 12,
      isLikedByMe: true,
    },
    {
      id: 3,
      creatorId: 3,
      creatorName: "Ana Antunes",
      creatorProfile: "Técnico",
      userAvatarUrl: Avatar2,
      targetedLaboratory: null,
      category: { id: 4, name: "Aviso" },
      createdAt: "2026-02-05 11:05",
      text: "Manutenção programada hoje às 19:00. O acesso ao sistema pode sofrer pequenas instabilidades durante esse período.",
      postImg: postImg1,
      likesCount: 9,
      commentsCount: 1,
      isLikedByMe: false,
    },
    {
      id: 4,
      creatorId: 2,
      creatorName: "Thais Morais",
      creatorProfile: "Coordenador",
      userAvatarUrl: Avatar1,
      targetedLaboratory: { id: 2, name: "Laboratório Norte" },
      category: { id: 3, name: "Evento" },
      createdAt: "2026-02-04 14:20",
      text: "Treinamento rápido amanhã sobre boas práticas no cadastro de usuários e organização dos laboratórios.",
      postImg: postImg1,
      likesCount: 25,
      commentsCount: 6,
      isLikedByMe: false,
    },
    {
      id: 5,
      creatorId: 1,
      creatorName: "Camila Alves",
      creatorProfile: "Administrador",
      userAvatarUrl: Avatar,
      targetedLaboratory: { id: 6, name: "Laboratório Centro-Oeste" },
      category: { id: 2, name: "Atualização" },
      createdAt: "2026-02-03 10:02",
      text: "Ajuste no fluxo de autenticação: melhoria nos logs e tratamento mais claro de falhas de sessão.",
      postImg: null,
      likesCount: 14,
      commentsCount: 2,
      isLikedByMe: false,
    },
  ];
}
