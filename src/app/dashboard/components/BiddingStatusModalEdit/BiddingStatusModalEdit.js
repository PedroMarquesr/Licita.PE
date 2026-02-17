"use Client";

import {
  Button,
  Icon,
  CloseButton,
  Dialog,
  Portal,
  Flex,
  Text,
} from "@chakra-ui/react";

import { IoDocumentText } from "react-icons/io5";
import { RiInfoCardFill } from "react-icons/ri";

import CustomSelect from "../../addTenderForm/components/BiddingWizard/components/steps/IdentificationStep/components/CustomSelect/CustomSelect";

import biddingResult from "@/constants/biddingResult";

export default function BiddingStatusModalEdit() {
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
                  />
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
