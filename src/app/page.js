"use client"

import { Flex, Text, Box } from "@chakra-ui/react"
import { usePathname } from "next/navigation"
import useStore from "./login/components/globalStates/store"
export default function Home() {
  const user = useStore()

  return (
    <>
      {" "}
      {user?.uid && (
        <Box bg="green.50" p={3} textAlign="center">
          <Text fontWeight="bold" color="green.800">
            ✅ Usuário logado: {user.displayName || user.email}
          </Text>
          <Text fontSize="sm" color="gray.600">
            ID: {user.uid}
          </Text>
        </Box>
      )}
    </>
  )
}
