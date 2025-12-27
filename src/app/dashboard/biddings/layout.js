"use client";

import MenuDashboardMb from "../components/MenuDashboardMb/MenuDashboardMb";
import Sidebar from "../components/Sidebar/Sidebar";
import { Flex } from "@chakra-ui/react";

export default function BiddingsLayout({ children }) {
  return (
    <>
      <Flex display={{ base: "none", md: "flex" }}>
        <Sidebar />
      </Flex>

      <Flex display={{ base: "flex", md: "none" }}>
        <MenuDashboardMb />
      </Flex>
      <Flex ml={{ base: "0px", md: "auto" }} flex={1}>
        {children}
      </Flex>
    </>
  );
}
