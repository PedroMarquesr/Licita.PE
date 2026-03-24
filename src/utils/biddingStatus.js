export const getBiddingDisplayStatus = (bidding) => {
  if (bidding.isWinner === true) {
    return "Vencida";
  }

  if (bidding.status === "finished") {
    return "Finalizada";
  }

  if (bidding.status === "scheduled") {
    return "Agendada";
  }

  if (bidding.status === "awaiting_approval") {
    return "Aguardando aprovação";
  }

  if (bidding.status === "in_progress") {
    return "Em andamento";
  }

  if (bidding.status === "suspended") {
    return "Suspensa";
  }

  return bidding.status || "Pendente";
};
