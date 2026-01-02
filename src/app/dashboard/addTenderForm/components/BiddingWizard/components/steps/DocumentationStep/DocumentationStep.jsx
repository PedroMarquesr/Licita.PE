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

export default function DocumentationStep({ biddingData, setBiddingData }) {
  const handleCheckboxChange = (sectionKey, item) => {
    const currentSection = biddingData.documentation?.[sectionKey] || []

    const isChecked = currentSection.includes(item)
    const updatedSection = isChecked
      ? currentSection.filter((i) => i !== item)
      : [...currentSection, item]

    setBiddingData({
      ...biddingData,
      documentation: {
        ...biddingData.documentation,
        [sectionKey]: updatedSection,
      },
    })
  }

  const handleCommentChange = (sectionKey, comment) => {
    setBiddingData({
      ...biddingData,
      documentation: {
        ...(biddingData.docuemntation?.comments || {}),
        [sectionKey]: comment,
      },
    })
  }

  //   return (
  //     <Stack>
  //       {documentationChecklist.map((section, index) => (
  //         <Stack key={section.title}>
  //           <Text style={{ fontWeight: "bold" }}>{section.title}</Text>{" "}
  //           <Grid
  //             templateColumns={{ base: "repeat(1, 1fr)", md: "repeat(4, 1fr)" }}
  //             key={index}
  //             style={{ marginBottom: 16 }}
  //           >
  //             {" "}
  //             <>
  //               {section.items.map((item, itemIndex) => (
  //                 <Checkbox.Root key={itemIndex} colorPalette="blue">
  //                   <Checkbox.HiddenInput />
  //                   <Checkbox.Control />
  //                   <Checkbox.Label> {item}</Checkbox.Label>
  //                 </Checkbox.Root>
  //               ))}{" "}
  //             </>
  //           </Grid>
  //           <InputDefaultForm
  //             legend={"Adicionar específicação ou comentário: "}
  //             inputValue={value}
  //             onChange={(e) => setValue(e.target.value)}
  //           />
  //         </Stack>
  //       ))}
  //     </Stack>
  //   )
  // }

  return (
    <Stack spacing={6}>
      {documentationChecklist.map((section) => (
        <Box key={section.key} borderWidth="1px" borderRadius="md" p={4}>
          <Text fontSize="lg" fontWeight="bold" mb={3}>
            {section.title}
          </Text>

          <Grid
            templateColumns={{ base: "1fr", md: "repeat(4, 1fr)" }}
            gap={3}
            mb={4}
          >
            {section.items.map((item) => {
              const isChecked =
                biddingData.documentation?.[section.key]?.includes(item) ||
                false

              return (
                <Checkbox.Root
                  key={item}
                  checked={isChecked}
                  onChange={() => handleCheckboxChange(section.key, item)}
                  colorPalette="blue"
                >
                  <Checkbox.HiddenInput />
                  <Checkbox.Control />
                  <Checkbox.Label fontSize="sm">{item}</Checkbox.Label>
                </Checkbox.Root>
              )
            })}
          </Grid>

          <InputDefaultForm
            legend="Comentário adicional"
            placeholder="Adicione observações específicas para esta seção"
            inputValue={
              biddingData.documentation?.comments?.[section.key] || ""
            }
            onChange={(e) => handleCommentChange(section.key, e.target.value)}
          />
        </Box>
      ))}
    </Stack>
  )
}
