// "use client"

// import {
//   Flex,
//   Stack,
//   Box,
//   Tag,
//   Text,
//   Grid,
//   Badge,
//   Separator,
// } from "@chakra-ui/react"
// import { collection, getDocs } from "firebase/firestore"
// import { db } from "@/components/libs/firebaseinit"
// import { useState, useEffect } from "react"

// import CustomItemGrid from "./components/CustomItemGrid/CustomItemGrid"
// import CustomTitleColumn from "./components/CustomTitleColumn/CustomTitleColumn"
// import { base } from "motion/react-client"

// export default function BiddingCalendar() {
//   const [biddings, setBiddings] = useState([])

//   useEffect(() => {
//     async function fetchBiddings() {
//       const snapshot = await getDocs(collection(db, "biddings"))
//       const data = snapshot.docs.map((doc) => ({
//         id: doc.id,
//         ...doc.data(),
//       }))
//       setBiddings(data)
//     }
//     fetchBiddings()
//   }, [])

//   function toDate(value) {
//     if (!value) return null
//     if (value.toDate) return value.toDate()
//     return new Date(value)
//   }

//   const sortedBiddings = [...biddings].sort((a, b) => {
//     return toDate(b.disputeDate) - toDate(a.disputeDate)
//   })

//   function groupByDate(biddings) {
//     const grouped = {}

//     biddings.forEach((bidding) => {
//       const date = toDate(bidding.disputeDate)
//       if (!date) return

//       const key = date.toLocaleDateString("pt-BR")

//       if (!grouped[key]) {
//         grouped[key] = []
//       }
//       grouped[key].push(bidding)
//     })
//     return grouped
//   }

//   function formatTime(value) {
//     const date = toDate(value)
//     if (!date) return "Horário não definido"

//     return date.toLocaleTimeString("pt-BR", {
//       hour: "2-digit",
//       minute: "2-digit",
//     })
//   }

//   const groupedBiddings = groupByDate(sortedBiddings)
//   const gridTemplate = {
//     base: "1fr",
//     md: "1.2fr 2.5fr 1.5fr 1.5fr 1.2fr 1.5fr 1.2fr 2fr 1fr 1fr",
//   }
//   return (
//     <>
//       <Flex direction="column" gap={4} w={"100%"}>
//         {Object.entries(groupedBiddings).map(([date, items]) => (
//           <Box key={date} _hover={{ backgroundColor: "gray.100" }}>
//             <Flex bg="blue.200" p={1} borderRadius={"10px"}>
//               <Text fontWeight="bold">{date}</Text>
//             </Flex>
//             <Grid
//               templateColumns={gridTemplate}
//               gap={3}
//               alignItems="center"
//               display={{ base: "none", md: "grid" }}
//             >
//               <CustomTitleColumn TitleColumn="Código" />
//               <CustomTitleColumn TitleColumn="Órgão" />
//               <CustomTitleColumn TitleColumn="Processo" />
//               <CustomTitleColumn TitleColumn="Modalidade" />
//               <CustomTitleColumn TitleColumn="Modo" />
//               <CustomTitleColumn TitleColumn="Flag" />
//               <CustomTitleColumn TitleColumn="Cod Portal" />
//               <CustomTitleColumn TitleColumn="Portal" />
//               <CustomTitleColumn TitleColumn="Horário" />
//               <CustomTitleColumn TitleColumn="Status" />
//             </Grid>

//             {items.map((bidding) => (
//               <Stack
//                 pt={"2"}
//                 _hover={{ backgroundColor: "blue.100" }}
//                 key={bidding.id}
//               >
//                 <Grid
//                   templateColumns={{
//                     base: "8, 1fr",
//                     md: "1.2fr 2.5fr 1.5fr 1.5fr 1.2fr 1.5fr 1.2fr 2fr 1fr 1fr",
//                   }}
//                   gap={3}
//                   alignContent="center"
//                   alignItems="center"
//                 >
//                   <CustomItemGrid
//                     titleColumn={"Código: "}
//                     textGrid={bidding.identificationNumber}
//                     color={"blue.600"}
//                     fontWeight={"bold"}
//                   />
//                   <CustomItemGrid
//                     titleColumn={"Órgão: "}
//                     textGrid={bidding.responsibleAgency}
//                     color="gray.700"
//                   />
//                   <CustomItemGrid
//                     titleColumn={"Processo: "}
//                     textGrid={bidding.processNumber}
//                     display={{ base: "none", md: "block" }}
//                   />
//                   <CustomItemGrid
//                     titleColumn={"Modalidade: "}
//                     textGrid={bidding.biddingType}
//                   />
//                   <CustomItemGrid
//                     titleColumn={"Modo: "}
//                     textGrid={bidding.modality}
//                   />

