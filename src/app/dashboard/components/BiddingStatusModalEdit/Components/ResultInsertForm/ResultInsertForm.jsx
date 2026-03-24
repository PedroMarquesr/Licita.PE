"use client";
import {
  Icon,
  Dialog,
  Portal,
  Flex,
  Button,
  Text,
  Box,
} from "@chakra-ui/react";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "@/components/libs/firebaseinit";
import { useState } from "react";
import { TbAlignBoxLeftTopFilled } from "react-icons/tb";
import FormResult from "./Components/FormResult/FormResult";
import { motion } from "framer-motion";

export default function ResultInsertForm({
  open,
  bidding,
  onClose,
  onResultSaved,
  hasResult,
}) {
  const [disputeData, setDisputeData] = useState(null);

  const handleDisputeDataChange = (data) => {
    setDisputeData(data);
  };
  function checkIfWinner(data) {
    return data.groups?.some((group) =>
      group.items?.some((item) =>
        item.participants?.some((p) => p.isSelf && p.win === true),
      ),
    );
  }

  const handleUpdateResult = async () => {
    const biddingRef = doc(db, "biddings", bidding.id);

    if (!disputeData) {
      alert("Insira resultado");
      return;
    }

    const isWinner = checkIfWinner(disputeData);

    try {
      await updateDoc(biddingRef, {
        result: disputeData,
        isWinner: isWinner,
        updatedAt: new Date(),
      });

      await onResultSaved();
      console.log("Resultado salvo com sucesso!");
      onClose();
    } catch (error) {
      console.log("Erro ao salvar:", error);
    }
  };
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
    );
  };

  return (
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
                <Flex
                  flexDir={{ base: "column", md: "row" }}
                  justify={"space-evenly"}
                  w={"100%"}
                >
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
                      onClick={handleUpdateResult}
                      size={"sm"}
                    >
                      <Text>Salvar</Text>
                    </Button>
                  </Flex>
                </Flex>
              </Dialog.Header>
              <Dialog.Body>
                <Flex>
                  <FormResult
                    hasResult={hasResult}
                    bidding={bidding}
                    onDataChange={handleDisputeDataChange}
                  />
                </Flex>
              </Dialog.Body>
            </Dialog.Content>
          </Dialog.Positioner>
        </Portal>
      </Dialog.Root>
    </SlideFromTop>
  );
}
