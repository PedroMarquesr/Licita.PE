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
    <>
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
          // ref={withMask("(99) 99999-9999")}
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
    </>
  )
}
