"use client";
import { GridItem, Text, Flex } from "@chakra-ui/react";

export default function CustomItemGrid({
  textGrid,
  color = "gray.700",
  fontWeight,
  display,
  titleColumn,
}) {
  return (
    <>
      <GridItem>
        <Flex>
          <Text
            fontSize={"xs"}
            fontWeight={"semibold"}
            display={{ md: "none" }}
            pr={2}
          >
            {titleColumn}
          </Text>
          <Text
            color={color}
            fontWeight={fontWeight}
            fontSize={"xs"}
            display={display}
          >
            {textGrid}
          </Text>
        </Flex>
      </GridItem>
    </>
  );
}
