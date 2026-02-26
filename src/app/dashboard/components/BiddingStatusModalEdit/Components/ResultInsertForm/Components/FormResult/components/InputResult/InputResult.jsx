// "use client"

// import { Flex, Text, Field, Input, Grid, GridItem } from "@chakra-ui/react"
// import CustomSelect from "@/app/dashboard/addTenderForm/components/BiddingWizard/components/steps/IdentificationStep/components/CustomSelect/CustomSelect"

// export default function InputResult({
//   columnTitle,
//   width,
//   textAlignInput,
//   typeInput,
//   ml,
//   mrField,
//   value,
// }) {
//   return (
//     <Field.Root w={width} gap={0} mr={mrField}>
//       <Text p={0} m={0} color={"gray.700"} fontSize={"sm"} textAlign={"left"}>
//         {columnTitle}
//       </Text>
//       <Input
//         value={value}
//         border={"1px solid"}
//         borderColor={"gray.400"}
//         h={6}
//         p={1}
//         textAlign={textAlignInput}
//         type={typeInput}
//       />
//     </Field.Root>
//   )
// }

"use client"

import { Flex, Text, Field, Input } from "@chakra-ui/react"

export default function InputResult({
  columnTitle,
  width,
  textAlignInput,
  typeInput,
  ml,
  mrField,
  value,
  onChange,
}) {
  return (
    <Field.Root w={width} gap={0} mr={mrField}>
      <Text
        p={0}
        m={0}
        color={"gray.600"}
        fontSize={"xs"}
        fontWeight="medium"
        textAlign={"left"}
        mb="2px"
      >
        {columnTitle}
      </Text>
      <Input
        value={value}
        onChange={onChange}
        border={"1px solid"}
        borderColor={"gray.300"}
        _hover={{ borderColor: "gray.400" }}
        _focus={{
          borderColor: "blue.400",
          boxShadow: "0 0 0 1px blue.400",
          outline: "none",
        }}
        h={7}
        p={1}
        fontSize="sm"
        textAlign={textAlignInput}
        type={typeInput}
        borderRadius="md"
        bg="white"
      />
    </Field.Root>
  )
}
