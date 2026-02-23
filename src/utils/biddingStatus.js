export function getBiddingDisplayStatus(bidding) {
  const now = new Date()

  const disputeDate =
    bidding.disputeDate?.toDate?.() ||
    (bidding.disputeDate instanceof Date ? bidding.disputeDate : null)

  if (!disputeDate) return "Data inválida"

  if (bidding.status === "scheduled" && disputeDate < now) {
    return "Aguardando atualização"
  }

  switch (bidding.status) {
    case "awaiting_approval":
      return "Aguardando aprovação"
    case "scheduled":
      return disputeDate < now ? "Aguardando atualização" : "Agendada"
    case "suspended":
      return "Suspensa"
    case "rescheduled":
      return "Reagendada"
    case "cancelled":
      return "Cancelada"
    case "finished":
      return "Finalizada"
    case "rejected":
      return "Rejeitado"
    default:
      return "Status desconhecido"
  }
}
