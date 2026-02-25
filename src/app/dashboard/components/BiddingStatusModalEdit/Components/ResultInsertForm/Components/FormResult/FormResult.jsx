"use client"

import { Flex, Text, Field, Input, Grid, GridItem } from "@chakra-ui/react"
import CustomSelect from "@/app/dashboard/addTenderForm/components/BiddingWizard/components/steps/IdentificationStep/components/CustomSelect/CustomSelect"
import InputResult from "./components/InputResult/InputResult"
import CustomSelectResult from "./components/CustomSelectResult/CustomSelectResult"

export default function FormResult() {
  const optionsTypeDispute = [
    { label: "Item", value: "Item" },
    { label: "Lote", value: "Lote" },
  ]
  const optionsUnidade = [
    { label: "Item", value: "Item" },
    { label: "Lote", value: "Lote" },
  ]
  return (
    <Flex w={"100%"} border={"1px solid red"} py={4} px={5} flexDir={"column"}>
      <Field.Root>
        <Text ml={2}>Disputa por itens ou lotes?</Text>
        <CustomSelect options={optionsTypeDispute} />
      </Field.Root>
      <Flex gap={5}>
        <InputResult
          columnTitle={"Item"}
          width={30}
          textAlignInput={"center"}
        />
        <InputResult
          columnTitle={"Descritivo"}
          width={"60%"}
          textAlignInput={"left"}
        />

        <InputResult
          columnTitle={"Quantidade"}
          width={"7%"}
          textAlignInput={"center"}
        />
        <InputResult
          columnTitle={"Unidade fornecimento"}
          width={"auto"}
          textAlignInput={"center"}
        />

        <CustomSelectResult
          options={optionsUnidade}
          columnTitle={"Unidade fornecimento"}
          width={"auto"}
        />
      </Flex>
    </Flex>
  )
}
