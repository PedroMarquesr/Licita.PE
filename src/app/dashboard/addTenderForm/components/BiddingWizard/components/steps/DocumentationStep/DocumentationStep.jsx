"use client"

import {
  Flex,
  Text,
  Grid,
  Box,
  GridItem,
  Stack,
  Checkbox,
  Separator,
} from "@chakra-ui/react"

import InputDefaultForm from "../components/InputDefaultForm/InputDefaultForm.jsx"
import { documentationChecklist } from "@/constants/documentationRequirements"

export default function DocumentationStep() {
  return (
    <Stack>
      {documentationChecklist.map((section, index) => (
        <>
          <Text style={{ fontWeight: "bold" }}>{section.title}</Text>{" "}
          <Grid
            templateColumns={{ base: "repeat(1, 1fr)", md: "repeat(4, 1fr)" }}
            key={index}
            style={{ marginBottom: 16 }}
          >
            {" "}
            <>
              {section.items.map((item, itemIndex) => (
                <Checkbox.Root colorPalette="blue">
                  <Checkbox.HiddenInput />
                  <Checkbox.Control />
                  <Checkbox.Label key={itemIndex}> {item}</Checkbox.Label>
                </Checkbox.Root>
              ))}{" "}
            </>
          </Grid>
          <InputDefaultForm
            legend={"Adicionar específicação ou comentário: "}
          />
        </>
      ))}
    </Stack>
  )
}
