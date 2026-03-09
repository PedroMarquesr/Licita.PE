"use client"

import { Flex, Text, Box, Field, Input } from "@chakra-ui/react"
import InputResult from "../../../InputResult/InputResult"
export default function UnitPriceAllocatorBatch() {
  return (
    <Flex
      mt={3}
      w={{ base: "100%", lg: "90%" }}
      bg="blue.50"
      p={3}
      borderRadius="md"
      borderWidth="1px"
      borderColor="gray.400"
      boxShadow="sm"
      mb={5}
      gap={3}
      flexWrap="wrap"
      flexDir={{ base: "column", md: "row" }}
      _hover={{
        borderColor: "gray.200",
        boxShadow: "md",
        transition: "all 0.2s",
        bg: "gray.100",
      }}
    >
      <Field.Root>
        <Flex gap={3}>
          <Input h={6} w={4} borderColor="gray.400" /> {/* Item */}
          <Input h={6} w={4} borderColor="gray.400" /> {/* Lote */}
          <Input h={6} w={"80%"} borderColor="gray.400" /> {/* Descritivo */}
          <Text fontSize={"xs"}>Marca:</Text>
          <Input h={6} w={"15%"} borderColor="gray.400" /> {/* Marca */}
          {/* Preço unitário */}
          <Flex w={"45%"} gap={2}>
            <Text fontSize={"xs"}>Valor unitário:</Text>
            <Input h={6} w={"30%"} borderColor="gray.400" />
          </Flex>
          {/* ↑↑↑↑↑↑↑↑↑↑↑↑ */}
          <Input h={6} border={"none"} readOnly /> {/* Preço total */}
        </Flex>
      </Field.Root>
    </Flex>
  )
}
