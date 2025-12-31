import { doc, getDoc } from "firebase/firestore"
import { db } from "@/components/libs/firebaseinit"
import {
  Flex,
  Text,
  Button,
  Grid,
  GridItem,
  Separator,
  Wrap,
  WrapItem,
  Badge,
} from "@chakra-ui/react"

import { getBiddingDisplayStatus } from "@/utils/biddingStatus"

import HeaderPage from "../../components/HeaderPage/HeaderPage"
import PrintButton from "./components/PrintButton/PrintButton"

import { FaPrint } from "react-icons/fa6"

export default async function BiddingDetails({ params }) {
  const { id } = await params

  const docRef = doc(db, "biddings", id)
  const docSnap = await getDoc(docRef)

  if (!docSnap.exists()) {
    return <Text>Licitação não encontrada</Text>
  }

  const bidding = docSnap.data()
  function formatDate(timestamp) {
    if (!timestamp) return "—"
    const date = timestamp.toDate()
    return date.toLocaleDateString("pt-BR")
  }

  function formatDateTime(timestamp) {
    if (!timestamp) return "—"
    const date = timestamp.toDate()
    return date.toLocaleString("pt-BR")
  }

  return (
    <Flex
      flexDir="column"
      w="100%"
      h="100%"
      align="center"
      px={{ base: "2", md: "4" }}
      maxW="100%"
    >
      <HeaderPage
        titleHeader={"Visualização do Processo"}
        subTitleHeader={"Dados gerais, prazos e condições do processo"}
        className="no-print"
      />
      <Separator
        borderColor="gray.400"
        w={"100%"}
        my={6}
        className="no-print"
      />

      <Flex direction="column" align="center" gap={4} mb={6}>
        <Text
          fontSize="2xl"
          fontWeight="bold"
          textAlign="center"
          className="print-title"
        >
          {bidding.responsibleAgency} <PrintButton />
        </Text>
        <Text color="gray.600" textAlign="center">
          {bidding.biddingType} - {bidding.identificationNumber}
        </Text>
        <Text color="gray.600" textAlign="center">
          Processo nº {bidding.processNumber}
        </Text>

        <Flex justify="center" align="center">
          <Text px={3} py={1} borderRadius="md" bg="gray.100" fontSize="sm">
            Status:
          </Text>
          <Text
            color={
              getBiddingDisplayStatus(bidding) === "Agendada"
                ? "blue.600"
                : getBiddingDisplayStatus(bidding) === "Suspensa"
                ? "orange.600"
                : getBiddingDisplayStatus(bidding) === "Reagendada"
                ? "purple.600"
                : getBiddingDisplayStatus(bidding) === "Cancelada"
                ? "red.600"
                : getBiddingDisplayStatus(bidding) === "Finalizada"
                ? "green.600"
                : "red.600"
            }
            fontWeight="bold"
            fontSize="lg"
          >
            {getBiddingDisplayStatus(bidding)}
          </Text>
        </Flex>
      </Flex>

      <Flex
        flexDir={"column"}
        w={"100%"}
        alignItems={"center"}
        textAlign={"center"}
      >
        <Grid
          templateColumns={{ base: "1fr", md: "repeat(4, 1fr)" }}
          className="print-grid-4"
          gap={6}
          w="100%"
          mb={6}
        >
          <GridItem
            border="1px solid"
            borderColor="gray.300"
            borderRadius="md"
            p={4}
            py={2}
            my={2}
          >
            <Text fontWeight="bold" color="gray.700">
              Cidade
            </Text>
            <Text>{bidding.agencyCity || "—"}</Text>
          </GridItem>

          <GridItem
            border="1px solid"
            borderColor="gray.300"
            borderRadius="md"
            p={4}
            py={2}
            my={2}
          >
            <Text fontWeight="bold" color="gray.700">
              CNPJ
            </Text>
            <Text>{bidding.agencyCnpj || "—"}</Text>
          </GridItem>

          <GridItem
            border="1px solid"
            borderColor="gray.300"
            borderRadius="md"
            p={4}
            py={2}
            my={2}
          >
            <Text fontWeight="bold" color="gray.700">
              Portal
            </Text>
            <Text>{bidding.disputePortalName || "—"}</Text>
          </GridItem>
          <GridItem
            border="1px solid"
            borderColor="gray.300"
            borderRadius="md"
            p={4}
            py={2}
            my={2}
          >
            <Text fontWeight="bold" color="gray.700">
              Código no Portal
            </Text>
            <Text>{bidding.portalAgencyCode || "—"}</Text>
          </GridItem>
        </Grid>

        <Grid
          templateColumns={{ base: "1fr", md: "repeat(3, 1fr)" }}
          className="print-grid-3"
          gap={6}
          w="100%"
          mb={6}
        >
          <GridItem
            border="1px solid"
            borderColor="gray.300"
            borderRadius="md"
            p={4}
            py={2}
            my={2}
          >
            <Text fontWeight="bold" color="gray.700">
              Data da Disputa
            </Text>
            <Text>{formatDateTime(bidding.disputeDate)}</Text>
          </GridItem>

          <GridItem
            border="1px solid"
            borderColor="gray.300"
            borderRadius="md"
            p={4}
            py={2}
            my={2}
          >
            <Text fontWeight="bold" color="gray.700">
              Prazo de Propostas
            </Text>
            <Text>{formatDateTime(bidding.proposalDeadlineDate)}</Text>
          </GridItem>

          <GridItem
            className="print-grid-item"
            border="1px solid"
            borderColor="gray.300"
            borderRadius="md"
            p={4}
            py={2}
            my={2}
          >
            <Text fontWeight="bold" color="gray.700">
              Abertura das Propostas
            </Text>
            <Text>{formatDateTime(bidding.proposalOpeningDate)}</Text>
          </GridItem>
        </Grid>

        <Grid
          templateColumns={{ base: "1fr", md: "repeat(3, 1fr)" }}
          className="print-grid-3"
          gap={6}
          w="100%"
          mb={6}
        >
          <GridItem
            border="1px solid"
            borderColor="gray.300"
            borderRadius="md"
            p={4}
            py={2}
            my={2}
          >
            <Text fontWeight="bold" color="gray.700">
              Tipo de Licitação
            </Text>
            <Text>{bidding.biddingType?.join(", ") || "—"}</Text>
          </GridItem>

          <GridItem
            border="1px solid"
            borderColor="gray.300"
            borderRadius="md"
            p={4}
            py={2}
            my={2}
          >
            <Text fontWeight="bold" color="gray.700">
              Modalidade
            </Text>
            <Text>{bidding.modality?.join(", ") || "—"}</Text>
          </GridItem>

          <GridItem
            border="1px solid"
            borderColor="gray.300"
            borderRadius="md"
            p={4}
            py={2}
            my={2}
          >
            <Text fontWeight="bold" color="gray.700">
              Critério de Julgamento
            </Text>
            <Text>{bidding.judgmentCriteria?.join(", ") || "—"}</Text>
          </GridItem>
        </Grid>

        <Grid
          templateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }}
          gap={6}
          w="100%"
          mb={6}
        >
          <GridItem
            display={bidding.estimatedValue ? "block" : "none"}
            border="1px solid"
            borderColor="gray.300"
            borderRadius="md"
            p={4}
            py={2}
            my={2}
          >
            <Text fontWeight="bold" color="gray.700">
              Valor Estimado
            </Text>
            <Text>{bidding.estimatedValue || "—"}</Text>
          </GridItem>

          <GridItem
            display={bidding.maximumValue ? "block" : "none"}
            border="1px solid"
            borderColor="gray.300"
            borderRadius="md"
            p={4}
            py={2}
            my={2}
          >
            <Text fontWeight="bold" color="gray.700">
              Valor Máximo
            </Text>
            <Text>{bidding.maximumValue || "—"}</Text>
          </GridItem>
        </Grid>

        <Grid
          className="print-grid-4"
          templateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }}
          gap={6}
          w="100%"
          mb={6}
        >
          <GridItem
            border="1px solid"
            borderColor="gray.300"
            borderRadius="md"
            p={4}
            py={2}
            my={2}
          >
            <Text fontWeight="bold" color="gray.700">
              Telefone
            </Text>
            <Text>{bidding.contactPhone || "Não informado"}</Text>
          </GridItem>

          <GridItem
            border="1px solid"
            borderColor="gray.300"
            borderRadius="md"
            p={4}
            py={2}
            my={2}
          >
            <Text fontWeight="bold" color="gray.700">
              Email
            </Text>
            <Text>{bidding.contactEmail || "Não informado"}</Text>
          </GridItem>
        </Grid>

        <Flex direction="column" w="100%" mb={6}>
          <Text fontWeight="bold" mb={2}>
            Tags
          </Text>
          <Flex gap={2} wrap="wrap" align={"center"} justify={"center"}>
            <Wrap spacing={2} mb={3}>
              {bidding.tags?.map((tag, index) => (
                <WrapItem key={index}>
                  <Badge
                    align="center"
                    colorPalette={
                      tag === "Acompanhamento"
                        ? "purple"
                        : tag === "Alta Prioridade"
                        ? "red"
                        : "green"
                    }
                    px={3}
                    py={1}
                    fontSize="xs"
                    fontWeight="medium"
                  >
                    {tag}
                  </Badge>
                </WrapItem>
              ))}
            </Wrap>
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  )
}
