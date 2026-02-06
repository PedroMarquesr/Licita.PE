"use client";

import {
  Flex,
  Text,
  Spinner,
  Alert,
  Grid,
  Switch,
  GridItem,
  Box,
  IconButton,
  Heading,
  Button,
  HStack,
  CloseButton,
  Dialog,
  Portal,
} from "@chakra-ui/react";
import {
  collection,
  query,
  orderBy,
  getDocs,
  where,
  Timestamp,
} from "firebase/firestore";
import { db } from "@/components/libs/firebaseinit";
import { useState, useEffect } from "react";

import BiddingWizard from "../../addTenderForm/components/BiddingWizard/BiddingWizard";
import BiddingCalendarMenu from "../BiddingCalendar/components/BiddingCalendarMenu/BiddingCalendarMenu";
import MobileCardTenderSummary from "./components/MobileCardTenderSummary/MobileCardTenderSummary";
import { getBiddingDisplayStatus } from "@/utils/biddingStatus";
import { CiEdit } from "react-icons/ci";

export default function TenderSummary() {
  const [biddings, setBiddings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [timeRange, setTimeRange] = useState("week");
  const [viewIsOpen, setViewIsOpen] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [biddingData, setBiddingData] = useState({});
  const [edit, setEdit] = useState(false);
  const [showButtonEdit, setShowButtonEdit] = useState(false);

  const fetchBiddingsByWeek = async () => {
    try {
      setLoading(true);
      setError(null);
      setTimeRange("week");

      const today = new Date();

      const firstDayOfWeek = new Date(today);
      const dayOfWeek = today.getDay();
      firstDayOfWeek.setDate(today.getDate() - dayOfWeek);
      firstDayOfWeek.setHours(0, 0, 0, 0);

      const lastDayOfWeek = new Date(firstDayOfWeek);
      lastDayOfWeek.setDate(firstDayOfWeek.getDate() + 6);
      lastDayOfWeek.setHours(23, 59, 59, 999);

      console.log(
        "Primeiro dia da semana:",
        firstDayOfWeek.toLocaleDateString(),
      );
      console.log("Último dia da semana:", lastDayOfWeek.toLocaleDateString());

      const biddingsRef = collection(db, "biddings");
      const startTimestamp = Timestamp.fromDate(firstDayOfWeek);
      const endTimestamp = Timestamp.fromDate(lastDayOfWeek);

      const q = query(
        biddingsRef,
        where("disputeDate", ">=", startTimestamp),
        where("disputeDate", "<=", endTimestamp),
        orderBy("disputeDate", "asc"),
      );

      const querySnapshot = await getDocs(q);
      const listaTemporaria = [];

      querySnapshot.forEach((doc) => {
        const data = doc.data();
        listaTemporaria.push({
          id: doc.id,
          ...data,
          disputeDate: data.disputeDate?.toDate?.() || data.disputeDate,
          formattedDate:
            data.disputeDate?.toDate?.()?.toLocaleDateString("pt-BR") || "",
        });
      });

      console.log("Documentos encontrados:", listaTemporaria);
      setBiddings(listaTemporaria);
    } catch (error) {
      console.error("Erro ao buscar dados: ", error);
      if (error.code === "failed-precondition") {
        setError(
          `Erro: É necessário criar um índice composto no Firestore para a query. Clique no link no console para criar.`,
        );
      } else {
        setError(`Erro ao carregar: ${error.message}`);
      }
    } finally {
      setLoading(false);
    }
  };

  const fetchLast7Days = async () => {
    try {
      setLoading(true);
      setError(null);
      setTimeRange("7days");

      const today = new Date();
      const sevenDaysAgo = new Date(today);
      sevenDaysAgo.setDate(today.getDate() - 7);
      sevenDaysAgo.setHours(0, 0, 0, 0);

      const endDate = new Date(today);
      endDate.setHours(23, 59, 59, 999);

      const startTimestamp = Timestamp.fromDate(sevenDaysAgo);
      const endTimestamp = Timestamp.fromDate(endDate);

      const biddingsRef = collection(db, "biddings");
      const q = query(
        biddingsRef,
        where("disputeDate", ">=", startTimestamp),
        where("disputeDate", "<=", endTimestamp),
        orderBy("disputeDate", "desc"),
      );

      const querySnapshot = await getDocs(q);
      const listaTemporaria = [];

      querySnapshot.forEach((doc) => {
        const data = doc.data();
        listaTemporaria.push({
          id: doc.id,
          ...data,
          disputeDate: data.disputeDate?.toDate?.() || data.disputeDate,
          formattedDate:
            data.disputeDate?.toDate?.()?.toLocaleDateString("pt-BR") || "",
        });
      });

      setBiddings(listaTemporaria);
    } catch (error) {
      console.error("Erro na busca alternativa: ", error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBiddingsByWeek();
  }, []);

  if (loading) {
    return (
      <Flex
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

  const checkIfToday = (biddingDate) => {
    if (!biddingDate) return false;

    const today = new Date();

    return (
      biddingDate.getDate() === today.getDate() &&
      biddingDate.getMonth() === today.getMonth() &&
      biddingDate.getFullYear() === today.getFullYear()
    );
  };

  const handleEdit = (biddingId) => {
    if (biddingId) {
      setBiddingData(biddings.find((bidding) => bidding.id === biddingId));
      setEdit(true);
      setModalOpen(true);
      setShowButtonEdit(true);
    }
  };

  return (
    <Flex
      flexDir={"column"}
      overflowX="hidden"
      justifyContent={"center"}
      alignContent={"center"}
      w={"100vw"}
    >
      <Switch.Root
        py={2}
        justifyContent={"left"}
        w={"100%"}
        onCheckedChange={() => setViewIsOpen(!viewIsOpen)}
        display={{ base: "block", md: "none" }}
        colorPalette={"blue"}
      >
        <Flex flex={"column"} align={"center"} mb={4}>
          <Switch.HiddenInput />
          <Switch.Control />
          <Switch.Label pl={2}>
            {viewIsOpen ? "Ocultar licitações" : "Exibir Licitações da Semana"}
          </Switch.Label>
        </Flex>
      </Switch.Root>

      {viewIsOpen && (
        <Flex p={4} flexDir="column" w="100%" justifyContent={"center"}>
          <Flex justify="space-between" align="center" mb={6}>
            <Heading size="lg">Processos</Heading>
            <HStack spacing={4}>
              <Button
                colorScheme={timeRange === "week" ? "blue" : "gray"}
                onClick={fetchBiddingsByWeek}
                size="sm"
              >
                Esta Semana
              </Button>
              <Button
                colorScheme={timeRange === "7days" ? "blue" : "gray"}
                onClick={fetchLast7Days}
                size="sm"
              >
                Últimos 7 Dias
              </Button>
            </HStack>
          </Flex>

          {error && (
            <Alert status="error" mb={4} borderRadius="md">
              <Box flex="1">
                <Text>{error}</Text>
                <Text fontSize="sm" mt={2}>
                  Dica: Verifique se há índice composto no Firestore para as
                  queries com múltiplas condições.
                </Text>
              </Box>
            </Alert>
          )}

          {biddings.length === 0 ? (
            <Flex
              direction="column"
              align="center"
              justify="center"
              h="200px"
              border="1px dashed"
              borderColor="gray.300"
              borderRadius="md"
            >
              <Text color="gray.500" fontSize="lg" mb={2}>
                Nenhuma licitação encontrada
              </Text>
              <Text color="gray.400">
                {timeRange === "week"
                  ? "Não há licitações para esta semana"
                  : "Não há licitações nos últimos 7 dias"}
              </Text>
            </Flex>
          ) : (
            <>
              <Box overflowX="auto" display={{ base: "none", md: "block" }}>
                <Grid
                  templateColumns={{
                    base: "1fr",
                    md: "repeat(8, 1fr)",
                  }}
                  gap={4}
                  bg="gray.50"
                  p={4}
                  alignContent={"space-between"}
                  justifyContent={"center"}
                  borderRadius="md"
                  mb={2}
                  textAlign={"center"}
                  fontSize={"sm"}
                >
                  <GridItem>
                    <Text fontWeight="bold" color="gray.600">
                      Número
                    </Text>
                  </GridItem>
                  <GridItem>
                    <Text fontWeight="bold" color="gray.600">
                      Órgão
                    </Text>
                  </GridItem>
                  <GridItem>
                    <Text fontWeight="bold" color="gray.600">
                      Portal
                    </Text>
                  </GridItem>
                  <GridItem>
                    <Text fontWeight="bold" color="gray.600">
                      Modalidade
                    </Text>
                  </GridItem>
                  <GridItem>
                    <Text fontWeight="bold" color="gray.600">
                      Status
                    </Text>
                  </GridItem>
                  <GridItem>
                    <Text fontWeight="bold" color="gray.600">
                      Data
                    </Text>
                  </GridItem>
                  <GridItem>
                    <Text fontWeight="bold" color="gray.600">
                      Editar
                    </Text>
                  </GridItem>
                  <GridItem>
                    <Text fontWeight="bold" color="gray.600">
                      Ação
                    </Text>
                  </GridItem>
                </Grid>

                {biddings.map((bidding) => (
                  <Grid
                    key={bidding.id}
                    templateColumns={{
                      base: "1fr",
                      md: "repeat(8, 1fr)",
                    }}
                    overflow={"auto"}
                    border="1px solid"
                    borderColor="gray.200"
                    borderRadius="md"
                    bgColor={
                      checkIfToday(bidding.disputeDate)
                        ? "yellow.200"
                        : "gray.200"
                    }
                    px={1}
                    mb={1}
                    alignItems="center"
                    _hover={
                      checkIfToday(bidding.disputeDate)
                        ? { bg: "yellow.100" }
                        : { bg: "gray.50" }
                    }
                    textAlign={"center"}
                    fontSize={"sm"}
                  >
                    <GridItem
                      textAlign={"start"}
                      fontSize={"x-small"}
                      lineHeight="1"
                    >
                      <Text fontWeight="medium">
                        {bidding.identificationNumber || "N/A"}
                      </Text>
                      <Text
                        color="gray.500"
                        display={{ base: "block", md: "none" }}
                      >
                        {bidding.formattedDate}
                      </Text>
                    </GridItem>
                    <GridItem fontSize={"x-small"}>
                      <Text noOfLines={2} textAlign={"start"}>
                        {bidding.responsibleAgency || "N/A"}
                      </Text>
                    </GridItem>
                    <GridItem fontSize={"x-small"}>
                      <Text>{bidding.disputePortalName || "N/A"}</Text>
                    </GridItem>
                    <GridItem fontSize={"x-small"}>
                      <Text>{bidding.biddingType || "N/A"}</Text>
                    </GridItem>
                    <GridItem fontSize={"x-small"}>
                      <Flex
                        px={3}
                        py={1}
                        borderRadius="full"
                        display="inline-block"
                        bg={
                          bidding.status === "scheduled"
                            ? "green.100"
                            : bidding.status === "finished"
                              ? "red.100"
                              : bidding.status === "suspended"
                                ? "yellow.100"
                                : bidding.status === "Aguardando atualização"
                                  ? "orange.100"
                                  : "gray.100"
                        }
                        color={
                          bidding.status === "finished"
                            ? "green.800"
                            : bidding.status === "finished"
                              ? "red.800"
                              : bidding.status === "suspended"
                                ? "yellow.800"
                                : bidding.status === "Aguardando atualização"
                                  ? "orange.800"
                                  : "gray.800"
                        }
                      >
                        <Text fontSize={"x-small"} fontWeight="medium">
                          {getBiddingDisplayStatus(bidding) || "N/A"}
                        </Text>
                      </Flex>
                    </GridItem>
                    <GridItem
                      fontSize={"x-small"}
                      fontWeight={
                        checkIfToday(bidding.disputeDate) ? "bold" : "normal"
                      }
                    >
                      <Text>{bidding.formattedDate}</Text>
                    </GridItem>
                    <GridItem fontSize={"x-small"}>
                      <IconButton
                        aria-label="Search database"
                        f
                        onClick={() => handleEdit(bidding.id)}
                      >
                        <CiEdit />
                      </IconButton>
                    </GridItem>
                    <GridItem fontSize={"x-small"}>
                      <BiddingCalendarMenu biddingId={bidding.id} />
                    </GridItem>
                  </Grid>
                ))}
              </Box>
              {biddings.map((bidding) => (
                <Box display={{ base: "block", md: "none" }} key={bidding.id}>
                  <MobileCardTenderSummary
                    bgColor={
                      checkIfToday(bidding.disputeDate)
                        ? "yellow.200"
                        : "gray.100"
                    }
                    fontWeight={
                      checkIfToday(bidding.disputeDate) ? "bold" : "normal"
                    }
                    dateFormated={bidding.formattedDate}
                    orgao={bidding.responsibleAgency}
                    flagToday={
                      checkIfToday(bidding.disputeDate) ? "flex" : "none"
                    }
                    identificationNumber={bidding.identificationNumber}
                    colorStatus={
                      bidding.status === "finished"
                        ? "green.800"
                        : bidding.status === "finished"
                          ? "red.800"
                          : bidding.status === "suspended"
                            ? "yellow.800"
                            : bidding.status === "Aguardando atualização"
                              ? "orange.800"
                              : "gray.800"
                    }
                    bgColorStatus={
                      bidding.status === "scheduled"
                        ? "green.100"
                        : bidding.status === "finished"
                          ? "red.100"
                          : bidding.status === "suspended"
                            ? "yellow.100"
                            : bidding.status === "Aguardando atualização"
                              ? "orange.100"
                              : "gray.100"
                    }
                    biddingStatus={getBiddingDisplayStatus(bidding) || "N/A"}
                    biddingType={bidding.biddingType}
                  />
                </Box>
              ))}
            </>
          )}

          <Text fontSize="sm" color="gray.500" mt={4}>
            Total: {biddings.length} licitações encontradas
          </Text>
        </Flex>
      )}

      {modalOpen && (
        <Dialog.Root open={modalOpen} size={"90vw"}>
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
                    onClick={setBiddings}
                    bgColor={"blue.500"}
                    color={"white"}
                    _hover={{ bgColor: "blue.600" }}
                  >
                    Salvar
                  </Button>
                </Dialog.Footer>
                <Dialog.CloseTrigger asChild>
                  <CloseButton
                    onClick={() => {
                      setModalOpen(false);
                      setShowButtonEdit(false);
                    }}
                    size="sm"
                    bgColor={"red"}
                    _hover={{ backgroundColor: "red.500", width: "xsm" }}
                  />
                </Dialog.CloseTrigger>
              </Dialog.Content>
            </Dialog.Positioner>
          </Portal>
        </Dialog.Root>
      )}
    </Flex>
  );
}
