"use client"

import { Flex, Button, Text } from "@chakra-ui/react"
import HeaderPage from "../components/HeaderPage/HeaderPage"
import BiddingWizard from "./components/BiddingWizard/BiddingWizard"
import SaveDialogSucess from "./components/SaveSucessDialog/SaveSucessDialog"
import { BIDDING_STATUS } from "@/constants/biddingStatus.js"
import { useState } from "react"
import { setDoc, doc, serverTimestamp } from "firebase/firestore"
import { Timestamp } from "firebase/firestore"
import { db } from "@/components/libs/firebaseinit"
import { v4 as uuidv4 } from "uuid"

export default function AddTenderFormFixed() {
  const [biddingData, setBiddingData] = useState({
    responsibleAgency: "",
    portalAgencyCode: "",
    agencyCity: "",
    agencyCnpj: "",

    biddingObject: "",
    identificationNumber: "",
    processNumber: "",
    modality: "",
    judgmentCriteria: "",
    biddingType: "",

    disputeDate: "",
    disputeTime: "",
    proposalDeadlineDate: "",
    proposalDeadlineTime: "",
    proposalOpeningDate: "",
    proposalOpeningTime: "",
    closingDate: "",
    closingTime: "",

    disputePortalName: "",
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
    status: BIDDING_STATUS.SCHEDULED,
    isFavorite: false,
  })
  const [dialogOpen, setDialogOpen] = useState(false)

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

      const dataToSave = {
        ...biddingData,
        disputeDate: toTimestamp(
          biddingData.disputeDate,
          biddingData.disputeTime
        ),
        proposalDeadlineDate: toTimestamp(
          biddingData.proposalDeadlineDate,
          biddingData.proposalDeadlineTime
        ),
        proposalOpeningDate: toTimestamp(
          biddingData.proposalOpeningDate,
          biddingData.proposalOpeningTime
        ),
        closingDate: toTimestamp(
          biddingData.closingDate,
          biddingData.closingTime
        ),
      }

      delete dataToSave.disputeTime
      delete dataToSave.proposalDeadlineTime
      delete dataToSave.proposalOpeningTime
      delete dataToSave.closingTime

      dataToSave.id = docId
      dataToSave.status = BIDDING_STATUS.SCHEDULED
      dataToSave.userId = "seu-user-id-aqui"
      dataToSave.createdAt = serverTimestamp()

      await setDoc(doc(db, "biddings", docId), dataToSave)
      setDialogOpen(true)

      setBiddingData({
        responsibleAgency: "",
        portalAgencyCode: "",
        agencyCity: "",
        agencyCnpj: "",
        biddingObject: "",
        identificationNumber: "",
        processNumber: "",
        modality: "",
        judgmentCriteria: "",
        biddingType: "",
        disputeDate: "",
        disputeTime: "",
        proposalDeadlineDate: "",
        proposalDeadlineTime: "",
        proposalOpeningDate: "",
        proposalOpeningTime: "",
        closingDate: "",
        closingTime: "",
        disputePortalName: "",
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
        status: BIDDING_STATUS.SCHEDULED,
        isFavorite: false,
        supplyType: {
          type: "",
          duration: "",
          unit: "",
          installmentDelivery: false,
        },

        documentation: {
          habilitacaoJuridica: [],
          habilitacaoFiscal: [],
          qualificacaoEconomicoFinanceira: [],
          qualificacaoTecnica: [],
          declaracoes: [],
        },
      })
      setDialogOpen(true)
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
      mb={"5%"}
      maxW="100%"
      overflow="hidden"
    >
      <HeaderPage
        titleHeader={"Nova Licitação"}
        subTitleHeader={"Preencha os dados para cadastrar uma nova licitação"}
        backVisible={true}
      />
      <Flex
        display={{ base: "none", md: "flex" }}
        justify={{ base: "center", md: "end" }}
        w="100%"
        pr={{ base: "0", md: "10" }}
      >
        <Button
          colorPalette={"blue"}
          size="md"
          onClick={handleSave}
          _hover={{ backgroundColor: "blue.400", color: "white" }}
        >
          Salvar Processo
        </Button>

        <SaveDialogSucess
          open={dialogOpen}
          onClose={() => setDialogOpen(false)}
          messageSucess={"Processo cadastrado com sucesso! "}
        />
      </Flex>
      <Flex w="100%" justify="center">
        <BiddingWizard
          biddingData={biddingData}
          setBiddingData={setBiddingData}
        />
      </Flex>
      <Flex
        display={{ base: "flex", md: "none" }}
        justify="center"
        w="100%"
        pr={{ base: "0", md: "10" }}
      >
        <Button colorPalette={"blue"} size="md" onClick={handleSave}>
          Salvar Processo
        </Button>

        <SaveDialogSucess
          open={dialogOpen}
          onClose={() => setDialogOpen(false)}
          messageSucess={"Processo cadastrado com sucesso! "}
        />
      </Flex>
    </Flex>
  )
}
