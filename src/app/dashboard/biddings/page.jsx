"use client";

import { Flex } from "@chakra-ui/react";

import HeaderPage from "../components/HeaderPage/HeaderPage";
import BiddingCalendar from "../components/BiddingCalendar/BiddingCalendar";
import MenuDashboardMb from "../components/MenuDashboardMb/MenuDashboardMb";

import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "@/components/libs/firebaseinit";
import { useEffect, useState } from "react";

import { IoMdTrendingUp } from "react-icons/io";
import { HiMiniDocumentChartBar } from "react-icons/hi2";
import { RiTimer2Fill } from "react-icons/ri";

export default function BiddingPage() {
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

      <Flex
        gap={4}
        flexDir={{ base: "column", md: "row" }}
        mt="3%"
        w={{ base: "100%", md: "auto" }}
      ></Flex>

      <Flex w={"95%"} mt="3%">
        <BiddingCalendar />
      </Flex>
    </Flex>
  );
}
