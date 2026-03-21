// "use client";

// import { NativeSelect, Field, Switch, Flex, Text } from "@chakra-ui/react";
// import { useState, useEffect } from "react";

// export default function SelectTypeDispute({
//   onValueChange,
//   value,
//   bidding,
//   hasResult,
// }) {
//   const [allowEdit, setAllowEdit] = useState(!bidding?.result);

//   const optionsTypeDispute = [
//     { label: "Item", value: "item" },
//     { label: "Lote", value: "batch" },
//   ];

//   return (
//     <Flex align="center" gap={4} w="100%">
//       <Field.Root colorPalette={"blue"}>
//         <Field.Label>Disputa por item ou lote?</Field.Label>
//         <NativeSelect.Root size="sm" width="240px">
//           <NativeSelect.Field
//             value={value}
//             onChange={(e) => onValueChange(e.target.value)}
//             disabled={hasResult}
//             bg="white"
//             color="gray.800"
//             borderColor="gray.500"
//             _hover={{ bg: "gray.100" }}
//             _focus={{ bg: "gray.100" }}
//           >
//             <Text>
//               <option value="">Selecione uma opção</option>
//             </Text>
//             {optionsTypeDispute.map((item) => (
//               <Text key={item.value}>
//                 <option value={item.value}>{item.label}</option>
//               </Text>
//             ))}
//           </NativeSelect.Field>
//           <NativeSelect.Indicator />
//         </NativeSelect.Root>
//       </Field.Root>

//       {bidding?.result && (
//         <Switch.Root
//           colorPalette="blue"
//           checked={allowEdit}
//           onCheckedChange={(e) => setAllowEdit(e.checked)}
//         >
//           <Switch.HiddenInput />
//           <Switch.Control />
//           <Switch.Label>Alterar tipo de disputa</Switch.Label>
//         </Switch.Root>
//       )}
//     </Flex>
//   );
// }

"use client";

import { Button, Menu, Flex, Text, Box, Switch } from "@chakra-ui/react";
import { useState } from "react";
import { HiChevronDown } from "react-icons/hi";

export default function SelectTypeDispute({
  onValueChange,
  value,
  bidding,
  hasResult,
}) {
  const [allowEdit, setAllowEdit] = useState(!bidding?.result);

  const optionsTypeDispute = [
    { label: "Item", value: "item" },
    { label: "Lote", value: "batch" },
  ];

  const selected = optionsTypeDispute.find((opt) => opt.value === value);

  return (
    <Flex align="center" gap={4} w="100%">
      <Menu.Root positioning={{ placement: "bottom-start" }}>
        <Menu.Trigger asChild>
          <Button
            disabled={allowEdit}
            w="240px"
            justifyContent="space-between"
            bg="white"
            border="1px solid"
            borderColor="gray.300"
            color="gray.800"
            fontWeight="normal"
            _hover={{ bg: "gray.100" }}
            _focus={{ borderColor: "blue.500" }}
            rightIcon={<HiChevronDown />}
            isDisabled={hasResult && !allowEdit}
          >
            {selected?.label || "Selecione uma opção"}
          </Button>
        </Menu.Trigger>

        <Menu.Positioner>
          <Menu.Content
            minW="240px"
            border="1px solid"
            borderColor="gray.200"
            boxShadow="md"
            borderRadius="md"
            overflow="hidden"
            zIndex={999}
          >
            <Box p={1}>
              {optionsTypeDispute.map((item) => (
                <Menu.Item
                  key={item.value}
                  value={item.value}
                  onClick={() => onValueChange(item.value)}
                  py={2}
                  px={3}
                  fontSize="sm"
                  fontWeight="medium"
                  _hover={{
                    backgroundColor: "blue.50",
                    color: "blue.600",
                  }}
                >
                  <Flex align="center" justify="space-between" w="100%">
                    <Text>{item.label}</Text>

                    {value === item.value && (
                      <Box w="6px" h="6px" borderRadius="full" bg="blue.500" />
                    )}
                  </Flex>
                </Menu.Item>
              ))}
            </Box>
          </Menu.Content>
        </Menu.Positioner>
      </Menu.Root>

      {bidding?.result && (
        <Switch.Root
          colorPalette="blue"
          checked={allowEdit}
          onCheckedChange={(e) => setAllowEdit(e.checked)}
        >
          <Switch.HiddenInput />
          <Switch.Control />
          <Switch.Label>Alterar tipo de disputa</Switch.Label>
        </Switch.Root>
      )}
    </Flex>
  );
}
