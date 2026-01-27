"use client";

import { Flex, Box, Text, Grid, Badge, Spinner, Alert } from "@chakra-ui/react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/components/libs/firebaseinit";
import { useState, useEffect } from "react";

import CustomItemGrid from "./components/CustomItemGrid/CustomItemGrid";
import CustomTitleColumn from "./components/CustomTitleColumn/CustomTitleColumn";
import BiddingCalendarMenu from "./components/BiddingCalendarMenu/BiddingCalendarMenu";

import { getBiddingDisplayStatus } from "@/utils/biddingStatus";

export default function BiddingCalendar() {
  const [biddings, setBiddings] = useState([]);
  const [loading, setLoading] = useState(true);

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

  // Função para converter Timestamp para Date
  const toDate = (timestamp) => {
    if (!timestamp) return null;
    // Se for Timestamp do Firestore
    if (timestamp.toDate) {
      return timestamp.toDate();
    }
    // Se for objeto com seconds (outro formato)
    if (timestamp.seconds) {
      return new Date(timestamp.seconds * 1000);
    }
    return null;
  };

  const sortedBiddings = [...biddings].sort((a, b) => {
    const dateA = toDate(a.disputeDate);
    const dateB = toDate(b.disputeDate);

    if (!dateA && !dateB) return 0;
    if (!dateA) return 1; // Sem data vai para o final
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
        // Formata como DD/MM/YYYY
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
      <Flex justify="center" align="center" h="200px">
        <Spinner size="xl" color="blue.500" />
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
              templateColumns={gridTemplate}
              gap={3}
              alignItems="center"
              p={1}
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
                p={1}
                _hover={{ backgroundColor: "blue.50" }}
                borderBottomWidth="1px"
                borderBottomColor="gray.200"
              >
                <Grid
                  templateColumns={{
                    base: "1fr",
                    md: "1.2fr 2.5fr 1.5fr 1.5fr 1.2fr 1.5fr 1.2fr 2fr 1fr 1fr 0.5fr",
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
                  <BiddingCalendarMenu biddingId={bidding.id} />
                </Grid>
              </Box>
            ))}
          </Box>
        ))
      )}
    </Flex>
  );
}
