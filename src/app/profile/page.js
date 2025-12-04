"use client"

import { isAuthenticated } from "../../../utils/Auth"
import { redirect } from "next/navigation"
import { useLayoutEffect } from "react"

import { Flex, Text } from "@chakra-ui/react"

export default function Profile() {
  useLayoutEffect(() => {
    const isAuth = isAuthenticated
    if (!isAuth) {
      redirect("/")
    }
  },[])

  return (
    <Flex justify="center" align="center" minH="80vh">
      <Text fontSize="2xl" fontWeight="bold">
        Página de Perfil - Em construção!
      </Text>
    </Flex>
  )
}
