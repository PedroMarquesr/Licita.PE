// "use client";

// import {
//   Flex,
//   Box,
//   Text,
//   Grid,
//   Badge,
//   Spinner,
//   Alert,
//   IconButton,
// } from "@chakra-ui/react";
// import { collection, getDocs } from "firebase/firestore";
// import { db } from "@/components/libs/firebaseinit";
// import { useState, useEffect } from "react";

// import CustomItemGrid from "./components/CustomItemGrid/CustomItemGrid";
// import CustomTitleColumn from "./components/CustomTitleColumn/CustomTitleColumn";
// import BiddingCalendarMenu from "./components/BiddingCalendarMenu/BiddingCalendarMenu";

// import { CiEdit } from "react-icons/ci";

// import { getBiddingDisplayStatus } from "@/utils/biddingStatus";

// export default function BiddingCalendar({}) {
//   const [biddings, setBiddings] = useState([]);
//   const [loading, setLoading] = useState(true);

//   const [viewIsOpen, setViewIsOpen] = useState(true);
//   const [modalOpen, setModalOpen] = useState(false);
//   const [biddingData, setBiddingData] = useState({});
//   const [edit, setEdit] = useState(false);
//   const [showButtonEdit, setShowButtonEdit] = useState(false);

//   useEffect(() => {
//     async function fetchBiddings() {
//       try {
//         setLoading(true);
//         const snapshot = await getDocs(collection(db, "biddings"));
//         const data = snapshot.docs.map((doc) => ({
//           id: doc.id,
//           ...doc.data(),
//         }));
//         setBiddings(data);
//       } catch (error) {
//         console.error("Erro ao buscar dados:", error);
//       } finally {
//         setLoading(false);
//       }
//     }
//     fetchBiddings();
//   }, []);

//   // Função para converter Timestamp para Date
//   const toDate = (timestamp) => {
//     if (!timestamp) return null;
//     // Se for Timestamp do Firestore
//     if (timestamp.toDate) {
//       return timestamp.toDate();
//     }
//     // Se for objeto com seconds (outro formato)
//     if (timestamp.seconds) {
//       return new Date(timestamp.seconds * 1000);
//     }
//     return null;
//   };

//   const sortedBiddings = [...biddings].sort((a, b) => {
//     const dateA = toDate(a.disputeDate);
//     const dateB = toDate(b.disputeDate);

//     if (!dateA && !dateB) return 0;
//     if (!dateA) return 1; // Sem data vai para o final
//     if (!dateB) return -1;

//     return dateB - dateA;
//   });

//   function groupByDate(biddings) {
//     const grouped = {};
//     const noDateGroup = "Sem data definida";

//     biddings.forEach((bidding) => {
//       const date = toDate(bidding.disputeDate);

//       let key;
//       if (!date) {
//         key = noDateGroup;
//       } else {
//         // Formata como DD/MM/YYYY
//         const day = String(date.getDate()).padStart(2, "0");
//         const month = String(date.getMonth() + 1).padStart(2, "0");
//         const year = date.getFullYear();
//         key = `${day}/${month}/${year}`;
//       }

//       if (!grouped[key]) {
//         grouped[key] = [];
//       }
//       grouped[key].push(bidding);
//     });

//     return grouped;
//   }

//   function formatTime(timestamp) {
//     const date = toDate(timestamp);
//     if (!date) return "Horário não definido";

//     return date.toLocaleTimeString("pt-BR", {
//       hour: "2-digit",
//       minute: "2-digit",
//     });
//   }

//   const groupedBiddings = groupByDate(sortedBiddings);

//   const gridTemplate = {
//     base: "1fr",
//     md: "1.2fr 2.5fr 1.5fr 1.5fr 1.2fr 1.5fr 1.2fr 2fr 1fr 1fr 0.5fr",
//   };

//   if (loading) {
//     return (
//       <Flex justify="center" align="center" h="200px">
//         <Spinner size="xl" color="blue.500" />
//       </Flex>
//     );
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
//             border={"1px solid "}
//             borderColor={"gray.300"}
//           >
//             <Flex
//               bg={date === "Sem data definida" ? "gray.200" : "blue.100"}
//               p={1}
//               borderTopRadius="md"
//             >
//               <Text
//                 fontWeight="bold"
//                 color={date === "Sem data definida" ? "gray.700" : "blue.800"}
//               >
//                 {date}
//               </Text>
//             </Flex>

