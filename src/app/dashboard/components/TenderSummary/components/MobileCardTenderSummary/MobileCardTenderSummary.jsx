"use client"

import { Box, Flex, Text, Badge } from "@chakra-ui/react"

export default function MobileCardTenderSummary({
  bgColor,
  fontWeight,
  dateFormated,
  orgao,
  flagToday,
  identificationNumber,
  colorStatus,
  bgColorStatus,
  biddingStatus,
  biddingType,
  menu,
}) {
  return (
    <Box
      bg={bgColor}
      borderRadius="md"
      border="1px solid"
      borderColor="gray.200"
      p={4}
      mb={3}
      boxShadow="sm"
    >
      <Flex justify="space-between" align="center" mb={2}>
        <Text fontWeight={fontWeight} fontSize="sm">
          {identificationNumber || "N/A"}
        </Text>

        {menu}
      </Flex>

      <Text fontSize="sm" color="gray.700" mb={2}>
        {orgao || "N/A"}
      </Text>

      <Text fontSize="xs" color="gray.500" mb={2}>
        {biddingType || "N/A"}
      </Text>

      <Flex justify="space-between" align="center">
        <Text fontSize="xs">{dateFormated}</Text>

        <Badge
          bg={bgColorStatus}
          color={colorStatus}
          px={2}
          py={1}
          borderRadius="full"
          fontSize="xs"
        >
          {biddingStatus}
        </Badge>
      </Flex>

      {flagToday === "flex" && (
        <Flex mt={2}>
          <Badge colorScheme="yellow">HOJE</Badge>
        </Flex>
      )}
    </Box>
  )
}
