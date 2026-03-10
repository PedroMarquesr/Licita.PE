"use client"

import { Flex, Text, Field, Input } from "@chakra-ui/react"

export default function UnitPriceAllocatorBatch({ item, value, onChange }) {
  const calculateTotal = () => {
    const price = parseFloat(value) || 0
    const amount = parseFloat(item.amount) || 0
    return (price * amount).toFixed(2)
  }

  return (
    <Flex
      // mt={2}
      w="100%"
      bg="blue.50"
      // p={3}
      borderRadius="lg"
      borderWidth="1px"
      borderColor="gray.300"
      boxShadow="sm"
      gap={4}
      flexWrap="wrap"
      flexDir={{ base: "column", md: "row" }}
      _hover={{
        borderColor: "blue.200",
        boxShadow: "md",
        transition: "all 0.2s",
        bg: "blue.100",
      }}
    >
      <Field.Root w="100%">
        <Flex
          align="center"
          gap={3}
          flexWrap="wrap"
          justifyContent="space-between"
        >
          {/* Item e Descrição */}
          <Flex align="center" gap={2} flex={2} minW="300px">
            <Input
              h={7}
              w={12}
              border="1px solid"
              borderColor="gray.300"
              borderRadius="md"
              value={item.itemNumber || item.itemId}
              readOnly
              textAlign="center"
              bg="white"
              fontSize="xs"
            />
            <Input
              h={7}
              flex={1}
              border="1px solid"
              borderColor="gray.300"
              borderRadius="md"
              px={2}
              value={item.descriptive}
              readOnly
              fontSize="xs"
              fontWeight="medium"
              bg="white"
            />
          </Flex>

          {/* Quantidade e unidade */}
          <Flex gap={2} align="center" minW="120px">
            <Text
              fontSize="xs"
              fontWeight="medium"
              color="gray.600"
              whiteSpace="nowrap"
            >
              Qtd:
            </Text>
            <Input
              h={7}
              w="70px"
              border="none"
              borderColor="gray.300"
              borderRadius="md"
              value={item.amount}
              readOnly
              textAlign="center"
              bg="white"
              fontSize="xs"
            />
            <Input
              h={7}
              w="50px"
              border="1px solid"
              borderColor="gray.300"
              borderRadius="md"
              value={item.supplyUnit}
              readOnly
              textAlign="center"
              bg="white"
              fontSize="xs"
            />
          </Flex>

          {/* Preço unitário */}
          <Flex gap={2} align="center" flex={1} minW="180px">
            <Text
              fontSize="xs"
              fontWeight="medium"
              color="gray.600"
              whiteSpace="nowrap"
            >
              Valor unitário:
            </Text>
            <Input
              h={7}
              w="100px"
              borderColor="gray.300"
              borderRadius="md"
              bg="white"
              type="number"
              value={value}
              onChange={(e) => onChange(e.target.value)}
              _hover={{ borderColor: "blue.300" }}
              _focus={{ borderColor: "blue.500", boxShadow: "outline" }}
              fontSize="xs"
            />
          </Flex>

          {/* Valor total */}
          <Flex gap={2} align="center" flex={1} minW="160px">
            <Text
              fontSize="xs"
              fontWeight="medium"
              color="gray.600"
              whiteSpace="nowrap"
            >
              Valor total:
            </Text>
            <Input
              h={7}
              w="100px"
              borderColor="gray.300"
              borderRadius="md"
              bg="gray.50"
              value={calculateTotal()}
              readOnly
              _hover={{ borderColor: "blue.300" }}
              fontSize="xs"
              fontWeight="medium"
            />
          </Flex>
        </Flex>
      </Field.Root>
    </Flex>
  )
}
