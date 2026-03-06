// "use client";

// import { Flex, Text, Checkbox, Button, Icon } from "@chakra-ui/react";
// import InputResult from "../InputResult/InputResult";
// import calcTotalPrice from "../../modules/priceTotalCalculator";
// import { TiDelete } from "react-icons/ti";
// import { FaDeleteLeft } from "react-icons/fa6";

// export default function ResultParticipantRow({
//   participant,
//   mb,
//   ml,
//   onChange,
//   // ↓ "Meu resultado"
//   onCheckedChangeSelf,
//   isSelfChecked,
//   // ↓ "Participante vencedor"
//   onCheckedChangeWinner,
//   winnerChecked,
//   // ↓  "Participante desclassificado"
//   onCheckedChangeDisqualified,
//   disqualificationChecked,
//   showCheckDisqualification,

//   // "Participante inabilitado"
//   onCheckedChangeIneligible,
//   ineligibleChecked,
//   showCheckIneligible,

//   // ↓ Ref quantidade
//   amountItemParticipant,
// }) {
//   return (
//     <Flex
//       w={"90%"}
//       mb={mb}
//       ml={ml}
//       bg="purple.50"
//       p={3}
//       borderRadius="md"
//       borderWidth="1px"
//       borderColor="gray.200"
//       boxShadow="sm"
//       _hover={{
//         borderColor: "gray.200",
//         boxShadow: "md",
//         transition: "all 0.2s",
//         bg: "gray.100",
//       }}
//     >
//       <Flex flexDir={"column"} w="100%">
//         <Flex alignItems="center" flexWrap="wrap" gap={2}>
//           <InputResult
//             columnTitle={"Coloc."}
//             width={30}
//             textAlignInput={"center"}
//             mrField={4}
//             value={participant.position}
//             onChange={(e) => onChange("position", e.target.value)}
//           />

//           <InputResult
//             columnTitle={"Participante"}
//             width={350}
//             textAlignInput={"left"}
//             mrField={1}
//             value={participant.bidder}
//             onChange={(e) => onChange("bidder", e.target.value)}
//           />

//           <InputResult
//             value={participant.brand}
//             onChange={(e) => onChange("brand", e.target.value)}
//             columnTitle={"Marca"}
//             textAlignInput={"left"}
//             width={"9%"}
//             mrField={1}
//           />

//           <InputResult
//             value={participant.price}
//             onChange={(e) => onChange("price", e.target.value)}
//             columnTitle={"Preço"}
//             textAlignInput={"center"}
//             width={"7%"}
//             typeInput={"number"}
//           />
//           <InputResult
//             value={calcTotalPrice(amountItemParticipant, participant.price)}
//             columnTitle={"Valor total"}
//             textAlignInput={"center"}
//             width={"7%"}
//             typeInput={"number"}
//             readOnlyInput={true}
//           />
//           <Flex flexDir={"column"}>
//             <Checkbox.Root
//               ml={3}
//               colorPalette={"green"}
//               size={"xs"}
//               onCheckedChange={(e) => onCheckedChangeSelf(e.checked)}
//               checked={isSelfChecked}
//             >
//               <Checkbox.HiddenInput />
//               <Checkbox.Control
//                 borderColor={isSelfChecked ? "green.500" : "gray.300"}
//               />
//               <Checkbox.Label>Meu resultado</Checkbox.Label>
//             </Checkbox.Root>

//             <Checkbox.Root
//               ml={3}
//               colorPalette={"purple"}
//               size={"xs"}
//               onCheckedChange={(e) => onCheckedChangeWinner(e.checked)}
//               checked={winnerChecked}
//             >
//               <Checkbox.HiddenInput />
//               <Checkbox.Control
//                 borderColor={winnerChecked ? "purple.500" : "gray.300"}
//               />
//               <Checkbox.Label>Participante vencedor</Checkbox.Label>
//             </Checkbox.Root>

//             <Checkbox.Root
//               ml={3}
//               colorPalette={"red"}
//               size={"xs"}
//               onCheckedChange={(e) => onCheckedChangeDisqualified(e.checked)}
//               checked={disqualificationChecked}
//               display={showCheckDisqualification ? "flex" : "none"}
//             >
//               <Checkbox.HiddenInput />
//               <Checkbox.Control
//                 borderColor={disqualificationChecked ? "red.500" : "gray.300"}
//               />
//               <Checkbox.Label>Participante desclassificado</Checkbox.Label>
//             </Checkbox.Root>
//           </Flex>
//           <Flex flexDir={"column"} h={"100%"}>
//             <Checkbox.Root
//               ml={3}
//               colorPalette={"red"}
//               size={"xs"}
//               onCheckedChange={(e) => onCheckedChangeIneligible(e.checked)}
//               checked={ineligibleChecked}
//               display={showCheckIneligible ? "flex" : "none"}
//             >
//               <Checkbox.HiddenInput />
//               <Checkbox.Control
//                 borderColor={showCheckIneligible ? "red.500" : "gray.300"}
//               />
//               <Checkbox.Label>Participante inabilitado</Checkbox.Label>
//             </Checkbox.Root>

