"use client";

import {
  Flex,
  Text,
  Grid,
  Box,
  GridItem,
  Stack,
  Checkbox,
  Separator,
} from "@chakra-ui/react";

import CheckboxDefault from "./components/CheckboxDefault/CheckboxDefault";
import { documentationChecklist } from "@/constants/documentationRequirements";

export default function DocumentationStep() {
  return (
    // <Flex direction="column" w="100%" align="center" gap={6}>
    //   <Text
    //     display={{ base: "flex", md: "none" }}
    //     color={"blue.800"}
    //     fontWeight={"bold"}
    //     textShadow={"2px 2px 4px rgba(0,0,0,0.2)"}
    //     fontSize={"2xl"}
    //     textAlign="center"
    //   >
    //     Documentação
    //   </Text>

    //   <Grid templateColumns="repeat(4, 1fr)" gap={4} w="100%">
    //     <GridItem>
    //       <Text fontWeight={"bold"}>Habilitação Jurídica</Text>
    //       <CheckboxDefault label="Ato Constitutivo (contrato social, estatuto social ou requerimento de empresário);" />
    //     </GridItem>
    //     <GridItem>
    //       <Text mb={3} fontWeight={"bold"}>
    //         Habilitação Fiscal e Trabalhista{" "}
    //       </Text>
    //       <CheckboxDefault label="Cartão CNPJ" />
    //       <Separator borderColor={"gray.400"} my={2} />
    //       <CheckboxDefault label="Inscrição Estadual" />
    //       <Separator borderColor={"gray.400"} my={2} />

    //       <CheckboxDefault label="Inscrição Municipal" />
    //       <Separator borderColor={"gray.400"} my={2} />

    //       <CheckboxDefault label="Certidão negativa de débitos Federais" />
    //       <Separator borderColor={"gray.400"} my={2} />

    //       <CheckboxDefault label="Certidão negativa de débitos Estaduais" />
    //       <Separator borderColor={"gray.400"} my={2} />

    //       <CheckboxDefault label="Certidão negativa de débitos Municipais" />

    //       <Separator borderColor={"gray.400"} my={2} />

    //       <CheckboxDefault label="Certidão negativa de débitos Trabalhistas" />
    //       <Separator borderColor={"gray.400"} my={2} />

    //       <CheckboxDefault label="Certidão FGTS" />
    //       <Separator borderColor={"gray.400"} my={2} />

    //       <CheckboxDefault label="Certidão INSS" />
    //       <Separator borderColor={"gray.400"} my={2} />
    //     </GridItem>
    //     <GridItem>
    //       <Text fontWeight={"bold"}>Qualificação Econômico-Financeira</Text>
    //     </GridItem>
    //     <GridItem>
    //       <Text fontWeight={"bold"}>Qualificação Técnica</Text>
    //     </GridItem>
    //     <GridItem>
    //       <Text fontWeight={"bold"}>Outras Declarações</Text>
    //     </GridItem>
    //   </Grid>
    // </Flex>

    <Stack>
      {documentationChecklist.map((section, sectionIndex) => (
        <Box key={sectionIndex}>
          <Text fontWeight="bold" mb={2}>
            {section.title}
          </Text>

          <Stack pl={2}>
            {section.items.map((item, itemIndex) => (
              <Checkbox key={item.key || itemIndex}>{item.label}</Checkbox>
            ))}
          </Stack>
        </Box>
      ))}
    </Stack>
  );
}
