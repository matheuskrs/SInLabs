export function formatRelativeDate(dateString) {
  if (!dateString) return "";

  const normalized = dateString.includes("T")
    ? dateString
    : dateString.replace(" ", "T");

  const date = new Date(normalized);
  const now = new Date();

  const diffMs = now - date;
  const diffSeconds = Math.floor(diffMs / 1000);
  const diffMinutes = Math.floor(diffSeconds / 60);
  const diffHours = Math.floor(diffMinutes / 60);
  const diffDays = Math.floor(diffHours / 24);
  const diffWeeks = Math.floor(diffDays / 7);
  const diffMonths = Math.floor(diffDays / 30);
  const diffYears = Math.floor(diffDays / 365);

  if (diffSeconds < 60) return "agora mesmo";

  if (diffMinutes === 1) return "1 minuto atrás";
  if (diffMinutes < 60) return `${diffMinutes} minutos atrás`;

  if (diffHours === 1) return "1 hora atrás";
  if (diffHours < 24) return `${diffHours} horas atrás`;

  if (diffDays === 1) return "ontem";
  if (diffDays < 7) return `${diffDays} dias atrás`;

  if (diffWeeks === 1) return "1 semana atrás";
  if (diffWeeks < 4) return `${diffWeeks} semanas atrás`;

  if (diffMonths === 1) return "1 mês atrás";
  if (diffMonths < 12) return `${diffMonths} meses atrás`;

  if (diffYears === 1) return "1 ano atrás";
  if (diffYears < 100) return `${diffYears} anos atrás`;

  return date.toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}
