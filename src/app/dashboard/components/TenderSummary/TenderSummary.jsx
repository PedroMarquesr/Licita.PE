"use client";

import { Flex, Text } from "@chakra-ui/react";
import { collection, query, orderBy, limit, getDocs } from "firebase/firestore";
import { db } from "@/components/libs/firebaseinit";
import { useState, useEffect } from "react";
import { SiOpencollective } from "react-icons/si";

export default function TenderSummary() {
  const [biddings, setBiddings] = useState([]);

  useEffect(() => {
    const fetchBiddings = async () => {
      try {
        const hoje = new Date();
        const primeiroDiaDaSemana = new Date(
          hoje.setDate(hoje.getDate() - hoje.getDay()),
        );
        primeiroDiaDaSemana.setHours(0, 0, 0, 0);

        const ultimoDiaDaSemana = new Date(primeiroDiaDaSemana);
        ultimoDiaDaSemana.setDate(primeiroDiaDaSemana.getDate() + 6);
        ultimoDiaDaSemana.setHours(23, 59, 59, 999);

        const biddingsRef = collection(db, "biddings");

        const q = query(
          biddingsRef,
          where("disputeDate", ">=", primeiroDiaDaSemana),
          where("disputeDate", "<=", ultimoDiaDaSemana),
          orderBy("disputeDate", "asc"),
        );

        const querySnapshot = await getDocs(q);
        const listaTemporaria = [];

        querySnapshot.forEach((doc) => {
          listaTemporaria.push({ id: doc.id, ...doc.data() });
        });

        setBiddings(listaTemporaria);
      } catch (error) {
        console.error("Erro ao buscar dados: ", error);
      }
    };

    fetchBiddings();
  }, []);
  return (
    <Flex direction="column" gap={2} p={4}>
      <Text fontSize="xl" fontWeight="bold" mb={4}>
        Licitações da Semana
      </Text>
      {biddings.length > 0 ? (
        biddings.map((bidding) => (
          <Flex
            key={bidding.id}
            borderBottom="1px solid #eee"
            py={2}
            justifyContent="space-between"
          >
            <Text color={"black"}>{bidding.agencyCity}</Text>
            <Text color={"black"} fontWeight="bold">
              {bidding.identificationNumber}
            </Text>
          </Flex>
        ))
      ) : (
        <Text>Nenhuma licitação encontrada para esta semana.</Text>
      )}
    </Flex>
  );
}
