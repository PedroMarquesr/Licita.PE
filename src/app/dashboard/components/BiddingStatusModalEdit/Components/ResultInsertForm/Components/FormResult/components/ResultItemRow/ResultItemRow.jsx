"use client"

import { Flex, Box } from "@chakra-ui/react"
import InputResult from "../InputResult/InputResult"
import { useState } from "react"

export default function ResultItemRow({ showBatch }) {
  return (
    <Flex
      w={"90%"}
      bg="blue.50"
      p={3}
      borderRadius="md"
      borderWidth="1px"
      borderColor="gray.400"
      boxShadow="sm"
      _hover={{
        borderColor: "gray.400",
        boxShadow: "md",
        transition: "all 0.2s",
        bg: "blue.100",
      }}
      mb={5}
    >
      <Box display={showBatch === "batch" ? "flex" : "none"}>
        <InputResult
          columnTitle={"Lote"}
          width={30}
          textAlignInput={"center"}
          showBatch={showBatch}
          mrField={4}
        />
      </Box>

      <InputResult
        columnTitle={"Item"}
        width={30}
        textAlignInput={"center"}
        mrField={4}
      />
      <InputResult
        columnTitle={"Descritivo"}
        width={"60%"}
        textAlignInput={"left"}
        showBatch={showBatch}
        mrField={1}
      />

      <InputResult
        columnTitle={"Quantidade"}
        width={"9%"}
        textAlignInput={"center"}
        showBatch={showBatch}
        mrField={1}
        typeInput={"text"}
      />
      <InputResult
        columnTitle={"Und fornecimento"}
        textAlignInput={"center"}
        width={"15%"}
        showBatch={showBatch}
      />
    </Flex>
  )
}

