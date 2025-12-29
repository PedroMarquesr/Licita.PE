export function getBiddingDisplayStatus(bidding) {
  console.log("BIDDING RECEBIDA:", bidding)
  console.log("STATUS RECEBIDO:", bidding.status)

  const now = new Date()
  const disputeDate = bidding.disputeDate?.toDate?.()

  console.log("DISPUTE DATE:", disputeDate)
  console.log("NOW:", now)

  if (!disputeDate) return "Data inválida"

  if (bidding.status === "scheduled" && disputeDate < now) {
    return "Aguardando atualização"
  }

  switch (bidding.status) {
    case "scheduled":
      return "Agendada"
    case "suspended":
      return "Suspensa"
    case "rescheduled":
      return "Reagendada"
    case "cancelled":
      return "Cancelada"
    case "finished":
      return "Finalizada"
    default:
      return "Status desconhecido"
  }
}
