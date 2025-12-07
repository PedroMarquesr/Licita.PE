"use client";

import { Flex } from "@chakra-ui/react";

import HeaderPage from "./components/HeaderPage/HeaderPage";
import BiddingCalendar from "./components/BiddingCalendar/BiddingCalendar";
import CardOverview from "./components/CardOverview/CardOverview";

import { IoMdTrendingUp } from "react-icons/io";
import { HiMiniDocumentChartBar } from "react-icons/hi2";
import { RiTimer2Fill } from "react-icons/ri";

export default function OverviewSimple() {
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
        titleHeader={"Dashboard"}
        subTitleHeader={"Visão geral das licitações e atividades recentes"}
      />

      <Flex gap={4} flexDir={{ base: "column", md: "row" }} mt="3%">
        <CardOverview
          cardTitle={"Em Andamento"}
          cardContent={"5"}
          cardIcon={<IoMdTrendingUp />}
          bgcolor={"blue.500"}
        />
        <CardOverview
          cardTitle={"Em Análise"}
          cardContent={"5"}
          cardIcon={<HiMiniDocumentChartBar />}
          bgcolor={"green.500"}
        />
        <CardOverview
          cardTitle={"Taxa de sucesso"}
          cardContent={"5%"}
          cardIcon={<RiTimer2Fill />}
          bgcolor={"purple.500"}
          cardSubTitle={"de sucesso neste mês"}
        />
      </Flex>

      <Flex w={"65%"} mt="3%">
        <BiddingCalendar />
      </Flex>
    </Flex>
  );
}
