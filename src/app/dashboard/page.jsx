"use client";

import useStore from "../../components/globalStates/store";
import { Flex, Text } from "@chakra-ui/react";

import Sidebar from "./components/Sidebar/Sidebar";

export default function DashboardPage() {
  return (
    <Flex>
      <Text fontSize={"2xl"} color={"gray.500"}>
        Dashboard Page em desenvolvimento...
      </Text>
    </Flex>
  );
}
