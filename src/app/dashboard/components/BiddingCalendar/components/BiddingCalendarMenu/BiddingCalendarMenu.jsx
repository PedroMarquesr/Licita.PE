"use client";

import { Button, Menu, Text, Flex, Box } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { HiOutlineDotsVertical } from "react-icons/hi";
import { MdEdit } from "react-icons/md";
import { FaTrash } from "react-icons/fa";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { TbPlayerTrackNextFilled } from "react-icons/tb";

export default function BiddingCalendarMenu({
  biddingId,
  onClickAt,
  handleEdit,
  deleteBidding,
}) {
  const router = useRouter();

  return (
    <Menu.Root positioning={{ placement: "bottom-end" }}>
      <Menu.Trigger asChild>
        <Button
          variant="ghost"
          onClick={(e) => e.stopPropagation()}
          cursor="pointer"
          display="flex"
          alignItems="center"
          justifyContent="center"
          minW={{ base: "65px", md: "36px" }}
          h="36px"
          bgColor={{ base: "gray.800", md: "transparent" }}
          color={{ base: "white", md: "gray.700" }}
          fontSize={{ base: "sm", md: "xl" }}
          borderRadius="md"
          _hover={{
            bgColor: { base: "gray.700", md: "gray.100" },
            color: { base: "white", md: "blue.500" },
          }}
          transition="all 0.2s"
          px={{ base: 2, md: 1 }}
        >
          <Box display={{ base: "none", md: "block" }}>
            <HiOutlineDotsVertical />
          </Box>

          <Box display={{ base: "block", md: "none" }}>Opções</Box>
        </Button>
      </Menu.Trigger>

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
            >
              <Flex align="center" gap={2}>
                <FaMagnifyingGlass />
                <Text>Visualizar</Text>
              </Flex>
            </Menu.Item>

            <Menu.Item
              value="edit"
              onClick={handleEdit}
              py={2}
              px={3}
              fontSize="sm"
              fontWeight="medium"
              _hover={{
                backgroundColor: "green.50",
                color: "green.600",
              }}
            >
              <Flex align="center" gap={2}>
                <MdEdit />
                <Text>Editar</Text>
              </Flex>
            </Menu.Item>

            <Menu.Item
              value="update"
              onClick={onClickAt}
              py={2}
              px={3}
              fontSize="sm"
              fontWeight="medium"
              _hover={{
                backgroundColor: "orange.50",
                color: "orange.600",
              }}
            >
              <Flex align="center" gap={2}>
                <TbPlayerTrackNextFilled />
                <Text>Atualizar</Text>
              </Flex>
            </Menu.Item>

            <Menu.Separator my={1} borderColor="gray.200" />

            <Menu.Item
              onClick={deleteBidding}
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
            >
              <Flex align="center" gap={2}>
                <FaTrash />
                <Text>Excluir</Text>
              </Flex>
            </Menu.Item>
          </Box>
        </Menu.Content>
      </Menu.Positioner>
    </Menu.Root>
  );
}
