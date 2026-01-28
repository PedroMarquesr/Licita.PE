"use client"

import { Flex, Text, Tag, Box } from "@chakra-ui/react"

export default function MobileCardTenderSummary({
  orgao,
  dateFormated,
  fontWeight,
  bgColor,
  identificationNumber,
  bgColorStatus,
  colorStatus,
  biddingStatus,
  biddingType,
}) {
  return (
    <Flex
      display={{ base: "flex", md: "none" }}
      w={"100%"}
      p="4"
      boxShadow="md"
      borderRadius="12px"
      bg="gray.50"
      mb={4}
      bgColor={bgColor}
    >
      <Flex flexDir={"column"} flex={1} fontWeight={fontWeight}>
        <Text fontSize="sm" color="gray.600" mb={1}>
          {dateFormated}
        </Text>
        <Text fontSize="md" fontWeight="semibold" color={"gray.800"} mb={1}>
          {orgao}
        </Text>
        <Text fontSize="sm" color="gray.700" mb={1}>
          {identificationNumber}
        </Text>
      </Flex>

      <Flex
        flexDir="column"
        justifyContent="flex-start"
        alignItems="flex-end"
        ml="4"
        flex={1}
      >
        <Tag.Root
          size="md"
          variant="solid"
          bg={bgColorStatus}
          color={colorStatus}
          fontWeight="bold"
          borderRadius="10%"
          px={3}
          py={1}
          boxShadow="sm"
          textTransform="uppercase"
          fontSize="xs"
          letterSpacing="wide"
          textAlign={"center"}
        >
          {biddingStatus}
        </Tag.Root>
        <Text>{biddingType}</Text>
      </Flex>
    </Flex>
  )
}
