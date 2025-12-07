"use client";

import { Flex, Text, Icon } from "@chakra-ui/react";

export default function CardOverview({
  cardTitle,
  cardContent,
  cardIcon,
  bgcolor,
  cardSubTitle,
}) {
  return (
    <Flex
      border="1px solid"
      borderColor="gray.200"
      borderRadius="20px"
      flex={1}
      w={{ base: "100%", md: "20vw" }}
      minW={{ base: "100%", md: "250px" }}
      p={6}
      gap={6}
      align="center"
      bg="white"
      boxShadow="sm"
      _hover={{
        boxShadow: "md",
        borderColor: "blue.200",
        transform: "translateY(-2px)",
        transition: "all 0.2s",
      }}
      transition="all 0.3s ease-in-out"
    >
      <Flex
        bg="blue.50"
        border="1px solid"
        borderColor="blue.100"
        borderRadius="12px"
        p={3}
        align="center"
        justify="center"
        minW="60px"
        minH="60px"
        bgColor={bgcolor}
      >
        <Text fontSize={"2xl"} color={"gray.50"}>
          {cardIcon}
        </Text>
      </Flex>

      <Flex flexDir="column" flex={1}>
        <Text fontSize="sm" color="gray.600" fontWeight="medium" mb={1}>
          {cardTitle}
        </Text>
        <Text fontSize="2xl" fontWeight="bold" color="gray.800">
          {cardContent}
        </Text>
        <Text fontSize="xs" color="gray.800">
          {cardSubTitle}
        </Text>
      </Flex>
    </Flex>
  );
}
