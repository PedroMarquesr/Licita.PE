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

  return (
    <>
      <Flex direction="column" gap={4} w={"100%"}>
        {Object.entries(groupedBiddings).map(([date, items]) => (
          <Box key={date} _hover={{ backgroundColor: "gray.100" }}>
            <Flex bg="blue.200" p={1} borderRadius={"10px"}>
              <Text fontWeight="bold">{date}</Text>
            </Flex>

            {items.map((bidding) => (
              <Stack
                key={bidding.id}
                pt="2"
                _hover={{ backgroundColor: "gray.200" }}
              >
                <Grid
                  templateColumns="repeat(9, 1fr)"
                  gap={3}
                  alignContent="center"
                  alignItems="center"
                >
                  <CustomItemGrid textGrid={bidding.identificationNumber} />
                  <CustomItemGrid textGrid={bidding.responsibleAgency} />
                  <CustomItemGrid textGrid={bidding.processNumber} />
                  <CustomItemGrid textGrid={bidding.biddingType} />
                  <CustomItemGrid textGrid={bidding.modality} />

                  <CustomItemGrid
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
                            >
                              {item}
                            </Badge>
                          ))
                        : "sem observações"
                    }
                  />
                  <CustomItemGrid
                    textGrid={`Código: ${bidding.portalAgencyCode}`}
                  />

                  <CustomItemGrid textGrid={bidding.disputePortalName} />

                  <CustomItemGrid
                    textGrid={`⏰ ${formatTime(bidding.disputeDate)}`}
                  />
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
