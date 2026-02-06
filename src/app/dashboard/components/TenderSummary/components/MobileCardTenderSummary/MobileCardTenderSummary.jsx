"use client";

import BiddingCalendarMenu from "../../../BiddingCalendar/components/BiddingCalendarMenu/BiddingCalendarMenu";
import { Flex, Text, Tag, Box } from "@chakra-ui/react";

export default function MobileCardTenderSummary({
  orgao,
  dateFormated,
  fontWeight,
  bgColor,
  flagToday,
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
      p="3"
      bg="white"
      mb="3"
      borderRadius="xl"
      boxShadow="0 1px 3px rgba(0,0,0,0.1)"
      border="1px solid"
      borderColor="gray.100"
      alignItems="flex-start"
      gap="3"
    >
      <Flex flexDir={"column"}>
        {" "}
        <Box
          bg="blue.50"
          color="blue.700"
          px="2"
          py="1"
          borderRadius="md"
          fontSize="xs"
          fontWeight="bold"
          minW="60px"
          textAlign="center"
        >
          {dateFormated}
        </Box>
        <Text
          color="red.500"
          display={flagToday}
          fontSize="xs"
          mt="1"
          pl={8}
          bgColor={"red.100"}
          fontWeight="bold"
        >
          Hoje
        </Text>
        <BiddingCalendarMenu />
      </Flex>

      <Flex flexDir="column" flex="1" minW="0">
        <Text
          fontSize="sm"
          fontWeight="semibold"
          color="gray.800"
          mb="1"
          noOfLines={1}
        >
          {orgao}
        </Text>

        <Flex alignItems="center" gap="2" mb="2">
          <Text fontSize="xs" color="gray.600">
            {identificationNumber}
          </Text>
          <Box w="1" h="1" bg="gray.300" borderRadius="full" />
          <Text fontSize="xs" color="gray.500">
            {biddingType}
          </Text>
        </Flex>

        <Tag.Root
          size="sm"
          variant="subtle"
          bg={bgColorStatus}
          color={colorStatus}
          borderRadius="full"
          px="3"
          alignSelf="flex-start"
          fontWeight="bold"
          fontSize="2xs"
          textTransform="uppercase"
        >
          {biddingStatus}
        </Tag.Root>
      </Flex>
    </Flex>
  );
}
