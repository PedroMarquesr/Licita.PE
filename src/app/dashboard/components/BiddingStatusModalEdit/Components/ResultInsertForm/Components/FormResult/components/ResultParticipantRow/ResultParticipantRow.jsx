"use client"

import { Flex, Box } from "@chakra-ui/react"
import InputResult from "../InputResult/InputResult"
import { useState } from "react"

export default function ResultParticipantRow() {
  return (
    <Flex w={"90%"}>
      <InputResult
        columnTitle={"Coloc."}
        width={30}
        textAlignInput={"center"}
        mrField={4}
      />

      <InputResult
        columnTitle={"Participante"}
        width={350}
        textAlignInput={"left"}
        mrField={1}
      />
      <InputResult
        columnTitle={"Marca"}
        textAlignInput={"left"}
        width={"9%"}
        mrField={1}
      />

      <InputResult
        columnTitle={"Preço"}
        textAlignInput={"center"}
        width={"7%"}
        typeInput={"number"}
      />
    </Flex>
  )
}
