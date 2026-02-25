"use client"

import { Flex, Text, Field, Input, Grid, GridItem } from "@chakra-ui/react"
import CustomSelect from "@/app/dashboard/addTenderForm/components/BiddingWizard/components/steps/IdentificationStep/components/CustomSelect/CustomSelect"

export default function InputResult({ columnTitle, width, textAlignInput }) {
  return (
    <Field.Root w={width} gap={0} ml={5}>
      <Text p={0} m={0} color={"gray.700"} fontSize={"sm"} textAlign={"left"}>
        {columnTitle}
      </Text>
      <Input
        border={"1px solid"}
        borderColor={"gray.400"}
        h={6}
        p={1}
        textAlign={textAlignInput}
      />
    </Field.Root>
  )
}
