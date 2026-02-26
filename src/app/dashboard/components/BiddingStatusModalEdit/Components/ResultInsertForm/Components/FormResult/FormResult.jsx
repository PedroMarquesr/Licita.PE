"use client"

import { Flex, Field, Icon, Button, Text, Tag } from "@chakra-ui/react"
import { Tooltip } from "@/components/ui/tooltip"

import SelectTypeDispute from "./components/SelectTypeDispute/SelectTypeDispute"
import ResultItemRow from "./components/ResultItemRow/ResultItemRow"
import ResultParticipantRow from "./components/ResultParticipantRow/ResultParticipantRow"
import { FaUserPlus, FaBoxesStacked } from "react-icons/fa6"
import { BsFillPlusCircleFill } from "react-icons/bs"

import { useState } from "react"

export default function FormResult() {
  const [typeDispute, setTypeDispute] = useState("")
  const [result, setResult] = useState({
    groups: [
      {
        groupId: 1,
        participants: [],
      },
    ],
  })

  const [disputeStructure, setDisputeStructure] = useState({
    type: "",
    groups: [],
  })

  function handleAddParticipant(groupId) {
    setResult((prev) => ({
      ...prev,
      groups: prev.groups.map((group) =>
        group.groupId === groupId
          ? {
              ...group,
              participants: [
                ...group.participants,
                {
                  id: crypto.randomUUID(),
                  position: group.participants.length + 1,
                  bidder: "",
                  brand: "",
                  price: "",
                },
              ],
            }
          : group
      ),
    }))
  }
  function handleParticipantChange(groupId, participantId, field, value) {
    setResult((prev) => ({
      ...prev,
      groups: prev.groups.map((group) =>
        group.groupId === groupId
          ? {
              ...group,
              participants: group.participants.map((participant) =>
                participant.id === participantId
                  ? {
                      ...participant,
                      [field]: value,
                    }
                  : participant
              ),
            }
          : group
      ),
    }))
  }
  return (
    <Flex w={"100%"} py={4} px={5} flexDir={"column"}>
      <Field.Root>
        <SelectTypeDispute
          value={typeDispute}
          onValueChange={(value) => setTypeDispute(value)}
        />
      </Field.Root>
      {typeDispute && (
        <>
          <Flex mt={17} justify={"center"} align={"center"}>
            <ResultItemRow showBatch={typeDispute} />
            <Flex gap={2} ml={3}>
              <Tooltip content="Adicionar item">
                <Button colorPalette={"green"} size={"xs"}>
                  <Icon>
                    <BsFillPlusCircleFill />
                  </Icon>
                </Button>
              </Tooltip>
              <Tooltip content="Adicionar lote">
                <Button
                  disabled={typeDispute === "item"}
                  colorPalette={"purple"}
                  size={"xs"}
                >
                  <Icon>
                    <FaBoxesStacked />
                  </Icon>
                </Button>
              </Tooltip>
            </Flex>
          </Flex>
          {result.groups.map((group) => (
            <Flex key={group.groupId} direction="column" mt={4}>
              {group.participants.map((participant) => (
                <ResultParticipantRow
                  key={participant.id}
                  participant={participant}
                  onChange={(field, value) =>
                    handleParticipantChange(
                      group.groupId,
                      participant.id,
                      field,
                      value
                    )
                  }
                  mb={2}
                />
              ))}

              <Tooltip content={"Adicionar participante"}>
                <Button
                  w={"10%"}
                  mt={5}
                  colorPalette={"blue"}
                  size={"xs"}
                  onClick={() => handleAddParticipant(group.groupId)}
                >
                  <Icon>
                    <FaUserPlus />
                  </Icon>
                </Button>
              </Tooltip>
            </Flex>
          ))}
        </>
      )}

      {JSON.stringify(result)}
    </Flex>
  )
}
