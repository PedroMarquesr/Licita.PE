"use client"

import { Text, Grid, Box, Stack, Checkbox } from "@chakra-ui/react"

import InputDefaultForm from "../components/InputDefaultForm/InputDefaultForm.jsx"
import { documentationChecklist } from "@/constants/documentationRequirements"

export default function DocumentationStep({
  biddingData,
  setBiddingData,
  edit,
  setEdit,
}) {
  const handleCheckboxChange = (sectionKey, item) => {
    const currentItems = biddingData.documentation?.[sectionKey] || []

    const updatedItems = currentItems.includes(item)
      ? currentItems.filter((i) => i !== item)
      : [...currentItems, item]

    setBiddingData({
      ...biddingData,
      documentation: {
        ...biddingData.documentation,
        [sectionKey]: updatedItems,
      },
    })
  }

  const handleToggleAll = (sectionKey, items) => {
    const currentItems = biddingData.documentation?.[sectionKey] || []

    const isAllChecked = items.every((item) => currentItems.includes(item))

    setBiddingData({
      ...biddingData,
      documentation: {
        ...biddingData.documentation,
        [sectionKey]: isAllChecked ? [] : items,
      },
    })
  }

  const handleCommentChange = (sectionKey, value) => {
    setBiddingData({
      ...biddingData,
      documentation: {
        ...biddingData.documentation,
        comments: {
          ...biddingData.documentation?.comments,
          [sectionKey]: value,
        },
      },
    })
  }

  return (
    <Stack spacing={6}>
      {documentationChecklist.map((section) => {
        const selectedItems = biddingData.documentation?.[section.key] || []

        const isAllChecked =
          section.items.length > 0 &&
          section.items.every((item) => selectedItems.includes(item))

        return (
          <Box key={section.key} borderWidth="1px" borderRadius="md" p={4}>
            <Text fontSize="lg" fontWeight="bold" mb={3}>
              {section.title}
            </Text>

            <Checkbox.Root
              disabled={edit}
              checked={isAllChecked}
              onChange={() => handleToggleAll(section.key, section.items)}
              colorPalette="blue"
              mb={3}
            >
              <Checkbox.HiddenInput />
              <Checkbox.Control />
              <Checkbox.Label fontWeight="bold">Marcar todos</Checkbox.Label>
            </Checkbox.Root>

            <Grid
              templateColumns={{ base: "1fr", md: "repeat(4, 1fr)" }}
              gap={3}
              mb={4}
            >
              {section.items.map((item) => (
                <Checkbox.Root
                  disabled={edit}
                  key={item}
                  checked={selectedItems.includes(item)}
                  onChange={() => handleCheckboxChange(section.key, item)}
                  colorPalette="blue"
                >
                  <Checkbox.HiddenInput />
                  <Checkbox.Control />
                  <Checkbox.Label fontSize="sm">{item}</Checkbox.Label>
                </Checkbox.Root>
              ))}
            </Grid>

            <InputDefaultForm
              edit={edit}
              legend="Comentário adicional"
              placeholder="Adicione observações específicas para esta seção"
              inputValue={
                biddingData.documentation?.comments?.[section.key] || ""
              }
              onChange={(e) => handleCommentChange(section.key, e.target.value)}
            />
          </Box>
        )
      })}
    </Stack>
  )
}
