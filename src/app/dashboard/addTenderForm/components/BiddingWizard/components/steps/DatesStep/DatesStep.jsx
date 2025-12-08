"use client"

import { Flex, Text, Grid, GridItem } from "@chakra-ui/react"
import { Timestamp } from "firebase/firestore"
import InputDefaultForm from "../components/InputDefaultForm/InputDefaultForm.jsx"

export default function DatesStep({
  biddingData,
  setBiddingData,
  date,
  setDate,
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

      <Grid templateColumns={{ base: "1fr", md: "1fr " }} gap={6} w="100%">
        <GridItem>
          <Text fontSize="lg" fontWeight="semibold" color="gray.700" mb={3}>
            Disputa
          </Text>
          <Flex gap={3} direction={{ base: "column", md: "row" }}>
            <InputDefaultForm
              typeInput={"date"}
              legend={"Data*"}
              inputValue={date.disputeDateDisplay}
              onChange={(e) =>
                setDate({
                  ...date,
                  disputeDateDisplay: e.target.value,
                })
              }
              flex={1}
            />
            <InputDefaultForm
              typeInput={"time"}
              legend={"Horário*"}
              inputValue={date.disputeTimeDisplay}
              onChange={(e) =>
                setDate({
                  ...date,
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
              inputValue={date.proposalDeadlineDateDisplay}
              onChange={(e) =>
                setDate({
                  ...date,
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
              inputValue={date.proposalDeadlineTimeDisplay}
              onChange={(e) =>
                setDate({
                  ...date,
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
              inputValue={date.proposalOpeningDateDisplay}
              onChange={(e) =>
                setDate({
                  ...date,
                  proposalOpeningDateDisplay: e.target.value,
                })
              }
              flex={1}
            />
            <InputDefaultForm
              typeInput={"time"}
              legend={"Horário*"}
              inputValue={date.proposalOpeningTimeDisplay}
              onChange={(e) =>
                setDate({
                  ...date,
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
              inputValue={date.closingDateDisplay}
              onChange={(e) =>
                setDate({
                  ...date,
                  closingDateDisplay: e.target.value,
                })
              }
              flex={1}
            />
            <InputDefaultForm
              typeInput={"time"}
              legend={"Horário"}
              inputValue={date.closingTimeDisplay}
              onChange={(e) =>
                setDate({
                  ...date,
                  closingTimeDisplay: e.target.value,
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