//                   <CustomItemGrid
//                     titleColumn={"Flag: "}
//                     textGrid={
//                       bidding.tags
//                         ? bidding.tags.map((item, index) => (
//                             <Badge
//                               key={`${bidding.id}-tag-${index}`}
//                               colorPalette={
//                                 item === "Acompanhamento"
//                                   ? "purple"
//                                   : item === "Alta Prioridade"
//                                   ? "red"
//                                   : "green"
//                               }
//                               mr={1}
//                             >
//                               {item}
//                             </Badge>
//                           ))
//                         : "sem observações"
//                     }
//                   />
//                   <CustomItemGrid
//                     titleColumn={"Cod Portal: "}
//                     textGrid={bidding.portalAgencyCode}
//                   />

//                   <CustomItemGrid
//                     titleColumn={"Portal: "}
//                     textGrid={bidding.disputePortalName}
//                   />

//                   <CustomItemGrid
//                     titleColumn={"Horário: "}
//                     textGrid={`⏰ ${formatTime(bidding.disputeDate)}`}
//                   />
//                   <CustomItemGrid titleColumn={"Status: "} />
//                 </Grid>

//                 <Separator borderColor="gray.300" />
//               </Stack>
//             ))}
//           </Box>
//         ))}
//       </Flex>
//     </>
//   )
// }

// "use client"

// import {
//   Flex,
//   Stack,
//   Box,
//   Text,
//   Grid,
//   Badge,
//   Separator,
//   Spinner,
//   Alert,
// } from "@chakra-ui/react"
// import { collection, getDocs } from "firebase/firestore"
// import { db } from "@/components/libs/firebaseinit"
// import { useState, useEffect } from "react"

// import CustomItemGrid from "./components/CustomItemGrid/CustomItemGrid"
// import CustomTitleColumn from "./components/CustomTitleColumn/CustomTitleColumn"

// export default function BiddingCalendar() {
//   const [biddings, setBiddings] = useState([])
//   const [loading, setLoading] = useState(true)

//   useEffect(() => {
//     async function fetchBiddings() {
//       try {
//         setLoading(true)
//         const snapshot = await getDocs(collection(db, "biddings"))
//         const data = snapshot.docs.map((doc) => ({
//           id: doc.id,
//           ...doc.data(),
//         }))
//         setBiddings(data)
//       } catch (error) {
//         console.error("Erro ao buscar dados:", error)
//       } finally {
//         setLoading(false)
//       }
//     }
//     fetchBiddings()
//   }, [])

//   // Função para criar Date a partir dos campos separados
//   function getDisputeDateTime(bidding) {
//     const { disputeDate, disputeTime } = bidding

//     // Caso antigo (Timestamp Firestore)
//     if (disputeDate?.toDate) {
//       return disputeDate.toDate()
//     }

//     // Caso novo (strings HTML)
//     if (typeof disputeDate === "string" && disputeDate.trim() !== "") {
//       const time =
//         disputeTime && disputeTime.trim() !== "" ? disputeTime : "00:00"
//       const date = new Date(`${disputeDate}T${time}`)

//       if (!isNaN(date)) return date
//     }

//     return null
//   }

//   function toDate(value) {
//     if (!value) return null
//     if (value.toDate) return value.toDate()
//     if (value.seconds) return new Date(value.seconds * 1000)
//     return new Date(value)
//   }

//   // Ordena por data de disputa
//   const sortedBiddings = [...biddings].sort((a, b) => {
//     const dateA = getDisputeDateTime(a)
//     const dateB = getDisputeDateTime(b)

//     if (!dateA && !dateB) return 0
//     if (!dateA) return 1 // Sem data vai para o final
//     if (!dateB) return -1

//     return dateB - dateA // Mais recente primeiro
//   })

//   function groupByDate(biddings) {
//     const grouped = {}
//     const noDateGroup = "Sem data definida"

