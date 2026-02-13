// import axios from "axios";

import Avatar from "~/assets/Users/Avatar.jpg";
import Avatar1 from "~/assets/Users/Avatar1.jpg";
import Avatar2 from "~/assets/Users/Avatar2.jpg";
import postImg1 from "~/assets/Feed/Post1.jpg";
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export async function getFeedCategories() {
  return [
    { id: 1, name: "Anúncio" },
    { id: 2, name: "Atualização" },
    { id: 3, name: "Evento" },
    { id: 4, name: "Aviso" },
  ];
}

export async function getFeed() {
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
      commentsCount: 2,
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
      commentsCount: 2,
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
      commentsCount: 1,
      isLikedByMe: false,
    },
  ];
}

function getCommentsDb() {
  return {
    1: [
      {
        id: 101,
        parentCommentId: null,
        mentionedUsername: null,
        user: { id: 1, name: "Camila Alves", avatarUrl: Avatar },
        text: "Sim! Aqui estabilizou bastante.",
      },
      {
        id: 102,
        parentCommentId: 101,
        mentionedUsername: "Camila Alves",
        user: { id: 3, name: "Ana Antunes", avatarUrl: Avatar2 },
        text: "Que bom. Estava precisando mesmo!",
      },
      {
        id: 103,
        parentCommentId: 101,
        mentionedUsername: "Ana Antunes",
        user: { id: 2, name: "Thais Morais", avatarUrl: Avatar1 },
        text: "Notaram melhora no tempo de carregamento?",
      },
    ],
    2: [
      {
        id: 201,
        parentCommentId: null,
        mentionedUsername: null,
        user: { id: 2, name: "Thais Morais", avatarUrl: Avatar1 },
        text: "Vou testar hoje à noite!",
      },
      {
        id: 202,
        parentCommentId: 201,
        mentionedUsername: "Thais Morais",
        user: { id: 1, name: "Camila Alves", avatarUrl: Avatar },
        text: "Fico no aguardo do feedback.",
      },
    ],
    3: [
      {
        id: 301,
        parentCommentId: null,
        mentionedUsername: null,
        user: { id: 1, name: "Camila Alves", avatarUrl: Avatar },
        text: "Ok, avisarei o time.",
      },
    ],
    4: [
      {
        id: 401,
        parentCommentId: null,
        mentionedUsername: null,
        user: { id: 3, name: "Ana Antunes", avatarUrl: Avatar2 },
        text: "O treinamento vai ser gravado?",
      },
      {
        id: 402,
        parentCommentId: 401,
        mentionedUsername: "Ana Antunes",
        user: { id: 2, name: "Thais Morais", avatarUrl: Avatar1 },
        text: "Sim, mando o link no feed depois.",
      },
    ],
    5: [
      {
        id: 501,
        parentCommentId: null,
        mentionedUsername: null,
        user: { id: 1, name: "Camila Alves", avatarUrl: Avatar },
        text: "Qualquer dúvida, estou a disposição!",
      },
    ],
  };
}

export async function getPostComments(postId) {
  await sleep(900);
  const db = getCommentsDb();
  const all = db[postId] ?? [];

  const parents = all.filter((c) => c.parentCommentId === null);

  const repliesCountByParentId = all.reduce((acc, c) => {
    if (c.parentCommentId !== null) {
      acc[c.parentCommentId] = (acc[c.parentCommentId] ?? 0) + 1;
    }
    return acc;
  }, {});

  return parents.map((p) => ({
    ...p,
    repliesCount: repliesCountByParentId[p.id] ?? 0,
  }));
}

export async function getPostCommentReplies(postId, parentCommentId) {
  await sleep(900);
  const db = getCommentsDb();
  const all = db[postId] ?? [];
  return all.filter((c) => c.parentCommentId === parentCommentId);
}
