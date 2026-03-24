// "use client";

// import {
//   Flex,
//   Text,
//   Box,
//   Input,
//   Field,
//   Menu,
//   Portal,
//   Button,
//   Icon,
// } from "@chakra-ui/react";
// import { FaChevronDown } from "react-icons/fa";

// export default function InputsFilters({ filters, setFilters }) {
//   return (
//     <Flex
//       gap={6}
//       flexDir={{ base: "column", md: "row" }}
//       w="100%"
//       p={4}
//       bg="white"
//       borderRadius="xl"
//       boxShadow="sm"
//       borderWidth="1px"
//       borderColor="gray.100"
//     >
//       <Field.Root flex={1}>
//         <Field.Label fontSize="xs" fontWeight="medium" color="gray.600" mb={1}>
//           Identificador
//         </Field.Label>
//         <Input
//           placeholder="Digite o identificador..."
//           bg="gray.50"
//           borderColor="gray.200"
//           _hover={{ borderColor: "blue.300", bg: "white" }}
//           _focus={{
//             borderColor: "blue.500",
//             boxShadow: "0 0 0 1px blue.500",
//             bg: "white",
//           }}
//           transition="all 0.2s"
//           fontSize="sm"
//           value={filters.search}
//           onChange={(e) => setFilters({ ...filters, serch: e.target.value })}
//         />
//       </Field.Root>

//       <Field.Root flex={1}>
//         <Field.Label fontSize="xs" fontWeight="medium" color="gray.600" mb={1}>
//           Órgão
//         </Field.Label>
//         <Input
//           placeholder="Selecione ou digite..."
//           bg="gray.50"
//           borderColor="gray.200"
//           _hover={{ borderColor: "blue.300", bg: "white" }}
//           _focus={{
//             borderColor: "blue.500",
//             boxShadow: "0 0 0 1px blue.500",
//             bg: "white",
//           }}
//           transition="all 0.2s"
//           fontSize="sm"
//         />
//       </Field.Root>

//       <Field.Root flex={1}>
//         <Field.Label fontSize="xs" fontWeight="medium" color="gray.600" mb={1}>
//           Cidade
//         </Field.Label>
//         <Input
//           placeholder="Selecione ou digite..."
//           bg="gray.50"
//           borderColor="gray.200"
//           _hover={{ borderColor: "blue.300", bg: "white" }}
//           _focus={{
//             borderColor: "blue.500",
//             boxShadow: "0 0 0 1px blue.500",
//             bg: "white",
//           }}
//           transition="all 0.2s"
//           fontSize="sm"
//         />
//       </Field.Root>

//       <Field.Root flex={1}>
//         <Field.Label fontSize="xs" fontWeight="medium" color="gray.600" mb={1}>
//           Status
//         </Field.Label>
//         <Menu.Root>
//           <Menu.Trigger asChild w="100%">
//             <Button
//               variant="outline"
//               justifyContent="space-between"
//               bg="gray.50"
//               borderColor="gray.200"
//               color="gray.700"
//               fontWeight="normal"
//               fontSize="sm"
//               _hover={{ borderColor: "blue.300", bg: "white" }}
//               _expanded={{ borderColor: "blue.500", bg: "white" }}
//               transition="all 0.2s"
//             >
//               Selecione
//               <Icon boxSize={4} color="gray.400">
//                 <FaChevronDown />
//               </Icon>
//             </Button>
//           </Menu.Trigger>
//           <Portal>
//             <Menu.Positioner>
//               <Menu.Content
//                 borderRadius="lg"
//                 boxShadow="lg"
//                 borderColor="gray.200"
//                 p={1}
//               >
//                 <Menu.Item
//                   value="suspended"
//                   _hover={{ bg: "blue.50", color: "blue.700" }}
//                   borderRadius="md"
//                   fontSize="sm"
//                 >
//                   Suspensa
//                 </Menu.Item>
//                 <Menu.Item
//                   value="reopened"
//                   _hover={{ bg: "blue.50", color: "blue.700" }}
//                   borderRadius="md"
//                   fontSize="sm"
//                 >
//                   Reaberta
//                 </Menu.Item>
//                 <Menu.Item
//                   value="cancelled"
//                   _hover={{ bg: "blue.50", color: "blue.700" }}
//                   borderRadius="md"
//                   fontSize="sm"
//                 >
//                   Cancelada
//                 </Menu.Item>
//                 <Menu.Item
//                   value="finished"
//                   _hover={{ bg: "blue.50", color: "blue.700" }}
//                   borderRadius="md"
//                   fontSize="sm"
//                 >
//                   Finalizada
//                 </Menu.Item>
//               </Menu.Content>
//             </Menu.Positioner>
//           </Portal>
//         </Menu.Root>
//       </Field.Root>

