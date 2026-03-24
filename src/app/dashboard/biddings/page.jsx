"use client";

import {
  Flex,
  Text,
  Box,
  Separator,
  Grid,
  Badge,
  Button,
  Dialog,
  Portal,
  Spinner,
} from "@chakra-ui/react";

import HeaderPage from "../components/HeaderPage/HeaderPage";

import StatusTabs from "./components/StatusTabs/StatusTabs";
import InputsFilters from "./components/InputsFilters/InputsFilters";
import TitleRows from "./components/TitleRows/TitleRows";
import BiddingStatusModalEdit from "../components/BiddingStatusModalEdit/BiddingStatusModalEdit";
import BiddingWizard from "../addTenderForm/components/BiddingWizard/BiddingWizard";
import BiddingCalendarMenu from "../components/BiddingCalendar/components/BiddingCalendarMenu/BiddingCalendarMenu";
import { getBiddingDisplayStatus } from "@/utils/biddingStatus";
import {
  collection,
  getDocs,
  query,
  doc,
  updateDoc,
  Timestamp,
} from "firebase/firestore";
import { db } from "@/components/libs/firebaseinit";
import useStore from "@/components/globalStates/store";
import { useRouter } from "next/navigation";

import { useState, useEffect } from "react";
import Home from "@/app/page";

