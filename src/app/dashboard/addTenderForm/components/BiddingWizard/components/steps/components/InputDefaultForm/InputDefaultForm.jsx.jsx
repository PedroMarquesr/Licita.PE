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
}) {
  return (
    <Fieldset.Root>
      <Flex align={"center"} gap={5}>
        <Fieldset.Legend fontWeight={"semibold"}>{legend} </Fieldset.Legend>
        <Input
          type={typeInput}
          maxLength={maxLength}
          value={inputValue}
          borderColor="gray.300"
          _hover={{ borderColor: "gray.500" }}
          _focus={{ borderColor: "primary.500", boxShadow: "outline" }}
          onChange={onChange}
          placeholder={placeholder}
          onBlur={onBlur}
        />
      </Flex>
    </Fieldset.Root>
  );
}
