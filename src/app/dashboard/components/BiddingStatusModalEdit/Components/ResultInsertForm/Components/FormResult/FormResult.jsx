"use client"

import { Flex, Field, Icon, Button, Tooltip } from "@chakra-ui/react"
import SelectTypeDispute from "./components/SelectTypeDispute/SelectTypeDispute"
import ResultItemRow from "./components/ResultItemRow/ResultItemRow"
import ResultParticipantRow from "./components/ResultParticipantRow/ResultParticipantRow"
import { FaUserPlus, FaBoxesStacked } from "react-icons/fa6"
import { BsFillPlusCircleFill } from "react-icons/bs"

import { useState } from "react"

export default function FormResult() {
  const [typeDispute, setTypeDispute] = useState("")
  const [result, setResult] = useState({
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
                  position: group.participants.length + 1,
                  bidder: "",
                  unitPrice: "",
                  totalValue: "",
                },
              ],
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
        <Flex mt={17} justify={"center"} align={"center"}>
          <ResultItemRow showBatch={typeDispute} />
          <Flex gap={2}>
            <Button colorPalette={"blue"} size={"xs"}>
              <Icon>
                <FaUserPlus />
              </Icon>
            </Button>
            <Button colorPalette={"green"} size={"xs"}>
              <Icon>
                <BsFillPlusCircleFill />
              </Icon>
            </Button>
            <Button
              disabled={typeDispute === "item"}
              colorPalette={"purple"}
              size={"xs"}
            >
              <Icon>
                <FaBoxesStacked />
              </Icon>
            </Button>
          </Flex>
        </Flex>
      )}
      <ResultParticipantRow />
    </Flex>
  )
}