//       <Field.Root flex={1}>
//         <Field.Label fontSize="xs" fontWeight="medium" color="gray.600" mb={1}>
//           Modalidade
//         </Field.Label>
//         <Menu.Root>
//           <Menu.Trigger asChild w="100%">
//             <Button
//               variant="outline"
//               justifyContent="space-between"
//               bg="gray.50"
//               borderColor="gray.200"
//               color="gray.700"
//               fontWeight="normal"
//               fontSize="sm"
//               _hover={{ borderColor: "blue.300", bg: "white" }}
//               _expanded={{ borderColor: "blue.500", bg: "white" }}
//               transition="all 0.2s"
//             >
//               Selecione
//               <Icon boxSize={4} color="gray.400">
//                 <FaChevronDown />
//               </Icon>
//             </Button>
//           </Menu.Trigger>
//           <Portal>
//             <Menu.Positioner>
//               <Menu.Content
//                 borderRadius="lg"
//                 boxShadow="lg"
//                 borderColor="gray.200"
//                 p={1}
//                 maxH="300px"
//                 overflowY="auto"
//               >
//                 <Menu.Item
//                   value="dispensa"
//                   _hover={{ bg: "blue.50", color: "blue.700" }}
//                   borderRadius="md"
//                   fontSize="sm"
//                 >
//                   Dispensa de Licitação
//                 </Menu.Item>
//                 <Menu.Item
//                   value="pregao"
//                   _hover={{ bg: "blue.50", color: "blue.700" }}
//                   borderRadius="md"
//                   fontSize="sm"
//                 >
//                   Pregão eletrônico
//                 </Menu.Item>
//                 <Menu.Item
//                   value="convite"
//                   _hover={{ bg: "blue.50", color: "blue.700" }}
//                   borderRadius="md"
//                   fontSize="sm"
//                 >
//                   Convite eletrônico
//                 </Menu.Item>
//                 <Menu.Item
//                   value="concorrencia"
//                   _hover={{ bg: "blue.50", color: "blue.700" }}
//                   borderRadius="md"
//                   fontSize="sm"
//                 >
//                   Concorrência
//                 </Menu.Item>
//                 <Menu.Item
//                   value="tomada"
//                   _hover={{ bg: "blue.50", color: "blue.700" }}
//                   borderRadius="md"
//                   fontSize="sm"
//                 >
//                   Tomada de Preços
//                 </Menu.Item>
//                 <Menu.Item
//                   value="inexigibilidade"
//                   _hover={{ bg: "blue.50", color: "blue.700" }}
//                   borderRadius="md"
//                   fontSize="sm"
//                 >
//                   Inexigibilidade
//                 </Menu.Item>
//               </Menu.Content>
//             </Menu.Positioner>
//           </Portal>
//         </Menu.Root>
//       </Field.Root>
//     </Flex>
//   );
// }

"use client";

import {
  Flex,
  Text,
  Box,
  Input,
  Field,
  Menu,
  Portal,
  Button,
  Icon,
} from "@chakra-ui/react";
import { FaChevronDown } from "react-icons/fa";
import { useState } from "react";

