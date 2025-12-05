"use client";

import Sidebar from "./components/Sidebar/Sidebar";
import { Flex } from "@chakra-ui/react";

export default function DashboardLayout({ children }) {
  return (
    <Flex>
      <Flex display={{ base: "none", md: "flex" }}>
        <Sidebar />
      </Flex>
      <Flex ml={12} flex={1}>
        {children}
      </Flex>
    </Flex>
  );
}
