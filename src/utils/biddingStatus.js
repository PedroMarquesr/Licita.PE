// export function getBiddingDisplayStatus(bidding) {
//   const now = new Date()
//   const disputeDate = bidding.disputeDate?.toDate?.()

//   if (!disputeDate) return "Data inválida"

//   if (bidding.status === "scheduled" && disputeDate < now) {
//     return "Aguardando atualização"
//   }

//   switch (bidding.status) {
//     case "scheduled":
//       return "Agendada"
//     case "suspended":
//       return "Suspensa"
//     case "rescheduled":
//       return "Reagendada"
//     case "cancelled":
//       return "Cancelada"
//     case "finished":
//       return "Finalizada"
//     default:
//       return "Status desconhecido"
//   }
// }
export function getBiddingDisplayStatus(bidding) {
  const now = new Date();

  const disputeDate =
    bidding.disputeDate?.toDate?.() ||
    (bidding.disputeDate instanceof Date ? bidding.disputeDate : null);

  if (!disputeDate) return "Data inválida";

  if (bidding.status === "scheduled" && disputeDate < now) {
    return "Aguardando atualização";
  }

  switch (bidding.status) {
    case "scheduled":
      return "Agendada";
    case "suspended":
      return "Suspensa";
    case "rescheduled":
      return "Reagendada";
    case "cancelled":
      return "Cancelada";
    case "finished":
      return "Finalizada";
    default:
      return "Status desconhecido";
  }
}
