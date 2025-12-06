"use client";

import { Flex, Button, Text } from "@chakra-ui/react";
import HeaderPage from "../components/HeaderPage/HeaderPage";
import BiddingWizard from "./components/BiddingWizard/BiddingWizard";
import { useState } from "react";
import { setDoc, doc, serverTimestamp } from "firebase/firestore";
import { db } from "@/components/libs/firebaseinit";
import { v4 as uuidv4 } from "uuid";

export default function AddTenderFormFixed() {
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
    disputeTime: "",
    proposalDeadlineDate: "",
    proposalDeadlineTime: "",
    proposalOpeningDate: "",
    proposalOpeningTime: "",
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
  });

  const handleSave = async () => {
    try {
      const docId = uuidv4();

      await setDoc(doc(db, "biddings", docId), {
        ...biddingData,
        id: docId,
        userId: "seu-user-id-aqui",
        createdAt: serverTimestamp(),
      });

      console.log("Licitação salva com sucesso!");
      window.location.reload();
    } catch (error) {
      console.error("Erro ao salvar:", error);
    }
  };

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
        />
      </Flex>
      <Flex justify="center" w="100%" mt={6}>
        <Button colorScheme="blue" size="lg" onClick={handleSave}>
          Salvar Licitação
        </Button>
      </Flex>
      <Flex>{JSON.stringify(biddingData, null, 2)}</Flex>
    </Flex>
  );
}
