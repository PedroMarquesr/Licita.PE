"use client"

import { Flex, Box } from "@chakra-ui/react"
import InputResult from "../InputResult/InputResult"
import { useState } from "react"

export default function ResultItemRow({ showBatch }) {
  return (
    <Flex w={"90%"}>
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