//     biddings.forEach((bidding) => {
//       const date = getDisputeDateTime(bidding)

//       let key
//       if (!date) {
//         key = noDateGroup
//       } else {
//         // Formata como DD/MM/YYYY
//         const day = String(date.getDate()).padStart(2, "0")
//         const month = String(date.getMonth() + 1).padStart(2, "0")
//         const year = date.getFullYear()
//         key = `${day}/${month}/${year}`
//       }

//       if (!grouped[key]) {
//         grouped[key] = []
//       }
//       grouped[key].push(bidding)
//     })

//     return grouped
//   }

//   function formatTime(bidding) {
//     const date = getDisputeDateTime(bidding)
//     if (!date) return "Horário não definido"

//     return date.toLocaleTimeString("pt-BR", {
//       hour: "2-digit",
//       minute: "2-digit",
//     })
//   }

//   const groupedBiddings = groupByDate(sortedBiddings)

//   const gridTemplate = {
//     base: "1fr",
//     md: "1.2fr 2.5fr 1.5fr 1.5fr 1.2fr 1.5fr 1.2fr 2fr 1fr 1fr",
//   }

//   if (loading) {
//     return (
//       <Flex justify="center" align="center" h="200px">
//         <Spinner size="xl" color="blue.500" />
//       </Flex>
//     )
//   }

//   return (
//     <Flex direction="column" gap={4} w="100%">
//       {Object.keys(groupedBiddings).length === 0 ? (
//         <Alert status="info" borderRadius="md">
//           Nenhum pregão encontrado.
//         </Alert>
//       ) : (
//         Object.entries(groupedBiddings).map(([date, items]) => (
//           <Box
//             key={date}
//             _hover={{ backgroundColor: "gray.50" }}
//             borderRadius="md"
//           >
//             <Flex
//               bg={date === "Sem data definida" ? "gray.200" : "blue.100"}
//               p={3}
//               borderTopRadius="md"
//             >
//               <Text
//                 fontWeight="bold"
//                 color={date === "Sem data definida" ? "gray.700" : "blue.800"}
//               >
//                 {date}
//               </Text>
//             </Flex>

//             {/* Cabeçalho para desktop */}
//             <Grid
//               templateColumns={gridTemplate}
//               gap={3}
//               alignItems="center"
//               p={3}
//               display={{ base: "none", md: "grid" }}
//               bg="gray.50"
//             >
//               <CustomTitleColumn TitleColumn="Código" />
//               <CustomTitleColumn TitleColumn="Órgão" />
//               <CustomTitleColumn TitleColumn="Processo" />
//               <CustomTitleColumn TitleColumn="Modalidade" />
//               <CustomTitleColumn TitleColumn="Modo" />
//               <CustomTitleColumn TitleColumn="Flag" />
//               <CustomTitleColumn TitleColumn="Cod Portal" />
//               <CustomTitleColumn TitleColumn="Portal" />
//               <CustomTitleColumn TitleColumn="Horário" />
//               <CustomTitleColumn TitleColumn="Status" />
//             </Grid>

