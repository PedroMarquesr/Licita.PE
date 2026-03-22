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
import BiddingCalendar from "../components/BiddingCalendar/BiddingCalendar";
import { FiMoreVertical } from "react-icons/fi";

import { collection, getDocs, query } from "firebase/firestore";
import { db } from "@/components/libs/firebaseinit";

import { useState, useEffect } from "react";

export default function BiddingPage() {
  const getDisputeDate = (data) => {
    const value = data.disputeDate;

    if (value.toDate) return value.toDate(); // Timestamp Firestore
    if (value.seconds) return new Date(value.seconds * 1000);
    if (value instanceof Date) return value;
  };
  const [biddings, setBiddings] = useState([]);
  const [filters, setFilters] = useState({});

  useEffect(() => {
    async function fetchData() {
      try {
        const q = query(collection(db, "biddings"));
        const snapshot = await getDocs(q);

        // const list = snapshot.docs.map((doc) => ({
        //   id: doc.id,
        //   displayDate: displayDate,
        //   formattedDate: displayDate
        //     ? displayDate.toLocaleDateString("pt-BR")
        //     : "",
        //   formattedTime: displayDate
        //     ? displayDate
        //         .toLocaleTimeString("pt-BR", {
        //           hour: "2-digit",
        //           minute: "2-digit",
        //         })
        //         .replace(":", "h")
        //     : "",
        //   ...doc.data(),
        // }));

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
          <StatusTabs statusName={"Todos"} icon={"all"} amount={"5"} />
          <StatusTabs
            statusName={"Em andamento"}
            icon={"inProgress"}
            amount={"5"}
          />
          <StatusTabs
            statusName={"Em análise"}
            icon={"underAnalysis"}
            amount={"5"}
          />
          <StatusTabs
            statusName={"Finalizadas"}
            icon={"finished"}
            amount={"5"}
          />
          <StatusTabs statusName={"Vencidos"} icon={"victory"} amount={"5"} />
        </Flex>

        <Flex w="100%" mt={6} justify="center">
          <InputsFilters />
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

          {biddings.map((bidding, index) => (
            <Grid
              key={bidding.id}
              templateColumns="repeat(7, 1fr)"
              gap={4}
              px={6}
              py={4}
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
                    bidding.status === "Em andamento"
                      ? "blue.50"
                      : bidding.status === "Em análise"
                        ? "yellow.50"
                        : bidding.status === "Finalizada"
                          ? "green.50"
                          : bidding.status === "Vencida"
                            ? "red.50"
                            : "gray.50"
                  }
                  color={
                    bidding.status === "Em andamento"
                      ? "blue.700"
                      : bidding.status === "Em análise"
                        ? "yellow.700"
                        : bidding.status === "Finalizada"
                          ? "green.700"
                          : bidding.status === "Vencida"
                            ? "red.700"
                            : "gray.600"
                  }
                  px={2}
                  py={1}
                  borderRadius="full"
                  fontSize="xs"
                  fontWeight="medium"
                >
                  {bidding.status || "Pendente"}
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
              <Button
                variant="ghost"
                size="sm"
                color="gray.500"
                _hover={{ bg: "gray.100", color: "blue.600" }}
                p={2}
                minW="auto"
                h="auto"
                borderRadius="md"
              >
                <Icon as={FiMoreVertical} boxSize={4} />
              </Button>
            </Grid>
          ))}
        </Flex>
        {biddings.length === 0 ? (
          <Text color="gray.500" fontSize="sm">
            Nenhum processo encontrado
          </Text>
        ) : (
          <Text>{biddings.length} processos carregados</Text>
        )}
      </Flex>
    </Flex>
  );
}
