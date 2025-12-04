"use client"

import { Button, Icon, Text, Flex, Box } from "@chakra-ui/react"

import { FcGoogle } from "react-icons/fc"

export default function BtnGoogle() {
  return (
    <>
      <Button
        w={{ base: "100%", md: "300px" }}
        bgColor="gray.50"
        _hover={{
          backgroundColor: "gray.200",
          borderColor: "gray.500",
        }}
        p={{ base: "4", md: "7" }}
        border={"1px solid"}
        borderColor="gray.200"
      >
        <Icon size={{ base: "xl", md: "2xl" }}>
          <FcGoogle />
        </Icon>
        <Text color="gray.800" fontSize={{ base: "sm", md: "md" }} ml={2}>
          Continue com Google
        </Text>
      </Button>
    </>
  )
}