export default function InputsFilters({ filters, setFilters }) {
  // Estados locais para os valores dos menus
  const [selectedStatus, setSelectedStatus] = useState("");
  const [selectedModalidade, setSelectedModalidade] = useState("");

  const handleStatusSelect = (value) => {
    setSelectedStatus(value);
    setFilters({ ...filters, statusFilter: value });
  };

  const handleModalidadeSelect = (value) => {
    setSelectedModalidade(value);
    setFilters({ ...filters, modalidadeFilter: value });
  };

  return (
    <Flex
      gap={6}
      flexDir={{ base: "column", md: "row" }}
      w="100%"
      p={4}
      bg="white"
      borderRadius="xl"
      boxShadow="sm"
      borderWidth="1px"
      borderColor="gray.100"
    >
      <Field.Root flex={1}>
        <Field.Label fontSize="xs" fontWeight="medium" color="gray.600" mb={1}>
          Identificador
        </Field.Label>
        <Input
          placeholder="Digite o identificador..."
          bg="gray.50"
          borderColor="gray.200"
          _hover={{ borderColor: "blue.300", bg: "white" }}
          _focus={{
            borderColor: "blue.500",
            boxShadow: "0 0 0 1px blue.500",
            bg: "white",
          }}
          transition="all 0.2s"
          fontSize="sm"
          value={filters.search || ""}
          onChange={(e) => setFilters({ ...filters, search: e.target.value })}
        />
      </Field.Root>

      <Field.Root flex={1}>
        <Field.Label fontSize="xs" fontWeight="medium" color="gray.600" mb={1}>
          Órgão
        </Field.Label>
        <Input
          placeholder="Digite o nome do órgão..."
          bg="gray.50"
          borderColor="gray.200"
          _hover={{ borderColor: "blue.300", bg: "white" }}
          _focus={{
            borderColor: "blue.500",
            boxShadow: "0 0 0 1px blue.500",
            bg: "white",
          }}
          transition="all 0.2s"
          fontSize="sm"
          value={filters.agency || ""}
          onChange={(e) => setFilters({ ...filters, agency: e.target.value })}
        />
      </Field.Root>

      <Field.Root flex={1}>
        <Field.Label fontSize="xs" fontWeight="medium" color="gray.600" mb={1}>
          Cidade
        </Field.Label>
        <Input
          placeholder="Digite o nome da cidade..."
          bg="gray.50"
          borderColor="gray.200"
          _hover={{ borderColor: "blue.300", bg: "white" }}
          _focus={{
            borderColor: "blue.500",
            boxShadow: "0 0 0 1px blue.500",
            bg: "white",
          }}
          transition="all 0.2s"
          fontSize="sm"
          value={filters.city || ""}
          onChange={(e) => setFilters({ ...filters, city: e.target.value })}
        />
      </Field.Root>

      <Field.Root flex={1}>
        <Field.Label fontSize="xs" fontWeight="medium" color="gray.600" mb={1}>
          Status
        </Field.Label>
        <Menu.Root>
          <Menu.Trigger asChild w="100%">
            <Button
              variant="outline"
              justifyContent="space-between"
              bg="gray.50"
              borderColor="gray.200"
              color="gray.700"
              fontWeight="normal"
              fontSize="sm"
              _hover={{ borderColor: "blue.300", bg: "white" }}
              _expanded={{ borderColor: "blue.500", bg: "white" }}
              transition="all 0.2s"
            >
              {selectedStatus || "Selecione"}
              <Icon boxSize={4} color="gray.400">
                <FaChevronDown />
              </Icon>
            </Button>
          </Menu.Trigger>
          <Portal>
            <Menu.Positioner>
              <Menu.Content
                borderRadius="lg"
                boxShadow="lg"
                borderColor="gray.200"
                p={1}
              >
                <Menu.Item
                  onClick={() => handleStatusSelect("")}
                  _hover={{ bg: "blue.50", color: "blue.700" }}
                  borderRadius="md"
                  fontSize="sm"
                >
                  Todos
                </Menu.Item>
                <Menu.Item
                  onClick={() => handleStatusSelect("Suspensa")}
                  _hover={{ bg: "blue.50", color: "blue.700" }}
                  borderRadius="md"
                  fontSize="sm"
                >
                  Suspensa
                </Menu.Item>
                <Menu.Item
                  onClick={() => handleStatusSelect("Reaberta")}
                  _hover={{ bg: "blue.50", color: "blue.700" }}
                  borderRadius="md"
                  fontSize="sm"
                >
                  Reaberta
                </Menu.Item>
                <Menu.Item
                  onClick={() => handleStatusSelect("Cancelada")}
                  _hover={{ bg: "blue.50", color: "blue.700" }}
                  borderRadius="md"
                  fontSize="sm"
                >
                  Cancelada
                </Menu.Item>
                <Menu.Item
                  onClick={() => handleStatusSelect("Finalizada")}
                  _hover={{ bg: "blue.50", color: "blue.700" }}
                  borderRadius="md"
                  fontSize="sm"
                >
                  Finalizada
                </Menu.Item>
                <Menu.Item
                  onClick={() => handleStatusSelect("Aguardando atualização")}
                  _hover={{ bg: "blue.50", color: "blue.700" }}
                  borderRadius="md"
                  fontSize="sm"
                >
                  Em andamento
                </Menu.Item>
                <Menu.Item
                  onClick={() => handleStatusSelect("Aguardando aprovação")}
                  _hover={{ bg: "blue.50", color: "blue.700" }}
                  borderRadius="md"
                  fontSize="sm"
                >
                  Em análise
                </Menu.Item>
              </Menu.Content>
            </Menu.Positioner>
          </Portal>
        </Menu.Root>
      </Field.Root>

      <Field.Root flex={1}>
        <Field.Label fontSize="xs" fontWeight="medium" color="gray.600" mb={1}>
          Modalidade
        </Field.Label>
        <Menu.Root>
          <Menu.Trigger asChild w="100%">
            <Button
              variant="outline"
              justifyContent="space-between"
              bg="gray.50"
              borderColor="gray.200"
              color="gray.700"
              fontWeight="normal"
              fontSize="sm"
              _hover={{ borderColor: "blue.300", bg: "white" }}
              _expanded={{ borderColor: "blue.500", bg: "white" }}
              transition="all 0.2s"
            >
              {selectedModalidade || "Selecione"}
              <Icon boxSize={4} color="gray.400">
                <FaChevronDown />
              </Icon>
            </Button>
          </Menu.Trigger>
          <Portal>
            <Menu.Positioner>
              <Menu.Content
                borderRadius="lg"
                boxShadow="lg"
                borderColor="gray.200"
                p={1}
                maxH="300px"
                overflowY="auto"
              >
                <Menu.Item
                  onClick={() => handleModalidadeSelect("")}
                  _hover={{ bg: "blue.50", color: "blue.700" }}
                  borderRadius="md"
                  fontSize="sm"
                >
                  Todos
                </Menu.Item>
                <Menu.Item
                  onClick={() =>
                    handleModalidadeSelect("Dispensa de Licitação")
                  }
                  _hover={{ bg: "blue.50", color: "blue.700" }}
                  borderRadius="md"
                  fontSize="sm"
                >
                  Dispensa de Licitação
                </Menu.Item>
                <Menu.Item
                  onClick={() => handleModalidadeSelect("Pregão eletrônico")}
                  _hover={{ bg: "blue.50", color: "blue.700" }}
                  borderRadius="md"
                  fontSize="sm"
                >
                  Pregão eletrônico
                </Menu.Item>
                <Menu.Item
                  onClick={() => handleModalidadeSelect("Convite eletrônico")}
                  _hover={{ bg: "blue.50", color: "blue.700" }}
                  borderRadius="md"
                  fontSize="sm"
                >
                  Convite eletrônico
                </Menu.Item>
                <Menu.Item
                  onClick={() => handleModalidadeSelect("Concorrência")}
                  _hover={{ bg: "blue.50", color: "blue.700" }}
                  borderRadius="md"
                  fontSize="sm"
                >
                  Concorrência
                </Menu.Item>
                <Menu.Item
                  onClick={() => handleModalidadeSelect("Tomada de Preços")}
                  _hover={{ bg: "blue.50", color: "blue.700" }}
                  borderRadius="md"
                  fontSize="sm"
                >
                  Tomada de Preços
                </Menu.Item>
                <Menu.Item
                  onClick={() => handleModalidadeSelect("Inexigibilidade")}
                  _hover={{ bg: "blue.50", color: "blue.700" }}
                  borderRadius="md"
                  fontSize="sm"
                >
                  Inexigibilidade
                </Menu.Item>
              </Menu.Content>
            </Menu.Positioner>
          </Portal>
        </Menu.Root>
      </Field.Root>
    </Flex>
  );
}
