"use client"

import { Flex, Grid, GridItem, Text, Image } from "@chakra-ui/react"

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
          <Flex justify={"center"}>
            <Text>Produto</Text>
          </Flex>{" "}
        </GridItem>

        <GridItem>
          <Flex justify={"center"}>
            <Text>Empresa</Text>
          </Flex>{" "}
        </GridItem>
        <GridItem>
          <Flex justify={"center"}>
            <Text>Legal</Text>
          </Flex>{" "}
        </GridItem>
      </Grid>
    </Flex>
  )
}
