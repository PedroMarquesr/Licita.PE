"use client"

import { Flex, Text, Grid, GridItem } from "@chakra-ui/react"
import { Timestamp } from "firebase/firestore"
import InputDefaultForm from "../components/InputDefaultForm/InputDefaultForm.jsx"

export default function DatesStep({ biddingData, setBiddingData }) {
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

      <Grid templateColumns={{ base: "1fr", md: "1fr " }} gap={6} w="100%">
        <GridItem>
          <Text fontSize="lg" fontWeight="semibold" color="gray.700" mb={3}>
            Disputa
          </Text>
          <Flex gap={3} direction={{ base: "column", md: "row" }}>
            <InputDefaultForm
              typeInput={"date"}
              legend={"Data*"}
              inputValue={biddingData.disputeDateDisplay}
              onChange={(e) =>
                setBiddingData({
                  ...biddingData,
                  disputeDateDisplay: e.target.value,
                })
              }
              flex={1}
              layout="vertical"
            />
            <InputDefaultForm
              typeInput={"time"}
              legend={"Horário*"}
              inputValue={biddingData.disputeTimeDisplay}
              onChange={(e) =>
                setBiddingData({
                  ...biddingData,
                  disputeTimeDisplay: e.target.value,
                })
              }
              flex={1}
              maxW={"20"}
            />
          </Flex>
        </GridItem>

        <GridItem>
          <Text fontSize="lg" fontWeight="semibold" color="gray.700" mb={3}>
            Prazo para Propostas
          </Text>
          <Flex gap={3} direction={{ base: "column", md: "row" }}>
            <InputDefaultForm
              typeInput={"date"}
              legend={"Data"}
              inputValue={biddingData.proposalDeadlineDateDisplay}
              onChange={(e) =>
                setBiddingData({
                  ...biddingData,
                  proposalDeadlineDateDisplay: e.target.value,
                })
              }
              flex={1}
              layout="vertical"
              minWidth="10px"
            />
            <InputDefaultForm
              typeInput={"time"}
              legend={"Hora limite"}
              inputValue={biddingData.proposalDeadlineTimeDisplay}
              onChange={(e) =>
                setBiddingData({
                  ...biddingData,
                  proposalDeadlineTimeDisplay: e.target.value,
                })
              }
              maxW={"20"}
              flex={1}
            />
          </Flex>
        </GridItem>

        <GridItem>
          <Text fontSize="lg" fontWeight="semibold" color="gray.700" mb={3}>
            Abertura de Propostas
          </Text>
          <Flex gap={3} direction={{ base: "column", md: "row" }}>
            <InputDefaultForm
              typeInput={"date"}
              legend={"Data*"}
              inputValue={biddingData.proposalOpeningDateDisplay}
              onChange={(e) =>
                setBiddingData({
                  ...biddingData,
                  proposalOpeningDateDisplay: e.target.value,
                })
              }
              flex={1}
            />
            <InputDefaultForm
              typeInput={"time"}
              legend={"Horário*"}
              inputValue={biddingData.proposalOpeningTimeDisplay}
              onChange={(e) =>
                setBiddingData({
                  ...biddingData,
                  proposalOpeningTimeDisplay: e.target.value,
                })
              }
              maxW={"20"}
              flex={1}
            />
          </Flex>
        </GridItem>

        <GridItem>
          <Text fontSize="lg" fontWeight="semibold" color="gray.700" mb={3}>
            Encerramento
          </Text>
          <Flex gap={3} direction={{ base: "column", md: "row" }}>
            <InputDefaultForm
              typeInput={"date"}
              legend={"Data"}
              inputValue={biddingData.closingDateDisplay}
              onChange={(e) =>
                setBiddingData({
                  ...biddingData,
                  closingDateDisplay: e.target.value,
                })
              }
              flex={1}
            />
            <InputDefaultForm
              typeInput={"time"}
              legend={"Horário"}
              inputValue={biddingData.closingTime}
              onChange={(e) =>
                setBiddingData({
                  ...biddingData,
                  closingTime: e.target.value,
                })
              }
              maxW={"20"}
              flex={1}
            />
          </Flex>
        </GridItem>
      </Grid>
    </Flex>
  )
}
