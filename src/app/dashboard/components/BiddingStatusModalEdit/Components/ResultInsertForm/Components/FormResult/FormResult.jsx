"use client"

import { Flex, Text, Field, Input, Grid, GridItem } from "@chakra-ui/react"
import CustomSelect from "@/app/dashboard/addTenderForm/components/BiddingWizard/components/steps/IdentificationStep/components/CustomSelect/CustomSelect"

export default function FormResult() {
  const optionsTypeDispute = [
    { label: "Item", value: "Item" },
    { label: "Lote", value: "Lote" },
  ]
  return (
    <Flex w={"100%"} border={"1px solid red"} py={4} px={5} flexDir={"column"}>
      <Field.Root>
        <Text ml={2}>Disputa por itens ou lotes?</Text>
        <CustomSelect options={optionsTypeDispute} />
      </Field.Root>
      <Flex border={"1px solid red"}>
        <Grid w={"100%"} templateColumns="30px 30px 1fr 30px 70px" gap={6}>
          <GridItem>
            <Text>Lote</Text>
            <Field.Root>
              <Input />
            </Field.Root>
          </GridItem>

          <GridItem>
            <Field.Root>
              <Field.Label>Item</Field.Label>
              <Input />
            </Field.Root>
          </GridItem>

          <GridItem>
            <Field.Root>
              <Field.Label>Descritivo</Field.Label>
              <Input />
            </Field.Root>
          </GridItem>

          <GridItem>
            <Text>Und. Fornecimento</Text>
            <Field.Root>
              <Input />
            </Field.Root>
          </GridItem>

          <GridItem>
            <Field.Root>
              <Field.Label>Quantidade</Field.Label>
              <Input />
            </Field.Root>
          </GridItem>
        </Grid>
      </Flex>
    </Flex>
  )
}
