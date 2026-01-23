"use client";

import { Flex, Grid, GridItem, Text, Image, List } from "@chakra-ui/react";

export default function Footer() {
  return (
    <Flex justify={"center"}>
      <Grid
        templateColumns={"repeat(4, 1fr)"}
        w="100%"
        p={4}
        bg="gray.800"
        color={"white"}
      >
        <GridItem justifyContent={"center"} p={4}>
          <Flex justify={"center"} direction={"column"}>
            <Flex justify={"center"} align={"center"} gap={2}>
              <Image src=".\icon-licitape.png" height={50} />
              <Text fontSize={"xl"} fontWeight={"bold"}>
                Licita.PE
              </Text>
            </Flex>
          </Flex>
        </GridItem>
        <GridItem justifyContent={"center"}>
          <Flex justify={"center"}>
            <Text>Produto</Text>
          </Flex>
          <Flex
            // justify={"center"}
            flexDir={"column"}
            alignItems={"center"}
          >
            <List.Root listStyleType="none" mt={2} pl={12}>
              <List.Item>Recursos</List.Item>
              <List.Item>Preços</List.Item>
              <List.Item>Demonstração</List.Item>
            </List.Root>
          </Flex>{" "}
        </GridItem>

        <GridItem>
          <Flex justify={"center"}>
            <Text>Empresa</Text>
          </Flex>{" "}
          <Flex
            // justify={"center"}
            flexDir={"column"}
            alignItems={"center"}
          >
            <List.Root listStyleType="none" mt={2} pl={3}>
              {" "}
              <List.Item>Sobre Nós</List.Item>
              <List.Item>Contato</List.Item>
            </List.Root>
          </Flex>{" "}
        </GridItem>
        <GridItem>
          <Flex justify={"center"}>
            <Text>Legal</Text>
          </Flex>{" "}
          <Flex
            // justify={"center"}
            flexDir={"column"}
            alignItems={"center"}
          >
            <List.Root listStyleType="none" mt={2} pl={12}>
              {" "}
              <List.Item>Termos de uso</List.Item>
            </List.Root>
          </Flex>{" "}
        </GridItem>
      </Grid>
    </Flex>
  );
}
