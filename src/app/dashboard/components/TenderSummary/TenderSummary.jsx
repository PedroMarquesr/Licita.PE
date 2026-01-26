"use client";

import {
  Flex,
  Text,
  Spinner,
  Alert,
  Grid,
  GridItem,
  Box,
  Heading,
  Button,
  HStack,
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

export default function TenderSummary() {
  const [biddings, setBiddings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [timeRange, setTimeRange] = useState("week"); // 'week' ou '7days'

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

  return (
    <Flex p={4} flexDir={"column"} m={"auto"}>
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
              Dica: Verifique se há índice composto no Firestore para as queries
              com múltiplas condições.
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
        <Box overflowX="auto">
          <Grid
            templateColumns={{
              base: "1fr",
              md: "repeat(6, 1fr)",
            }}
            gap={4}
            bg="gray.50"
            p={4}
            borderRadius="md"
            mb={2}
            display={{ base: "none", md: "grid" }}
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
          </Grid>

          {biddings.map((bidding) => (
            <Grid
              key={bidding.id}
              templateColumns={{
                base: "1fr",
                md: "repeat(6, 1fr)",
              }}
              border="1px solid"
              borderColor="gray.200"
              borderRadius="md"
              px={1}
              mb={1}
              alignItems="center"
              _hover={{ bg: "gray.50" }}
            >
              <GridItem>
                <Text fontWeight="medium">
                  {bidding.identificationNumber || "N/A"}
                </Text>
                <Text
                  fontSize="sm"
                  color="gray.500"
                  display={{ base: "block", md: "none" }}
                >
                  {bidding.formattedDate}
                </Text>
              </GridItem>
              <GridItem>
                <Text fontSize="sm" noOfLines={2}>
                  {bidding.responsibleAgency || "N/A"}
                </Text>
              </GridItem>
              <GridItem>
                <Text fontSize="sm">{bidding.disputePortalName || "N/A"}</Text>
              </GridItem>
              <GridItem>
                <Text fontSize="sm">{bidding.modality || "N/A"}</Text>
              </GridItem>
              <GridItem>
                <Flex
                  px={3}
                  py={1}
                  borderRadius="full"
                  display="inline-block"
                  bg={
                    bidding.status === "Aberta"
                      ? "green.100"
                      : bidding.status === "Fechada"
                        ? "red.100"
                        : bidding.status === "Suspensa"
                          ? "yellow.100"
                          : "gray.100"
                  }
                  color={
                    bidding.status === "Aberta"
                      ? "green.800"
                      : bidding.status === "Fechada"
                        ? "red.800"
                        : bidding.status === "Suspensa"
                          ? "yellow.800"
                          : "gray.800"
                  }
                >
                  <Text fontSize="xs" fontWeight="medium">
                    {bidding.status || "N/A"}
                  </Text>
                </Flex>
              </GridItem>
              <GridItem>
                <Text fontSize="sm">{bidding.formattedDate}</Text>
              </GridItem>
            </Grid>
          ))}
        </Box>
      )}

      <Text fontSize="sm" color="gray.500" mt={4}>
        Total: {biddings.length} licitações encontradas
      </Text>
    </Flex>
  );
}
