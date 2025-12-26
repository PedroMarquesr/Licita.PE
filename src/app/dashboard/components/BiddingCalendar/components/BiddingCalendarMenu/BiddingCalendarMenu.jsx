// "use client"
// import { Button, Menu, Portal, Text } from "@chakra-ui/react"
// import { VscKebabVertical } from "react-icons/vsc"

// export default function BiddingCalendarMenu() {
//   return (
//     <Menu.Root>
//       <Menu.Trigger asChild>
//         <Button
//           variant="outline"
//           size="4xsm"
//           w={1}
//           color={"gray.900"}
//           border={"none"}
//           _hover={{ backgroundColor: "white" }}
//         >
//           <Text fontWeight={"bold"} display={{ base: "none", md: "flex" }}>
//             <VscKebabVertical />
//           </Text>
//           <Text fontWeight={"bold"} display={{ base: "flex", md: "none" }}>
//             Opções
//           </Text>
//         </Button>
//       </Menu.Trigger>
//       <Portal>
//         <Menu.Positioner>
//           <Menu.Content>
//             <Menu.Item value="new-txt">Exibir processo</Menu.Item>
//             <Menu.Item value="new-file">Editar processo</Menu.Item>
//             <Menu.Item value="new-win">Inserir atualização</Menu.Item>
//             <Menu.Item value="open-file">Excluir</Menu.Item>
//           </Menu.Content>
//         </Menu.Positioner>
//       </Portal>
//     </Menu.Root>
//   )
// }
"use client"
import {
  Button,
  Menu,
  Portal,
  Text,
  IconButton,
  Flex,
  Box,
} from "@chakra-ui/react"
import { HiOutlineDotsVertical } from "react-icons/hi"
import { MdEdit } from "react-icons/md"
import { FaTrash } from "react-icons/fa"

import { FaMagnifyingGlass } from "react-icons/fa6"
import { TbPlayerTrackNextFilled } from "react-icons/tb"

import { CiEdit } from "react-icons/ci"

export default function BiddingCalendarMenu() {
  return (
    <Menu.Root positioning={{ placement: "bottom-end" }}>
      <Menu.Trigger asChild>
        <Button
          variant="ghost"
          size="sm"
          w={2}
          color="gray.500"
          _hover={{
            backgroundColor: "gray.100",
            color: "blue.500",
          }}
          _active={{ backgroundColor: "gray.200" }}
          transition="all 0.2s"
          aria-label="Opções do pregão"
          borderRadius="md"
          p={1}
          minW="36px"
          h={{ base: "auto", md: "36px" }}
        >
          <Box fontSize="xl" display={{ base: "none", md: "flex" }}>
            <HiOutlineDotsVertical />
          </Box>
          <Text
            bgColor={"gray.800"}
            color={"gray.200"}
            w={"auto"}
            ml={4}
            px={2}
            py={1}
            display={{ base: "flex", md: "none" }}
          >
            Opções
          </Text>
        </Button>
      </Menu.Trigger>
      <Portal>
        <Menu.Positioner>
          <Menu.Content
            minW="160px"
            border="1px solid"
            borderColor="gray.200"
            boxShadow="md"
            borderRadius="md"
            overflow="hidden"
            zIndex={999}
          >
            <Box p={1}>
              <Menu.Item
                value="view"
                py={2}
                px={3}
                fontSize="sm"
                fontWeight="medium"
                _hover={{
                  backgroundColor: "blue.50",
                  color: "blue.600",
                }}
                _focus={{ backgroundColor: "blue.50" }}
              >
                <Flex align="center" gap={2}>
                  <FaMagnifyingGlass />
                  <Text>Visualizar</Text>
                </Flex>
              </Menu.Item>

              <Menu.Item
                value="edit"
                py={2}
                px={3}
                fontSize="sm"
                fontWeight="medium"
                _hover={{
                  backgroundColor: "green.50",
                  color: "green.600",
                }}
                _focus={{ backgroundColor: "green.50" }}
              >
                <Flex align="center" gap={2}>
                  <MdEdit /> <Text>Editar</Text>
                </Flex>
              </Menu.Item>

              <Menu.Item
                value="update"
                py={2}
                px={3}
                fontSize="sm"
                fontWeight="medium"
                _hover={{
                  backgroundColor: "orange.50",
                  color: "orange.600",
                }}
                _focus={{ backgroundColor: "orange.50" }}
              >
                <Flex align="center" gap={2}>
                  <TbPlayerTrackNextFilled />
                  <Text>Atualizar</Text>
                </Flex>
              </Menu.Item>

              <Menu.Separator my={1} borderColor="gray.200" />

              <Menu.Item
                value="delete"
                py={2}
                px={3}
                fontSize="sm"
                fontWeight="medium"
                color="red.500"
                _hover={{
                  backgroundColor: "red.50",
                  color: "red.600",
                }}
                _focus={{ backgroundColor: "red.50" }}
              >
                <Flex align="center" gap={2}>
                  <FaTrash /> <Text>Excluir</Text>
                </Flex>
              </Menu.Item>
            </Box>
          </Menu.Content>
        </Menu.Positioner>
      </Portal>
    </Menu.Root>
  )
}
