"use client";

import { Flex, Text, Box } from "@chakra-ui/react";

import HeaderPage from "../components/HeaderPage/HeaderPage";
import StatusTabs from "./components/StatusTabs/StatusTabs";
import InputsFilters from "./components/InputsFilters/InputsFilters";
import BiddingCalendar from "../components/BiddingCalendar/BiddingCalendar";
import { useState } from "react";

export default function BiddingPage() {
  const [biddings, setBiddings] = useState([]);
  const [filters, setFilters] = useState({});

  return (
    <Flex
      flexDir="column"
      w="100%"
      h="100%"
      align="center"
      px={{ base: "2", md: "4" }}
      maxW="100%"
      overflow="hidden"
    >
      <HeaderPage
        titleHeader={"Painel de Processos"}
        subTitleHeader={"Consulta completa das licitações cadastradas"}
        backVisible={true}
      />
      <Flex flexDir={{ base: "row", md: "column" }} mt="3%">
        <Flex
          gap={4}
          flexDir={{ base: "column", md: "row" }}
          mt="3%"
          justify={"center"}
          w={{ base: "100%", md: "auto" }}
        >
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

        <Flex w={"95%"} mt="3%" justify={"center"}>
          <InputsFilters />
          {/* <BiddingCalendar /> */}
        </Flex>
      </Flex>
    </Flex>
  );
}
