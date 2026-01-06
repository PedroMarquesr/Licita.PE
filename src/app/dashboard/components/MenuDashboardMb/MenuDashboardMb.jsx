"use client"

import {
  Flex,
  Button,
  Text,
  Portal,
  Icon,
  Drawer,
  CloseButton,
  Separator,
  VStack,
  Box,
} from "@chakra-ui/react"
import { MdDashboard } from "react-icons/md"
import { FaPlus } from "react-icons/fa"
import { ImMenu } from "react-icons/im"
import { IoLogOutSharp } from "react-icons/io5"
import { RiFolderOpenLine } from "react-icons/ri"

import { useState } from "react"
import { useRouter } from "next/navigation"
import useStore from "@/components/globalStates/store"

export default function MenuDashboardMb() {
  const router = useRouter()
  const user = useStore((state) => state.user)
  const signOutUser = useStore((state) => state.signOutUser)
  const [isOpen, setIsOpen] = useState(false)

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
    {
      icon: RiFolderOpenLine,
      label: "Painel de Processos",
      link: "/dashboard/biddings",
    },
  ]

  if (!user?.uid) return null

  return (
    <Flex w="100%" justify="right" className="no-print">
      <Drawer.Root open={isOpen} onOpenChange={(e) => setIsOpen(e.open)}>
        <Drawer.Trigger asChild>
          <Button
            onClick={() => setIsOpen((prev) => !prev)}
            bg="transparent"
            p={2}
            minH="44px"
            minW="44px"
            _hover={{ bg: "gray.100" }}
            _active={{ bg: "gray.200" }}
          >
            <Icon as={ImMenu} boxSize="6" color="gray.700" />
          </Button>
        </Drawer.Trigger>
        <Portal>
          <Drawer.Backdrop />
          <Drawer.Positioner>
            <Drawer.Content
              w={{ base: "85%", sm: "70%" }}
              bg="gray.800"
              shadow="xl"
            >
              <Drawer.Header
                bg="gray.900"
                color="white"
                py={4}
                borderBottom="1px solid"
                borderColor="gray.700"
              >
                <Flex justify="space-between" align="center">
                  <Drawer.Title fontSize="xl" fontWeight="bold">
                    Menu
                  </Drawer.Title>
                  <Drawer.CloseTrigger asChild>
                    <CloseButton
                      size="md"
                      color="white"
                      _hover={{ bg: "gray.700" }}
                    />
                  </Drawer.CloseTrigger>
                </Flex>
              </Drawer.Header>
              <Drawer.Body py={6}>
                <VStack spacing={1} align="stretch">
                  {menuItems.map((item, index) => (
                    <Box
                      key={index}
                      as="button"
                      cursor="pointer"
                      onClick={() => {
                        router.push(item.link)
                        setIsOpen(false)
                      }}
                      display="flex"
                      alignItems="center"
                      p="3"
                      w="100%"
                      _hover={{ bg: "gray.700" }}
                      borderRadius="md"
                    >
                      <Icon as={item.icon} boxSize="5" mr="4" color="white" />
                      <Text color="white" whiteSpace="nowrap">
                        {item.label}
                      </Text>
                    </Box>
                  ))}
                  <Separator my={4} borderColor="gray.600" />
                  <Box
                    as="button"
                    cursor="pointer"
                    onClick={signOut}
                    display="flex"
                    alignItems="center"
                    p="3"
                    w="100%"
                    _hover={{ bg: "gray.700" }}
                    borderRadius="md"
                  >
                    <Icon as={IoLogOutSharp} boxSize="5" mr="4" color="white" />
                    <Text color="white" whiteSpace="nowrap">
                      Sair
                    </Text>
                  </Box>
                </VStack>
              </Drawer.Body>
            </Drawer.Content>
          </Drawer.Positioner>
        </Portal>
      </Drawer.Root>
    </Flex>
  )
}
