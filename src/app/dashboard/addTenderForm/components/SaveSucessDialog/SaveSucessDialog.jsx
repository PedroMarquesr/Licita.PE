"use client";

import {
  Button,
  CloseButton,
  Flex,
  Dialog,
  Portal,
  Text,
} from "@chakra-ui/react";
import { FaCheckCircle } from "react-icons/fa";

export default function SaveDialogSucess({ messageSucess, open }) {
  return (
    <Dialog.Root open={open} onOpenChange={(e) => !e.open()}>
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content>
            <Dialog.Body>
              <Flex pt={4} justifyContent={"center"} alignItems={"center"}>
                <Text color={"green.300"} fontSize={"3xl"} pr={4}>
                  <FaCheckCircle />
                </Text>
                <Text fontSize={"2xl"}>{messageSucess}</Text>
              </Flex>
            </Dialog.Body>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
}
