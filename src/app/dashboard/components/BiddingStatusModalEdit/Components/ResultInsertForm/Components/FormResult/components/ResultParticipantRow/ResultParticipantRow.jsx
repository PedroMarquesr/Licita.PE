"use client"

import { Flex, Box, Button, Text, Icon, Checkbox } from "@chakra-ui/react"
import { Tooltip } from "@/components/ui/tooltip"

import InputResult from "../InputResult/InputResult"
import { useState } from "react"
import { RiUserLocationFill } from "react-icons/ri"

export default function ResultParticipantRow({
  participant,
  mb,
  onChange,
  onCheckedChange,
  checked,
  onCheckedChangeWinner,
  winnerChecked,
  showCheckdeclassification,
}) {
  return (
    <>
      <Flex
        w={"90%"}
        mb={mb}
        bg="purple.50"
        p={3}
        borderRadius="md"
        borderWidth="1px"
        borderColor="gray.200"
        boxShadow="sm"
        _hover={{
          borderColor: "gray.200",
          boxShadow: "md",
          transition: "all 0.2s",
          bg: "gray.100",
        }}
      >
        <Flex flexDir={"column"}>
          <Flex>
            <InputResult
              columnTitle={"Coloc."}
              width={30}
              textAlignInput={"center"}
              mrField={4}
              value={participant.position}
              onChange={(e) => onChange("position", e.target.value)}
            />
            <InputResult
              columnTitle={"Participante"}
              width={350}
              textAlignInput={"left"}
              mrField={1}
              value={participant.bidder}
              onChange={(e) => onChange("bidder", e.target.value)}
            />
            <InputResult
              value={participant.brand}
              onChange={(e) => onChange("brand", e.target.value)}
              columnTitle={"Marca"}
              textAlignInput={"left"}
              width={"9%"}
              mrField={1}
            />

            <InputResult
              value={participant.price}
              onChange={(e) => onChange("price", e.target.value)}
              columnTitle={"Preço"}
              textAlignInput={"center"}
              width={"7%"}
              typeInput={"number"}
            />
            <Checkbox.Root
              ml={3}
              colorPalette={"green"}
              size={"xs"}
              onCheckedChange={onCheckedChange}
              checked={checked}
            >
              <Checkbox.HiddenInput />
              <Checkbox.Control />
              <Checkbox.Label>Meu resultado</Checkbox.Label>
            </Checkbox.Root>
            <Checkbox.Root
              ml={3}
              colorPalette={"purple"}
              size={"xs"}
              onCheckedChange={onCheckedChangeWinner}
              checked={winnerChecked}
            >
              <Checkbox.HiddenInput />
              <Checkbox.Control />
              <Checkbox.Label>Participante vencedor</Checkbox.Label>
            </Checkbox.Root>

            <Checkbox.Root
              display={showCheckdeclassification ? "flex" : "none"}
              ml={3}
              colorPalette={"purple"}
              size={"xs"}
              onCheckedChange={onCheckedChangeWinner}
              checked={winnerChecked}
            >
              <Checkbox.HiddenInput />
              <Checkbox.Control />
              <Checkbox.Label>Participante desclassificado</Checkbox.Label>
            </Checkbox.Root>
          </Flex>
          <Flex
            display={showCheckdeclassification ? "flex" : "none"}
            borderRadius="md"
            borderWidth="1px"
            borderColor="gray.200"
            boxShadow="sm"
            mt={4}
          >
            <Text>teste</Text>
          </Flex>
        </Flex>
      </Flex>
    </>
  )
}
