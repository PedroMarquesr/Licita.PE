"use client"
import { Flex, Text, Button, Link } from "@chakra-ui/react"
import useStore from "@/components/globalStates/store"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"

export default function () {
  const [mounted, setMounted] = useState(false)
  const router = useRouter()

  const handleBack = () => {
    router.back()
  }

  return (
    <Flex
      flexDir={"column"}
      justifyContent={"center"}
      align={"center"}
      h={"100vh"}
    >
      <Text
        bg="linear-gradient(135deg, #0b3d5e 0%, #016dc3 50%, #349e70 100%)"
        bgClip="text"
        fontSize="8xl"
        fontWeight="bolder"
      >
        404
      </Text>
      <Text
        fontSize={"3xl"}
        fontWeight={"bolder"}
        mb={"10"}
        bg="linear-gradient(135deg, #0b3d5e 0%, #016dc3 50%)"
        bgClip={"text"}
      >
        (╥_╥)
      </Text>

      <Text mb={"10"} fontWeight={"semibold"} color={"#0b3d5e"}>
        página não encontrada
      </Text>
      <Text
        mb={"7"}
        fontWeight={"semibold"}
        fontStyle={"italic"}
        bg="linear-gradient(135deg, #0b3d5e 0%,rgb(24, 44, 60) 50%)"
        bgClip={"text"}
      >
        " Não localizamos esta página em nosso termo de referência."
      </Text>

      <Flex>
        <Button colorPalette="blue" onClick={handleBack}>
          <Text>Voltar ao início</Text>
        </Button>
      </Flex>
    </Flex>
  )
}
