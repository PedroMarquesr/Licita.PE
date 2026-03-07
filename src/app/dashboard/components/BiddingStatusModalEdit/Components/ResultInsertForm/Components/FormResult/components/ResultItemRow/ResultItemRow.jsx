// "use client";

// import { Flex, Box } from "@chakra-ui/react";
// import InputResult from "../InputResult/InputResult";

// export default function ResultItemRow({ showBatch, item, onChange }) {
//   return (
//     <Flex
//       w={"90%"}
//       bg="blue.50"
//       p={3}
//       borderRadius="md"
//       borderWidth="1px"
//       borderColor="gray.400"
//       boxShadow="sm"
//       _hover={{
//         borderColor: "gray.400",
//         boxShadow: "md",
//         transition: "all 0.2s",
//         bg: "blue.100",
//       }}
//       mb={5}
//       flexDir={{ base: "column", md: "row" }}
//     >
//       <Box display={showBatch === "lot" ? "flex" : "none"}>
//         <InputResult
//           columnTitle={"Lote"}
//           width={30}
//           textAlignInput={"center"}
//           mrField={4}
//           value=""
//           readOnlyInput={true}
//         />
//       </Box>

//       <InputResult
//         columnTitle={"Item"}
//         width={30}
//         textAlignInput={"center"}
//         mrField={4}
//         value={item.itemNumber}
//         onChange={(e) => onChange("itemNumber", e.target.value)}
//       />
//       <InputResult
//         columnTitle={"Descritivo"}
//         width={{ base: "100%", md: "60%" }}
//         //width={"60%"}
//         textAlignInput={"left"}
//         mrField={1}
//         value={item.descriptive}
//         onChange={(e) => onChange("descriptive", e.target.value)}
//       />

//       <InputResult
//         columnTitle={"Quantidade"}
//         width={"9%"}
//         textAlignInput={"center"}
//         mrField={1}
//         typeInput={"number"}
//         value={item.amount}
//         onChange={(e) => onChange("amount", e.target.value)}
//       />
//       <InputResult
//         columnTitle={"Und fornecimento"}
//         textAlignInput={"center"}
//         width={"15%"}
//         value={item.supplyUnit}
//         onChange={(e) => onChange("supplyUnit", e.target.value)}
//       />
//     </Flex>
//   );
// }

"use client";

import { Flex, Box } from "@chakra-ui/react";
import InputResult from "../InputResult/InputResult";

export default function ResultItemRow({ showBatch, item, onChange }) {
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
      {showBatch === "lot" && (
        <Box w={{ base: "100%", md: "70px" }}>
          <InputResult
            columnTitle={"Lote"}
            width="100%"
            textAlignInput={"center"}
            value=""
            readOnlyInput={true}
          />
        </Box>
      )}

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
    </Flex>
  );
}
