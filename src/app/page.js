"use client"

import { Flex, Text } from "@chakra-ui/react"
import { usePathname } from "next/navigation"
import Navbar from "@/components/Navbar/Navbar"

export default function Home() {
  const pathName = usePathname()
  const isHomePage = pathName === "/"
  const isLoginPage = pathName === "/login"

  const shouldShowNavbar = isHomePage || isLoginPage

  return (<Flex>
  </Flex>)
}
