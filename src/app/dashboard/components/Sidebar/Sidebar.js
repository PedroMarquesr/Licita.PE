"use client"
import { Box, Flex, Text, Icon } from "@chakra-ui/react"
import { FaPlus } from "react-icons/fa"
import { IoLogOutSharp } from "react-icons/io5"
import { MdDashboard } from "react-icons/md"
import { useRouter } from "next/navigation"

import useStore from "@/components/globalStates/store"

export default function Sidebar() {
  const user = useStore((state) => state.user)
  const signOutUser = useStore((state) => state.signOutUser)

  const router = useRouter()

  const signOut = async () => {
    await signOutUser()
    router.push("/")
  }

  const menuItems = [
    { icon: MdDashboard, label: "Dashboard", link: "/dashboard" },
    {
      icon: FaPlus,
      label: "Cadastro de licitação",
      link: "/dashboard/addTenderForm",
    },
  ]

  if (!user?.uid) return null

  return (
    <Box
      as="nav"
      position="fixed"
      left="0"
      top="0"
      h="100vh"
      bg="gray.800"
      color="white"
      w="45px"
      _hover={{ w: "225px" }}
      transition="width 0.3s"
      overflow="hidden"
      zIndex="1000"
      flexDirection="column"
    >
      {menuItems.map((item, index) => (
        <Flex
          key={index}
          as="button"
          cursor={"pointer"}
          onClick={() => router.push(item.link)}
          align="center"
          p="3"
          w="100%"
          _hover={{ bg: "gray.700" }}
        >
          <Icon as={item.icon} boxSize="5" mr="5" />
          <Text whiteSpace="nowrap">{item.label}</Text>
        </Flex>
      ))}

      <Flex
        as="button"
        onClick={signOut}
        align="center"
        p="3"
        _hover={{ bg: "gray.700" }}
        w="100%"
        bg="transparent"
      >
        <Icon as={IoLogOutSharp} boxSize="5" mr="5" />
        <Text whiteSpace="nowrap">Sair</Text>
      </Flex>
    </Box>
  )
}
