"use client"

import { Flex, Button, Link } from "@chakra-ui/react"
import { usePathname } from "next/navigation"

export default function DesktopMenu() {
  const pathName = usePathname()
  const isLoginPage = pathName === "/login"

  const showLoginButton = isLoginPage ? "Voltar" : "Login"

  return (
    <Flex>
      <Link color={"gray.500"} _hover={{ color: "black" }} px={"2"}>
        Recursos
      </Link>
      <Link color={"gray.500"} _hover={{ color: "black" }} px={"2"}>
        Sobre
      </Link>
      <Button
        fontWeight={"bold"}
        transition="all 0.2s ease-in-out"
        bgColor={"blue.500"}
        color={"whiteAlpha.800"}
        _hover={{
          transform: "translateY(-2px)",
          textDecoration: "none",
          bgColor: "blue.600",
        }}
      >
        <Link href={isLoginPage ? "/" : "/login"}>{showLoginButton}</Link>
      </Button>
    </Flex>
  )
}
