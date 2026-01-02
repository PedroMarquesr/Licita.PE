"use client";

import { Checkbox } from "@chakra-ui/react";

export default function CheckboxDefault({ label }) {
  return (
    <>
      <Checkbox.Root>
        <Checkbox.HiddenInput />
        <Checkbox.Control>
          <Checkbox.Indicator />
        </Checkbox.Control>
        <Checkbox.Label>{label}</Checkbox.Label>
      </Checkbox.Root>{" "}
    </>
  );
}
