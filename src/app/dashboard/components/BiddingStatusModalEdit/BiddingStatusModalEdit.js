"use Client";

import {
  Button,
  Icon,
  CloseButton,
  Dialog,
  Portal,
  Separator,
  Input,
  Flex,
  Text,
} from "@chakra-ui/react";

import { IoDocumentText } from "react-icons/io5";
import { RiInfoCardFill } from "react-icons/ri";

import { v4 as uuidv4 } from "uuid";

import {
  collection,
  getDocs,
  doc,
  updateDoc,
  arrayUnion,
  Timestamp,
} from "firebase/firestore";

import { db } from "@/components/libs/firebaseinit";

import CustomSelect from "../../addTenderForm/components/BiddingWizard/components/steps/IdentificationStep/components/CustomSelect/CustomSelect";
import biddingResult from "@/constants/biddingResult";

import { getBiddingDisplayStatus } from "@/utils/biddingStatus";

import { useState } from "react";

export default function BiddingStatusModalEdit({
  isOpen,
  onClose,
  biddingData,
}) {
  const [selectedStatus, setSelectedStatus] = useState("");
  const [reopeningDate, setReopeningDate] = useState("");
  const [reopeningTime, setReopeningTime] = useState("");
  const [note, setNote] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleStatusUpdate = async () => {
    if (!selectedStatus) {
      alert("Selecione um status");
      return;
    }

    try {
      setIsLoading(true);

      const biddingRef = doc(db, "biddings", biddingData.id);

      const updatePayload = {
        result: selectedStatus,
      };

      if (selectedStatus === "reopened") {
        if (!reopeningDate) {
          alert("Informe a data de reabertura!");
          return;
        }

        const reopeningDateTime = new Date(
          `${reopeningDate}T${reopeningTime || "00:00"}`,
        );

        updatePayload.status = "reopened";

        updatePayload.reopenHistory = arrayUnion({
          id: uuidv4(),
          createdAt: Timestamp.now(),
          reopenedAt: Timestamp.fromDate(reopeningDateTime),
          notes: note || "",
        });
      }
      await updateDoc(biddingRef, updatePayload);
      alert("Status atualizado com sucesso!");
      onClose();
    } catch (error) {
      console.error(error);
      alert("Erro ao atualizar");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog.Root open={isOpen} onOpenChange={onClose}>
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content
            bg="white"
            color="gray.800"
            borderRadius="xl"
            boxShadow="lg"
          >
            <Dialog.Header>
              <Dialog.Title>Atualizar Status da Licitação</Dialog.Title>
            </Dialog.Header>
            <Dialog.Body>
              <Flex flexDir={"column"} gap={4} justifyContent={"right"}>
                <Flex
                  p={4}
                  justifyContent={"left"}
                  borderRadius={25}
                  bg={"gray.100"}
                >
                  <Flex alignItems={"center"}>
                    <Icon
                      size={"2xl"}
                      color={"blue.500"}
                      mb={2}
                      mr={3}
                      opacity={"30%"}
                    >
                      <IoDocumentText />
                    </Icon>
                  </Flex>
                  <Flex flexDir={"column"}>
                    <Text color={"GrayText"}>Órgão Responsável</Text>
                    <Text fontWeight={"bold"} color={"blue.900"}>
                      {biddingData.responsibleAgency}
                    </Text>
                  </Flex>
                </Flex>

                <Flex
                  p={4}
                  justifyContent={"left"}
                  borderRadius={25}
                  bg={"gray.100"}
                >
                  <Flex alignItems={"center"}>
                    <Icon
                      size={"2xl"}
                      color={"green.500"}
                      mb={2}
                      mr={3}
                      opacity={"30%"}
                    >
                      <RiInfoCardFill />
                    </Icon>
                  </Flex>
                  <Flex flexDir={"column"}>
                    <Text color={"GrayText"}>Identificador do Processo</Text>
                    <Text fontWeight={"bold"} color={"blue.900"}>
                      {biddingData.identificationNumber}
                    </Text>
                  </Flex>
                </Flex>

                <Flex flexDir={"column"}>
                  <Text ml={"2"}>Status Atual</Text>
                  <Text ml={"2"} fontWeight={"bold"} color={"green.900"}>
                    {getBiddingDisplayStatus(biddingData)}
                  </Text>
                </Flex>
                <Flex flexDir={"column"}>
                  <Text ml={"2"}>Novo Status</Text>
                  <CustomSelect
                    placeholder={"Selecione o novo status"}
                    options={biddingResult}
                    onValueChange={(value) => setSelectedStatus(value[0])}
                  />

                  {selectedStatus === "reopened" && (
                    <Flex flexDir={"column"}>
                      <Separator mt={4} mb={4} borderColor={"gray.300"} />
                      <Flex
                        flexDir={"column"}
                        justifyContent={"left"}
                        alignItems={"start"}
                        gap={2}
                        // mt={2}
                        ml={0}
                      >
                        <Text ml={"2"}>Insira a data de Reabertura</Text>
                        <Flex flexDir={{ base: "column" }} gap={{ base: 2 }}>
                          <Input
                            ml={"2"}
                            width="298px"
                            type="date"
                            value={reopeningDate}
                            onChange={(e) => setReopeningDate(e.target.value)}
                          />
                          <Input
                            ml={"2"}
                            width="100px"
                            type="time"
                            value={reopeningTime}
                            onChange={(e) => setReopeningTime(e.target.value)}
                          />
                        </Flex>
                      </Flex>

                      <Flex
                        flexDir={"column"}
                        justifyContent={"left"}
                        alignItems={"start"}
                        gap={2}
                        mt={2}
                        ml={0}
                      >
                        <Text ml={"2"}>Insira uma nota informativa</Text>
                        <Flex flexDir={{ base: "column" }} gap={{ base: 2 }}>
                          <Input
                            ml={"2"}
                            width="298px"
                            type="text"
                            placeholder="Ex: Suspensão para análise de amostras"
                            value={note}
                            onChange={(e) => setNote(e.target.value)}
                          />
                        </Flex>
                      </Flex>
                    </Flex>
                  )}
                </Flex>
              </Flex>
            </Dialog.Body>
            <Dialog.Footer>
              <Dialog.ActionTrigger asChild>
                <Button variant="outline">Cancel</Button>
              </Dialog.ActionTrigger>
              <Button onClick={handleStatusUpdate} isLoading={isLoading}>
                Save
              </Button>
            </Dialog.Footer>
            <Dialog.CloseTrigger asChild>
              <CloseButton size="sm" />
            </Dialog.CloseTrigger>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
}