//             {/*
//             <Checkbox.Root
//               ml={3}
//               colorPalette={"purple"}
//               size={"xs"}
//               onCheckedChange={(e) => onCheckedChangeWinner(e.checked)}
//               checked={winnerChecked}
//             >
//               <Checkbox.HiddenInput />
//               <Checkbox.Control
//                 borderColor={winnerChecked ? "purple.500" : "gray.300"}
//               />
//               <Checkbox.Label>Participante vencedor</Checkbox.Label>
//             </Checkbox.Root>

//             <Checkbox.Root
//               ml={3}
//               colorPalette={"red"}
//               size={"xs"}
//               onCheckedChange={(e) => onCheckedChangeDisqualified(e.checked)}
//               checked={disqualificationChecked}
//               display={showCheckDisqualification ? "flex" : "none"}
//             >
//               <Checkbox.HiddenInput />
//               <Checkbox.Control
//                 borderColor={disqualificationChecked ? "red.500" : "gray.300"}
//               />
//               <Checkbox.Label>Participante desclassificado</Checkbox.Label>
//             </Checkbox.Root> */}
//           </Flex>
//         </Flex>

//         {disqualificationChecked && (
//           <Flex
//             borderRadius="md"
//             borderWidth="1px"
//             borderColor="red.200"
//             boxShadow="sm"
//             mt={4}
//             p={1}
//             pl={4}
//             bg="red.50"
//             alignItems="center"
//           >
//             <Text color="red.800" fontWeight="medium" mr={3} fontSize={"xs"}>
//               Motivo da desclassificação:{" "}
//             </Text>
//             <InputResult
//               value={participant.disqualificationReason || ""}
//               onChange={(e) =>
//                 onChange("disqualificationReason", e.target.value)
//               }
//               columnTitle={""}
//               textAlignInput={"left"}
//               width={"50%"}
//               placeholder="Digite o motivo da desclassificação..."
//             />
//           </Flex>
//         )}
//         {ineligibleChecked && (
//           <Flex
//             borderRadius="md"
//             borderWidth="1px"
//             borderColor="red.200"
//             boxShadow="sm"
//             mt={4}
//             p={1}
//             pl={4}
//             bg="red.50"
//             alignItems="center"
//           >
//             <Text color="red.800" fontWeight="medium" mr={10} fontSize={"xs"}>
//               Motivo da inabilitação:{" "}
//             </Text>
//             <InputResult
//               value={participant.ineligibleReason || ""}
//               onChange={(e) => onChange("ineligibleReason", e.target.value)}
//               columnTitle={""}
//               textAlignInput={"left"}
//               width={"50%"}
//               placeholder="Digite o motivo da desclassificação..."
//             />
//           </Flex>
//         )}
//       </Flex>
//       <Flex border={"1px solid blue"} h={"100%"} align={"center"}>
//         <Button colorPalette={"red"} size={"sm"}>
//           <Icon size={"lg"}>
//             <TiDelete />
//           </Icon>
//         </Button>
//       </Flex>
//     </Flex>
//   );
// }
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
}) {
  return (
    <Flex
      w={"90%"}
      mb={mb}
      ml={ml}
      bg="purple.50"
      p={3}
      borderRadius="md"
      borderWidth="1px"
      borderColor="gray.200"
      boxShadow="sm"
      _hover={{
        borderColor: "gray.200",
        boxShadow: "md",
        transition: "all 0.2s",
        bg: "gray.100",
      }}
    >
      <Flex flexDir={"column"} w="100%">
        <Flex alignItems="center" flexWrap="wrap" gap={2}>
          <InputResult
            columnTitle={"Coloc."}
            width={30}
            textAlignInput={"center"}
            mrField={4}
            value={participant.position}
            onChange={(e) => onChange("position", e.target.value)}
          />

          <InputResult
            columnTitle={"Participante"}
            width={350}
            textAlignInput={"left"}
            mrField={1}
            value={participant.bidder}
            onChange={(e) => onChange("bidder", e.target.value)}
          />

          <InputResult
            value={participant.brand}
            onChange={(e) => onChange("brand", e.target.value)}
            columnTitle={"Marca"}
            textAlignInput={"left"}
            width={"9%"}
            mrField={1}
          />

          <InputResult
            value={participant.price}
            onChange={(e) => onChange("price", e.target.value)}
            columnTitle={"Preço"}
            textAlignInput={"center"}
            width={"7%"}
            typeInput={"number"}
          />
          <InputResult
            value={calcTotalPrice(amountItemParticipant, participant.price)}
            columnTitle={"Valor total"}
            textAlignInput={"center"}
            width={"7%"}
            typeInput={"number"}
            readOnlyInput={true}
          />
          <Flex flexDir={"column"}>
            <Checkbox.Root
              ml={3}
              colorPalette={"green"}
              size={"xs"}
              onCheckedChange={(e) => onCheckedChangeSelf(e.checked)}
              checked={isSelfChecked}
            >
              <Checkbox.HiddenInput />
              <Checkbox.Control
                borderColor={isSelfChecked ? "green.500" : "gray.300"}
              />
              <Checkbox.Label>Meu resultado</Checkbox.Label>
            </Checkbox.Root>

            <Checkbox.Root
              ml={3}
              colorPalette={"purple"}
              size={"xs"}
              onCheckedChange={(e) => onCheckedChangeWinner(e.checked)}
              checked={winnerChecked}
            >
              <Checkbox.HiddenInput />
              <Checkbox.Control
                borderColor={winnerChecked ? "purple.500" : "gray.300"}
              />
              <Checkbox.Label>Participante vencedor</Checkbox.Label>
            </Checkbox.Root>

            <Checkbox.Root
              ml={3}
              colorPalette={"red"}
              size={"xs"}
              onCheckedChange={(e) => onCheckedChangeDisqualified(e.checked)}
              checked={disqualificationChecked}
              display={showCheckDisqualification ? "flex" : "none"}
            >
              <Checkbox.HiddenInput />
              <Checkbox.Control
                borderColor={disqualificationChecked ? "red.500" : "gray.300"}
              />
              <Checkbox.Label>Participante desclassificado</Checkbox.Label>
            </Checkbox.Root>
          </Flex>
          <Flex flexDir={"column"} h={"100%"}>
            <Checkbox.Root
              ml={3}
              colorPalette={"red"}
              size={"xs"}
              onCheckedChange={(e) => onCheckedChangeIneligible(e.checked)}
              checked={ineligibleChecked}
              display={showCheckIneligible ? "flex" : "none"}
            >
              <Checkbox.HiddenInput />
              <Checkbox.Control
                borderColor={showCheckIneligible ? "red.500" : "gray.300"}
              />
              <Checkbox.Label>Participante inabilitado</Checkbox.Label>
            </Checkbox.Root>

            {/* 
            <Checkbox.Root
              ml={3}
              colorPalette={"purple"}
              size={"xs"}
              onCheckedChange={(e) => onCheckedChangeWinner(e.checked)}
              checked={winnerChecked}
            >
              <Checkbox.HiddenInput />
              <Checkbox.Control
                borderColor={winnerChecked ? "purple.500" : "gray.300"}
              />
              <Checkbox.Label>Participante vencedor</Checkbox.Label>
            </Checkbox.Root>

            <Checkbox.Root
              ml={3}
              colorPalette={"red"}
              size={"xs"}
              onCheckedChange={(e) => onCheckedChangeDisqualified(e.checked)}
              checked={disqualificationChecked}
              display={showCheckDisqualification ? "flex" : "none"}
            >
              <Checkbox.HiddenInput />
              <Checkbox.Control
                borderColor={disqualificationChecked ? "red.500" : "gray.300"}
              />
              <Checkbox.Label>Participante desclassificado</Checkbox.Label>
            </Checkbox.Root> */}
          </Flex>
        </Flex>

        {disqualificationChecked && (
          <Flex
            borderRadius="md"
            borderWidth="1px"
            borderColor="red.200"
            boxShadow="sm"
            mt={4}
            p={1}
            pl={4}
            bg="red.50"
            alignItems="center"
          >
            <Text color="red.800" fontWeight="medium" mr={3} fontSize={"xs"}>
              Motivo da desclassificação:{" "}
            </Text>
            <InputResult
              value={participant.disqualificationReason || ""}
              onChange={(e) =>
                onChange("disqualificationReason", e.target.value)
              }
              columnTitle={""}
              textAlignInput={"left"}
              width={"50%"}
              placeholder="Digite o motivo da desclassificação..."
            />
          </Flex>
        )}
        {ineligibleChecked && (
          <Flex
            borderRadius="md"
            borderWidth="1px"
            borderColor="red.200"
            boxShadow="sm"
            mt={4}
            p={1}
            pl={4}
            bg="red.50"
            alignItems="center"
          >
            <Text color="red.800" fontWeight="medium" mr={10} fontSize={"xs"}>
              Motivo da inabilitação:{" "}
            </Text>
            <InputResult
              value={participant.ineligibleReason || ""}
              onChange={(e) => onChange("ineligibleReason", e.target.value)}
              columnTitle={""}
              textAlignInput={"left"}
              width={"50%"}
              placeholder="Digite o motivo da desclassificação..."
            />
          </Flex>
        )}
      </Flex>
      <Flex alignItems="center" justifyContent="center" ml={2}>
        <Button
          colorPalette={"red"}
          size="sm"
          variant="ghost"
          _hover={{
            bg: "red.50",
            transform: "scale(1.1)",
            transition: "all 0.2s",
          }}
          p={1}
          minW="auto"
          h="auto"
        >
          <Icon boxSize={5}>
            <TiDelete />
          </Icon>
        </Button>
      </Flex>
    </Flex>
  );
}
