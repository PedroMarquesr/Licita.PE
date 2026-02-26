"use client"

import { NativeSelect, Field, Box } from "@chakra-ui/react"

export default function SelectTypeDispute({ onValueChange, value }) {
  const optionsTypeDispute = [
    { label: "Item", value: "item" },
    { label: "Lote", value: "batch" },
  ]

  return (
    <Field.Root>
      <Field.Label>Disputa por item ou lote?</Field.Label>
      <NativeSelect.Root size="sm" width="240px">
        {/* <NativeSelect.Field
          value={value}
          onChange={(e) => onValueChange(e.target.value)}
          bg="gray.100"
          color="gray.800"
          borderColor="white"
          _hover={{ bg: "gray.300" }}
          _focus={{ bg: "gray.100" }}
        > */}
        <NativeSelect.Field
          value={value}
          onChange={(e) => onValueChange(e.target.value)}
          bg="gray.700"
          color="white"
          borderColor="gray.500"
          _hover={{ bg: "gray.600" }}
          _focus={{ bg: "gray.600" }}
        >
          <option value="">Selecione uma opção</option>
          {optionsTypeDispute.map((item) => (
            <option key={item.value} value={item.value}>
              {item.label}
            </option>
          ))}
        </NativeSelect.Field>
        <NativeSelect.Indicator />
      </NativeSelect.Root>
    </Field.Root>
  )
}