//             {items.map((bidding) => (
//               <Box
//                 key={bidding.id}
//                 p={3}
//                 _hover={{ backgroundColor: "blue.50" }}
//                 borderBottomWidth="1px"
//                 borderBottomColor="gray.200"
//               >
//                 <Grid
//                   templateColumns={{
//                     base: "1fr",
//                     md: "1.2fr 2.5fr 1.5fr 1.5fr 1.2fr 1.5fr 1.2fr 2fr 1fr 1fr",
//                   }}
//                   gap={3}
//                   alignItems="center"
//                 >
//                   <CustomItemGrid
//                     titleColumn="Código: "
//                     textGrid={bidding.identificationNumber}
//                     color="blue.600"
//                     fontWeight="bold"
//                   />
//                   <CustomItemGrid
//                     titleColumn="Órgão: "
//                     textGrid={bidding.responsibleAgency}
//                     color="gray.700"
//                   />
//                   <CustomItemGrid
//                     titleColumn="Processo: "
//                     textGrid={bidding.processNumber}
//                     display={{ base: "none", md: "block" }}
//                   />
//                   <CustomItemGrid
//                     titleColumn="Modalidade: "
//                     textGrid={bidding.biddingType}
//                   />
//                   <CustomItemGrid
//                     titleColumn="Modo: "
//                     textGrid={bidding.modality}
//                   />
//                   <CustomItemGrid
//                     titleColumn="Flag: "
//                     textGrid={
//                       bidding.tags && bidding.tags.length > 0
//                         ? bidding.tags.map((item, index) => (
//                             <Badge
//                               key={`${bidding.id}-tag-${index}`}
//                               colorScheme={
//                                 item === "Acompanhamento"
//                                   ? "purple"
//                                   : item === "Alta Prioridade"
//                                   ? "red"
//                                   : "green"
//                               }
//                               mr={1}
//                               mb={1}
//                             >
//                               {item}
//                             </Badge>
//                           ))
//                         : "sem observações"
//                     }
//                   />
//                   <CustomItemGrid
//                     titleColumn="Cod Portal: "
//                     textGrid={bidding.portalAgencyCode}
//                   />
//                   <CustomItemGrid
//                     titleColumn="Portal: "
//                     textGrid={bidding.disputePortalName}
//                   />
//                   <CustomItemGrid
//                     titleColumn="Horário: "
//                     textGrid={`⏰ ${formatTime(bidding)}`}
//                   />
//                   <CustomItemGrid
//                     titleColumn="Status: "
//                     textGrid={bidding.status || "Pendente"}
//                     color={
//                       bidding.status === "Concluído"
//                         ? "green.500"
//                         : "orange.500"
//                     }
//                   />
//                 </Grid>
//               </Box>
//             ))}
//           </Box>
//         ))
//       )}
//     </Flex>
//   )
// }
"use client"

import { Flex, Box, Text, Grid, Badge, Spinner, Alert } from "@chakra-ui/react"
import { collection, getDocs } from "firebase/firestore"
import { db } from "@/components/libs/firebaseinit"
import { useState, useEffect } from "react"
import CustomItemGrid from "./components/CustomItemGrid/CustomItemGrid"
import CustomTitleColumn from "./components/CustomTitleColumn/CustomTitleColumn"

