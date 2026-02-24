"use client"

import { Flex, Text } from "@chakra-ui/react"

import HeaderPage from "./components/HeaderPage/HeaderPage"
import CardOverview from "./components/CardOverview/CardOverview"

import { collection, query, where, getDocs } from "firebase/firestore"
import { db } from "@/components/libs/firebaseinit"
import { useEffect, useState } from "react"

import { useRouter } from "next/navigation"

import useStore from "@/components/globalStates/store"

import { IoMdTrendingUp } from "react-icons/io"
import { HiMiniDocumentChartBar } from "react-icons/hi2"
import { RiTimer2Fill } from "react-icons/ri"

import TenderSummary from "./components/TenderSummary/TenderSummary"

export default function OverviewSimple() {
  const [totalBiddings, setTotalBiddings] = useState(0)

  const user = useStore((state) => state.user)
  const router = useRouter()

  useEffect(() => {
    const fetchBiddings = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "biddings"))
        setTotalBiddings(querySnapshot.size)
      } catch (error) {
        console.error()
      }
    }
    fetchBiddings()
  }, [])

  return (
    <>
      {user ? (
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

          <Flex
            gap={4}
            flexDir={{ base: "column", md: "row" }}
            mt="3%"
            w={{ base: "100%", md: "auto" }}
          >
            <CardOverview
              cardTitle={"Editais cadastrados"}
              cardContent={totalBiddings}
              cardIcon={<IoMdTrendingUp />}
              bgIconColor={"blue.500"}
              bgColor={"blue.100"}
            />
            <CardOverview
              cardTitle={"Em Análise"}
              cardContent={"5"}
              cardIcon={<HiMiniDocumentChartBar />}
              bgIconColor={"green.500"}
              bgColor={"green.100"}
            />
            <CardOverview
              cardTitle={"Taxa de sucesso"}
              cardContent={"5%"}
              cardIcon={<RiTimer2Fill />}
              bgIconColor={"purple.500"}
              bgColor={"purple.100"}
              cardSubTitle={"de sucesso neste mês"}
            />
          </Flex>

          <Flex w={"95%"} mt="3%">
            <TenderSummary />
          </Flex>
        </Flex>
      ) : (
        router.push("/")
      )}
    </>
  )
}
