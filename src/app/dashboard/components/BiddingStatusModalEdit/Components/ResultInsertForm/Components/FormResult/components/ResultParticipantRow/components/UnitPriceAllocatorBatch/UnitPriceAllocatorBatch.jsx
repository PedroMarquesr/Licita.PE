"use client";

import { Flex, Text, Box, Field, Input } from "@chakra-ui/react";
import InputResult from "../../../InputResult/InputResult";

export default function UnitPriceAllocatorBatch({
  groupId,
  itemId,
  participant,
  unitPriceChange,
}) {
  return (
    <Flex
      mt={3}
      w={{ base: "100%", lg: "90%" }}
      bg="blue.50"
      p={2}
      borderRadius="lg"
      borderWidth="1px"
      borderColor="gray.300"
      boxShadow="sm"
      mb={5}
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
              h={5}
              w={10}
              border={"none"}
              value="1"
              readOnly
              textAlign="center"
            />
            <Input
              h={5}
              flex={1}
              border={"none"}
              px={2}
              //  value={marca}
              readOnly
              fontSize="xs"
              fontWeight="medium"
            />
          </Flex>

          {/* Marca */}
          <Flex gap={2} align="center" flex={1} minW="150px">
            <Text
              fontSize="xs"
              fontWeight="medium"
              color="gray.600"
              whiteSpace="nowrap"
            >
              Marca:
            </Text>
            <Input
              h={5}
              borderColor="gray.300"
              borderRadius="md"
              bg="white"
              _hover={{ borderColor: "blue.300" }}
              _focus={{ borderColor: "blue.500", boxShadow: "outline" }}
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
              h={5}
              w="100px"
              borderColor="gray.300"
              borderRadius="md"
              bg="white"
              onChange={(e) =>
                unitPriceChange(
                  groupId,
                  itemId,
                  participant.id,
                  "price",
                  e.target.value,
                )
              }
              _hover={{ borderColor: "blue.300" }}
              _focus={{ borderColor: "blue.500", boxShadow: "outline" }}
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
              h={5}
              w="100px"
              borderColor="gray.300"
              borderRadius="md"
              bg="white"
              _hover={{ borderColor: "blue.300" }}
              _focus={{ borderColor: "blue.500", boxShadow: "outline" }}
            />
          </Flex>
        </Flex>
      </Field.Root>
    </Flex>
  );
}
