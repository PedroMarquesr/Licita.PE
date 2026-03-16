"use client"

import { Flex, Box, Button, Icon } from "@chakra-ui/react"
import InputResult from "../InputResult/InputResult"
import { TiDelete } from "react-icons/ti"

export default function ResultItemRow({ item, onChange, deleteItem }) {
  return (
    <Flex
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
        borderColor: "gray.400",
        boxShadow: "md",
        transition: "all 0.2s",
        bg: "blue.100",
      }}
    >
      <Box w={{ base: "100%", md: "70px" }}>
        <InputResult
          columnTitle={"Item"}
          width="100%"
          textAlignInput={"center"}
          value={item.itemNumber}
          onChange={(e) => onChange("itemNumber", e.target.value)}
        />
      </Box>

      <Box flex="1" minW={{ base: "100%", md: "300px" }}>
        <InputResult
          columnTitle={"Descritivo"}
          width="100%"
          textAlignInput={"left"}
          value={item.descriptive}
          onChange={(e) => onChange("descriptive", e.target.value)}
        />
      </Box>

      <Box w={{ base: "100%", md: "140px" }}>
        <InputResult
          columnTitle={"Quantidade"}
          width="100%"
          textAlignInput={"center"}
          typeInput={"number"}
          value={item.amount}
          onChange={(e) => onChange("amount", e.target.value)}
        />
      </Box>

      <Box w={{ base: "100%", md: "180px" }}>
        <InputResult
          columnTitle={"Und fornecimento"}
          width="100%"
          textAlignInput={"center"}
          value={item.supplyUnit}
          onChange={(e) => onChange("supplyUnit", e.target.value)}
        />
      </Box>

      <Flex
        alignItems="center"
        justifyContent="center"
        mt={{ base: 3, lg: 0 }}
        ml={{ lg: 2 }}
      >
        <Button
          
          colorPalette="red"
          size="sm"
          variant="ghost"
          p={1}
          minW="auto"
          h="auto"
          onClick={deleteItem}
          _hover={{
            bg: "red.100",
            transform: "scale(1.1)",
            transition: "all 0.2s",
          }}
          color="gray.600"
        >
          <Icon boxSize={5}>
            <TiDelete />
          </Icon>
        </Button>
      </Flex>
    </Flex>
  )
}
