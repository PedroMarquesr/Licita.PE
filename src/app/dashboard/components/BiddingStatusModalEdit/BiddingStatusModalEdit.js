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

import CustomSelect from "../../addTenderForm/components/BiddingWizard/components/steps/IdentificationStep/components/CustomSelect/CustomSelect";
import biddingResult from "@/constants/biddingResult";

import InputDefaultForm from "../../addTenderForm/components/BiddingWizard/components/steps/components/InputDefaultForm/InputDefaultForm.jsx";

import { useState } from "react";

export default function BiddingStatusModalEdit() {
  const [selectedStatus, setSelectedStatus] = useState("");
  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <Button variant="outline" size="sm">
          Open Dialog
        </Button>
      </Dialog.Trigger>
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
                      PREFEITURA DE TESTE
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
                      PE 123/2026{" "}
                    </Text>
                  </Flex>
                </Flex>

                <Flex flexDir={"column"}>
                  <Text ml={"2"}>Status Atual</Text>
                  <Text ml={"2"} fontWeight={"bold"} color={"green.900"}>
                    PE 123/2026{" "}
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
                          <Input ml={"2"} width="298px" type="date" />
                          <Input ml={"2"} width="100px" type="time" />
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
              <Button>Save</Button>
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
