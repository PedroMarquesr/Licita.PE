"use client"
import {
  Button,
  Icon,
  Dialog,
  Portal,
  Input,
  Switch,
  Box,
  CloseButton,
  Flex,
  Text,
} from "@chakra-ui/react"

import { FaBoxes } from "react-icons/fa"
import { TbAlignBoxLeftTopFilled } from "react-icons/tb"
import { useState } from "react"
import ChangeButtonResult from "./Components/ChangeButtonResult/ChangeButtonResult"

export default function ResultInsertForm({ open }) {
  const [resultSelectedSucess, setResultSelectedSucess] = useState(true)
  const [resultSelectedLose, setResultSelectedLose] = useState(false)

  return (
    <Dialog.Root open={open} size={"full"}>
      <Portal>
        {/* <Dialog.Backdrop /> */}
        <Dialog.Positioner>
          <Dialog.Content
            bg="white"
            color="gray.800"
            borderRadius="xl"
            boxShadow="lg"
            w={"full"}
          >
            <Dialog.Header>
              <Flex align={"center"} gap={3}>
                <Icon size={"xl"} colorPalette={"blue"} color={"blue.600"}>
                  <Dialog.CloseTrigger top="0" asChild>
                    <CloseButton bg="bg" size="sm" />
                  </Dialog.CloseTrigger>
                  <TbAlignBoxLeftTopFilled />
                </Icon>
                <Dialog.Title>Inserção de Resultado</Dialog.Title>
              </Flex>
            </Dialog.Header>
            <Dialog.Body>
              <Flex
                pt={4}
                justifyContent={"center"}
                alignItems={"center"}
                gap={3}
              >
                <ChangeButtonResult
                  type={"sucess"}
                  changeResultTitle={"Processo ganho"}
                />
                <ChangeButtonResult
                  type={"lose"}
                  changeResultTitle={"Processo perdido"}
                />
              </Flex>
            </Dialog.Body>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>{" "}
    </Dialog.Root>
  )
}
