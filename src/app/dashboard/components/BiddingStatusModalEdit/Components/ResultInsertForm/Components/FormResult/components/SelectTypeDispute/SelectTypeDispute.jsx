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
        <NativeSelect.Field
          bgColor={"white"}
          value={value}
          onChange={(e) => onValueChange(e.target.value)}
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
