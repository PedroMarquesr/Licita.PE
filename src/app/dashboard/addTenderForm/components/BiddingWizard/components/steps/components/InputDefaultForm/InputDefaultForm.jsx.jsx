"use client";

import { Flex, Field, Text, Fieldset, Stack, Input } from "@chakra-ui/react";

export default function InputDefaultForm({
  inputValue,
  onChange,
  placeholder,
  legend,
  typeInput,
  maxLength,
  onBlur,
  maxW,
  width,
  edit,
  border,
}) {
  return (
    <Fieldset.Root>
      <Flex align={"center"} gap={5}>
        <Fieldset.Legend
          fontWeight={"semibold"}
          color="gray.700"
          minWidth="120px"
          textAlign={"right"}
        >
          {legend}
        </Fieldset.Legend>
        <Input
          disabled={edit}
          type={typeInput}
          border={border}
          maxLength={maxLength}
          value={inputValue ?? ""}
          borderColor="gray.300"
          _hover={{ borderColor: "gray.500" }}
          _focus={{ borderColor: "primary.500", boxShadow: "outline" }}
          onChange={onChange}
          placeholder={placeholder}
          onBlur={onBlur}
          flex="1"
          maxW={maxW}
          pl={"3"}
          w={width}
        />
      </Flex>
    </Fieldset.Root>
  );
}
