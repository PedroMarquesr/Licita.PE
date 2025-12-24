"use client";

import { Flex, Text, Grid, GridItem } from "@chakra-ui/react";
import InputDefaultForm from "../components/InputDefaultForm/InputDefaultForm.jsx";

export default function LocalStep({ biddingData, setBiddingData }) {
  return (
    <Flex direction="column" w="100%" align="center" gap={6}>
      <Text
        display={{ base: "flex", md: "none" }}
        color={"blue.800"}
        fontWeight={"bold"}
        textShadow={"2px 2px 4px rgba(0,0,0,0.2)"}
        fontSize={"2xl"}
        textAlign="center"
      >
        Local e Plataforma
      </Text>

      <Grid templateColumns={{ base: "1fr", md: "1fr 1fr" }} gap={6} w="100%">
        <GridItem>
          <Text fontSize="lg" fontWeight="semibold" color="gray.700" mb={3}>
            Portal da Disputa
          </Text>
          <Flex gap={3} direction="column">
            <InputDefaultForm
              legend={"Nome do Portal"}
              placeholder={"Compras.BR"}
              inputValue={biddingData.disputePortalName}
              onChange={(e) =>
                setBiddingData({
                  ...biddingData,
                  disputePortalName: e.target.value,
                })
              }
            />
            <InputDefaultForm
              legend={"URL do Portal*"}
              placeholder={"https://portal-de-licitacoes.com.br"}
              inputValue={biddingData.disputePortal}
              onChange={(e) =>
                setBiddingData({
                  ...biddingData,
                  disputePortal: e.target.value,
                })
              }
            />
          </Flex>
        </GridItem>

        <GridItem>
          <Text fontSize="lg" fontWeight="semibold" color="gray.700" mb={3}>
            Local de Execução/Entrega
          </Text>
          <Flex gap={3} direction="column">
            <InputDefaultForm
              legend={"Endereço Completo*"}
              placeholder={"Rua, número, bairro, cidade - Estado"}
              inputValue={biddingData.executionLocation}
              onChange={(e) =>
                setBiddingData({
                  ...biddingData,
                  executionLocation: e.target.value,
                })
              }
            />
          </Flex>
        </GridItem>
      </Grid>
    </Flex>
  );
}
