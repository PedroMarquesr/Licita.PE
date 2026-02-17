"use client";

import { Flex, Alert, Collapsible } from "@chakra-ui/react";

export default function AlertCustom({ status, description, CollapsibleOpen }) {
  return (
    <Collapsible.Root open={CollapsibleOpen} close w={"full"}>
      <Collapsible.Content>
        <Alert.Root status={status}>
          <Alert.Indicator />
          <Alert.Content>
            <Alert.Description> {description} </Alert.Description>
          </Alert.Content>
        </Alert.Root>
      </Collapsible.Content>
    </Collapsible.Root>
  );
}
