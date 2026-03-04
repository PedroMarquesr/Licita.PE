// "use client"

// import { Flex, Box } from "@chakra-ui/react"
// import InputResult from "../InputResult/InputResult"
// import { useState } from "react"

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
//     >
//       <Box display={showBatch === "batch" ? "flex" : "none"}>
//         <InputResult
//           columnTitle={"Lote"}
//           width={30}
//           textAlignInput={"center"}
//           showBatch={showBatch}
//           mrField={4}
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
//         width={"60%"}
//         textAlignInput={"left"}
//         showBatch={showBatch}
//         mrField={1}
//         value={item.descriptive}
//         onChange={(e) => onChange("descriptive", e.target.value)}
//       />

//       <InputResult
//         columnTitle={"Quantidade"}
//         width={"9%"}
//         textAlignInput={"center"}
//         showBatch={showBatch}
//         mrField={1}
//         typeInput={"text"}
//         value={item.amount}
//         onChange={(e) => onChange("amount", e.target.value)}
//       />
//       <InputResult
//         columnTitle={"Und fornecimento"}
//         textAlignInput={"center"}
//         width={"15%"}
//         showBatch={showBatch}
//         value={item.supplyUnit}
//         onChange={(e) => onChange("supplyUnit", e.target.value)}
//       />
//     </Flex>
//   )
// }

"use client"

import { Flex, Box } from "@chakra-ui/react"
import InputResult from "../InputResult/InputResult"

export default function ResultItemRow({ showBatch, item, onChange }) {
  return (
    <Flex
      w={"90%"}
      bg="blue.50"
      p={3}
      borderRadius="md"
      borderWidth="1px"
      borderColor="gray.400"
      boxShadow="sm"
      _hover={{
        borderColor: "gray.400",
        boxShadow: "md",
        transition: "all 0.2s",
        bg: "blue.100",
      }}
      mb={5}
    >
      {/* Só mostra a coluna "Lote" quando estiver no modo lote */}
      <Box display={showBatch === "lot" ? "flex" : "none"}>
        <InputResult
          columnTitle={"Lote"}
          width={30}
          textAlignInput={"center"}
          mrField={4}
          value=""
          readOnlyInput={true}
        />
      </Box>

      <InputResult
        columnTitle={"Item"}
        width={30}
        textAlignInput={"center"}
        mrField={4}
        value={item.itemNumber}
        onChange={(e) => onChange("itemNumber", e.target.value)}
      />
      <InputResult
        columnTitle={"Descritivo"}
        width={"60%"}
        textAlignInput={"left"}
        mrField={1}
        value={item.descriptive}
        onChange={(e) => onChange("descriptive", e.target.value)}
      />

      <InputResult
        columnTitle={"Quantidade"}
        width={"9%"}
        textAlignInput={"center"}
        mrField={1}
        typeInput={"number"}
        value={item.amount}
        onChange={(e) => onChange("amount", e.target.value)}
      />
      <InputResult
        columnTitle={"Und fornecimento"}
        textAlignInput={"center"}
        width={"15%"}
        value={item.supplyUnit}
        onChange={(e) => onChange("supplyUnit", e.target.value)}
      />
    </Flex>
  )
}
