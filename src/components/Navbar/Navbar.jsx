"use client"
import { Text, Image, Link, Flex } from "@chakra-ui/react"
import DesktopMenu from "./components/DesktopMenu/DesktopMenu"
import MobileMenu from "./components/MobileMenu/MobileMenu"

export default function Navbar() {
  return (
    <Flex
      bg="blue.100"
      w={"100%"}
      py={{ base: 3, sm: 4, md: 6, lg: 8 }}
      px={{ base: 3, sm: 4, md: 6, lg: 10 }}
      h={{ base: "12", md: "14", lg: "16" }}
      align="center"
      justify="space-between"
      borderBottom={"1px solid"}
      borderColor="blue.300"
    >
      <Link
        href="/"
        display="flex"
        alignItems="center"
        gap={{ base: 1, sm: 2, md: 3, lg: 4 }}
        transition="all 0.2s ease-in-out"
        _hover={{ transform: "translateY(-2px)", textDecoration: "none" }}
      >
        {" "}
        <Image
          src="./icon-licitape.png"
          w={{ base: 6, sm: 7, md: 8, lg: 10 }}
          alt="Licita.PE"
        />
        <Text
          fontSize={{ base: "lg", md: "xl", lg: "2xl" }} // Adicionei base
          fontWeight="bold"
          color="#1d69b6"
        >
          Licita.PE
        </Text>{" "}
      </Link>
      <Flex display={{ base: "none", md: "flex" }}>
        <DesktopMenu />
      </Flex>
      <Flex display={{ base: "flex", md: "none" }}>
        <MobileMenu />
      </Flex>
    </Flex>
  )
}
