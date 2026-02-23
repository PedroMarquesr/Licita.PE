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
  Flex,
  Text,
} from "@chakra-ui/react"
// ICONS
import { IoDocumentText } from "react-icons/io5"
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
import { biddingStatusOptions } from "@/constants/biddingStatusOptions"
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

  const handleStatusUpdate = async () => {
    if (!selectedStatus) {
      setShowAlertErrorStatus(true)
      setTimeout(() => {
        setShowAlertErrorStatus(false)
      }, 5000)
      return
    }

    try {
      setIsLoading(true)

      const biddingRef = doc(db, "biddings", biddingData.id)

      const updatePayload = {
        result: selectedStatus,
        status: selectedStatus,
      }

      if (selectedStatus === "reopened") {
        if (!reopeningDate) {
          setShowAlertErrorDate(true)
          setTimeout(() => {
            setShowAlertErrorDate(false)
          }, 5000)
          return
        }

        const reopeningDateTime = new Date(
          `${reopeningDate}T${reopeningTime || "00:00"}`
        )

        updatePayload.status = "reopened"

        updatePayload.reopenHistory = arrayUnion({
          id: uuidv4(),
          createdAt: Timestamp.now(),
          reopenedAt: Timestamp.fromDate(reopeningDateTime),
          notes: note || "",
        })
      }
      await updateDoc(biddingRef, updatePayload)

      setShowAlertSucess(true)

      refresh()

      setTimeout(() => {
        onClose()
      }, 1500)
    } catch (error) {
      console.error(error)
      alert("Erro ao atualizar")
    } finally {
      setIsLoading(false)
    }
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
                    options={biddingStatusOptions}
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

                  {selectedStatus === "finished" && (
                    <Flex flexDir={"column"}>
                      <Separator mt={4} mb={4} borderColor={"gray.300"} />
                      <Flex
                        flexDir={"column"}
                        justifyContent={"left"}
                        alignItems={"start"}
                        gap={2}
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
