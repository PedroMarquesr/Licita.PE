"use client"

import { Flex, Text } from "@chakra-ui/react"

export default function MobileCardTenderSummary({ orgao, dateFormated }) {
  return (
    <Flex
      display={{ base: "flex", md: "none" }}
      w={"100%"}
      p="4"
      boxShadow="md"
      borderRadius="8px"
      bg="gray.50"
      mb={4}
    >
      <Flex flexDir={"column"} mb="4" alignItems="right" flex={1}>
        <Text color={"black"}>{dateFormated}</Text>
        <Text color={"black"}>{orgao}</Text>
        <Text color={"black"}>PE 41/2025</Text>
        <Text color={"black"}>1425.25636-22</Text>
        <Text color={"black"}>Modalidade</Text>
        <Text color={"black"}>Teste</Text>
      </Flex>
      <Flex flexDir={"column"} ml="4" mb="4" alignItems="light" flex={1}>
        <Text color={"black"}>Aguardando atualização</Text>
      </Flex>
    </Flex>
  )
}
