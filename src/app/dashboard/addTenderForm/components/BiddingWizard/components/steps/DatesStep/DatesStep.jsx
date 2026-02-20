"use client";

import { Flex, Text, Grid, GridItem, Box } from "@chakra-ui/react";
import InputDefaultForm from "../components/InputDefaultForm/InputDefaultForm.jsx";

export default function DatesStep({
  biddingData,
  setBiddingData,
  edit,
  setEdit,
}) {
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
        Datas e Prazos
      </Text>

      <Grid templateColumns={{ base: "1fr", md: "1fr, 0.5" }} gap={6} w="100%">
        <GridItem>
          <Text fontSize="lg" fontWeight="semibold" color="gray.700" mb={3}>
            Disputa
          </Text>
          <Box flex={"1"} gap={4}>
            <InputDefaultForm
              mbInput={"2"}
              maxW={"150px"}
              edit={edit}
              typeInput={"date"}
              legend={"Data*"}
              inputValue={biddingData.disputeDate}
              onChange={(e) =>
                setBiddingData({
                  ...biddingData,
                  disputeDate: e.target.value,
                })
              }
              layout="vertical"
            />
          </Box>
          <Box flex={1}>
            <InputDefaultForm
              maxW={"100px"}
              edit={edit}
              typeInput={"time"}
              legend={"Horário*"}
              inputValue={biddingData.disputeTime}
              onChange={(e) =>
                setBiddingData({
                  ...biddingData,
                  disputeTime: e.target.value,
                })
              }
            />
          </Box>
        </GridItem>

        <GridItem>
          <Text fontSize="lg" fontWeight="semibold" color="gray.700" mb={3}>
            Prazo para Propostas
          </Text>

          <Box flex={2}>
            <InputDefaultForm
              mbInput={"2"}
              maxW={"150px"}
              edit={edit}
              typeInput={"date"}
              legend={"Data"}
              inputValue={biddingData.proposalDeadlineDate}
              onChange={(e) =>
                setBiddingData({
                  ...biddingData,
                  proposalDeadlineDate: e.target.value,
                })
              }
              layout="vertical"
            />
          </Box>
          <Box flex={1}>
            <InputDefaultForm
              maxW={"100px"}
              edit={edit}
              typeInput={"time"}
              legend={"Hora limite"}
              inputValue={biddingData.proposalDeadlineTime}
              onChange={(e) =>
                setBiddingData({
                  ...biddingData,
                  proposalDeadlineTime: e.target.value,
                })
              }
            />
          </Box>
        </GridItem>

        <GridItem>
          <Text fontSize="lg" fontWeight="semibold" color="gray.700" mb={3}>
            Abertura de Propostas
          </Text>
          <Box flex={2}>
            <InputDefaultForm
              mbInput={"2"}
              maxW={"150px"}
              edit={edit}
              typeInput={"date"}
              legend={"Data*"}
              inputValue={biddingData.proposalOpeningDate}
              onChange={(e) =>
                setBiddingData({
                  ...biddingData,
                  proposalOpeningDate: e.target.value,
                })
              }
            />
          </Box>
          <Box flex={1}>
            <InputDefaultForm
              maxW={"100px"}
              edit={edit}
              typeInput={"time"}
              legend={"Horário*"}
              inputValue={biddingData.proposalOpeningTime}
              onChange={(e) =>
                setBiddingData({
                  ...biddingData,
                  proposalOpeningTime: e.target.value,
                })
              }
            />
          </Box>
        </GridItem>

        <GridItem>
          <Text fontSize="lg" fontWeight="semibold" color="gray.700" mb={3}>
            Encerramento
          </Text>
          <Box flex={2}>
            <InputDefaultForm
              mbInput={"2"}
              maxW={"150px"}
              edit={edit}
              typeInput={"date"}
              legend={"Data"}
              inputValue={biddingData.closingDate}
              onChange={(e) =>
                setBiddingData({
                  ...biddingData,
                  closingDate: e.target.value,
                })
              }
            />
          </Box>
          <Box flex={1}>
            <InputDefaultForm
              maxW={"100px"}
              edit={edit}
              typeInput={"time"}
              legend={"Horário"}
              inputValue={biddingData.closingTime}
              onChange={(e) =>
                setBiddingData({
                  ...biddingData,
                  closingTime: e.target.value,
                })
              }
            />
          </Box>
        </GridItem>
      </Grid>
    </Flex>
  );
}