//             <Grid
//               gap={3}
//               alignItems="center"
//               p={1}
//               display={{
//                 base: "none",
//                 md: "1.2fr 2.5fr 1.5fr 1.5fr 1.2fr 1.5fr 1.2fr 2fr 1fr 1fr 0.5fr 0.5fr",
//               }}
//               bg="gray.50"
//               color={"black"}
//               border={"1px solid red"}
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
//               <CustomTitleColumn TitleColumn="Editar" />
//               <CustomTitleColumn TitleColumn="Ação" />
//             </Grid>
//             {items.map((bidding) => (
//               <Box
//                 key={bidding.id}
//                 p={1}
//                 _hover={{ backgroundColor: "blue.50" }}
//                 borderBottomWidth="1px"
//                 borderBottomColor="gray.200"
//               >
//                 <Grid
//                   templateColumns={{
//                     base: "1fr",
//                     md: "1.2fr 2.5fr 1.5fr 1.5fr 1.2fr 1.5fr 1.2fr 2fr 1fr 1fr 0.5fr 0.5fr",
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
//                               colorPalette={
//                                 item === "Acompanhamento"
//                                   ? "purple"
//                                   : item === "Alta Prioridade"
//                                     ? "red"
//                                     : "green"
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
//                     textGrid={formatTime(bidding.disputeDate)}
//                   />
//                   <CustomItemGrid
//                     titleColumn="Status: "
//                     textGrid={getBiddingDisplayStatus(bidding)}
//                     color={
//                       getBiddingDisplayStatus(bidding) === "Finalizada"
//                         ? "green.500"
//                         : getBiddingDisplayStatus(bidding) ===
//                             "Aguardando atualização"
//                           ? "orange.500"
//                           : "blue.600"
//                     }
//                   />

//                   <BiddingCalendarMenu biddingId={bidding.id} />
//                   <IconButton
//                     aria-label="Search database"
//                     f
//                     onClick={() => handleEdit(bidding.id)}
//                   >
//                     <CiEdit />
//                   </IconButton>
//                 </Grid>
//               </Box>
//             ))}
//           </Box>
//         ))
//       )}
//     </Flex>
//   );
// }

"use client";

import {
  Flex,
  Box,
  Text,
  Grid,
  Badge,
  Spinner,
  Alert,
  IconButton,
  Dialog,
  Portal,
  CloseButton,
  Button,
} from "@chakra-ui/react";
import {
  collection,
  getDocs,
  doc,
  updateDoc,
  Timestamp,
} from "firebase/firestore";
import { db } from "@/components/libs/firebaseinit";
import { useState, useEffect } from "react";

import CustomItemGrid from "./components/CustomItemGrid/CustomItemGrid";
import CustomTitleColumn from "./components/CustomTitleColumn/CustomTitleColumn";
import BiddingCalendarMenu from "./components/BiddingCalendarMenu/BiddingCalendarMenu";
import BiddingWizard from "../../addTenderForm/components/BiddingWizard/BiddingWizard";

import { CiEdit } from "react-icons/ci";

import { getBiddingDisplayStatus } from "@/utils/biddingStatus";

