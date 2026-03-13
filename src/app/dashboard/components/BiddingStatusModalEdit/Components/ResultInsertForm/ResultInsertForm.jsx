"use client"
import {
  Icon,
  Dialog,
  Portal,
  Flex,
  Button,
  CloseButton,
  Text,
} from "@chakra-ui/react"

import { FaBoxes } from "react-icons/fa"
import { TbAlignBoxLeftTopFilled } from "react-icons/tb"
import { useState } from "react"
import FormResult from "./Components/FormResult/FormResult"

import { motion } from "framer-motion"

export default function ResultInsertForm({ open, bidding, onClose }) {
  const [isOpen, setIsOpen] = useState(false)

  const SlideFromTop = ({ children, delay = 0 }) => {
    return (
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.2, delay }}
        viewport={{ once: true, margin: "-50px" }}
      >
        {children}
      </motion.div>
    )
  }

  return (
    <>
      <SlideFromTop>
        <Dialog.Root open={open} size={"full"}>
          <Portal>
            <Dialog.Backdrop />

            <Dialog.Positioner>
              <Dialog.Content
                bg="white"
                color="gray.800"
                borderRadius="xl"
                boxShadow="lg"
                w={"full"}
              >
                <Dialog.Header>
                  <Flex justifyContent={"space-between"} w={"100%"}>
                    <Flex align={"center"} gap={3}>
                      <Icon
                        size={"xl"}
                        colorPalette={"blue"}
                        color={"blue.600"}
                      >
                        <TbAlignBoxLeftTopFilled />
                      </Icon>
                      <Dialog.Title>Inserir resultado</Dialog.Title>
                      <Dialog.Title color={"blue.800"} textStyle={"underline"}>
                        {`${bidding?.responsibleAgency} - ${bidding?.identificationNumber}`}
                      </Dialog.Title>
                    </Flex>
                  </Flex>
                  <Flex gap={2}>
                    <Button
                      colorPalette={"red"}
                      onClick={() => onClose()}
                      size={"sm"}
                    >
                      <Text>Cancelar</Text>
                    </Button>
                    <Button
                      colorPalette={"blue"}
                      onClick={() => onClose()}
                      size={"sm"}
                    >
                      <Text>Salvar</Text>
                    </Button>
                  </Flex>
                </Dialog.Header>
                <Dialog.Body>
                  <Flex>
                    <FormResult />
                  </Flex>
                </Dialog.Body>
              </Dialog.Content>
            </Dialog.Positioner>
          </Portal>{" "}
        </Dialog.Root>
      </SlideFromTop>
    </>
  )
}
