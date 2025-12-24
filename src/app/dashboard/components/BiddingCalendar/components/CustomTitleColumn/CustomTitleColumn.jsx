"use client";

import { Text } from "@chakra-ui/react";

export default function CustomTitleColumn({ TitleColumn, display }) {
  return (
    <>
      <Text
        fontSize={"sm"}
        fontWeight={"bold"}
        color={"gray.800"}
        display={display}
      >
        {TitleColumn}
      </Text>
    </>
  );
}
