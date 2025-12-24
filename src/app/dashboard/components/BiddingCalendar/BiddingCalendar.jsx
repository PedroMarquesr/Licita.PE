"use client";

import {
  Flex,
  Stack,
  Box,
  Tag,
  Text,
  Grid,
  Badge,
  Separator,
} from "@chakra-ui/react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/components/libs/firebaseinit";
import { useState, useEffect } from "react";

import CustomItemGrid from "./components/CustomItemGrid/CustomItemGrid";
import CustomTitleColumn from "./components/CustomTitleColumn/CustomTitleColumn";
import { base } from "motion/react-client";

export default function BiddingCalendar() {
  const [biddings, setBiddings] = useState([]);

  useEffect(() => {
    async function fetchBiddings() {
      const snapshot = await getDocs(collection(db, "biddings"));
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setBiddings(data);
    }
    fetchBiddings();
  }, []);

  function toDate(value) {
    if (!value) return null;
    if (value.toDate) return value.toDate();
    return new Date(value);
  }

  const sortedBiddings = [...biddings].sort((a, b) => {
    return toDate(b.disputeDate) - toDate(a.disputeDate);
  });

  function groupByDate(biddings) {
    const grouped = {};

    biddings.forEach((bidding) => {
      const date = toDate(bidding.disputeDate);
      if (!date) return;

      const key = date.toLocaleDateString("pt-BR");

      if (!grouped[key]) {
        grouped[key] = [];
      }
      grouped[key].push(bidding);
    });
    return grouped;
  }

  function formatTime(value) {
    const date = toDate(value);
    if (!date) return "Horário não definido";

    return date.toLocaleTimeString("pt-BR", {
      hour: "2-digit",
      minute: "2-digit",
    });
  }

  const groupedBiddings = groupByDate(sortedBiddings);
  const gridTemplate = {
    base: "1fr",
    md: "1.2fr 2.5fr 1.5fr 1.5fr 1.2fr 1.5fr 1.2fr 2fr 1fr 1fr",
  };
  return (
    <>
      <Flex direction="column" gap={4} w={"100%"}>
        {Object.entries(groupedBiddings).map(([date, items]) => (
          <Box key={date} _hover={{ backgroundColor: "gray.100" }}>
            <Flex bg="blue.200" p={1} borderRadius={"10px"}>
              <Text fontWeight="bold">{date}</Text>
            </Flex>
            <Grid
              templateColumns={gridTemplate}
              gap={3}
              alignItems="center"
              display={{ base: "none", md: "grid" }}
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
              <Stack
                pt={"2"}
                _hover={{ backgroundColor: "blue.100" }}
                key={bidding.id}
              >
                <Grid
                  templateColumns={{
                    base: "8, 1fr",
                    md: "1.2fr 2.5fr 1.5fr 1.5fr 1.2fr 1.5fr 1.2fr 2fr 1fr 1fr",
                  }}
                  gap={3}
                  alignContent="center"
                  alignItems="center"
                >
                  <CustomItemGrid
                    titleColumn={"Código: "}
                    textGrid={bidding.identificationNumber}
                    color={"blue.600"}
                    fontWeight={"bold"}
                  />
                  <CustomItemGrid
                    titleColumn={"Órgão: "}
                    textGrid={bidding.responsibleAgency}
                    color="gray.700"
                  />
                  <CustomItemGrid
                    titleColumn={"Processo: "}
                    textGrid={bidding.processNumber}
                    display={{ base: "none", md: "block" }}
                  />
                  <CustomItemGrid
                    titleColumn={"Modalidade: "}
                    textGrid={bidding.biddingType}
                  />
                  <CustomItemGrid
                    titleColumn={"Modo: "}
                    textGrid={bidding.modality}
                  />

                  <CustomItemGrid
                    titleColumn={"Flag: "}
                    textGrid={
                      bidding.tags
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
                            >
                              {item}
                            </Badge>
                          ))
                        : "sem observações"
                    }
                  />
                  <CustomItemGrid
                    titleColumn={"Cod Portal: "}
                    textGrid={bidding.portalAgencyCode}
                  />

                  <CustomItemGrid
                    titleColumn={"Portal: "}
                    textGrid={bidding.disputePortalName}
                  />

                  <CustomItemGrid
                    titleColumn={"Horário: "}
                    textGrid={`⏰ ${formatTime(bidding.disputeDate)}`}
                  />
                  <CustomItemGrid titleColumn={"Status: "} />
                </Grid>

                <Separator borderColor="gray.300" />
              </Stack>
            ))}
          </Box>
        ))}
      </Flex>
    </>
  );
}
