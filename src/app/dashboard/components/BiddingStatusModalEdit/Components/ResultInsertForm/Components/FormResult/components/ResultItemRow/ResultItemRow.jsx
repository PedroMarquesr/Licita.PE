"use client"

import { Flex } from "@chakra-ui/react"
import InputResult from "../InputResult/InputResult"
import { useState } from "react"

export default function ResultItemRow({ showBatch }) {
  return (
    <>
      <Flex display={showBatch === "batch" ? "flex" : "none"}>
        <InputResult
          columnTitle={"Lote"}
          width={30}
          textAlignInput={"center"}
          showBatch={showBatch}
        />
      </Flex>
      <InputResult columnTitle={"Item"} width={30} textAlignInput={"center"} />
      <InputResult
        columnTitle={"Descritivo"}
        width={"60%"}
        textAlignInput={"left"}
        showBatch={showBatch}
      />

      <InputResult
        columnTitle={"Quantidade"}
        width={"7%"}
        textAlignInput={"center"}
        showBatch={showBatch}
      />
      <InputResult
        columnTitle={"Unidade fornecimento"}
        //          width={"auto"}
        textAlignInput={"center"}
        width={"15%"}
        showBatch={showBatch}
      />
    </>
  )
}
