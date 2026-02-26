// "use client"

// import { Flex, Box } from "@chakra-ui/react"
// import InputResult from "../InputResult/InputResult"
// import { useState } from "react"

// export default function ResultParticipantRow({ participant, mb }) {
//   return (
//     <Flex w={"90%"} mb={mb}>
//       <InputResult
//         columnTitle={"Coloc."}
//         width={30}
//         textAlignInput={"center"}
//         mrField={4}
//         value={participant.position}
//       />

//       <InputResult
//         columnTitle={"Participante"}
//         width={350}
//         textAlignInput={"left"}
//         mrField={1}
//       />
//       <InputResult
//         columnTitle={"Marca"}
//         textAlignInput={"left"}
//         width={"9%"}
//         mrField={1}
//       />

//       <InputResult
//         columnTitle={"Preço"}
//         textAlignInput={"center"}
//         width={"7%"}
//         typeInput={"number"}
//       />
//     </Flex>
//   )
// }

"use client"

import { Flex, Box } from "@chakra-ui/react"
import InputResult from "../InputResult/InputResult"
import { useState } from "react"

export default function ResultParticipantRow({ participant, mb, onChange }) {
  return (
    <Flex
      w={"90%"}
      mb={mb}
      bg="gray.50"
      p={3}
      borderRadius="md"
      borderWidth="1px"
      borderColor="gray.200"
      boxShadow="sm"
      _hover={{
        borderColor: "blue.200",
        boxShadow: "md",
        transition: "all 0.2s",
      }}
    >
      <InputResult
        columnTitle={"Coloc."}
        width={30}
        textAlignInput={"center"}
        mrField={4}
        value={participant.position}
      />

      <InputResult
        columnTitle={"Participante"}
        width={350}
        textAlignInput={"left"}
        mrField={1}
        value={participant.bidder}
        onChange={(e) => onChange("bidder", e.target.value)}
      />
      <InputResult
        value={participant.brand}
        onChange={(e) => onChange("brand", e.target.value)}
        columnTitle={"Marca"}
        textAlignInput={"left"}
        width={"9%"}
        mrField={1}
      />

      <InputResult
        value={participant.price}
        onChange={(e) => onChange("price", e.target.value)}
        columnTitle={"Preço"}
        textAlignInput={"center"}
        width={"7%"}
        typeInput={"number"}
      />
    </Flex>
  )
}
