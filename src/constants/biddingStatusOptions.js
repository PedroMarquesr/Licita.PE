export const initialBiddingStatusOptions = [
  { label: "Aprovar", value: "scheduled" },
  { label: "Rejeitar", value: "rejected" },
]
export const biddingStatusOptions = [
  { label: "Aguardando Aprovação", value: "awaiting_approval" },
  { label: "Agendada", value: "scheduled" },
  { label: "Suspensa", value: "suspended" },
  { label: "Reaberta", value: "reopened" },
  { label: "Finalizada", value: "finished" },
  { label: "Cancelada", value: "cancelled" },
]
export const biddingStatusAfterApproval = [
  { label: "Voltar a etapa de aprovação", value: "awaiting_approval" },

  { label: "Suspensa", value: "suspended" },
  { label: "Finalizada", value: "finished" },
  { label: "Cancelada", value: "cancelled" },
  { label: "Reaberta", value: "reopened" },
]