export default function BiddingCalendar() {
  const [biddings, setBiddings] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchBiddings() {
      try {
        setLoading(true)
        const snapshot = await getDocs(collection(db, "biddings"))
        const data = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }))
        setBiddings(data)
      } catch (error) {
        console.error("Erro ao buscar dados:", error)
      } finally {
        setLoading(false)
      }
    }
    fetchBiddings()
  }, [])

  // Função para converter Timestamp para Date
  const toDate = (timestamp) => {
    if (!timestamp) return null
    // Se for Timestamp do Firestore
    if (timestamp.toDate) {
      return timestamp.toDate()
    }
    // Se for objeto com seconds (outro formato)
    if (timestamp.seconds) {
      return new Date(timestamp.seconds * 1000)
    }
    return null
  }

  // Ordena por data de disputa (mais recente primeiro)
  const sortedBiddings = [...biddings].sort((a, b) => {
    const dateA = toDate(a.disputeDate)
    const dateB = toDate(b.disputeDate)

    if (!dateA && !dateB) return 0
    if (!dateA) return 1 // Sem data vai para o final
    if (!dateB) return -1

    return dateB - dateA
  })

  function groupByDate(biddings) {
    const grouped = {}
    const noDateGroup = "Sem data definida"

    biddings.forEach((bidding) => {
      const date = toDate(bidding.disputeDate)

      let key
      if (!date) {
        key = noDateGroup
      } else {
        // Formata como DD/MM/YYYY
        const day = String(date.getDate()).padStart(2, "0")
        const month = String(date.getMonth() + 1).padStart(2, "0")
        const year = date.getFullYear()
        key = `${day}/${month}/${year}`
      }

      if (!grouped[key]) {
        grouped[key] = []
      }
      grouped[key].push(bidding)
    })

    return grouped
  }

  function formatTime(timestamp) {
    const date = toDate(timestamp)
    if (!date) return "Horário não definido"

    return date.toLocaleTimeString("pt-BR", {
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  const groupedBiddings = groupByDate(sortedBiddings)

  const gridTemplate = {
    base: "1fr",
    md: "1.2fr 2.5fr 1.5fr 1.5fr 1.2fr 1.5fr 1.2fr 2fr 1fr 1fr",
  }

  if (loading) {
    return (
      <Flex justify="center" align="center" h="200px">
        <Spinner size="xl" color="blue.500" />
      </Flex>
    )
  }

  return (
    <Flex direction="column" gap={4} w="100%">
      {Object.keys(groupedBiddings).length === 0 ? (
        <Alert status="info" borderRadius="md">
          Nenhum pregão encontrado.
        </Alert>
      ) : (
        Object.entries(groupedBiddings).map(([date, items]) => (
          <Box
            key={date}
            _hover={{ backgroundColor: "gray.50" }}
            borderRadius="md"
          >
            <Flex
              bg={date === "Sem data definida" ? "gray.200" : "blue.100"}
              p={3}
              borderTopRadius="md"
            >
              <Text
                fontWeight="bold"
                color={date === "Sem data definida" ? "gray.700" : "blue.800"}
              >
                {date}
              </Text>
            </Flex>

            {/* Cabeçalho para desktop */}
            <Grid
              templateColumns={gridTemplate}
              gap={3}
              alignItems="center"
              p={3}
              display={{ base: "none", md: "grid" }}
              bg="gray.50"
            >
              <CustomTitleColumn TitleColumn="Código" />
              <CustomTitleColumn TitleColumn="Órgão" />
              <CustomTitleColumn TitleColumn="Processo" />
              <CustomTitleColumn TitleColumn="Modalidade" />
              <CustomTitleColumn TitleColumn="Modo" />
              <CustomTitleColumn TitleColumn="Flag" />
              <CustomTitleColumn TitleColumn="Cod Portal" />
              <CustomTitleColumn TitleColumn="Portal" />
              <CustomTitleColumn TitleColumn="Horário" />
              <CustomTitleColumn TitleColumn="Status" />
            </Grid>

            {items.map((bidding) => (
              <Box
                key={bidding.id}
                p={3}
                _hover={{ backgroundColor: "blue.50" }}
                borderBottomWidth="1px"
                borderBottomColor="gray.200"
              >
                <Grid
                  templateColumns={{
                    base: "1fr",
                    md: "1.2fr 2.5fr 1.5fr 1.5fr 1.2fr 1.5fr 1.2fr 2fr 1fr 1fr",
                  }}
                  gap={3}
                  alignItems="center"
                >
                  <CustomItemGrid
                    titleColumn="Código: "
                    textGrid={bidding.identificationNumber}
                    color="blue.600"
                    fontWeight="bold"
                  />
                  <CustomItemGrid
                    titleColumn="Órgão: "
                    textGrid={bidding.responsibleAgency}
                    color="gray.700"
                  />
                  <CustomItemGrid
                    titleColumn="Processo: "
                    textGrid={bidding.processNumber}
                    display={{ base: "none", md: "block" }}
                  />
                  <CustomItemGrid
                    titleColumn="Modalidade: "
                    textGrid={bidding.biddingType}
                  />
                  <CustomItemGrid
                    titleColumn="Modo: "
                    textGrid={bidding.modality}
                  />
                  <CustomItemGrid
                    titleColumn="Flag: "
                    textGrid={
                      bidding.tags && bidding.tags.length > 0
                        ? bidding.tags.map((item, index) => (
                            <Badge
                              key={`${bidding.id}-tag-${index}`}
                              colorPalette={
                                item === "Acompanhamento"
                                  ? "purple"
                                  : item === "Alta Prioridade"
                                  ? "red"
                                  : "green"
                              }
                              mr={1}
                              mb={1}
                            >
                              {item}
                            </Badge>
                          ))
                        : "sem observações"
                    }
                  />
                  <CustomItemGrid
                    titleColumn="Cod Portal: "
                    textGrid={bidding.portalAgencyCode}
                  />
                  <CustomItemGrid
                    titleColumn="Portal: "
                    textGrid={bidding.disputePortalName}
                  />
                  <CustomItemGrid
                    titleColumn="Horário: "
                    textGrid={`⏰ ${formatTime(bidding.disputeDate)}`}
                  />
                  <CustomItemGrid
                    titleColumn="Status: "
                    textGrid={bidding.status || "Pendente"}
                    color={
                      bidding.status === "Concluído"
                        ? "green.500"
                        : "orange.500"
                    }
                  />
                </Grid>
              </Box>
            ))}
          </Box>
        ))
      )}
    </Flex>
  )
}
