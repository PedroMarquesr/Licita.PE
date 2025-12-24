"use client";

import { Text } from "@chakra-ui/react";

export default function CustomTitleColumn({ TitleColumn }) {
  return (
    <>
      <Text fontSize={"sm"} fontWeight={"bold"} color={"gray.800"}>
        {TitleColumn}
      </Text>
    </>
  );
}
