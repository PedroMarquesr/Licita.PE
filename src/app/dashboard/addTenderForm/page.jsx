"use client"

import { Flex, Button, Text } from "@chakra-ui/react"
import HeaderPage from "../components/HeaderPage/HeaderPage"
import BiddingWizard from "./components/BiddingWizard/BiddingWizard"

import { useState } from "react"
import { setDoc, doc, serverTimestamp } from "firebase/firestore"
import { Timestamp } from "firebase/firestore"
import { db } from "@/components/libs/firebaseinit"

import { v4 as uuidv4 } from "uuid"

export default function AddTenderFormFixed() {
  const [date, setDate] = useState({
    disputeDateDisplay: "",
    disputeTimeDisplay: "",
    proposalDeadlineDateDisplay: "",
    proposalDeadlineTimeDisplay: "",
    proposalOpeningDateDisplay: "",
    proposalOpeningTimeDisplay: "",
    closingDateDisplay: "",
  })

  const [biddingData, setBiddingData] = useState({
    responsibleAgency: "",
    portalAgencyCode: "",
    agencyCity: "",
    agencyCnpj: "",

    biddingObject: "",
    identificationNumber: "",
    processNumber: "",
    modality: "", // Valores: "Aberto", "Aberto/Fechado", "Fechado/Aberto", "Fechado"
    judgmentCriteria: "", // Valores: "Menor preço, Maior desconto, Técnica e preço, Maior lance, Melhor técnica"
    biddingType: "", // "Dispensa de Licitação, Pregão eletronico, Convite eletrônico, Concorrência, Tomada de Preços, Inexigibilidade"

    disputeDate: "",
    proposalDeadlineDate: "",
    proposalOpeningDate: "",
    proposalOpeningDate: "",
    closingDate: "",

    disputePortal: "",
    executionLocation: "",

    tags: [],

    contactPhone: "",
    contactEmail: "",
    technicalResponsible: "",
    biddingNoticeUrl: "",
    attachmentsUrl: "",
    estimatedValue: "",
    maximumValue: "",
    observations: "",

    result: "",
  })

  const toTimestamp = (dateString, timeString) => {
    if (!dateString) return null
    const dateTimeString = timeString
      ? `${dateString}T${timeString}:00`
      : `${dateString}T00:00:00`
    return Timestamp.fromDate(new Date(dateTimeString))
  }

  const handleSave = async () => {
    try {
      const docId = uuidv4()

      await setDoc(doc(db, "biddings", docId), {
        ...biddingData,
        disputeDate: toTimestamp(
          date.disputeDateDisplay,
          date.disputeTimeDisplay
        ),

        proposalDeadlineDate: toTimestamp(
          date.proposalDeadlineDateDisplay,
          date.proposalDeadlineTimeDisplay
        ),
        proposalOpeningDate: toTimestamp(
          date.proposalOpeningDateDisplay,
          date.proposalOpeningTimeDisplay
        ),
        closingDate: toTimestamp(biddingData.closingDateDisplay),
        id: docId,
        userId: "seu-user-id-aqui",
        createdAt: serverTimestamp(),
      })

      console.log("Licitação salva com sucesso!")
      console.log(`Data da disputa em timestamp: ${biddingData.disputeDate}`)

      window.location.reload()
    } catch (error) {
      console.error("Erro ao salvar:", error)
    }
  }

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
        titleHeader={"Nova Licitação"}
        subTitleHeader={"Preencha os dados para cadastrar uma nova licitação"}
        backVisible={true}
      />

      <Flex w="100%" justify="center">
        <BiddingWizard
          biddingData={biddingData}
          setBiddingData={setBiddingData}
          date={date}
          setDate={setDate}
        />
      </Flex>
      <Flex justify="center" w="100%" mt={6}>
        <Button colorScheme="blue" size="lg" onClick={handleSave}>
          Salvar Licitação
        </Button>
      </Flex>
      <Flex>{JSON.stringify(biddingData, null, 2)}</Flex>
    </Flex>
  )
}
