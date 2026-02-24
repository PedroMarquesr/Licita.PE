"use Client"

import {
  Button,
  Icon,
  CloseButton,
  Dialog,
  Portal,
  Separator,
  Fade,
  Input,
  Alert,
  Switch,
  Box,
  Flex,
  Text,
} from "@chakra-ui/react"
// ICONS
import { IoDocumentText } from "react-icons/io5"
import { motion } from "framer-motion"
import { SlideFromTop } from "@/components/animations/ScrollAnimations"
import ResultInsertForm from "./Components/ResultInsertForm"
import { RiInfoCardFill } from "react-icons/ri"
import { v4 as uuidv4 } from "uuid"
import {
  collection,
  getDocs,
  doc,
  updateDoc,
  arrayUnion,
  Timestamp,
} from "firebase/firestore"
import { db } from "@/components/libs/firebaseinit"
import AlertCustom from "../AlertCustom/AlertCustom"
import CustomSelect from "../../addTenderForm/components/BiddingWizard/components/steps/IdentificationStep/components/CustomSelect/CustomSelect"
import biddingResultOptions from "@/constants/biddingResultOptions"

import {
  initialBiddingStatusOptions,
  biddingStatusOptions,
  biddingStatusAfterApproval,
} from "@/constants/biddingStatusOptions"
import { getBiddingDisplayStatus } from "@/utils/biddingStatus"
import { useState } from "react"

