"use client";

import { Flex, Text, Checkbox, Button, Icon } from "@chakra-ui/react";
import InputResult from "../InputResult/InputResult";
import calcTotalPrice from "../../modules/priceTotalCalculator";
import { TiDelete } from "react-icons/ti";
import { FaDeleteLeft } from "react-icons/fa6";

export default function ResultParticipantRow({
  participant,
  mb,
  ml,
  onChange,
  // ↓ "Meu resultado"
  onCheckedChangeSelf,
  isSelfChecked,
  // ↓ "Participante vencedor"
  onCheckedChangeWinner,
  winnerChecked,
  // ↓  "Participante desclassificado"
  onCheckedChangeDisqualified,
  disqualificationChecked,
  showCheckDisqualification,

  // "Participante inabilitado"
  onCheckedChangeIneligible,
  ineligibleChecked,
  showCheckIneligible,

  // ↓ Ref quantidade
  amountItemParticipant,

  deleteParticipant,
}) {
  return (
    // <Flex
    //   w={"90%"}
    //   mb={mb}
    //   ml={ml}
    //   bg="purple.50"
    //   p={3}
    //   borderRadius="md"
    //   borderWidth="1px"
    //   borderColor="gray.200"
    //   boxShadow="sm"
    //   _hover={{
    //     borderColor: "gray.200",
    //     boxShadow: "md",
    //     transition: "all 0.2s",
    //     bg: "gray.100",
    //   }}
    //   flexDir={{ base: "column", md: "row" }}
    // >
    //   <Flex flexDir={"column"} w="100%">
    //     <Flex
    //       border={"1px solid red"}
    //       alignItems={{ base: "left", md: "center" }}
    //       flexWrap="wrap"
    //       gap={2}
    //       flexDir={{ base: "column", md: "row" }}
    //     >
    //       <InputResult
    //         columnTitle={"Coloc."}
    //         width={30}
    //         textAlignInput={"center"}
    //         mrField={4}
    //         value={participant.position}
    //         onChange={(e) => onChange("position", e.target.value)}
    //       />

    //       <InputResult
    //         columnTitle={"Participante"}
    //         width={350}
    //         textAlignInput={"left"}
    //         mrField={1}
    //         value={participant.bidder}
    //         onChange={(e) => onChange("bidder", e.target.value)}
    //       />

    //       <InputResult
    //         value={participant.brand}
    //         onChange={(e) => onChange("brand", e.target.value)}
    //         columnTitle={"Marca"}
    //         textAlignInput={"left"}
    //         width={"9%"}
    //         mrField={1}
    //       />

    //       <InputResult
    //         value={participant.price}
    //         onChange={(e) => onChange("price", e.target.value)}
    //         columnTitle={"Preço"}
    //         textAlignInput={"center"}
    //         width={"7%"}
    //         typeInput={"number"}
    //       />
    //       <InputResult
    //         value={calcTotalPrice(amountItemParticipant, participant.price)}
    //         columnTitle={"Valor total"}
    //         textAlignInput={"center"}
    //         width={"7%"}
    //         typeInput={"number"}
    //         readOnlyInput={true}
    //       />

    //       <Flex flexDir={"column"}>
    //         <Checkbox.Root
    //           ml={3}
    //           colorPalette={"green"}
    //           size={"xs"}
    //           onCheckedChange={(e) => onCheckedChangeSelf(e.checked)}
    //           checked={isSelfChecked}
    //         >
    //           <Checkbox.HiddenInput />
    //           <Checkbox.Control
    //             borderColor={isSelfChecked ? "green.500" : "gray.300"}
    //           />
    //           <Checkbox.Label>Meu resultado</Checkbox.Label>
    //         </Checkbox.Root>

    //         <Checkbox.Root
    //           ml={3}
    //           colorPalette={"purple"}
    //           size={"xs"}
    //           onCheckedChange={(e) => onCheckedChangeWinner(e.checked)}
    //           checked={winnerChecked}
    //         >
    //           <Checkbox.HiddenInput />
    //           <Checkbox.Control
    //             borderColor={winnerChecked ? "purple.500" : "gray.300"}
    //           />
    //           <Checkbox.Label>Participante vencedor</Checkbox.Label>
    //         </Checkbox.Root>

    //         <Checkbox.Root
    //           ml={3}
    //           colorPalette={"red"}
    //           size={"xs"}
    //           onCheckedChange={(e) => onCheckedChangeDisqualified(e.checked)}
    //           checked={disqualificationChecked}
    //           display={showCheckDisqualification ? "flex" : "none"}
    //         >
    //           <Checkbox.HiddenInput />
    //           <Checkbox.Control
    //             borderColor={disqualificationChecked ? "red.500" : "gray.300"}
    //           />
    //           <Checkbox.Label>Participante desclassificado</Checkbox.Label>
    //         </Checkbox.Root>
    //       </Flex>
    //       <Flex flexDir={"column"} h={"100%"}>
    //         <Checkbox.Root
    //           ml={3}
    //           colorPalette={"red"}
    //           size={"xs"}
    //           onCheckedChange={(e) => onCheckedChangeIneligible(e.checked)}
    //           checked={ineligibleChecked}
    //           display={showCheckIneligible ? "flex" : "none"}
    //         >
    //           <Checkbox.HiddenInput />
    //           <Checkbox.Control
    //             borderColor={showCheckIneligible ? "red.500" : "gray.300"}
    //           />
    //           <Checkbox.Label>Participante inabilitado</Checkbox.Label>
    //         </Checkbox.Root>
    //       </Flex>
    //     </Flex>

    //     {disqualificationChecked && (
    //       <Flex
    //         borderRadius="md"
    //         borderWidth="1px"
    //         borderColor="red.200"
    //         boxShadow="sm"
    //         mt={4}
    //         p={1}
    //         pl={4}
    //         bg="red.50"
    //         alignItems="center"
    //       >
    //         <Text color="red.800" fontWeight="medium" mr={3} fontSize={"xs"}>
    //           Motivo da desclassificação:{" "}
    //         </Text>
    //         <InputResult
    //           value={participant.disqualificationReason || ""}
    //           onChange={(e) =>
    //             onChange("disqualificationReason", e.target.value)
    //           }
    //           columnTitle={""}
    //           textAlignInput={"left"}
    //           width={"50%"}
    //           placeholder="Digite o motivo da desclassificação..."
    //         />
    //       </Flex>
    //     )}
    //     {ineligibleChecked && (
    //       <Flex
    //         borderRadius="md"
    //         borderWidth="1px"
    //         borderColor="red.200"
    //         boxShadow="sm"
    //         mt={4}
    //         p={1}
    //         pl={4}
    //         bg="red.50"
    //         alignItems="center"
    //       >
    //         <Text color="red.800" fontWeight="medium" mr={10} fontSize={"xs"}>
    //           Motivo da inabilitação:{" "}
    //         </Text>
    //         <InputResult
    //           value={participant.ineligibleReason || ""}
    //           onChange={(e) => onChange("ineligibleReason", e.target.value)}
    //           columnTitle={""}
    //           textAlignInput={"left"}
    //           width={"50%"}
    //           placeholder="Digite o motivo da desclassificação..."
    //         />
    //       </Flex>
    //     )}
    //   </Flex>

    //   <Flex alignItems="center" justifyContent="center" ml={2}>
    //     <Button
    //       colorPalette={"red"}
    //       size="sm"
    //       variant="ghost"
    //       _hover={{
    //         bg: "red.50",
    //         transform: "scale(1.1)",
    //         transition: "all 0.2s",
    //       }}
    //       p={1}
    //       minW="auto"
    //       h="auto"
    //       onClick={() => deleteParticipant?.()}
    //     >
    //       <Icon boxSize={5}>
    //         <TiDelete />
    //       </Icon>
    //     </Button>
    //   </Flex>
    // </Flex>

    <Flex
      w={{ base: "100%", lg: "90%" }}
      mb={mb}
      ml={{ base: 0, md: ml }}
      bg="purple.50"
      p={3}
      borderRadius="md"
      borderWidth="1px"
      borderColor="gray.200"
      boxShadow="sm"
      flexDir={{ base: "column", lg: "row" }}
      _hover={{
        borderColor: "gray.200",
        boxShadow: "md",
        transition: "all 0.2s",
        bg: "gray.100",
      }}
    >
      <Flex flexDir="column" w="100%">
        <Flex
          alignItems={{ base: "stretch", md: "center" }}
          flexWrap="wrap"
          gap={3}
          flexDir={{ base: "column", md: "row" }}
        >
          <InputResult
            columnTitle={"Coloc."}
            width={{ base: "100%", md: "60px" }}
            textAlignInput={"center"}
            value={participant.position}
            onChange={(e) => onChange("position", e.target.value)}
          />

          <InputResult
            columnTitle={"Participante"}
            width={{ base: "100%", md: "280px" }}
            textAlignInput={"left"}
            value={participant.bidder}
            onChange={(e) => onChange("bidder", e.target.value)}
          />

          <InputResult
            value={participant.brand}
            onChange={(e) => onChange("brand", e.target.value)}
            columnTitle={"Marca"}
            textAlignInput={"left"}
            width={{ base: "100%", md: "150px" }}
          />

          <InputResult
            value={participant.price}
            onChange={(e) => onChange("price", e.target.value)}
            columnTitle={"Preço"}
            textAlignInput={"center"}
            width={{ base: "100%", md: "120px" }}
            typeInput={"number"}
          />

          <InputResult
            value={calcTotalPrice(amountItemParticipant, participant.price)}
            columnTitle={"Valor total"}
            textAlignInput={"center"}
            width={{ base: "100%", md: "140px" }}
            typeInput={"number"}
            readOnlyInput={true}
          />

          {/* CHECKBOXES */}
          <Flex flexDir="column" gap={1} mt={{ base: 2, md: 0 }}>
            <Checkbox.Root
              colorPalette="green"
              size="xs"
              onCheckedChange={(e) => onCheckedChangeSelf(e.checked)}
              checked={isSelfChecked}
            >
              <Checkbox.HiddenInput />
              <Checkbox.Control />
              <Checkbox.Label>Meu resultado</Checkbox.Label>
            </Checkbox.Root>

            <Checkbox.Root
              colorPalette="purple"
              size="xs"
              onCheckedChange={(e) => onCheckedChangeWinner(e.checked)}
              checked={winnerChecked}
            >
              <Checkbox.HiddenInput />
              <Checkbox.Control />
              <Checkbox.Label>Participante vencedor</Checkbox.Label>
            </Checkbox.Root>

            <Checkbox.Root
              colorPalette="red"
              size="xs"
              onCheckedChange={(e) => onCheckedChangeDisqualified(e.checked)}
              checked={disqualificationChecked}
              display={showCheckDisqualification ? "flex" : "none"}
            >
              <Checkbox.HiddenInput />
              <Checkbox.Control />
              <Checkbox.Label>Participante desclassificado</Checkbox.Label>
            </Checkbox.Root>
          </Flex>

          <Flex flexDir="column">
            <Checkbox.Root
              colorPalette="red"
              size="xs"
              onCheckedChange={(e) => onCheckedChangeIneligible(e.checked)}
              checked={ineligibleChecked}
              display={showCheckIneligible ? "flex" : "none"}
            >
              <Checkbox.HiddenInput />
              <Checkbox.Control />
              <Checkbox.Label>Participante inabilitado</Checkbox.Label>
            </Checkbox.Root>
          </Flex>
        </Flex>

        {disqualificationChecked && (
          <Flex
            borderRadius="md"
            borderWidth="1px"
            borderColor="red.200"
            mt={4}
            p={2}
            bg="red.50"
            flexDir={{ base: "column", md: "row" }}
            gap={2}
            align={"center"}
          >
            <Text color="red.800" fontWeight="medium" fontSize="xs">
              Motivo da desclassificação:
            </Text>

            <InputResult
              value={participant.disqualificationReason || ""}
              onChange={(e) =>
                onChange("disqualificationReason", e.target.value)
              }
              width={{ base: "100%", md: "50%" }}
              placeholder="Digite o motivo..."
            />
          </Flex>
        )}

        {ineligibleChecked && (
          <Flex
            borderRadius="md"
            borderWidth="1px"
            borderColor="red.200"
            mt={4}
            p={2}
            bg="red.50"
            flexDir={{ base: "column", md: "row" }}
            gap={2}
            align={"center"}
          >
            <Text color="red.800" fontWeight="medium" fontSize="xs">
              Motivo da inabilitação:
            </Text>

            <InputResult
              value={participant.ineligibleReason || ""}
              onChange={(e) => onChange("ineligibleReason", e.target.value)}
              width={{ base: "100%", md: "50%" }}
              placeholder="Digite o motivo..."
            />
          </Flex>
        )}
      </Flex>

      <Flex
        alignItems="center"
        justifyContent="center"
        mt={{ base: 3, lg: 0 }}
        ml={{ lg: 2 }}
      >
        <Button
          colorPalette="red"
          size="sm"
          variant="ghost"
          p={1}
          minW="auto"
          h="auto"
          onClick={() => deleteParticipant?.()}
          _hover={{
            bg: "red.50",
            transform: "scale(1.1)",
            transition: "all 0.2s",
          }}
        >
          <Icon boxSize={5}>
            <TiDelete />
          </Icon>
        </Button>
      </Flex>
    </Flex>
  );
}
