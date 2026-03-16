"use client";

import { NativeSelect, Field, Switch, Flex, Text } from "@chakra-ui/react";
import { useState, useEffect } from "react";

export default function SelectTypeDispute({ onValueChange, value, bidding }) {
  const [allowEdit, setAllowEdit] = useState(!bidding?.result);

  const optionsTypeDispute = [
    { label: "Item", value: "item" },
    { label: "Lote", value: "batch" },
  ];

  return (
    <Flex align="center" gap={4} w="100%">
      <Field.Root colorPalette={"blue"}>
        <Field.Label>Disputa por item ou lote?</Field.Label>
        <NativeSelect.Root size="sm" width="240px">
          <NativeSelect.Field
            value={value}
            onChange={(e) => onValueChange(e.target.value)}
            disabled={!allowEdit}
            bg="white"
            color="gray.800"
            borderColor="gray.500"
            _hover={{ bg: "gray.100" }}
            _focus={{ bg: "gray.100" }}
          >
            <Text>
              <option value="">Selecione uma opção</option>
            </Text>
            {optionsTypeDispute.map((item) => (
              <Text key={item.value}>
                <option value={item.value}>{item.label}</option>
              </Text>
            ))}
          </NativeSelect.Field>
          <NativeSelect.Indicator />
        </NativeSelect.Root>
      </Field.Root>

      {bidding?.result && (
        <Switch.Root
          colorPalette="blue"
          checked={allowEdit}
          onCheckedChange={(e) => setAllowEdit(e.checked)}
        >
          <Switch.HiddenInput />
          <Switch.Control />
          <Switch.Label>Alterar tipo de disputa</Switch.Label>
        </Switch.Root>
      )}
    </Flex>
  );
}
