"use client"

import { Flex, Text, Grid, GridItem } from "@chakra-ui/react"
import InputDefaultForm from "../components/InputDefaultForm/InputDefaultForm.jsx"
import CustomSelect from "./components/CustomSelect/CustomSelect"

export default function IdentificationStep({ biddingData, setBiddingData }) {
  const modalityOptions = [
    { label: "Aberto", value: "Aberto" },
    { label: "Aberto/Fechado", value: "Aberto/Fechado" },
    { label: "Fechado/Aberto", value: "Fechado/Aberto" },
    { label: "Fechado", value: "Fechado" },
  ]
  const judgmentCriteriaOptions = [
    { label: "Menor preço", value: "Menor preço" },
    { label: "Maior desconto", value: "Maior desconto" },
    { label: "Técnica e preço", value: "Técnica e preço" },
    { label: "Maior lance", value: "Maior lance" },
    { label: "Melhor técnica", value: "Melhor técnica" },
  ]
  const biddingTypeOptions = [
    { label: "Dispensa de Licitação", value: "Dispensa de Licitação" },
    { label: "Pregão eletrônico", value: "Pregão eletrônico" },
    { label: "Convite eletrônico", value: "Convite eletrônico" },
    { label: "Concorrência", value: "Concorrência" },
    { label: "Tomada de Preços", value: "Tomada de Preços" },
    { label: "Inexigibilidade", value: "Inexigibilidade" },
  ]
  const supplyTypeOptions = [
    { label: "Registro de Preços", value: "Registro_de_Preços" },
    { label: "Entrega Parcelada", value: "Entrega_Parcelada" },
    { label: "Entrega Imediata", value: "Entrega Imediata" },
    { label: "Serviço", value: "Serviço" },
    { label: "teste", value: "teste" },
  ]
  const formatCNPJ = (cnpj) => {
    const numbers = cnpj.replace(/\D/g, "")
    if (numbers.length !== 14) return cnpj
    return `${numbers.slice(0, 2)}.${numbers.slice(2, 5)}.${numbers.slice(
      5,
      8
    )}/${numbers.slice(8, 12)}-${numbers.slice(12, 14)}`
  }

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
        Identificação
      </Text>

      <Grid templateColumns={{ base: "1fr", md: "1fr 1fr" }} gap={6} w="100%">
        <GridItem>
          <Text fontSize="lg" fontWeight="semibold" color="gray.700" mb={3}>
            Órgão Responsável
          </Text>
          <Flex gap={3} direction="column">
            <InputDefaultForm
              legend={"Nome do Órgão*"}
              placeholder={"Digite o nome do Órgão responsável"}
              inputValue={biddingData.responsibleAgency}
              onChange={(e) =>
                setBiddingData({
                  ...biddingData,
                  responsibleAgency: e.target.value,
                })
              }
            />
            <InputDefaultForm
              legend={"Cidade do Órgão*"}
              placeholder={"Informe a cidade do Órgão responsável"}
              inputValue={biddingData.agencyCity}
              onChange={(e) =>
                setBiddingData({
                  ...biddingData,
                  agencyCity: e.target.value,
                })
              }
            />
            <InputDefaultForm
              legend={"CNPJ do Órgão*"}
              placeholder={"Informe o CNPJ do Órgão responsável"}
              maxLength={"14"}
              inputValue={biddingData.agencyCnpj}
              onChange={(e) =>
                setBiddingData({
                  ...biddingData,
                  agencyCnpj: e.target.value,
                })
              }
              onBlur={() => {
                if (biddingData.agencyCnpj.length === 14) {
                  const formatted = formatCNPJ(biddingData.agencyCnpj)
                  setBiddingData({
                    ...biddingData,
                    agencyCnpj: formatted,
                  })
                }
              }}
            />
            <InputDefaultForm
              legend={"Código do Órgão"}
              placeholder={"Código do Órgão no portal"}
              inputValue={biddingData.portalAgencyCode}
              onChange={(e) =>
                setBiddingData({
                  ...biddingData,
                  portalAgencyCode: e.target.value,
                })
              }
            />
          </Flex>
        </GridItem>

        <GridItem>
          <Text fontSize="lg" fontWeight="semibold" color="gray.700" mb={3}>
            Identificação
          </Text>
          <Flex gap={3} direction="column">
            <InputDefaultForm
              legend={"Número da Licitação*"}
              placeholder={"Ex: PE XXX/2026"}
              inputValue={biddingData.identificationNumber}
              onChange={(e) =>
                setBiddingData({
                  ...biddingData,
                  identificationNumber: e.target.value,
                })
              }
            />
            <InputDefaultForm
              legend={"Número do Processo*"}
              placeholder={"Número do processo administrativo"}
              inputValue={biddingData.processNumber}
              onChange={(e) =>
                setBiddingData({
                  ...biddingData,
                  processNumber: e.target.value,
                })
              }
            />
          </Flex>
        </GridItem>

        <GridItem colSpan={{ base: 1, md: 2 }}>
          <Text fontSize="lg" fontWeight="semibold" color="gray.700" mb={3}>
            Configurações da Licitação
          </Text>
          <Grid
            templateColumns={{ base: "1fr", sm: "1fr", md: "1fr 1fr 1fr" }}
            gap={4}
            w={"100%"}
          >
            <CustomSelect
              legend="Critério de Julgamento"
              placeholder="Selecione"
              options={judgmentCriteriaOptions}
              value={biddingData.judgmentCriteria}
              onValueChange={(value) =>
                setBiddingData({
                  ...biddingData,
                  judgmentCriteria: value,
                })
              }
            />
            <CustomSelect
              legend="Modalidade"
              placeholder="Selecione"
              options={modalityOptions}
              value={biddingData.modality}
              onValueChange={(value) =>
                setBiddingData({
                  ...biddingData,
                  modality: value,
                })
              }
            />
            <CustomSelect
              legend="Tipo de Licitação"
              placeholder="Selecione"
              options={biddingTypeOptions}
              value={biddingData.biddingType}
              onValueChange={(value) =>
                setBiddingData({
                  ...biddingData,
                  biddingType: value,
                })
              }
            />
          </Grid>
        </GridItem>
        <GridItem colSpan={{ base: 1, md: 2 }}>
          <Grid
            templateColumns={{ base: "1fr", sm: "1fr", md: "1fr 1fr 1fr" }}
            gap={4}
            w={"100%"}
          >
            <CustomSelect
              legend="Forma de execução"
              placeholder="Selecione"
              options={supplyTypeOptions}
              value={biddingData.supplyType?.type || ""}
              onValueChange={(value) =>
                setBiddingData({
                  ...biddingData,
                  supplyType: {
                    ...biddingData.supplyType,
                    type: value[0] || "",
                  },
                })
              }
            />
          </Grid>
        </GridItem>
        {biddingData.supplyType?.type === "teste" && <Text>Funcionou</Text>}
        <GridItem colSpan={{ base: 1, md: 2 }}>
          <Text fontSize="lg" fontWeight="semibold" color="gray.700" mb={3}>
            Objeto
          </Text>
          <InputDefaultForm
            legend={"Descrição do Objeto*"}
            placeholder={"Descreva o objeto da licitação"}
            inputValue={biddingData.biddingObject}
            onChange={(e) =>
              setBiddingData({
                ...biddingData,
                biddingObject: e.target.value,
              })
            }
          />
        </GridItem>
      </Grid>
    </Flex>
  )
}
