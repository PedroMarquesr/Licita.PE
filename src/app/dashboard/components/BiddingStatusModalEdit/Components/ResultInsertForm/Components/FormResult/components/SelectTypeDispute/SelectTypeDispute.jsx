"use client"

import { NativeSelect, Field, Box, Text } from "@chakra-ui/react"

export default function SelectTypeDispute({ onValueChange, value }) {
  const optionsTypeDispute = [
    { label: "Item", value: "item" },
    { label: "Lote", value: "batch" },
  ]

  return (
    <Field.Root>
      <Field.Label>Disputa por item ou lote?</Field.Label>
      <NativeSelect.Root size="sm" width="240px">
        <NativeSelect.Field
          value={value}
          onChange={(e) => onValueChange(e.target.value)}
          bg="white"
          color="gray.800"
          borderColor="gray.500"
          _hover={{ bg: "gray.100" }}
          _focus={{ bg: "gray.100" }}
        >
          <Text color={"gray.800"}>
            <option value="">Selecione uma opção</option>
          </Text>
          {optionsTypeDispute.map((item) => (
            <Text color={"gray.800"}>
              {" "}
              <option key={item.value} value={item.value}>
                {item.label}
              </option>
            </Text>
          ))}
        </NativeSelect.Field>
        <NativeSelect.Indicator />
      </NativeSelect.Root>
    </Field.Root>
  )
}
