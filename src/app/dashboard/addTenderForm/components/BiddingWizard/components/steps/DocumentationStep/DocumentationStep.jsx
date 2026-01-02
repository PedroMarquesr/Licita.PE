"use client"

import {
  Flex,
  Text,
  Grid,
  Box,
  GridItem,
  Input,
  Stack,
  Checkbox,
  Separator,
} from "@chakra-ui/react"

import InputDefaultForm from "../components/InputDefaultForm/InputDefaultForm.jsx"
import { documentationChecklist } from "@/constants/documentationRequirements"

import { useState } from "react"

export default function DocumentationStep() {
  const [value, setValue] = useState("")

  return (
    <Stack>
      {documentationChecklist.map((section, index) => (
        <Stack key={section.title}>
          <Text style={{ fontWeight: "bold" }}>{section.title}</Text>{" "}
          <Grid
            templateColumns={{ base: "repeat(1, 1fr)", md: "repeat(4, 1fr)" }}
            key={index}
            style={{ marginBottom: 16 }}
          >
            {" "}
            <>
              {section.items.map((item, itemIndex) => (
                <Checkbox.Root key={itemIndex} colorPalette="blue">
                  <Checkbox.HiddenInput />
                  <Checkbox.Control />
                  <Checkbox.Label> {item}</Checkbox.Label>
                </Checkbox.Root>
              ))}{" "}
            </>
          </Grid>
          <InputDefaultForm
            legend={"Adicionar específicação ou comentário: "}
            inputValue={value}
            onChange={(e) => setValue(e.target.value)}
          />
        </Stack>
      ))}
    </Stack>
  )
}