export default function BiddingPage() {
  const user = useStore((state) => state.user);
  const router = useRouter();

  // Estados para o modal de status
  const [statusModalEditOpen, setStatusModalEditOpen] = useState(false);

  // Estados para o modal de edição
  const [modalOpen, setModalOpen] = useState(false);
  const [edit, setEdit] = useState(false);
  const [showButtonEdit, setShowButtonEdit] = useState(false);
  const [biddingData, setBiddingData] = useState({});

  // Estado principal
  const [biddings, setBiddings] = useState([]);
  const [loading, setLoading] = useState(true);

  const [filters, setFilters] = useState({
    search: "",
    status: "",
    agency: "",
    city: "",
    modalidadeFilter: "",
  });

  const getDisputeDate = (data) => {
    const value = data.disputeDate;

    if (value.toDate) return value.toDate();
    if (value.seconds) return new Date(value.seconds * 1000);
    if (value instanceof Date) return value;
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
      setLoading(true);

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
        isFavorite: updatedBidding.isFavorite,
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

      if (updatedBidding) {
        const disputeDateValue = updatedBidding.disputeDate;
        const disputeTimeValue = updatedBidding.disputeTime || "00:00";
        const disputeTimestamp = toTimestamp(
          disputeDateValue,
          disputeTimeValue,
        );
        if (disputeTimestamp) {
          updateData.disputeDate = disputeTimestamp;
        }

        const proposalDateValue = updatedBidding.proposalDeadlineDate;
        const proposalTimeValue =
          updatedBidding.proposalDeadlineTime || "00:00";
        const proposalTimestamp = toTimestamp(
          proposalDateValue,
          proposalTimeValue,
        );
        if (proposalTimestamp) {
          updateData.proposalDeadlineDate = proposalTimestamp;
        }
      }

      await updateDoc(biddingRef, updateData);
      console.log("Documento atualizado com sucesso!");

      setModalOpen(false);
      setEdit(false);

      await fetchData();
    } catch (error) {
      console.error("Erro ao atualizar:", error);
    } finally {
      setLoading(false);
    }
  };

  const checkIsWinner = (biddingData) => {
    return biddingData.result?.groups?.some((group) =>
      group.items?.some((item) =>
        item.participants?.some(
          (participant) => participant.isSelf && participant.win === true,
        ),
      ),
    );
  };

  const fetchData = async () => {
    try {
      setLoading(true);

      const q = query(collection(db, "biddings"));
      const snapshot = await getDocs(q);

      const list = snapshot.docs.map((doc) => {
        const data = doc.data();

        const displayDate = getDisputeDate(data);

        return {
          id: doc.id,
          ...data,
          displayDate,
          formattedDate: displayDate
            ? displayDate.toLocaleDateString("pt-BR")
            : "SEM DATA",
          formattedTime: displayDate
            ? displayDate
                .toLocaleTimeString("pt-BR", {
                  hour: "2-digit",
                  minute: "2-digit",
                })
                .replace(":", "h")
            : "",

          isWinner: data.isWinner ?? checkIsWinner(data),
        };
      });

      setBiddings(list);
    } catch (error) {
      console.error("Erro ao buscar processos:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleOpenStatusModal = (biddingId) => {
    const selectedBidding = biddings.find((b) => b.id === biddingId);
    setBiddingData(selectedBidding);
    setStatusModalEditOpen(true);
  };

  const handleEdit = (biddingId) => {
    if (biddingId) {
      setBiddingData(biddings.find((bidding) => bidding.id === biddingId));
      setEdit(true);
      setModalOpen(true);
      setShowButtonEdit(true);
    }
  };

  const deleteBidding = (biddingId) => {
    console.log("Deletar licitação:", biddingId);
  };

  const filteredBiddings = biddings.filter((bidding) => {
    const matchesSearch =
      !filters.search ||
      bidding.identificationNumber
        ?.toLowerCase()
        .includes(filters.search.toLowerCase()) ||
      bidding.responsibleAgency
        ?.toLowerCase()
        .includes(filters.search.toLowerCase());

    const matchesAgency =
      !filters.agency ||
      bidding.responsibleAgency
        ?.toLowerCase()
        .includes(filters.agency.toLowerCase());

    const matchesCity =
      !filters.city ||
      bidding.agencyCity?.toLowerCase().includes(filters.city.toLowerCase());

    const matchesModalidade =
      !filters.modalidadeFilter ||
      bidding.biddingType === filters.modalidadeFilter;

    // ✅ CORREÇÃO: isWinner agora é lido corretamente, então esse filtro funciona
    let matchesStatus = true;

    if (filters.status === "VENCEDOR") {
      matchesStatus = bidding.isWinner === true;
    } else if (filters.status === "Vencida") {
      matchesStatus = getBiddingDisplayStatus(bidding) === "Vencida";
    } else if (filters.status) {
      matchesStatus = getBiddingDisplayStatus(bidding) === filters.status;
    }

    return (
      matchesSearch &&
      matchesAgency &&
      matchesCity &&
      matchesModalidade &&
      matchesStatus
    );
  });

  const suspendedCount = biddings.filter((bidding) => {
    return getBiddingDisplayStatus(bidding) === "Suspensa";
  }).length;

  const finishedCount = biddings.filter((bidding) => {
    return getBiddingDisplayStatus(bidding) === "Finalizada";
  }).length;

  const inProgressCount = biddings.filter((bidding) => {
    return getBiddingDisplayStatus(bidding) === "Aguardando atualização";
  }).length;

  const underAnalysisCount = biddings.filter((bidding) => {
    return getBiddingDisplayStatus(bidding) === "Aguardando aprovação";
  }).length;

  const winnerCount = biddings.filter(
    (bidding) => bidding.isWinner === true,
  ).length;

  if (loading) {
    return (
      <Flex
        w={"100%"}
        direction="column"
        gap={2}
        p={4}
        align="center"
        justify="center"
        h="100vh"
        bg="gray.50"
      >
        <Spinner size="xl" color="blue.500" />
        <Text mt={4}>Carregando processos...</Text>
      </Flex>
    );
  }
  if (!user) {
    return router.push("/");
  }
  return (
    <Flex flexDir="column" w="100%" minH="100vh" bg="gray.50">
      <HeaderPage
        titleHeader={"Painel de Processos"}
        subTitleHeader={"Consulta completa das licitações cadastradas"}
        backVisible={true}
      />

      <Flex
        flexDir="column"
        w="100%"
        maxW="1400px"
        mx="auto"
        px={{ base: "4", md: "6", lg: "8" }}
        py={{ base: "4", md: "6" }}
      >
        <Flex gap={3} flexWrap="wrap" justify="center" w="100%">
          <StatusTabs
            statusName={"Todos"}
            icon={"all"}
            amount={biddings.length}
            isActive={filters.status === ""}
            onClick={() => setFilters({ ...filters, status: "" })}
          />
          <StatusTabs
            statusName={"Em andamento"}
            icon={"inProgress"}
            amount={inProgressCount}
            isActive={filters.status === "Aguardando atualização"}
            onClick={() =>
              setFilters({ ...filters, status: "Aguardando atualização" })
            }
          />
          <StatusTabs
            statusName={"Em análise"}
            icon={"underAnalysis"}
            amount={underAnalysisCount}
            isActive={filters.status === "Aguardando aprovação"}
            onClick={() =>
              setFilters({ ...filters, status: "Aguardando aprovação" })
            }
          />
          <StatusTabs
            statusName={"Finalizadas"}
            isActive={filters.status === "Finalizada"}
            icon={"finished"}
            amount={finishedCount}
            onClick={() => setFilters({ ...filters, status: "Finalizada" })}
          />
          <StatusTabs
            statusName={"Vencidos"}
            icon={"victory"}
            amount={winnerCount}
            isActive={filters.status === "VENCEDOR"}
            onClick={() => setFilters({ ...filters, status: "VENCEDOR" })}
          />
          <StatusTabs
            statusName={"Suspensos"}
            icon={"suspended"}
            isActive={filters.status === "Suspensa"}
            amount={suspendedCount}
            onClick={() => setFilters({ ...filters, status: "Suspensa" })}
          />
        </Flex>

        <Flex w="100%" mt={6} justify="center">
          <InputsFilters filters={filters} setFilters={setFilters} />
        </Flex>

        <Separator my={6} borderColor="gray.200" borderWidth="1px" />

        <Flex
          w="100%"
          justify="center"
          minH="400px"
          bg="white"
          borderRadius="xl"
          borderWidth="1px"
          borderColor="gray.200"
          p={6}
          flexDir={"column"}
        >
          <TitleRows />

          {filteredBiddings.map((bidding, index) => (
            <Grid
              key={bidding.id}
              templateColumns="repeat(7, 1fr)"
              gap={4}
              px={6}
              py={2}
              borderBottomWidth={
                index < filteredBiddings.length - 1 ? "1px" : "0"
              }
              borderBottomColor="gray.100"
              _hover={{ bg: "gray.50" }}
              transition="all 0.2s"
              alignItems="center"
            >
              <Text fontSize="sm" fontWeight="medium" color="gray.800">
                {bidding.identificationNumber || "—"}
              </Text>

              <Text fontSize="sm" color="gray.600">
                {bidding.biddingType || "—"}
              </Text>
              <Text fontSize="sm" color="gray.600" noOfLines={1}>
                {bidding.responsibleAgency || "—"}
              </Text>
              <Text fontSize="sm" color="gray.600">
                {bidding.agencyCity || "—"}
              </Text>
              <Box>
                <Badge
                  bg={
                    getBiddingDisplayStatus(bidding) === "Em andamento"
                      ? "blue.50"
                      : getBiddingDisplayStatus(bidding) === "Suspensa"
                        ? "yellow.50"
                        : getBiddingDisplayStatus(bidding) === "Finalizada"
                          ? "green.50"
                          : bidding.status === "Vencida"
                            ? "red.50"
                            : "gray.50"
                  }
                  color={
                    getBiddingDisplayStatus(bidding) === "Em andamento"
                      ? "blue.700"
                      : getBiddingDisplayStatus(bidding) === "Suspensa"
                        ? "yellow.700"
                        : getBiddingDisplayStatus(bidding) === "Finalizada"
                          ? "green.700"
                          : getBiddingDisplayStatus(bidding) === "Vencida"
                            ? "red.700"
                            : "gray.600"
                  }
                  px={2}
                  py={1}
                  borderRadius="full"
                  fontSize="xs"
                  fontWeight="medium"
                >
                  {getBiddingDisplayStatus(bidding) || "Pendente"}
                </Badge>
              </Box>
              <Flex direction="column">
                <Text fontSize="sm" fontWeight="medium" color="gray.800">
                  {bidding.formattedDate}
                </Text>
                {bidding.formattedTime && (
                  <Text fontSize="xs" color="gray.500">
                    {bidding.formattedTime}
                  </Text>
                )}
              </Flex>
              <BiddingCalendarMenu
                biddingId={bidding.id}
                onClickAt={() => handleOpenStatusModal(bidding.id)}
                handleEdit={() => handleEdit(bidding.id)}
                deleteBidding={() => deleteBidding(bidding.id)}
              />
            </Grid>
          ))}
        </Flex>

        {biddings.length === 0 ? (
          <Text color="gray.500" fontSize="sm">
            Nenhum processo encontrado
          </Text>
        ) : (
          <Text>{filteredBiddings.length} processos encontrados</Text>
        )}
      </Flex>

      {/* Modal de Edição */}
      {modalOpen && (
        <Dialog.Root open={modalOpen} size={"90vw"} motionPreset={"scale"}>
          <Dialog.Trigger />
          <Portal>
            <Dialog.Backdrop />
            <Dialog.Positioner>
              <Dialog.Content
                bg="white"
                color="gray.800"
                borderRadius="xl"
                boxShadow="lg"
              >
                <Dialog.Header
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <Dialog.Title>Edição de Processo</Dialog.Title>

                  <Flex gap={3}>
                    <Button
                      onClick={() => {
                        updateBidding(biddingData);
                      }}
                      bgColor={"blue.500"}
                      color={"white"}
                      _hover={{ bgColor: "blue.600" }}
                    >
                      Salvar
                    </Button>
                    <Button
                      onClick={() => {
                        setModalOpen(false);
                        setShowButtonEdit(false);
                      }}
                      bgColor={"red.500"}
                      _hover={{ backgroundColor: "red.800" }}
                      color={"white"}
                    >
                      Cancelar
                    </Button>
                  </Flex>
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

                <Dialog.Footer></Dialog.Footer>
              </Dialog.Content>
            </Dialog.Positioner>
          </Portal>
        </Dialog.Root>
      )}

      {statusModalEditOpen && (
        <BiddingStatusModalEdit
          isOpen={statusModalEditOpen}
          onClose={() => setStatusModalEditOpen(false)}
          biddingData={biddingData}
          refresh={fetchData}
        />
      )}
    </Flex>
  );
}
// http://localhost:3000/dashboard/biddings
