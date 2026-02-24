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
  const [resultSelectedSucessAtive, setResultSelectedSucessAtive] =
    useState(true)
  const [resultSelectedLoseAtive, setResultSelectedLoseAtive] = useState(false)

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
                  onClick={() => {
                    setResultSelectedSucessAtive(!resultSelectedSucessAtive)
                    {
                      if (resultSelectedLoseAtive) {
                        setResultSelectedLoseAtive(false)
                      }
                    }
                  }}
                  type={"sucess"}
                  changeResultTitle={"Processo ganho"}
                  ative={resultSelectedSucessAtive}
                />

                <ChangeButtonResult
                  type={"lose"}
                  changeResultTitle={"Processo perdido"}
                  onClick={() => {
                    setResultSelectedLoseAtive(!resultSelectedLoseAtive)

                    {
                      if (resultSelectedSucessAtive) {
                        setResultSelectedSucessAtive(false)
                      }
                    }
                  }}
                  ative={resultSelectedLoseAtive}
                />
              </Flex>
            </Dialog.Body>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>{" "}
    </Dialog.Root>
  )
}