export default function BiddingCalendar({}) {
  const [biddings, setBiddings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [biddingData, setBiddingData] = useState({});
  const [edit, setEdit] = useState(false);
  const [showButtonEdit, setShowButtonEdit] = useState(false);
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    async function fetchBiddings() {
      try {
        setLoading(true);
        const snapshot = await getDocs(collection(db, "biddings"));
        const data = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setBiddings(data);
      } catch (error) {
        console.error("Erro ao buscar dados:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchBiddings();
  }, []);

  const toDate = (timestamp) => {
    if (!timestamp) return null;
    if (timestamp.toDate) {
      return timestamp.toDate();
    }
    if (timestamp.seconds) {
      return new Date(timestamp.seconds * 1000);
    }
    return null;
  };

  const handleEdit = (biddingId) => {
    if (biddingId) {
      const selectedBidding = biddings.find(
        (bidding) => bidding.id === biddingId,
      );
      if (selectedBidding) {
        const disputeDate = toDate(selectedBidding.disputeDate);

        const biddingForEdit = {
          ...selectedBidding,
          disputeDate: disputeDate
            ? disputeDate.toISOString().split("T")[0]
            : "",
          disputeTime: disputeDate
            ? `${String(disputeDate.getHours()).padStart(2, "0")}:${String(disputeDate.getMinutes()).padStart(2, "0")}`
            : "00:00",
        };

        setBiddingData(biddingForEdit);
        setEdit(true);
        setModalOpen(true);
        setShowButtonEdit(true);
      }
    }
  };

  const toTimestamp = (dateString, timeString) => {
    if (!dateString) return null;

    try {
      if (dateString?.toDate) {
        return dateString;
      }

      if (dateString instanceof Date) {
        return Timestamp.fromDate(dateString);
      }

      if (dateString?.seconds) {
        return dateString;
      }

      const dateTimeString =
        timeString && timeString !== "00:00"
          ? `${dateString}T${timeString}:00`
          : `${dateString}T00:00:00`;

      const date = new Date(dateTimeString);

      if (isNaN(date.getTime())) {
        console.error("Data inválida:", dateString, timeString);
        return null;
      }

      return Timestamp.fromDate(date);
    } catch (error) {
      console.error("Erro ao criar timestamp:", error);
      return null;
    }
  };

  const updateBidding = async (updatedBidding) => {
    try {
      setUpdating(true);

      const biddingRef = doc(db, "biddings", updatedBidding.id);

      const updateData = {
        identificationNumber: updatedBidding.identificationNumber,
        responsibleAgency: updatedBidding.responsibleAgency,
        agencyCity: updatedBidding.agencyCity,
        agencyCnpj: updatedBidding.agencyCnpj,
        disputePortalName: updatedBidding.disputePortalName,
        portalAgencyCode: updatedBidding.portalAgencyCode,
        biddingType: updatedBidding.biddingType,
        judgmentCriteria: updatedBidding.judgmentCriteria,
        modality: updatedBidding.modality,
        status: updatedBidding.status,
        processNumber: updatedBidding.processNumber,
        isFavorite: updatedBidding.isFavorite || false,
        tags: updatedBidding.tags || [],
        attachmentsUrl: updatedBidding.attachmentsUrl || [],
        biddingNoticeUrl: updatedBidding.biddingNoticeUrl || "",
        biddingObject: updatedBidding.biddingObject || "",
        contactEmail: updatedBidding.contactEmail || "",
        contactPhone: updatedBidding.contactPhone || "",
        disputePortal: updatedBidding.disputePortal || "",
        estimatedValue: updatedBidding.estimatedValue || 0,
        executionLocation: updatedBidding.executionLocation || "",
        maximumValue: updatedBidding.maximumValue || 0,
        observations: updatedBidding.observations || "",
        proposalOpeningDate: updatedBidding.proposalOpeningDate || null,
        result: updatedBidding.result || "",
        technicalResponsible: updatedBidding.technicalResponsible || "",
      };

      if (biddingData) {
        const disputeDateValue =
          biddingData.disputeDate || updatedBidding.disputeDate;
        const disputeTimeValue = biddingData.disputeTime || "00:00";
        const disputeTimestamp = toTimestamp(
          disputeDateValue,
          disputeTimeValue,
        );
        if (disputeTimestamp) {
          updateData.disputeDate = disputeTimestamp;
        }

        const proposalDateValue =
          biddingData.proposalDeadlineDate ||
          updatedBidding.proposalDeadlineDate;
        const proposalTimeValue = biddingData.proposalDeadlineTime || "00:00";
        const proposalTimestamp = toTimestamp(
          proposalDateValue,
          proposalTimeValue,
        );
        if (proposalTimestamp) {
          updateData.proposalDeadlineDate = proposalTimestamp;
        }
      }

      await updateDoc(biddingRef, updateData);

      setBiddings((prevBiddings) =>
        prevBiddings.map((bidding) =>
          bidding.id === updatedBidding.id
            ? {
                ...updatedBidding,
                disputeDate: updateData.disputeDate,
              }
            : bidding,
        ),
      );

      console.log("Documento atualizado com sucesso!");

      setModalOpen(false);
      setEdit(false);
      setShowButtonEdit(false);

      alert("Processo atualizado com sucesso!");
    } catch (error) {
      console.log("Erro ao atualizar", error);
      alert("Erro ao atualizar: " + error.message);
    } finally {
      setUpdating(false);
    }
  };

  const sortedBiddings = [...biddings].sort((a, b) => {
    const dateA = toDate(a.disputeDate);
    const dateB = toDate(b.disputeDate);

    if (!dateA && !dateB) return 0;
    if (!dateA) return 1;
    if (!dateB) return -1;

    return dateB - dateA;
  });

  function groupByDate(biddings) {
    const grouped = {};
    const noDateGroup = "Sem data definida";

    biddings.forEach((bidding) => {
      const date = toDate(bidding.disputeDate);

      let key;
      if (!date) {
        key = noDateGroup;
      } else {
        const day = String(date.getDate()).padStart(2, "0");
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const year = date.getFullYear();
        key = `${day}/${month}/${year}`;
      }

      if (!grouped[key]) {
        grouped[key] = [];
      }
      grouped[key].push(bidding);
    });

    return grouped;
  }

  function formatTime(timestamp) {
    const date = toDate(timestamp);
    if (!date) return "Horário não definido";

    return date.toLocaleTimeString("pt-BR", {
      hour: "2-digit",
      minute: "2-digit",
    });
  }

  const groupedBiddings = groupByDate(sortedBiddings);

  const gridTemplate = {
    base: "1fr",
    md: "1.2fr 2.5fr 1.5fr 1.5fr 1.2fr 1.5fr 1.2fr 2fr 1fr 1fr 0.5fr",
  };

  if (loading) {
    return (
      <Flex
        w={"100%"}
        direction="column"
        gap={2}
        p={4}
        align="center"
        justify="center"
        h="200px"
      >
        <Spinner size="xl" color="blue.500" />
        <Text mt={4}>Carregando licitações...</Text>
      </Flex>
    );
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
            border={"1px solid "}
            borderColor={"gray.300"}
          >
            <Flex
              bg={date === "Sem data definida" ? "gray.200" : "blue.100"}
              p={1}
              borderTopRadius="md"
            >
              <Text
                fontWeight="bold"
                color={date === "Sem data definida" ? "gray.700" : "blue.800"}
              >
                {date}
              </Text>
            </Flex>

            <Grid
              templateColumns={{
                base: "1fr",
                md: "1.2fr 2.5fr 1.5fr 1.5fr 1.2fr 1.5fr 1.2fr 2fr 1fr 1fr 0.5fr 0.5fr",
              }}
              gap={3}
              alignItems="center"
              p={2}
              display={{ base: "none", md: "grid" }}
              bg="gray.50"
              borderBottom="1px solid"
              borderBottomColor="gray.200"
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
              <CustomTitleColumn TitleColumn="Editar" />
              <CustomTitleColumn TitleColumn="Ação" />
            </Grid>

            {items.map((bidding) => (
              <Box
                key={bidding.id}
                p={2}
                _hover={{ backgroundColor: "blue.50" }}
                borderBottomWidth="1px"
                borderBottomColor="gray.200"
              >
                <Grid
                  templateColumns={{
                    base: "1fr",
                    md: "1.2fr 2.5fr 1.5fr 1.5fr 1.2fr 1.5fr 1.2fr 2fr 1fr 1fr 0.5fr 0.5fr",
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
                        : "sem tags"
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
                    textGrid={formatTime(bidding.disputeDate)}
                  />
                  <CustomItemGrid
                    titleColumn="Status: "
                    textGrid={getBiddingDisplayStatus(bidding)}
                    color={
                      getBiddingDisplayStatus(bidding) === "Finalizada"
                        ? "green.500"
                        : getBiddingDisplayStatus(bidding) ===
                            "Aguardando atualização"
                          ? "orange.500"
                          : "blue.600"
                    }
                  />

                  <Box>
                    <IconButton
                      aria-label="Editar processo"
                      onClick={() => handleEdit(bidding.id)}
                      size="sm"
                      colorScheme="blue"
                      variant="ghost"
                    >
                      <CiEdit />
                    </IconButton>
                  </Box>

                  <Box>
                    <BiddingCalendarMenu biddingId={bidding.id} />
                  </Box>
                </Grid>
              </Box>
            ))}
          </Box>
        ))
      )}

      {/* Modal de Edição */}
      <Dialog.Root open={modalOpen} size="90vw">
        <Dialog.Trigger />
        <Portal>
          <Dialog.Backdrop />
          <Dialog.Positioner>
            <Dialog.Content>
              <Dialog.Header>
                <Dialog.Title>Edição de Processo</Dialog.Title>
              </Dialog.Header>

              <Dialog.Body>
                <Flex justifyContent={"center"}>
                  <BiddingWizard
                    biddingData={biddingData}
                    setBiddingData={setBiddingData}
                    edit={edit}
                    setEdit={setEdit}
                    showButtonEdit={showButtonEdit}
                  />
                </Flex>
              </Dialog.Body>

              <Dialog.Footer>
                <Button
                  onClick={() => updateBidding(biddingData)}
                  bgColor={"blue.500"}
                  color={"white"}
                  _hover={{ bgColor: "blue.600" }}
                  isLoading={updating}
                  loadingText="Salvando..."
                >
                  Salvar
                </Button>
                <Button
                  onClick={() => {
                    setModalOpen(false);
                    setShowButtonEdit(false);
                    setEdit(false);
                  }}
                  ml={3}
                >
                  Cancelar
                </Button>
              </Dialog.Footer>

              <Dialog.CloseTrigger asChild>
                <CloseButton
                  onClick={() => {
                    setModalOpen(false);
                    setShowButtonEdit(false);
                    setEdit(false);
                  }}
                  size="sm"
                />
              </Dialog.CloseTrigger>
            </Dialog.Content>
          </Dialog.Positioner>
        </Portal>
      </Dialog.Root>
    </Flex>
  );
}
