"use client";

import {
  Flex,
  Text,
  Box,
  Separator,
  Grid,
  Icon,
  Badge,
  GridItem,
  Button,
} from "@chakra-ui/react";

import HeaderPage from "../components/HeaderPage/HeaderPage";
import StatusTabs from "./components/StatusTabs/StatusTabs";
import InputsFilters from "./components/InputsFilters/InputsFilters";
import TitleRows from "./components/TitleRows/TitleRows";
import BiddingCalendarMenu from "../components/BiddingCalendar/components/BiddingCalendarMenu/BiddingCalendarMenu";
import { getBiddingDisplayStatus } from "@/utils/biddingStatus";
import { collection, getDocs, query } from "firebase/firestore";
import { db } from "@/components/libs/firebaseinit";

import { useState, useEffect } from "react";

export default function BiddingPage() {
  const [biddings, setBiddings] = useState([]);
  const [filters, setFilters] = useState({
    search: "",
    status: "",
  });

  const getDisputeDate = (data) => {
    const value = data.disputeDate;

    if (value.toDate) return value.toDate();
    if (value.seconds) return new Date(value.seconds * 1000);
    if (value instanceof Date) return value;
  };

  useEffect(() => {
    async function fetchData() {
      try {
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
          };
        });
        setBiddings(list);
      } catch (error) {
        console.error("Erro ao buscar processos:", error);
      }
    }

    fetchData();
  }, []);

  const filteredBiddings = biddings.filter((bidding) => {
    const matchesSearch =
      !filters.search ||
      bidding.identificationNumber
        ?.toLowerCase()
        .includes(filters.search.toLowerCase()) ||
      bidding.responsibleAgency
        ?.toLowerCase()
        .includes(filters.search.toLowerCase());

    let matchesStatus = true;

    if (filters.status === "VENCEDOR") {
      matchesStatus = isWinner(bidding);
    } else if (filters.status) {
      matchesStatus = getBiddingDisplayStatus(bidding) === filters.status;
    }

    return matchesSearch && matchesStatus;
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

  function isWinner(bidding) {
    return bidding.groups?.some((group) =>
      group.items?.some((item) =>
        item.participants?.some(
          (participant) => participant.isSelf && participant.win === true,
        ),
      ),
    );
  }

  // Eu tenho o atributo isWinner, acredito que ja consigo usar o length
  // Não esquece de ver isso

  const winnerCount = biddings.filter(isWinner).length;

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
              borderBottomWidth={index < biddings.length - 1 ? "1px" : "0"}
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
    </Flex>
  );
}
