"use client";

import { Flex, Text, Spinner, Alert } from "@chakra-ui/react";
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

  useEffect(() => {
    const fetchBiddings = async () => {
      try {
        setLoading(true);
        setError(null);

        const today = new Date();

        const firstDayOfWeek = new Date(today);
        const dayOfWeek = today.getDay();
        const diffToSunday = dayOfWeek;

        firstDayOfWeek.setDate(today.getDate() - diffToSunday);
        firstDayOfWeek.setHours(0, 0, 0, 0);

        const lastDayOfWeek = new Date(firstDayOfWeek);
        lastDayOfWeek.setDate(firstDayOfWeek.getDate() + 6);
        lastDayOfWeek.setHours(23, 59, 59, 999);

        console.log("Primeiro dia da semana:", firstDayOfWeek);
        console.log("Último dia da semana:", lastDayOfWeek);

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
          listaTemporaria.push({
            id: doc.id,
            ...doc.data(),
            disputeDate:
              doc.data().disputeDate?.toDate?.() || doc.data().disputeDate,
          });
        });

        console.log("Documentos encontrados:", listaTemporaria.length);
        setBiddings(listaTemporaria);
      } catch (error) {
        console.error("Erro ao buscar dados: ", error);
        setError(`Erro ao carregar: ${error.message}`);
      } finally {
        setLoading(false);
      }
    };

    fetchBiddings();
  }, []);

  const fetchLast7Days = async () => {
    try {
      setLoading(true);

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
        listaTemporaria.push({
          id: doc.id,
          ...doc.data(),
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

  if (error) {
    return (
      <Flex direction="column" gap={2} p={4}>
        <Alert status="error" mb={4}>
          {error}
        </Alert>
        <Text
          color="blue.500"
          cursor="pointer"
          onClick={fetchLast7Days}
          textDecoration="underline"
        >
          Tentar buscar últimas licitações (7 dias)
        </Text>
      </Flex>
    );
  }

  return (
    <Flex direction="column" gap={2} p={4}>
      <Text fontSize="xl" fontWeight="bold" mb={4}>
        Licitações da Semana
      </Text>

      {biddings.length === 0 ? (
        <Text color="gray.500" fontStyle="italic">
          Nenhuma licitação encontrada para esta semana.
        </Text>
      ) : (
        biddings.map((bidding) => (
          <Flex
            key={bidding.id}
            borderBottom="1px solid #eee"
            py={3}
            justifyContent="space-between"
            alignItems="center"
          >
            <Flex direction="column">
              <Text color="black" fontWeight="medium">
                {bidding.agencyCity || "Cidade não informada"}
              </Text>
              {bidding.disputeDate && (
                <Text fontSize="sm" color="gray.600">
                  {new Date(
                    bidding.disputeDate.seconds * 1000,
                  ).toLocaleDateString()}
                </Text>
              )}
            </Flex>
            {bidding.processNumber && (
              <Text fontSize="sm" color="blue.600">
                {bidding.processNumber}
              </Text>
            )}
          </Flex>
        ))
      )}
    </Flex>
  );
}
