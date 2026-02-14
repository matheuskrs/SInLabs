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
function getSharesDb() {
  return [
    {
      id: 1,
      postId: 1,
      userId: 2,
      shareGuid: "2aa7f675e40242b6bd740e86af5b7e82",
      sharedTimes: null,
    },
    {
      id: 2,
      postId: 2,
      userId: 1,
      shareGuid: "bf98b01e32894c119888fc9d6a9ca7fd",
      sharedTimes: null,
    },
    {
      id: 3,
      postId: 3,
      userId: 3,
      shareGuid: "6181959e6c2d45d5a777861b1cffdd33",
      sharedTimes: null,
    },
    {
      id: 4,
      postId: 4,
      userId: 2,
      shareGuid: "642e163e20844837ac6f7acdef77a24a",
      sharedTimes: null,
    },
    {
      id: 5,
      postId: 5,
      userId: 1,
      shareGuid: "5c092b6a086b401f9396941abfc9f08b",
      sharedTimes: null,
    },
  ];
}

function getPostsDb() {
  return [
    {
      id: 1,
      creatorId: 2,
      creatorName: "Thais Morais",
      creatorProfile: "Coordenador",
      userAvatarUrl: Avatar1,
      targetedLaboratory: { id: 1, name: "Laboratório Central" },
      category: { id: 2, name: "Atualização" },
      createdAt: "2026-02-07T09:15:00",
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
      createdAt: "2026-02-06T16:40:00",
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
      createdAt: "2026-02-05T11:05:00",
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
      createdAt: "2026-02-04T14:20:00",
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
      createdAt: "2026-02-03T10:02:00",
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
        text: "Depois dessa correção no Downloads, aqui parou de travar na hora de abrir a lista. Boa!",
      },
      {
        id: 102,
        parentCommentId: 101,
        mentionedUsername: "Camila Alves",
        user: { id: 3, name: "Ana Antunes", avatarUrl: Avatar2 },
        text: "Confirmo. Antes ficava carregando infinito às vezes, agora abriu bem mais rápido.",
      },
      {
        id: 103,
        parentCommentId: 101,
        mentionedUsername: "Ana Antunes",
        user: { id: 2, name: "Thais Morais", avatarUrl: Avatar1 },
        text: "Top! Se notarem algum erro pontual ainda, me avisem com horário e laboratório pra eu rastrear.",
      },
    ],
    2: [
      {
        id: 201,
        parentCommentId: null,
        mentionedUsername: null,
        user: { id: 2, name: "Thais Morais", avatarUrl: Avatar1 },
        text: "Beleza! Vou validar no ambiente interno e tentar reproduzir qualquer comportamento estranho.",
      },
      {
        id: 202,
        parentCommentId: 201,
        mentionedUsername: "Thais Morais",
        user: { id: 1, name: "Camila Alves", avatarUrl: Avatar },
        text: "Perfeito. Se acontecer algo, manda print e os passos pra equipe técnica analisar.",
      },
    ],
    3: [
      {
        id: 301,
        parentCommentId: null,
        mentionedUsername: null,
        user: { id: 1, name: "Camila Alves", avatarUrl: Avatar },
        text: "Obrigado pelo aviso! Vou alinhar com o pessoal pra evitar acessos no horário e monitorar.",
      },
    ],
    4: [
      {
        id: 401,
        parentCommentId: null,
        mentionedUsername: null,
        user: { id: 3, name: "Ana Antunes", avatarUrl: Avatar2 },
        text: "Vai ter material com checklist dessas boas práticas? Ajuda pra repassar pro time.",
      },
      {
        id: 402,
        parentCommentId: 401,
        mentionedUsername: "Ana Antunes",
        user: { id: 2, name: "Thais Morais", avatarUrl: Avatar1 },
        text: "Sim! Vou gravar e depois posto no feed com o link e um resumo das principais dicas.\nAh! Se não for pedir demais, não esquece de avisar pro seu time para que na sequência iniciem o treinamento do processo de associação de permissões dos usuários.",
      },
    ],
    5: [
      {
        id: 501,
        parentCommentId: null,
        mentionedUsername: null,
        user: { id: 2, name: "Thais Morais", avatarUrl: Avatar1 },
        text: "Essa melhoria no fluxo já ajudou bastante aqui!",
      },
    ],
  };
}

export async function getFeed() {
  return getPostsDb();
}

export async function getPostById(postId) {
  const posts = getPostsDb();
  return posts.find((p) => p.id === postId) ?? null;
}

export async function getShareByGuid(shareGuid) {
  const shares = getSharesDb();
  return shares.find((s) => s.shareGuid === shareGuid) ?? null;
}

export async function getSharedPostByGuid(shareGuid) {
  const share = await getShareByGuid(shareGuid);
  if (!share) return null;

  const post = await getPostById(share.postId);
  if (!post) return null;

  return {
    share,
    post: { ...post, isSharedPost: true, sharedLabel: "Post compartilhado" },
  };
}

export function extractShareGuidFromSearch(search) {
  const params = new URLSearchParams(search || "");
  return params.get("shared");
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

export function getShareUrlForPost(postId) {
  const shares = getSharesDb();
  const share = shares.find((s) => s.postId === postId);

  if (!share) return null;

  const origin = window.location.origin;
  return `${origin}/feed?shared=${share.shareGuid}`;
}
