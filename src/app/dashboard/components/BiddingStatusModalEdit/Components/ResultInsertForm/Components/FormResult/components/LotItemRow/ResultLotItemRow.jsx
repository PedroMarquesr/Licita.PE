"use client";
import { Flex, Box } from "@chakra-ui/react";
import InputResult from "../InputResult/InputResult";

export default function ResultLotItemRow({
  item,
  groupId,
  onChange,
  lotNumber,
}) {
  return (
    <Flex
      w={{ base: "100%", lg: "100%" }}
      bg="blue.50"
      p={3}
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
          columnTitle={"Lote"}
          width="100%"
          textAlignInput={"center"}
          value={lotNumber}
          onChange={(e) => onChange("lotNumber", e.target.value)}
        />
      </Box>
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
          //  value={item.supplyUnit}
          // onChange={(e) => onChange("supplyUnit", e.target.value)}
        />
      </Box>
    </Flex>
  );
}
