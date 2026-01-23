"use client"

import { Flex, Text, Tag, Box } from "@chakra-ui/react"
import { motion } from "framer-motion"

import FeatureCard from "./components/FeatureCard/FeatureCard"

import { AiFillThunderbolt } from "react-icons/ai"
import { FiFilePlus } from "react-icons/fi"
import { FaRegFolderOpen } from "react-icons/fa"
import { LuListChecks } from "react-icons/lu"
import { FaFileSignature } from "react-icons/fa"
import { HiOutlineBellAlert } from "react-icons/hi2"
import { LuClipboardList } from "react-icons/lu"

const SlideFromLeft = ({ children, delay = 0 }) => (
  <motion.div
    initial={{ opacity: 0, x: -50 }}
    whileInView={{ opacity: 1, x: 0 }}
    transition={{ duration: 0.6, delay }}
    viewport={{ once: true, margin: "-50px" }}
  >
    {children}
  </motion.div>
)

const SlideFromRight = ({ children, delay = 0 }) => (
  <motion.div
    initial={{ opacity: 0, x: 50 }}
    whileInView={{ opacity: 1, x: 0 }}
    transition={{ duration: 0.6, delay }}
    viewport={{ once: true, margin: "-50px" }}
  >
    {children}
  </motion.div>
)

const FloatUp = ({ children, delay = 0 }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay }}
    viewport={{ once: true, margin: "-50px" }}
  >
    {children}
  </motion.div>
)

const ScaleIn = ({ children, delay = 0 }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.9 }}
    whileInView={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.4, delay }}
    viewport={{ once: true, margin: "-50px" }}
  >
    {children}
  </motion.div>
)

export default function FeatureSection() {
  return (
    <>
      <Box
        mx={{ base: "0", md: "5%", lg: "10%" }}
        my={"5"}
        pt={"3"}
        borderRadius={{ base: "none", lg: "xl" }}
        boxShadow="xl"
        position="relative"
        overflow="hidden"
      >
        <FloatUp>
          <Flex justifyContent={"center"} borderRadius={"25px"} my={"5"}>
            <Flex
              px={"6"}
              py={"2"}
              bgColor="#dbeafe"
              borderRadius={"25px"}
              justifyContent={"center"}
              alignItems={"center"}
              color="#2e58da"
            >
              <AiFillThunderbolt />
              <Text pl={"1"} fontWeight={"bold"} color={"#2e58da"}>
                RECURSOS
              </Text>
            </Flex>
          </Flex>
        </FloatUp>

        <Flex flexDir={"column"} alignItems={"center"} m={{ base: "5" }}>
          <SlideFromLeft>
            <Flex>
              <Text
                color={"#0b3c5d"}
                fontWeight={"bold"}
                fontSize={{ base: "2xl", md: "3xl", lg: "4xl" }}
                textAlign="center"
              >
                Tudo que você precisa em uma única plataforma
              </Text>
            </Flex>
          </SlideFromLeft>

          <SlideFromRight delay={0.2}>
            <Flex pb={"3"}>
              <Text color="gray.700" textAlign="center">
                Ferramentas poderosas para otimizar cada etapa do processo
                licitatório
              </Text>
            </Flex>
          </SlideFromRight>

          <Flex flexDir={"column"} gap={"1"}>
            <Flex flexDir={{ base: "column", md: "row" }} align={"center"}>
              <ScaleIn delay={0.3}>
                <FeatureCard
                  cardIcon={<FiFilePlus />}
                  cardTitle={"Cadastro de Licitações"}
                  cardSubTitle={
                    "Gerencie todas as licitações em um único lugar, com criação rápida, organização por categorias e informações essenciais centralizadas."
                  }
                />
              </ScaleIn>

              <ScaleIn delay={0.4}>
                <FeatureCard
                  cardIcon={<FaRegFolderOpen />}
                  cardTitle={"Gestão Documental"}
                  cardSubTitle={
                    "Armazene, organize e acesse documentos com facilidade, garantindo versionamento, controle e segurança em todos os processos."
                  }
                />
              </ScaleIn>

              <ScaleIn delay={0.5}>
                <FeatureCard
                  cardIcon={<LuListChecks />}
                  cardTitle={"Acompanhamento de Etapas"}
                  cardSubTitle={
                    "Visualize o progresso completo da licitação, acompanhe cada fase e reduza falhas com monitoramento em tempo real."
                  }
                />
              </ScaleIn>
            </Flex>

            <Flex flexDir={{ base: "column", md: "row" }} align={"center"}>
              <ScaleIn delay={0.6}>
                <FeatureCard
                  cardIcon={<FaFileSignature />}
                  cardTitle={"Gerador de Propostas"}
                  cardSubTitle={
                    "Crie propostas automaticamente a partir de modelos inteligentes, reduzindo tempo e padronizando o envio de documentos."
                  }
                />
              </ScaleIn>

              <ScaleIn delay={0.7}>
                <FeatureCard
                  cardIcon={<HiOutlineBellAlert />}
                  cardTitle={"Alertas Automáticos de Prazos"}
                  cardSubTitle={
                    "Receba notificações de prazos importantes, evitando atrasos, retrabalho e garantindo conformidade em cada etapa."
                  }
                />
              </ScaleIn>

              <ScaleIn delay={0.8}>
                <FeatureCard
                  cardIcon={<LuClipboardList />}
                  cardTitle={"Auditoria e Histórico de Alterações"}
                  cardSubTitle={
                    "Acompanhe todas as ações realizadas no sistema, com trilha completa de auditoria para transparência e segurança jurídica."
                  }
                />
              </ScaleIn>
            </Flex>
          </Flex>
        </Flex>
      </Box>
    </>
  )
}