export default function BiddingStatusModalEdit({
  isOpen,
  onClose,
  biddingData,
  refresh,
}) {
  const [selectedStatus, setSelectedStatus] = useState("")
  const [reopeningDate, setReopeningDate] = useState("")
  const [reopeningTime, setReopeningTime] = useState("")
  const [note, setNote] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [showAlertErrorStatus, setShowAlertErrorStatus] = useState(false)
  const [showAlertErrorDate, setShowAlertErrorDate] = useState(false)
  const [showAlertSucess, setShowAlertSucess] = useState(false)
  const [undefinedDate, setUndefinedDate] = useState(false)

  const handleStatusUpdate = async () => {
    if (!selectedStatus) return

    const biddingRef = doc(db, "biddings", biddingData.id)

    const updatePayload = {
      updatedAt: Timestamp.now(),
    }

    const resultValues = ["win", "loss", "pending"]

    if (resultValues.includes(selectedStatus)) {
      updatePayload.result = selectedStatus
      updatePayload.status = "finished"
    } else {
      updatePayload.status = selectedStatus
    }

    updatePayload.statusHistory = arrayUnion({
      id: uuidv4(),
      previousStatus: biddingData.status,
      newStatus: updatePayload.status,
      result: updatePayload.result || null,
      note: note || "",
      createdAt: Timestamp.now(),
    })

    await updateDoc(biddingRef, updatePayload)

    refresh()
    onClose()
  }

  const SlideFromTop = ({ children, delay = 0 }) => {
    return (
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.2, delay }}
        viewport={{ once: true, margin: "-50px" }}
      >
        {children}
      </motion.div>
    )
  }
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
                <ResultInsertForm />
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
                    options={
                      biddingData.status === "awaiting_approval"
                        ? initialBiddingStatusOptions
                        : biddingStatusAfterApproval
                    }
                    onValueChange={(value) => setSelectedStatus(value[0])}
                  />

                  {selectedStatus === "awaiting_approval" && (
                    <Box ml={"2"} colorPalette={"blue"} mt={5}>
                      <SlideFromTop>
                        <Text>Inserir comentário:</Text>
                        <Input
                          width="298px"
                          type="text"
                          value={note}
                          onChange={(e) => setNote(e.target.value)}
                        />{" "}
                      </SlideFromTop>
                    </Box>
                  )}
                  {selectedStatus === "finished" && (
                    <Box ml={"2"} colorPalette={"blue"} mt={5}>
                      <SlideFromTop>
                        <Button>Inserir Resultado</Button>
                      </SlideFromTop>
                    </Box>
                  )}
                  {selectedStatus === "suspended" && (
                    <Box mt={5}>
                      <SlideFromTop>
                        <Text ml={"2"}>Insira a data de Reabertura</Text>
                        <Input
                          disabled={undefinedDate}
                          ml={"2"}
                          width="298px"
                          type="date"
                          value={reopeningDate}
                          onChange={(e) => setReopeningDate(e.target.value)}
                        />
                        <Input
                          disabled={undefinedDate}
                          ml={"2"}
                          width="100px"
                          type="time"
                          value={reopeningTime}
                          onChange={(e) => setReopeningTime(e.target.value)}
                        />

                        <Switch.Root
                          ml={"2"}
                          mt={2}
                          colorPalette={"blue"}
                          onCheckedChange={() => {
                            setUndefinedDate(!undefinedDate)
                            setReopeningDate("")
                            setReopeningTime("")
                          }}
                        >
                          <Switch.HiddenInput />
                          <Switch.Control />
                          <Switch.Label>Data indefinida</Switch.Label>
                        </Switch.Root>

                        <Text mt={3} ml={"2"}>
                          Inserir comentário:
                        </Text>
                        <Input
                          ml={"2"}
                          width="298px"
                          type="text"
                          value={note}
                          onChange={(e) => setNote(e.target.value)}
                        />
                      </SlideFromTop>
                    </Box>
                  )}
                  {selectedStatus === "reopened" && (
                    <Box mt={5}>
                      <Text ml={"2"}>Insira a data de Reabertura</Text>
                      <Input
                        disabled={undefinedDate}
                        ml={"2"}
                        width="298px"
                        type="date"
                        value={reopeningDate}
                        onChange={(e) => setReopeningDate(e.target.value)}
                      />
                      <Input
                        disabled={undefinedDate}
                        ml={"2"}
                        width="100px"
                        type="time"
                        value={reopeningTime}
                        onChange={(e) => setReopeningTime(e.target.value)}
                      />

                      <Switch.Root
                        ml={"2"}
                        mt={2}
                        colorPalette={"blue"}
                        onCheckedChange={() => {
                          setUndefinedDate(!undefinedDate)
                          setReopeningDate("")
                          setReopeningTime("")
                        }}
                      >
                        <Switch.HiddenInput />
                        <Switch.Control />
                        <Switch.Label>Data indefinida</Switch.Label>
                      </Switch.Root>

                      <Text mt={3} ml={"2"}>
                        Inserir comentário:
                      </Text>
                      <Input
                        ml={"2"}
                        width="298px"
                        type="text"
                        value={note}
                        onChange={(e) => setNote(e.target.value)}
                      />
                    </Box>
                  )}
                  {selectedStatus == "cancelled" && (
                    <Box mt={5}>
                      <SlideFromTop>
                        <Text mt={3} ml={"2"}>
                          Inserir comentário:
                        </Text>
                        <Input
                          ml={"2"}
                          width="298px"
                          type="text"
                          value={note}
                          onChange={(e) => setNote(e.target.value)}
                        />
                      </SlideFromTop>
                    </Box>
                  )}
                </Flex>
              </Flex>
            </Dialog.Body>
            <Dialog.Footer>
              {showAlertErrorStatus && (
                <AlertCustom
                  description={"Insira o Status do processo"}
                  status={"error"}
                  CollapsibleOpen={showAlertErrorStatus}
                />
              )}

              {showAlertErrorDate && (
                <AlertCustom
                  description={"Insira o data de reabertura"}
                  status={"error"}
                  CollapsibleOpen={showAlertErrorDate}
                />
              )}

              {showAlertSucess && (
                <AlertCustom
                  description={"Status atualizado com sucesso"}
                  status={"success"}
                  CollapsibleOpen={showAlertSucess}
                />
              )}

              <Dialog.ActionTrigger asChild>
                <Button _hover={{ color: "black", backgroundColor: "red.500" }}>
                  Cancelar
                </Button>
              </Dialog.ActionTrigger>
              <Button
                onClick={async () => {
                  await handleStatusUpdate()
                }}
                isLoading={isLoading}
                _hover={{ backgroundColor: "blue.500" }}
              >
                Salvar
              </Button>
            </Dialog.Footer>
            <Dialog.CloseTrigger asChild>
              <CloseButton size="sm" />
            </Dialog.CloseTrigger>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  )
}
