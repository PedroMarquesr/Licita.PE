"use client"

import { Flex } from "@chakra-ui/react"

export default function BiddingsLayout({ children }) {
  return (
    <>
      <Flex ml={{ base: "0px", md: "auto" }} flex={1}>
        {children}
      </Flex>
    </>
  )
}
