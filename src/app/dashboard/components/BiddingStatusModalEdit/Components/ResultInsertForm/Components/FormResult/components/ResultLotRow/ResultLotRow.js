"use client"

import { Flex, Text, Box } from "@chakra-ui/react"
import InputResult from "../InputResult/InputResult"

export default function ResultLotRow({ lot, onChange }) {
  return (
    <Flex
      w="100%"
      bg="blue.50"
      p={4}
      borderRadius="md"
      borderWidth="2px"
      borderColor="blue.200"
      mb={4}
      flexDir="column"
    >
      <Flex alignItems="center" mb={3} flexWrap="wrap" gap={4}>
        <Text fontWeight="bold" color="blue.600" minW="80px">
          LOTE
        </Text>
        <InputResult
          value={lot.lotNumber}
          onChange={(e) => onChange("lotNumber", e.target.value)}
          columnTitle={"Nº Lote"}
          textAlignInput={"center"}
          width={"10%"}
        />
        <InputResult
          value={lot.description}
          onChange={(e) => onChange("description", e.target.value)}
          columnTitle={"Descrição do Lote"}
          textAlignInput={"left"}
          width={"60%"}
        />
      </Flex>

      <Box ml={8} mt={2}>
        <Text fontWeight="semibold" color="gray.600" mb={3}>
          Itens do Lote:
        </Text>
        {lot.items.map((item, index) => (
          <Flex
            key={item.itemId}
            alignItems="center"
            mb={3}
            gap={4}
            flexWrap="wrap"
          >
            <Text minW="30px" fontWeight="medium">
              {index + 1}.
            </Text>
            <InputResult
              value={item.itemNumber}
              onChange={(e) =>
                onChange(`items.${index}.itemNumber`, e.target.value)
              }
              columnTitle={"Nº Item"}
              textAlignInput={"center"}
              width={"8%"}
            />
            <InputResult
              value={item.descriptive}
              onChange={(e) =>
                onChange(`items.${index}.descriptive`, e.target.value)
              }
              columnTitle={"Descrição"}
              textAlignInput={"left"}
              width={"40%"}
            />
            <InputResult
              value={item.amount}
              onChange={(e) =>
                onChange(`items.${index}.amount`, e.target.value)
              }
              columnTitle={"Qtde"}
              textAlignInput={"center"}
              width={"8%"}
              typeInput={"number"}
            />
            <InputResult
              value={item.supplyUnit}
              onChange={(e) =>
                onChange(`items.${index}.supplyUnit`, e.target.value)
              }
              columnTitle={"Unid"}
              textAlignInput={"center"}
              width={"8%"}
            />
          </Flex>
        ))}
      </Box>
    </Flex>
  )
}
