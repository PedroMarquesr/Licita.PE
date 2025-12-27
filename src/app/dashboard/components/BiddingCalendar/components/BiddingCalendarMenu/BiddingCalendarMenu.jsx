"use client";
import { Button, Menu, Portal, Text, Flex, Box } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { HiOutlineDotsVertical } from "react-icons/hi";
import { MdEdit } from "react-icons/md";
import { FaTrash } from "react-icons/fa";

import { FaMagnifyingGlass } from "react-icons/fa6";
import { TbPlayerTrackNextFilled } from "react-icons/tb";

export default function BiddingCalendarMenu({ biddingId }) {
  const router = useRouter();

  return (
    <Menu.Root positioning={{ placement: "bottom-end" }}>
      <Menu.Trigger asChild>
        <Box
          cursor={"pointer"}
          as={"button"}
          size="sm"
          w={2}
          color="gray.700"
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
          <Text fontSize={"xl"} display={{ base: "none", md: "flex" }}>
            <HiOutlineDotsVertical />
          </Text>
          <Text
            textAlign={"center"}
            justifyContent={"center"}
            borderRadius="md"
            bgColor={"gray.800"}
            color={"gray.200"}
            w={20}
            px={2}
            py={1}
            display={{ base: "flex", md: "none" }}
          >
            Opções
          </Text>
        </Box>
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
                onClick={() => router.push(`/dashboard/biddings/${biddingId}`)}
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
  );
}
