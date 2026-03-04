"use client"

import { Flex, Text, Field } from "@chakra-ui/react"
import CustomSelect from "@/app/dashboard/addTenderForm/components/BiddingWizard/components/steps/IdentificationStep/components/CustomSelect/CustomSelect"

export default function SucessResultForm() {
  const options = [
    { label: "Item", value: "Item" },
    { label: "Lote", value: "Lote" },
  ]
  return (
    <Flex>
      <Field.Root>
        <Field.Label pl={2}>
          Tipo de disputa <Field.RequiredIndicator />
        </Field.Label>
        <CustomSelect options={options} />
      </Field.Root>
    </Flex>
  )
}
